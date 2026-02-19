// ===================================================
// 투자 유형 테스트 - Data Layer
// Investment Personality Test Data
// ===================================================

const TYPES = {
    "01": {
        id: "01",
        name: { kr: "기도메타", en: "Thoughts & Prayers Portfolio" },
        tagline: {
            kr: "분석은 끝났고… 이제 기도 시작.",
            en: "DD? I did my prayers."
        },
        keywords: {
            kr: ["근거 없는 확신", "감에 의존", "기도가 전략"],
            en: ["No DD, just vibes", "Faith-based investing", "Prayers > Analysis"]
        },
        emoji: "🙏",
        oppositeId: "12"
    },
    "02": {
        id: "02",
        name: { kr: "공부만 A+", en: "Straight-A, Zero Trades" },
        tagline: {
            kr: "확신이 없으면 못 사. 확신은 영원히 안 옴.",
            en: "I'll buy after one more analysis."
        },
        keywords: {
            kr: ["과분석 마비", "확신 없으면 못 삼", "기회는 분석 중에 떠남"],
            en: ["Overanalyzes everything", "Paralyzed by data", "Misses every breakout"]
        },
        emoji: "📚",
        oppositeId: "05"
    },
    "03": {
        id: "03",
        name: { kr: "손절귀신", en: "Trigger-Happy Seller" },
        tagline: {
            kr: "-2%? 바로 컷. 감정 따위 없다.",
            en: "Stopped out. Again."
        },
        keywords: {
            kr: ["칼손절 중독", "나중에 보면 거기가 바닥", "손절이 취미"],
            en: ["Cuts at -2%", "Every time", "Floor was right there"]
        },
        emoji: "✂️",
        oppositeId: "04"
    },
    "04": {
        id: "04",
        name: { kr: "반려 종목 키우기", en: "Emotional Support Stocks" },
        tagline: {
            kr: "손절은 이별이야. 난 정이 많은 사람이거든.",
            en: "I'm not bagholding. I'm loyal."
        },
        keywords: {
            kr: ["손절 불가", "종목에 정 들어버림", "복구 불가 상태"],
            en: ["Can't sell", "Won't sell", "It's family now"]
        },
        emoji: "🐾",
        oppositeId: "03"
    },
    "05": {
        id: "05",
        name: { kr: "꼭대기 VIP", en: "Bought the Peak" },
        tagline: {
            kr: "지금 안 타면 나만 없어.",
            en: "It's only up 40%… still early."
        },
        keywords: {
            kr: ["FOMO의 화신", "급등주 탑승", "항상 꼭대기 도착"],
            en: ["FOMO incarnate", "Always arrives at the top", "Buys the rip"]
        },
        emoji: "🏔️",
        oppositeId: "02"
    },
    "06": {
        id: "06",
        name: { kr: "봉차트도사", en: "Candle Whisperer" },
        tagline: {
            kr: "뉴스 끄고 캔들만 봐. 가격이 답이야.",
            en: "The chart told me. I don't ask questions."
        },
        keywords: {
            kr: ["정보 차단", "기술적 분석 몰입", "심플 원칙"],
            en: ["Charts only", "News is noise", "The candle speaks truth"]
        },
        emoji: "🕯️",
        oppositeId: "07"
    },
    "07": {
        id: "07",
        name: { kr: "복수매매왕", en: "Revenge Trader" },
        tagline: {
            kr: "방금 잃은 거? 지금 바로 복구한다.",
            en: "I'm not emotional. I'm strategic. (crying)"
        },
        keywords: {
            kr: ["틸트 상태", "연타 진입", "손실 눈덩이"],
            en: ["Tilt mode activated", "Losses snowball", "Strategy = rage"]
        },
        emoji: "😤",
        oppositeId: "06"
    },
    "08": {
        id: "08",
        name: { kr: "물만 타다 파산", en: "Dip Buyer Till Broke" },
        tagline: {
            kr: "빠지면 사는 거지. 바닥은… 아직이었어.",
            en: "Bought the dip. And the dip's dip."
        },
        keywords: {
            kr: ["물타기 장인", "끝없는 추가매수", "이번엔 진짜 바닥"],
            en: ["Averages down forever", "The bottom always has a basement", "Dip buyer supreme"]
        },
        emoji: "💧",
        oppositeId: "09"
    },
    "09": {
        id: "09",
        name: { kr: "슈뢰딩거 계좌", en: "Portfolio? What Portfolio?" },
        tagline: {
            kr: "안 보면 안 잃은 거야.",
            en: "If I don't open the app, I'm still rich."
        },
        keywords: {
            kr: ["하락장에 앱 삭제", "알림 끄기", "현실 회피가 전략"],
            en: ["App deleted", "Notifications off", "Reality is optional"]
        },
        emoji: "🙈",
        oppositeId: "08"
    },
    "10": {
        id: "10",
        name: { kr: "시드 올인러", en: "YOLO All-In" },
        tagline: {
            kr: "분산투자? 그건 겁쟁이 전략이지.",
            en: "Diversification is for people who don't believe."
        },
        keywords: {
            kr: ["한 종목 몰빵", "분산 무시", "확신의 끝"],
            en: ["One stock", "All in", "Conviction or nothing"]
        },
        emoji: "🎰",
        oppositeId: "11"
    },
    "11": {
        id: "11",
        name: { kr: "종목 다이소", en: "Dollar Store Portfolio" },
        tagline: {
            kr: "일단 1주만… 보유 종목이 47개.",
            en: "Diversification is owning $4 of every stock."
        },
        keywords: {
            kr: ["소액 분산의 극단", "47종목 보유", "포트폴리오가 편의점"],
            en: ["Owns 1 share of everything", "Portfolio = convenience store", "Hyper-diversified"]
        },
        emoji: "🏪",
        oppositeId: "10"
    },
    "12": {
        id: "12",
        name: { kr: "껄무새", en: "Shoulda Woulda Trader" },
        tagline: {
            kr: "사면 빠지고, 팔면 오르고. 뭘 해도 후회.",
            en: "Sold? It moons. Held? It tanks. Every. Time."
        },
        keywords: {
            kr: ["매 순간 후회", "살 걸 팔 걸", "항상 반대로"],
            en: ["Chronic regret", "Every decision was wrong", "Always"]
        },
        emoji: "😢",
        oppositeId: "01"
    }
};

