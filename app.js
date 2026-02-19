// ===================================================
// 투자 유형 테스트 - Application Logic
// Investment Personality Test App
// ===================================================

// ── State ──────────────────────────────────────────
const state = {
    lang: 'kr',       // 'kr' | 'en'
    currentQ: 0,      // 0-indexed
    answers: [],      // Array of choice indices
    scores: { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 },
    resultTypeId: null,
};

// ── i18n strings ──────────────────────────────────
const i18n = {
    kr: {
        startTitle: '투자 유형 테스트',
        startTitleEn: 'Investment Personality Test',
        startDesc: '8가지 질문으로 나의 투자 성격 유형을 발견하세요.\n총 12가지 유형 중 당신은 어떤 투자자?',
        startBtn: '테스트 시작하기 →',
        shareHint: '결과를 SNS에 공유해보세요 📸',
        next: '다음',
        analyzing: '유형 분석 중…',
        analyzingSub: '당신의 투자 DNA를 해독하고 있어요',
        resultLabel: '결과가 나왔어요! 🎉',
        myType: '나의 투자 유형',
        oppositeType: '나의 정반대 유형',
        meetLabel: '서로 만나면',
        saveCard: '📸 결과 카드 저장',
        copyLink: '🔗 링크 복사',
        restart: '🔄 다시하기',
        copied: '링크가 복사되었어요!',
        savedNotice: '이미지로 저장하려면 스크린샷을 이용해주세요',
        q: '질문',
    },
    en: {
        startTitle: 'Investment\nPersonality Test',
        startTitleEn: '투자 유형 테스트',
        startDesc: 'Answer 8 questions to discover your investment personality type.\nWhich of 12 investor archetypes are you?',
        startBtn: 'Start the Test →',
        shareHint: 'Share your results on social media 📸',
        next: 'Next',
        analyzing: 'Analyzing your type…',
        analyzingSub: 'Decoding your investment DNA',
        resultLabel: 'Your result is ready! 🎉',
        myType: 'Your Investment Type',
        oppositeType: 'Your Opposite Type',
        meetLabel: 'When They Meet',
        saveCard: '📸 Save Result Card',
        copyLink: '🔗 Copy Link',
        restart: '🔄 Try Again',
        copied: 'Link copied!',
        savedNotice: 'Take a screenshot to save as image',
        q: 'Question',
    }
};

const t = (key) => i18n[state.lang][key];

