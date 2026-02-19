// ===================================================
// 투자 유형 테스트 — App Logic v2
// 나노바나나 | Casual / Meme Style
// ===================================================

// === STATE ===
let state = {
  lang: 'kr',
  currentQ: 0,
  answers: [],
  totalScores: { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 },
  resultTypeId: null,
  resultRanking: null,
  confidence: null
};

// === i18n STRINGS ===
const i18n = {
  kr: {
    startTitle: '나는 어떤\n투자 유형일까?',
    startSub: '8문항으로 알아보는 내 투자 성격 🤔',
    startHook: '설마 나만 맨날 고점에 사는 거 아니겠지...?',
    startMeta: '총 8문항 · 약 1분 소요',
    resultDesc: '내 투자 성격은 바로...',
    primaryTypeLabel: '주유형',
    secondaryTypeLabel: '보조유형',
    confidenceLabel: '신뢰도',
    confidenceHigh: 'High',
    confidenceMedium: 'Medium',
    confidenceLow: 'Low',
    confidenceHintLow: '혼합형 성향이 강해요. 주/보조 유형을 함께 참고해보세요.',
    oppositeLabel: '🆚 나의 정반대 유형',
    meetTag: '우리 둘이 만나면?? 🤝',
    shareTitle: '내 결과 공유하기 📤',
    copyLink: '링크 복사',
    retry: '🔄 다시하기',
    toastCopied: '🔗 링크가 복사됐어요!',
    shareText: '나는 투자 유형 테스트에서 {{name}} 나왔어!\n너도 해봐 👇'
  },
  en: {
    startTitle: "What's My\nInvestor Type?",
    startSub: '8 questions reveal your investing personality 🤔',
    startHook: "Please tell me I'm not the only one who always buys the top...",
    startMeta: '8 questions · ~1 minute',
    resultDesc: 'Your investor type is...',
    primaryTypeLabel: 'Primary Type',
    secondaryTypeLabel: 'Secondary Type',
    confidenceLabel: 'Confidence',
    confidenceHigh: 'High',
    confidenceMedium: 'Medium',
    confidenceLow: 'Low',
    confidenceHintLow: 'Your profile is mixed. Check both primary and secondary types.',
    oppositeLabel: '🆚 Your Opposite Type',
    meetTag: 'If we ever meet... 🤝',
    shareTitle: 'Share my result 📤',
    copyLink: 'Copy Link',
    retry: '🔄 Try Again',
    toastCopied: '🔗 Link copied!',
    shareText: 'I got {{name}} on the Investor Type Test!\nTake it too 👇'
  }
};

// === MEME IMAGE MAP ===
const MEME_IMAGES = {
  "01": "memes/meme_01_pray.png",
  "02": "memes/meme_02_study.png",
  "03": "memes/meme_03_cut.png",
  "04": "memes/meme_04_hold.png",
  "05": "memes/meme_05_fomo.png",
  "06": "memes/meme_06_chart.png",
  "07": "memes/meme_07_revenge.png",
  "08": "memes/meme_08_dip.png",
  "09": "memes/meme_09_blind.png",
  "10": "memes/meme_10_allin.png",
  "11": "memes/meme_11_diverse.png",
  "12": "memes/meme_12_regret.png"
};

// === CHOICE EMOJIS ===
const CHOICE_EMOJIS = [
  ['🔥', '📊', '⏳', '😢'],   // Q1
  ['✂️', '📉', '🙈', '😭'],  // Q2
  ['🔮', '📚', '🕯️', '📈'],  // Q3
  ['💎', '⚖️', '🏪', '😶'],  // Q4
  ['🚀', '🧮', '😩', '💪'],  // Q5
  ['💰', '🚀', '🤯', '📱'],  // Q6
  ['📺', '📜', '🕯️', '🙅'],  // Q7
  ['✂️', '💪', '🐾', '📉'],  // Q8
];

// === SCREEN NAVIGATION ===
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
  window.scrollTo(0, 0);
}

// === LANGUAGE ===
function setLang(lang) {
  state.lang = lang;
  document.getElementById('btn-kr').classList.toggle('active', lang === 'kr');
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  applyI18n();
  if (document.getElementById('screen-question').classList.contains('active')) {
    renderQuestion(state.currentQ);
  }
  if (document.getElementById('screen-result').classList.contains('active') && state.resultTypeId) {
    _renderResult(state.resultTypeId, state.resultRanking, state.confidence);
  }
}

function applyI18n() {
  const strings = i18n[state.lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (strings[key]) el.textContent = strings[key];
  });
  const btnStart = document.getElementById('btn-start');
  if (btnStart) {
    btnStart.textContent = state.lang === 'kr' ? '테스트 시작하기 🚀' : 'Start Test 🚀';
  }
}