// Opposite pair "서로 만나면" descriptions
const PAIRS = {
    "01-12": {
        meetLine: {
            kr: "한 명은 감으로, 한 명은 분석으로. 둘 다 결국 기도.",
            en: "One trades on faith. One trades on data. Both are praying."
        }
    },
    "02-05": {
        meetLine: {
            kr: "한 명은 분석하다 못 사고, 한 명은 분석 없이 삼.",
            en: "One analyzes till the opportunity dies. One buys before thinking starts."
        }
    },
    "03-04": {
        meetLine: {
            kr: "한 명은 -1%에 이별, 한 명은 -50%에 '우린 가족이야'.",
            en: "One breaks up at -1%. One says 'we're family' at -50%."
        }
    },
    "06-07": {
        meetLine: {
            kr: "한 명은 원칙만, 한 명은 감정만. 둘 다 수익은 없음.",
            en: "One follows the chart. One follows the rage. Neither follows profits."
        }
    },
    "08-09": {
        meetLine: {
            kr: "한 명은 떨어질수록 더 사고, 한 명은 떨어져도 안 봄.",
            en: "One keeps buying the fall. One pretends the fall doesn't exist."
        }
    },
    "10-11": {
        meetLine: {
            kr: "한 명은 전재산 한 종목, 한 명은 47종목에 커피값씩.",
            en: "One bets everything on one stock. One bets coffee money on everything."
        }
    }
};

// Helper to get pair key
function getPairKey(id1, id2) {
    const sorted = [parseInt(id1), parseInt(id2)].sort((a, b) => a - b);
    return `${String(sorted[0]).padStart(2, '0')}-${String(sorted[1]).padStart(2, '0')}`;
}

