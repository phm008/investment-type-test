#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const DATA_FILE = path.join(__dirname, "..", "data.js");
const code = `${fs.readFileSync(DATA_FILE, "utf8")}\n;globalThis.__EVAL__={QUESTIONS,TYPES,computeTypeScores,rankTypes,getConfidence,determineType};`;
const context = {};
vm.createContext(context);
vm.runInContext(code, context);

const { QUESTIONS, TYPES, computeTypeScores, rankTypes, getConfidence, determineType } = context.__EVAL__;
const TYPE_IDS = Object.keys(TYPES).sort();
const EPSILON = 1e-9;

function zeroScores() {
  return { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
}

function cloneScores(scores) {
  return { A: scores.A, B: scores.B, C: scores.C, D: scores.D, E: scores.E, F: scores.F };
}

function applyChoice(scores, choice) {
  const next = cloneScores(scores);
  for (const [axis, value] of Object.entries(choice.scores)) {
    next[axis] += value;
  }
  return next;
}

function runExhaustive() {
  const counts = Object.fromEntries(TYPE_IDS.map((id) => [id, 0]));
  const strictWinners = Object.fromEntries(TYPE_IDS.map((id) => [id, 0]));
  const marginHistogram = {
    "le_0": 0,
    "le_0_5": 0,
    "le_1_0": 0,
    "le_1_5": 0,
    "le_2_0": 0
  };

  let total = 0;
  let topTieCount = 0;

  function walk(qIndex, scores) {
    if (qIndex === QUESTIONS.length) {
      total += 1;
      const ranking = rankTypes(scores);
      const confidence = getConfidence(scores);
      const topId = ranking[0].id;
      const margin = ranking[0].score - ranking[1].score;
      counts[topId] += 1;

      if (Math.abs(margin) <= EPSILON) {
        topTieCount += 1;
      } else {
        strictWinners[topId] += 1;
      }

      if (confidence.margin <= 0) marginHistogram.le_0 += 1;
      if (confidence.margin <= 0.5) marginHistogram.le_0_5 += 1;
      if (confidence.margin <= 1.0) marginHistogram.le_1_0 += 1;
      if (confidence.margin <= 1.5) marginHistogram.le_1_5 += 1;
      if (confidence.margin <= 2.0) marginHistogram.le_2_0 += 1;
      return;
    }

    QUESTIONS[qIndex].choices.forEach((choice) => {
      walk(qIndex + 1, applyChoice(scores, choice));
    });
  }

  walk(0, zeroScores());
  return { total, counts, strictWinners, topTieCount, marginHistogram };
}

function applyRoute(route) {
  let scores = zeroScores();
  route.forEach((pick, qIndex) => {
    scores = applyChoice(scores, QUESTIONS[qIndex].choices[pick - 1]);
  });
  const ranking = rankTypes(scores);
  const confidence = getConfidence(scores);
  return {
    route: route.join("-"),
    scores,
    top: ranking[0].id,
    second: ranking[1].id,
    margin: confidence.margin
  };
}

function main() {
  const exhaustive = runExhaustive();
  const total = exhaustive.total;
  const distribution = Object.entries(exhaustive.counts)
    .map(([id, count]) => ({ id, count, pct: (count / total) * 100 }))
    .sort((a, b) => b.pct - a.pct);

  const maxPct = distribution[0].pct;
  const minPct = distribution[distribution.length - 1].pct;
  const tiePct = (exhaustive.topTieCount / total) * 100;
  const strictWinnerAllPositive = Object.values(exhaustive.strictWinners).every((count) => count > 0);
  const strictWinner04Positive = exhaustive.strictWinners["04"] > 0;

  const scenarios = [
    { name: "overanalysis_entry_delay", route: [2, 1, 2, 2, 2, 4, 2, 2], expect: "02" },
    { name: "quick_cut_profit_lock", route: [1, 1, 1, 4, 2, 1, 2, 1], expect: "03" },
    { name: "avoidance_app_delete", route: [3, 3, 1, 4, 4, 4, 1, 3], expect: "09" },
    { name: "regret_loop", route: [4, 4, 4, 2, 3, 3, 4, 2], expect: "12" }
  ].map((scenario) => {
    const result = applyRoute(scenario.route);
    const pass = result.top === scenario.expect || result.second === scenario.expect;
    return { ...scenario, ...result, pass };
  });

  const summary = {
    totals: {
      routes: total,
      typeCount: TYPE_IDS.length
    },
    thresholds: {
      maxTypePct: { value: Number(maxPct.toFixed(2)), pass: maxPct <= 18 },
      minTypePct: { value: Number(minPct.toFixed(2)), pass: minPct >= 3 },
      topTiePct: { value: Number(tiePct.toFixed(2)), pass: tiePct <= 5 },
      strictWinnerAllTypes: { value: strictWinnerAllPositive, pass: strictWinnerAllPositive },
      strictWinner04: { value: exhaustive.strictWinners["04"], pass: strictWinner04Positive }
    },
    distribution: distribution.map((row) => ({
      id: row.id,
      count: row.count,
      pct: Number(row.pct.toFixed(2)),
      strictWinners: exhaustive.strictWinners[row.id]
    })),
    marginHistogramPct: {
      le_0: Number(((exhaustive.marginHistogram.le_0 / total) * 100).toFixed(2)),
      le_0_5: Number(((exhaustive.marginHistogram.le_0_5 / total) * 100).toFixed(2)),
      le_1_0: Number(((exhaustive.marginHistogram.le_1_0 / total) * 100).toFixed(2)),
      le_1_5: Number(((exhaustive.marginHistogram.le_1_5 / total) * 100).toFixed(2)),
      le_2_0: Number(((exhaustive.marginHistogram.le_2_0 / total) * 100).toFixed(2))
    },
    scenarios
  };

  const errors = [];
  Object.entries(summary.thresholds).forEach(([name, result]) => {
    if (!result.pass) errors.push(`Threshold failed: ${name}`);
  });
  summary.scenarios.forEach((scenario) => {
    if (!scenario.pass) errors.push(`Scenario failed: ${scenario.name}`);
  });

  console.log(JSON.stringify(summary, null, 2));
  if (errors.length > 0) {
    console.error("\nRouting evaluation failed:");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