// === START TEST ===
function startTest() {
  state.currentQ = 0;
  state.answers = [];
  state.totalScores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
  state.resultTypeId = null;
  state.resultRanking = null;
  state.confidence = null;
  showScreen('question');
  renderQuestion(0);
}

// === RENDER QUESTION ===
function renderQuestion(qIndex) {
  const q = QUESTIONS[qIndex];
  const lang = state.lang;
  const pct = (qIndex / QUESTIONS.length) * 100;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-label').textContent = `${qIndex + 1} / ${QUESTIONS.length}`;
  document.getElementById('q-badge').textContent = `Q${qIndex + 1}`;
  document.getElementById('q-text').textContent = q.question[lang];

  const list = document.getElementById('choices-list');
  list.innerHTML = '';
  const emojis = CHOICE_EMOJIS[qIndex] || ['🔵', '🟡', '🟢', '🔴'];

  q.choices.forEach((choice, i) => {
    const card = document.createElement('button');
    card.className = 'choice-card';
    card.innerHTML = `
      <span class="choice-emoji">${emojis[i]}</span>
      <span class="choice-text">${choice[lang]}</span>
    `;
    card.onclick = () => selectChoice(qIndex, i, choice.scores);
    list.appendChild(card);
  });
}

// === SELECT CHOICE ===
function selectChoice(qIndex, choiceIndex, scores) {
  document.querySelectorAll('.choice-card').forEach((c, i) => {
    c.classList.toggle('selected', i === choiceIndex);
  });
  for (const [axis, val] of Object.entries(scores)) {
    state.totalScores[axis] = (state.totalScores[axis] || 0) + val;
  }
  state.answers[qIndex] = { choiceIndex, scores };
  setTimeout(() => {
    if (qIndex + 1 < QUESTIONS.length) {
      state.currentQ = qIndex + 1;
      renderQuestion(state.currentQ);
    } else {
      showResult();
    }
  }, 350);
}

// === GO BACK ===
function goBack() {
  if (state.currentQ === 0) {
    showScreen('start');
    return;
  }
  const prev = state.answers[state.currentQ - 1];
  if (prev) {
    for (const [axis, val] of Object.entries(prev.scores)) {
      state.totalScores[axis] = (state.totalScores[axis] || 0) - val;
    }
    delete state.answers[state.currentQ - 1];
  }
  state.currentQ -= 1;
  renderQuestion(state.currentQ);
}

// === SHOW RESULT ===
function showResult() {
  const ranking = rankTypes(state.totalScores);
  const confidence = getConfidence(state.totalScores);
  const typeId = ranking[0].id;
  state.resultTypeId = typeId;
  state.resultRanking = ranking;
  state.confidence = confidence;
  _renderResult(typeId, ranking, confidence);
  const url = new URL(window.location.href);
  url.searchParams.set('type', typeId);
  window.history.replaceState({}, '', url.toString());
  showScreen('result');
}