// 8 Questions with scoring axes
// Axes: A=Analysis Depth, B=Cut Speed, C=Action Speed, D=Emotional Control, E=Concentration, F=Regret Level
const QUESTIONS = [
    {
        id: "Q1",
        question: {
            kr: "관심 종목이 갑자기 10% 올랐다. 당신의 반응은?",
            en: "A stock on your watchlist just jumped 10%. You:"
        },
        choices: [
            {
                kr: "지금 안 타면 나만 없어. 바로 매수",
                en: "Buy now. Can't miss this.",
                scores: { A: -1, C: 1 }
            },
            {
                kr: "왜 올랐는지 뉴스부터 30분 검색",
                en: "Research for 30 minutes why it moved.",
                scores: { A: 1, F: -1 }
            },
            {
                kr: "관심목록에 넣고… 내려오면 사야지",
                en: "Add an alert. I'll buy when it pulls back.",
                scores: { C: -1 }
            },
            {
                kr: "아 그거 어제 살까 말까 했는데…",
                en: "I literally almost bought it yesterday…",
                scores: { F: 1 }
            }
        ]
    },
    {
        id: "Q2",
        question: {
            kr: "산 종목이 -15%. 어떻게 함?",
            en: "Your stock is down 15%. You:"
        },
        choices: [
            {
                kr: "-2%에 이미 잘랐는데? 난 지금 여기 없어",
                en: "I already sold at -2%. I'm not here.",
                scores: { B: 1, F: -1 }
            },
            {
                kr: "오히려 좋아. 추가매수 찬스",
                en: "Perfect. Time to average down.",
                scores: { B: -1, E: 1 }
            },
            {
                kr: "계좌 앱 삭제. 안 보면 안 잃은 거야",
                en: "Delete app. If I don't see it, it's not real.",
                scores: { C: -1, D: -1 }
            },
            {
                kr: "아까 팔 껄… 아니 애초에 안 살 껄…",
                en: "Should've sold… no, should've never bought…",
                scores: { F: 1 }
            }
        ]
    },
    {
        id: "Q3",
        question: {
            kr: "새 종목 진입할 때, 첫 매수 비중은 보통?",
            en: "When opening a new position, your typical first allocation is:"
        },
        choices: [
            {
                kr: "확신 오면 크게 간다. 한 번에 40~60%",
                en: "If conviction is high, I go big: 40-60% in one shot.",
                scores: { E: 1, C: 1, A: -1 }
            },
            {
                kr: "작게 시작(3~5%)하고, 맞으면 단계적으로 늘림",
                en: "Start small (3-5%), then scale in only if thesis holds.",
                scores: { A: 1, D: 1, C: -1 }
            },
            {
                kr: "보통 10~20%. 내 리스크 룰 안에서만 진입",
                en: "Usually 10-20%, strictly inside my risk rules.",
                scores: { D: 1, A: 1, F: -1 }
            },
            {
                kr: "1~2%만 넣고 지켜봄. 결국 기회만 보내는 편",
                en: "I place 1-2% and watch... often miss the real move.",
                scores: { E: -1, C: -1, F: 1 }
            }
        ]
    },
    {
        id: "Q4",
        question: {
            kr: "당신의 포트폴리오는?",
            en: "Your portfolio looks like:"
        },
        choices: [
            {
                kr: "1종목. 믿음이 있으면 하나면 된다",
                en: "One stock. Conviction is everything.",
                scores: { E: 1 }
            },
            {
                kr: "3~5개. 적당히",
                en: "3-5 stocks. Balanced.",
                scores: { D: 1 }
            },
            {
                kr: "15개 이상. 일단 1주씩은 사봐야 아는 거 아님?",
                en: "15+. I own a little bit of everything.",
                scores: { E: -1 }
            },
            {
                kr: "포트폴리오를 마지막으로 확인한 게 언제지…",
                en: "I honestly don't remember what I own.",
                scores: { C: -1 }
            }
        ]
    },
    {
        id: "Q5",
        question: {
            kr: "내 계좌는 마이너스인데, 친구가 +40% 수익 인증을 보내왔다. 솔직한 내 속마음은?",
            en: "Your portfolio is red. Then your friend texts: +40% gains. Your honest inner voice:"
        },
        choices: [
            {
                kr: "뭔데? 나도 들어가야 하나? 지금이라도 늦지 않았겠지?",
                en: "What stock? Should I jump in? It's not too late right?",
                scores: { A: -1, C: 1 }
            },
            {
                kr: "그 종목 PER이 몇인데… 내가 분석 좀 해볼게",
                en: "What's the P/E ratio though… let me analyze.",
                scores: { A: 1 }
            },
            {
                kr: "아 나도 그거 살까 말까 했는데… 왜 항상 이러지",
                en: "I was literally thinking about buying that… why is it always like this.",
                scores: { F: 1 }
            },
            {
                kr: "배는 아프지만 난 내 종목 믿어. -20%도 언젠간 올라",
                en: "Hurts to see, but I trust my picks. -20% is temporary.",
                scores: { B: -1 }
            }
        ]
    },
    {
        id: "Q6",
        question: {
            kr: "보유 종목이 +20%. 어떻게 함?",
            en: "Your stock is up 20%. You:"
        },
        choices: [
            {
                kr: "즉시 익절. 수익은 확정해야 진짜",
                en: "Sell immediately. Profit isn't real until it's cash.",
                scores: { B: 1, C: 1, F: -1 }
            },
            {
                kr: "더 간다. 이게 시작이야",
                en: "Hold. This is just the beginning.",
                scores: { A: -1, E: 1 }
            },
            {
                kr: "반만 팔까… 아니 전부? 아니 홀드? 아아아",
                en: "Sell half? All? No, hold? AHHH.",
                scores: { F: 1 }
            },
            {
                kr: "+20%? 그거 확인하려면 앱을 열어야 하는데…",
                en: "+20%? I'd have to open the app to know that.",
                scores: { C: -1 }
            }
        ]
    },
    {
        id: "Q7",
        question: {
            kr: "미리 정한 매매 규칙(손절/익절/재진입), 실제로는?",
            en: "Your pre-set trading rules (stop/take-profit/re-entry) are:"
        },
        choices: [
            {
                kr: "없거나 대충. 분위기 따라 즉흥 대응",
                en: "Loose or none. I react on vibes and market mood.",
                scores: { A: -1, D: -1, C: 1, F: 1 }
            },
            {
                kr: "규칙 세우고 대부분 그대로 지킴",
                en: "Clearly defined, and I follow them most of the time.",
                scores: { A: 1, D: 1, F: -1 }
            },
            {
                kr: "규칙은 있는데 급등/급락 나오면 자주 깨짐",
                en: "I have rules, but break them often during fast moves.",
                scores: { D: -1, C: 1, F: 1 }
            },
            {
                kr: "규칙보다 멘탈이 먼저 무너짐. 손실 구간에서 회피",
                en: "My mindset breaks before rules do. I avoid decisions in drawdowns.",
                scores: { C: -1, F: 1 }
            }
        ]
    },
    {
        id: "Q8",
        question: {
            kr: "보유 종목에 악재 속보가 떴다. 첫 30분, 가장 먼저 하는 행동은?",
            en: "Breaking bad news hits a position you own. In the first 30 minutes, you:"
        },
        choices: [
            {
                kr: "일단 비중 일부 축소하고, 이후 다시 판단",
                en: "Trim exposure first, then reassess once things calm down.",
                scores: { B: 1, D: 1, F: -1 }
            },
            {
                kr: "실적/가이던스/밸류 체크리스트부터 점검",
                en: "Run through my checklist: earnings, guidance, valuation.",
                scores: { A: 1, D: 1, C: -1 }
            },
            {
                kr: "원래 시나리오 안 깨졌으면 계획대로 유지",
                en: "If the core thesis is intact, I stick to the original plan.",
                scores: { B: -1, D: 1, A: 1 }
            },
            {
                kr: "커뮤니티/차트만 무한 새로고침하며 멘탈 흔들림",
                en: "Doom-scroll communities/charts and spiral emotionally.",
                scores: { D: -1, C: 1, F: 1 }
            }
        ]
    }
];