// ── Screen Router ──────────────────────────────────
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen-${id}`).classList.add('active');
    window.scrollTo(0, 0);
}

// ── Language Toggle ────────────────────────────────
function setLang(lang) {
    state.lang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    renderStartScreen();
}

// ── Render Start Screen ────────────────────────────
function renderStartScreen() {
    document.getElementById('start-title').textContent = state.lang === 'kr' ? '투자 유형 테스트' : 'Investment\nPersonality Test';
    document.getElementById('start-title-en').textContent = state.lang === 'kr' ? 'Investment Personality Test' : '투자 유형 테스트';
    document.getElementById('start-desc').textContent = t('startDesc');
    document.getElementById('btn-start').textContent = t('startBtn');
    document.getElementById('start-share-hint').textContent = t('shareHint');
}

// ── Start Test ─────────────────────────────────────
function startTest() {
    state.currentQ = 0;
    state.answers = [];
    state.scores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
    state.resultTypeId = null;
    showScreen('question');
    renderQuestion();
}

// ── Render Question ────────────────────────────────
function renderQuestion() {
    const q = QUESTIONS[state.currentQ];
    const qIndex = state.currentQ;
    const totalQ = QUESTIONS.length;

    // Progress
    const progress = ((qIndex) / totalQ) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-current').textContent = qIndex + 1;
    document.getElementById('progress-total').textContent = totalQ;

    // Question badge & text
    document.getElementById('question-id-badge').textContent = `Q${qIndex + 1}`;
    document.getElementById('question-text-kr').textContent = q.question.kr;
    document.getElementById('question-text-en').textContent = q.question.en;

    // Choices
    const list = document.getElementById('choices-list');
    list.innerHTML = '';
    q.choices.forEach((choice, i) => {
        const card = document.createElement('div');
        card.className = 'choice-card';
        card.dataset.index = i;
        card.innerHTML = `
      <div class="choice-radio"></div>
      <div class="choice-text">
        <div class="choice-text-kr">${choice.kr}</div>
        <div class="choice-text-en">${choice.en}</div>
      </div>
    `;
        card.addEventListener('click', () => selectChoice(i));
        list.appendChild(card);
    });

    // Next button
    const btnNext = document.getElementById('btn-next');
    btnNext.disabled = true;
    btnNext.textContent = state.currentQ < QUESTIONS.length - 1 ? `${t('next')} →` : `결과 보기 ✨`;

    // Restore previous answer if navigating back
    if (state.answers[qIndex] !== undefined) {
        selectChoice(state.answers[qIndex], false);
    }
}

// ── Select Choice ──────────────────────────────────
function selectChoice(index, animate = true) {
    document.querySelectorAll('.choice-card').forEach(c => c.classList.remove('selected'));
    document.querySelector(`.choice-card[data-index="${index}"]`).classList.add('selected');
    state.answers[state.currentQ] = index;
    document.getElementById('btn-next').disabled = false;

    if (animate) {
        const card = document.querySelector(`.choice-card[data-index="${index}"]`);
        card.style.transform = 'translateX(6px)';
        setTimeout(() => { card.style.transform = ''; }, 150);
    }
}

// ── Next Question ──────────────────────────────────
function nextQuestion() {
    if (state.answers[state.currentQ] === undefined) return;

    // Apply scores for this answer
    const q = QUESTIONS[state.currentQ];
    const choiceScores = q.choices[state.answers[state.currentQ]].scores;
    for (const [axis, val] of Object.entries(choiceScores)) {
        state.scores[axis] = (state.scores[axis] || 0) + val;
    }

    state.currentQ++;

    if (state.currentQ >= QUESTIONS.length) {
        // Done — show loading then result
        showScreen('loading');
        document.getElementById('loading-text').textContent = t('analyzing');
        document.getElementById('loading-sub').textContent = t('analyzingSub');
        setTimeout(() => {
            computeResult();
            renderResult();
            showScreen('result');
        }, 1800);
    } else {
        renderQuestion();
    }
}

// ── Compute Result ─────────────────────────────────
function computeResult() {
    state.resultTypeId = determineType(state.scores);
}

// ── Render Result ──────────────────────────────────
function renderResult() {
    const lang = state.lang;
    const typeId = state.resultTypeId;
    const myType = TYPES[typeId];
    const oppType = TYPES[myType.oppositeId];
    const pairKey = getPairKey(typeId, myType.oppositeId);
    const pair = PAIRS[pairKey];

    // Result label
    document.getElementById('result-label').textContent = t('resultLabel');

    // Main card
    document.getElementById('result-my-type-label').textContent = t('myType');
    document.getElementById('result-type-number').textContent = `Type ${myType.id}`;
    document.getElementById('result-emoji').textContent = myType.emoji;
    document.getElementById('result-type-name-kr').textContent = myType.name.kr;
    document.getElementById('result-type-name-en').textContent = myType.name.en;
    document.getElementById('result-tagline-kr').textContent = `"${myType.tagline.kr}"`;
    document.getElementById('result-tagline-en').textContent = `"${myType.tagline.en}"`;

    // Keywords
    const kw = lang === 'kr' ? myType.keywords.kr : myType.keywords.en;
    const kwContainer = document.getElementById('result-keywords');
    kwContainer.innerHTML = kw.map(w => `<span class="keyword-chip">${w}</span>`).join('');

    // Opposite type card
    document.getElementById('opposite-label').textContent = t('oppositeType');
    document.getElementById('opposite-emoji').textContent = oppType.emoji;
    document.getElementById('opposite-name-kr').textContent = oppType.name.kr;
    document.getElementById('opposite-name-en').textContent = oppType.name.en;
    document.getElementById('opposite-tagline').textContent = `"${oppType.tagline[lang]}"`;

    // Meet line
    document.getElementById('meet-label').textContent = t('meetLabel');
    document.getElementById('meet-text-kr').textContent = `"${pair.meetLine.kr}"`;
    document.getElementById('meet-text-en').textContent = `"${pair.meetLine.en}"`;

    // Action buttons text
    document.getElementById('btn-save').textContent = t('saveCard');
    document.getElementById('btn-copy').textContent = t('copyLink');
    document.getElementById('btn-restart').textContent = t('restart');
}

// ── Share / Copy ───────────────────────────────────
function saveCard() {
    showToast(t('savedNotice'));
}

function copyLink() {
    const typeId = state.resultTypeId;
    const url = `${window.location.origin}${window.location.pathname}?type=${typeId}`;
    navigator.clipboard.writeText(url).then(() => {
        showToast(t('copied'));
    }).catch(() => {
        showToast(t('copied'));
    });
}

function restart() {
    state.scores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
    state.answers = [];
    state.currentQ = 0;
    state.resultTypeId = null;
    showScreen('start');
}

// ── Toast ──────────────────────────────────────────
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
}

// ── URL param: ?type=07 ────────────────────────────
function checkUrlType() {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get('type');
    if (typeParam && TYPES[typeParam]) {
        state.resultTypeId = typeParam;
        // Compute fake scores so the render works
        renderResult();
        showScreen('result');
        return true;
    }
    return false;
}

// ── Init ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });

    // Start button
    document.getElementById('btn-start').addEventListener('click', startTest);

    // Next button
    document.getElementById('btn-next').addEventListener('click', nextQuestion);

    // Back button on question screen
    document.getElementById('btn-back').addEventListener('click', () => {
        if (state.currentQ > 0) {
            // Undo last score
            const prevQ = QUESTIONS[state.currentQ - 1];
            const prevAnswer = state.answers[state.currentQ - 1];
            if (prevAnswer !== undefined) {
                const choiceScores = prevQ.choices[prevAnswer].scores;
                for (const [axis, val] of Object.entries(choiceScores)) {
                    state.scores[axis] -= val;
                }
                delete state.answers[state.currentQ - 1];
            }
            state.currentQ--;
            renderQuestion();
        } else {
            showScreen('start');
        }
    });

    // Result action buttons
    document.getElementById('btn-save').addEventListener('click', saveCard);
    document.getElementById('btn-copy').addEventListener('click', copyLink);
    document.getElementById('btn-restart').addEventListener('click', restart);

    // Check URL params
    if (!checkUrlType()) {
        renderStartScreen();
        showScreen('start');
    }
});
