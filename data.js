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
                scores: { A: 1 }
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
                scores: { B: 1 }
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
            kr: "종목을 살 때 가장 중요한 건?",
            en: "What matters most when buying a stock?"
        },
        choices: [
            {
                kr: "느낌. 그냥 올 것 같은 느낌",
                en: "Vibes. It just feels right.",
                scores: { A: -1 }
            },
            {
                kr: "최소 3일은 분석해야 확신이 생김",
                en: "At least 3 days of research.",
                scores: { A: 1 }
            },
            {
                kr: "차트 패턴. 캔들이 말해줌",
                en: "The chart pattern. Candles speak.",
                scores: { D: 1 }
            },
            {
                kr: "이미 오르고 있다는 사실 그 자체",
                en: "The fact that it's already going up.",
                scores: { C: 1 }
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
                scores: {}
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
                scores: { B: 1 }
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
            kr: "투자 관련 정보를 주로 어디서 얻음?",
            en: "Where do you get investment info?"
        },
        choices: [
            {
                kr: "유튜브/커뮤니티. 고수들 의견이 중요",
                en: "YouTube / communities. Gotta hear the experts.",
                scores: { A: -1 }
            },
            {
                kr: "직접 리포트 읽고 재무제표 분석",
                en: "I read reports and financial statements myself.",
                scores: { A: 1 }
            },
            {
                kr: "차트만 봄. 뉴스는 소음",
                en: "Charts only. News is noise.",
                scores: { D: 1 }
            },
            {
                kr: "정보 같은 거 안 봄. 이미 산 거 어쩔 수 없잖아",
                en: "I don't look. What's done is done.",
                scores: { C: -1, F: 1 }
            }
        ]
    },
    {
        id: "Q8",
        question: {
            kr: "내가 가지고 있는 종목에 악재가 떴다. 커뮤니티에서도 분위기가 안 좋다. 당신은?",
            en: "Bad news drops about a stock you own. Online sentiment is turning ugly. You:"
        },
        choices: [
            {
                kr: "뉴스 확인하기도 전에 이미 팔았음",
                en: "Already sold before finishing the headline.",
                scores: { B: 1 }
            },
            {
                kr: "커뮤니티는 맨날 저러잖아. 내 분석을 믿어. 홀드",
                en: "Forums are always dramatic. I trust my research. Hold.",
                scores: { A: 1, B: -1 }
            },
            {
                kr: "이 종목이랑 2년을 함께했어. 쉽게 못 버려",
                en: "I've held this for 2 years. I can't just let go.",
                scores: { B: -1, D: -1 }
            },
            {
                kr: "차트 봄. 지지선 안 깨졌으면 홀드. 뉴스는 후행",
                en: "Check the chart. Support level intact? Then hold. News is lagging.",
                scores: { D: 1 }
            }
        ]
    }
];

// Type mapping logic
// Returns typeId based on axis scores
function determineType(scores) {
    const { A, B, C, D, E, F } = scores;

    // Determine relative ranks using simple comparison
    // We'll score each type based on how well the scores match the condition
    const typeScores = {
        "01": 0, "02": 0, "03": 0, "04": 0, "05": 0, "06": 0,
        "07": 0, "08": 0, "09": 0, "10": 0, "11": 0, "12": 0
    };

    // Type 01: Lowest A + Lowest F → very negative A and F
    typeScores["01"] += (-A) + (-F);

    // Type 02: Highest A + Lowest C
    typeScores["02"] += A + (-C);

    // Type 03: Highest B
    typeScores["03"] += B * 2;

    // Type 04: Lowest B + Low F
    typeScores["04"] += (-B) + (-F) * 0.5;

    // Type 05: Highest C + Low A
    typeScores["05"] += C * 2 + (-A) * 0.5;

    // Type 06: Highest D + Mid A (A near 0)
    typeScores["06"] += D * 2 + (-Math.abs(A)) * 0.3;

    // Type 07: Lowest D + Highest C
    typeScores["07"] += (-D) * 1.5 + C * 0.5;

    // Type 08: Lowest B + High E
    typeScores["08"] += (-B) + E;

    // Type 09: Lowest C + Low D
    typeScores["09"] += (-C) * 2 + (-D) * 0.5;

    // Type 10: Highest E
    typeScores["10"] += E * 3;

    // Type 11: Lowest E
    typeScores["11"] += (-E) * 3;

    // Type 12: Highest F
    typeScores["12"] += F * 3;

    // Find type with highest score
    let bestType = "01";
    let bestScore = -Infinity;
    for (const [typeId, score] of Object.entries(typeScores)) {
        if (score > bestScore) {
            bestScore = score;
            bestType = typeId;
        }
    }

    return bestType;
}