const AXES = ["A", "B", "C", "D", "E", "F"];

function _emptyAxisScores() {
    return { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
}

function _computeAxisBaseline() {
    const baseline = _emptyAxisScores();
    QUESTIONS.forEach((q) => {
        const qAvg = _emptyAxisScores();
        q.choices.forEach((choice) => {
            AXES.forEach((axis) => {
                qAvg[axis] += choice.scores[axis] || 0;
            });
        });
        AXES.forEach((axis) => {
            baseline[axis] += qAvg[axis] / q.choices.length;
        });
    });
    return baseline;
}

const AXIS_BASELINE = _computeAxisBaseline();

function _normalizeScores(rawScores) {
    const normalized = _emptyAxisScores();
    AXES.forEach((axis) => {
        normalized[axis] = (rawScores[axis] || 0) - AXIS_BASELINE[axis];
    });
    return normalized;
}

function computeTypeScores(scores) {
    const { A, B, C, D, E, F } = _normalizeScores(scores);
    return {
        "01": (-A) * 1.2 + C * 0.8 + (-D) * 0.6 + (-F) * 0.2,
        "02": A * 1.4 + (-C) * 1.0 + D * 0.4,
        "03": B * 1.8 + C * 0.4 + (-F) * 0.2,
        "04": ((-B) * 1.4 + (-D) * 1.0 + E * 0.4 + (-C) * 0.4) * 1.2,
        "05": C * 1.6 + (-A) * 0.8 + F * 0.3,
        "06": D * 1.8 + (-Math.abs(A)) * 0.4 + (-F) * 0.2,
        "07": (-D) * 1.6 + C * 1.0 + F * 0.8,
        "08": ((-B) * 1.2 + E * 1.1 + C * 0.3) * 1.2,
        "09": (-C) * 1.6 + (-D) * 0.8 + (-E) * 0.2,
        "10": E * 2.2 + C * 0.3 + (-B) * 0.2,
        "11": (-E) * 2.2 + (-C) * 0.3 + A * 0.2,
        "12": F * 2.0 + (-C) * 0.6 + (-A) * 0.2
    };
}

function rankTypes(scores) {
    return Object.entries(computeTypeScores(scores))
        .map(([id, score]) => ({ id, score }))
        .sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.id.localeCompare(b.id);
        });
}

function getConfidence(scores) {
    const ranking = rankTypes(scores);
    const top = ranking[0];
    const second = ranking[1] || top;
    const margin = Number((top.score - second.score).toFixed(4));
    let level = "low";
    if (margin >= 2.0) level = "high";
    else if (margin >= 1.0) level = "medium";

    return {
        topId: top.id,
        secondId: second.id,
        margin,
        level
    };
}

// Compatibility wrapper
function determineType(scores) {
    return rankTypes(scores)[0].id;
}