function _renderResult(typeId, ranking, confidence) {
  const type = TYPES[typeId];
  const opposite = TYPES[type.oppositeId];
  const pairKey = getPairKey(typeId, type.oppositeId);
  const pair = PAIRS[pairKey];
  const lang = state.lang;

  document.getElementById('result-emoji').textContent = type.emoji;
  document.getElementById('result-name').textContent = type.name[lang];
  document.getElementById('result-tagline').textContent = type.tagline[lang];

  const kwrap = document.getElementById('result-keywords');
  kwrap.innerHTML = type.keywords[lang].map(k =>
    `<span class="keyword-pill">${k}</span>`
  ).join('');

  // 혼합형 정보 (주/보조 유형 + 신뢰도)
  const mixEl = document.getElementById('result-mix');
  const primaryNameEl = document.getElementById('result-primary-name');
  const secondaryNameEl = document.getElementById('result-secondary-name');
  const confidenceBadgeEl = document.getElementById('confidence-badge');
  const confidenceHintEl = document.getElementById('confidence-hint');
  const confidenceWrapEl = document.getElementById('confidence-wrap');

  if (ranking && ranking.length > 1 && confidence) {
    const primaryType = TYPES[ranking[0].id];
    const secondaryType = TYPES[ranking[1].id];
    const levelKey = `confidence${confidence.level.charAt(0).toUpperCase()}${confidence.level.slice(1)}`;

    mixEl.classList.remove('hidden');
    primaryNameEl.textContent = `${primaryType.emoji} ${primaryType.name[lang]}`;
    secondaryNameEl.textContent = `${secondaryType.emoji} ${secondaryType.name[lang]}`;

    confidenceBadgeEl.classList.remove('high', 'medium', 'low');
    confidenceBadgeEl.classList.add(confidence.level);
    confidenceBadgeEl.textContent = i18n[lang][levelKey];

    if (confidence.level === 'low') {
      confidenceWrapEl.classList.add('low');
      confidenceHintEl.textContent = i18n[lang].confidenceHintLow;
      confidenceHintEl.classList.remove('hidden');
    } else {
      confidenceWrapEl.classList.remove('low');
      confidenceHintEl.textContent = '';
      confidenceHintEl.classList.add('hidden');
    }
  } else {
    mixEl.classList.add('hidden');
  }

  // 정반대 유형
  document.getElementById('opposite-emoji').textContent = opposite.emoji;
  document.getElementById('opposite-name').textContent = opposite.name[lang];
  document.getElementById('opposite-meet').textContent = pair ? pair.meetLine[lang] : '';

  // meetTag i18n 적용
  const meetTagEl = document.querySelector('.meet-tag');
  if (meetTagEl) meetTagEl.textContent = i18n[lang].meetTag;

  // 밈 이미지
  const memeImg = document.getElementById('meme-img');
  const memePh = document.getElementById('meme-placeholder');
  const phEmoji = document.getElementById('meme-ph-emoji');

  memeImg.classList.remove('loaded');
  memePh.style.display = 'flex';

  memeImg.onload = () => {
    memeImg.classList.add('loaded');
    memePh.style.display = 'none';
  };
  memeImg.onerror = () => {
    if (phEmoji) phEmoji.textContent = type.emoji;
  };
  memeImg.src = MEME_IMAGES[typeId];

  applyI18n();
}

// ===========================
// SHARE FUNCTIONS
// ===========================

function _getShareUrl() {
  const url = new URL(window.location.href);
  if (state.resultTypeId) url.searchParams.set('type', state.resultTypeId);
  return url.toString();
}

function _getShareText() {
  const lang = state.lang;
  const typeId = state.resultTypeId;
  const typeName = typeId ? TYPES[typeId].name[lang] : '';
  return i18n[lang].shareText.replace('{{name}}', typeName);
}

// 링크 복사 (기존)
function shareResult() {
  const url = _getShareUrl();
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => showToast());
  } else {
    const el = document.createElement('textarea');
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast();
  }
}

// 카카오톡 — 모바일: Web Share API, 데스크탑: 링크 복사 + 안내
function shareKakao() {
  const url = _getShareUrl();
  const text = _getShareText();
  // 모바일에서는 Web Share API 사용 (시스템 공유시트 → 카카오톡 포함)
  if (navigator.share) {
    navigator.share({
      title: state.lang === 'kr' ? '나는 어떤 투자 유형일까?' : 'What Investor Type Am I?',
      text: text,
      url: url
    }).catch(() => { }); // 사용자가 취소해도 에러 무시
  } else {
    // 데스크탑 fallback: 링크 복사 + toast
    shareResult();
    showToast(state.lang === 'kr'
      ? '💛 링크를 복사했어요! 카카오톡에 붙여넣기 해주세요'
      : '💛 Link copied! Paste it in KakaoTalk');
    return;
  }
}

// X (Twitter)
function shareTwitter() {
  const url = _getShareUrl();
  const text = _getShareText();
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + '\n')}&url=${encodeURIComponent(url)}`;
  window.open(tweetUrl, '_blank', 'noopener,noreferrer');
}

// WhatsApp
function shareWhatsapp() {
  const url = _getShareUrl();
  const text = _getShareText();
  const waUrl = `https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');
}

// Facebook
function shareFacebook() {
  const url = _getShareUrl();
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(fbUrl, '_blank', 'noopener,noreferrer', 'width=600,height=400');
}

// ===========================
// TOAST
// ===========================
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg || i18n[state.lang].toastCopied;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// === RESET ===
function resetTest() {
  state = {
    lang: state.lang,
    currentQ: 0,
    answers: [],
    totalScores: { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 },
    resultTypeId: null,
    resultRanking: null,
    confidence: null
  };
  const url = new URL(window.location.href);
  url.searchParams.delete('type');
  window.history.replaceState({}, '', url.toString());
  showScreen('start');
}

// === INIT ===
(function init() {
  applyI18n();
  const params = new URLSearchParams(window.location.search);
  const typeParam = params.get('type');
  if (typeParam && TYPES[typeParam]) {
    state.resultTypeId = typeParam;
    state.resultRanking = null;
    state.confidence = null;
    _renderResult(typeParam, null, null);
    showScreen('result');
  }
})();
