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
  confidence: null,
  userName: ''
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

Object.assign(i18n.kr, {
  startTitle: '숨겨진 나의\n투자 유형 찾아보기',
  startSub: '8문항으로 3분만에 알아보는 나의 투자 성격.',
  guideTab: '유형 가이드',
  startNamePlaceholder: '이름(선택)',
  startHook: '설마 나만 맨날 고점에 사는 거 아니겠지...?',
  startMeta: '총 8문항 · 약 3분 소요',
  startParticipantsLoading: '지금까지 참여자 집계 중...',
  startParticipantsTemplate: '지금까지 {{count}}명 참여',
  startDisclaimer: '본 테스트는 투자 권유가 아니며, 재미를 위한 성향 콘텐츠입니다.',
  resultDesc: '내 투자 성격은 바로...',
  primaryTypeLabel: '주유형',
  secondaryTypeLabel: '보조유형',
  confidenceLabel: '신뢰도',
  confidenceHintLow: '혼합형 성향이 강해요. 주유형과 보조유형을 함께 참고해보세요.',
  oppositeLabel: '👀 나와 정반대인 유형',
  meetTag: '우리 둘이 만나면... 🤝',
  shareTitle: '📤 결과 공유하기',
  copyLink: '링크 복사',
  retry: '🔄 테스트 다시하기',
  toastCopied: '🔗 링크가 복사됐어요!',
  shareText: '나는 투자 유형 테스트에서 {{name}} 나왔어!\n너도 해볼래? 💸'
});

Object.assign(i18n.en, {
  startSub: '8 questions reveal your investing personality.',
  guideTab: 'Type Guide',
  startNamePlaceholder: 'Your name (optional)',
  startMeta: '8 questions · about 3 minutes',
  startParticipantsLoading: 'Loading participant count...',
  startParticipantsTemplate: '{{count}} participants so far',
  startDisclaimer: 'This test is for entertainment and does not constitute investment advice.',
  oppositeLabel: '👀 Your Opposite Type',
  meetTag: 'If we ever meet... 🤝',
  shareTitle: '📤 Share my result',
  retry: '🔄 Try Again',
  toastCopied: '🔗 Link copied!',
  shareText: 'I got {{name}} on the Investor Type Test!\nTake it too 💸'
});

// === MEME IMAGE MAP ===
const ASSET_VERSION = '20260220-1';
const MAIN_CHARACTER_IMAGE = 'memes/main_character.png';
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

function _assetUrl(path) {
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}v=${ASSET_VERSION}`;
}

function _getMemeImageSrc(typeId) {
  return _assetUrl(MEME_IMAGES[typeId] || MAIN_CHARACTER_IMAGE);
}

function _initMainCharacterImage() {
  const mainImg = document.getElementById('main-character-img');
  if (!mainImg) return;
  mainImg.src = _assetUrl(MAIN_CHARACTER_IMAGE);
}

function _preloadMemeAssets() {
  const imagePaths = [MAIN_CHARACTER_IMAGE, ...Object.values(MEME_IMAGES)];
  imagePaths.forEach((path) => {
    const img = new Image();
    img.src = _assetUrl(path);
  });
}

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
  if (id === 'start') {
    scheduleLoadComments();
    scheduleLoadParticipants();
  }
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
  const userNameInput = document.getElementById('test-user-name');
  if (userNameInput && strings.startNamePlaceholder) {
    userNameInput.placeholder = strings.startNamePlaceholder;
  }
  _renderParticipantsText();
}

// === START TEST ===
function startTest() {
  const userNameInput = document.getElementById('test-user-name');
  state.userName = userNameInput ? userNameInput.value.trim().slice(0, 20) : '';
  recordParticipationIfNeeded().catch(() => { });
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
  const userName = (state.userName || '').trim();

  document.getElementById('result-emoji').textContent = type.emoji;
  document.getElementById('result-name').textContent = type.name[lang];
  document.getElementById('result-tagline').textContent = type.tagline[lang];
  const resultUserlineEl = document.getElementById('result-userline');
  if (resultUserlineEl) {
    if (userName) {
      resultUserlineEl.textContent = lang === 'kr'
        ? `${userName}님의 결과`
        : `Result for ${userName}`;
      resultUserlineEl.classList.remove('hidden');
    } else {
      resultUserlineEl.textContent = '';
      resultUserlineEl.classList.add('hidden');
    }
  }

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
  memeImg.src = _getMemeImageSrc(typeId);

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
  const baseText = i18n[lang].shareText.replace('{{name}}', typeName);
  const userName = (state.userName || '').trim();
  if (!userName) return baseText;
  return lang === 'kr'
    ? `${userName}님의 테스트 결과!\n${baseText}`
    : `${userName}'s test result!\n${baseText}`;
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
    confidence: null,
    userName: state.userName
  };
  const url = new URL(window.location.href);
  url.searchParams.delete('type');
  window.history.replaceState({}, '', url.toString());
  showScreen('start');
}

// ===========================
// COMMENTS (Supabase)
// ===========================
const SUPABASE_URL = 'https://hzlkywvkmbarewjxdbjp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6bGt5d3ZrbWJhcmV3anhkYmpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NTM1MDUsImV4cCI6MjA4NzEyOTUwNX0.w3sUkUVJ2jVnSXIjng4BynhD1Ivjiqu9SQv7SzvosnQ';
const COMMENT_FETCH_LIMIT = 200;
let commentsLoadedOnce = false;
let participantsLoadedOnce = false;
let commentsSupportReply = true;
let latestComments = [];
let openReplyFormId = null;
let participantsCount = null;

function _getSupabaseClient() {
  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    return null;
  }
  try {
    return window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  } catch (_) {
    return null;
  }
}

function _formatCommentTime(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '';
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${m}/${d} ${h}:${min}`;
}

function _escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function _isMissingResource(error, key) {
  const msg = String(error?.message || '').toLowerCase();
  if (!msg) return false;
  return msg.includes(key) && (msg.includes('does not exist') || msg.includes('schema cache') || msg.includes('not found'));
}

function _formatParticipantsCount(value) {
  const locale = state.lang === 'kr' ? 'ko-KR' : 'en-US';
  return Number(value).toLocaleString(locale);
}

function _renderParticipantsText() {
  const participantsEl = document.getElementById('start-participants');
  if (!participantsEl) return;

  if (participantsCount === null) {
    participantsEl.textContent = i18n[state.lang].startParticipantsLoading;
    return;
  }

  const template = i18n[state.lang].startParticipantsTemplate;
  participantsEl.textContent = template.replace('{{count}}', _formatParticipantsCount(participantsCount));
}

function _incrementParticipantsFallback() {
  const base = Number.isFinite(Number(participantsCount))
    ? Math.max(0, Math.floor(Number(participantsCount)))
    : 0;
  participantsCount = base + 1;
}

function scheduleLoadParticipants() {
  if (participantsLoadedOnce) {
    _renderParticipantsText();
    return;
  }
  participantsLoadedOnce = true;
  setTimeout(() => {
    loadParticipantsCount().catch(() => {
      participantsCount = null;
      _renderParticipantsText();
    });
  }, 0);
}

async function loadParticipantsCount() {
  const client = _getSupabaseClient();
  if (!client) {
    participantsCount = null;
    _renderParticipantsText();
    return;
  }

  let count = null;
  const { data, error } = await client
    .from('test_stats')
    .select('value')
    .eq('key', 'participants')
    .maybeSingle();

  if (!error && data && Number.isFinite(Number(data.value))) {
    count = Number(data.value);
  } else if (error && !_isMissingResource(error, 'test_stats')) {
    count = null;
  }

  // Fallback: stats table is missing, show comment count to avoid empty UI.
  if (count === null && (!error || _isMissingResource(error, 'test_stats'))) {
    const { count: commentCount, error: countError } = await client
      .from('comments')
      .select('id', { count: 'exact', head: true });
    if (!countError && Number.isFinite(Number(commentCount))) {
      count = Number(commentCount);
    }
  }

  participantsCount = Number.isFinite(Number(count)) ? Math.max(0, Math.floor(Number(count))) : null;
  _renderParticipantsText();
}

async function recordParticipationIfNeeded() {
  const client = _getSupabaseClient();
  if (!client) {
    _incrementParticipantsFallback();
    _renderParticipantsText();
    return;
  }

  let committed = false;
  const { data, error } = await client.rpc('increment_participants');
  if (!error && Number.isFinite(Number(data))) {
    participantsCount = Number(data);
    committed = true;
  }

  // Fallback for RPC failures (missing function, permission, temporary errors).
  if (!committed) {
    const { data: row, error: readError } = await client
      .from('test_stats')
      .select('value')
      .eq('key', 'participants')
      .maybeSingle();

    if (!readError || _isMissingResource(readError, 'test_stats')) {
      const nextCount = Math.max(1, Math.floor(Number(row?.value || 0) + 1));
      const { error: upsertError } = await client
        .from('test_stats')
        .upsert({ key: 'participants', value: nextCount, updated_at: new Date().toISOString() }, { onConflict: 'key' });
      if (!upsertError) {
        participantsCount = nextCount;
        committed = true;
      }
    }
  }

  if (!committed) {
    // Always reflect a click in the UI even if backend persistence fails.
    _incrementParticipantsFallback();
  }
  _renderParticipantsText();
}

function _encodeCommentId(id) {
  return encodeURIComponent(String(id ?? ''));
}

function _decodeCommentId(encodedId) {
  try {
    return decodeURIComponent(encodedId);
  } catch (_) {
    return String(encodedId ?? '');
  }
}

function _isParentColumnMissing(error) {
  const msg = String(error?.message || '').toLowerCase();
  if (!msg) return false;
  return msg.includes('parent_id') && (msg.includes('column') || msg.includes('schema cache'));
}

function _normalizeComments(rows, supportsReply) {
  return (rows || []).map((row) => ({
    id: String(row.id),
    nickname: row.nickname || '익명',
    content: row.content || '',
    created_at: row.created_at,
    parent_id: supportsReply && row.parent_id ? String(row.parent_id) : null
  }));
}

function _buildCommentTree(rows) {
  const nodes = rows.map((row) => ({ ...row, children: [] }));
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const roots = [];

  for (const node of nodes) {
    if (node.parent_id && byId.has(node.parent_id)) {
      byId.get(node.parent_id).children.push(node);
    } else {
      roots.push(node);
    }
  }

  const asc = (a, b) => new Date(a.created_at) - new Date(b.created_at);
  const sortChildren = (list) => {
    list.sort(asc);
    for (const item of list) sortChildren(item.children);
  };

  sortChildren(roots);
  roots.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return roots;
}

function _renderReplyForm(commentId) {
  const encodedId = _encodeCommentId(commentId);
  const formId = `reply-form-${encodedId}`;
  return `
    <form class="reply-form hidden" id="${formId}" onsubmit="submitReply(event, '${encodedId}')">
      <div class="reply-inputs">
        <input type="text" name="reply-nickname" placeholder="닉네임" required maxlength="10" />
        <input type="password" name="reply-password" placeholder="비밀번호(삭제용)" required maxlength="20" />
      </div>
      <textarea name="reply-content" placeholder="답글을 남겨주세요." rows="2" required></textarea>
      <div class="reply-actions">
        <button type="button" class="comment-action-btn" onclick="closeReplyForm('${encodedId}')">취소</button>
        <button type="submit" class="comment-action-btn solid">답글 등록</button>
      </div>
    </form>
  `;
}

function _renderCommentNode(node, depth) {
  const encodedId = _encodeCommentId(node.id);
  const replyAction = commentsSupportReply
    ? `<button type="button" class="comment-action-btn" onclick="toggleReplyForm('${encodedId}')">답글</button>`
    : '';

  const childrenHtml = node.children.map((child) => _renderCommentNode(child, depth + 1)).join('');
  const nestedHtml = childrenHtml ? `<div class="comment-children">${childrenHtml}</div>` : '';

  return `
    <div class="comment-item${depth > 0 ? ' is-reply' : ''}">
      <div class="comment-header">
        <span class="comment-author">${_escapeHtml(node.nickname)}</span>
        <span class="comment-date">${_formatCommentTime(node.created_at)}</span>
      </div>
      <p class="comment-text">${_escapeHtml(node.content)}</p>
      <div class="comment-actions">
        ${replyAction}
        <button type="button" class="comment-action-btn danger" onclick="deleteComment('${encodedId}')">삭제</button>
      </div>
      ${commentsSupportReply ? _renderReplyForm(node.id) : ''}
      ${nestedHtml}
    </div>
  `;
}

function _collectCommentBranchIds(rootId) {
  const ids = new Set([String(rootId)]);
  let changed = true;
  while (changed) {
    changed = false;
    for (const row of latestComments) {
      const parentId = row.parent_id ? String(row.parent_id) : null;
      if (parentId && ids.has(parentId) && !ids.has(row.id)) {
        ids.add(row.id);
        changed = true;
      }
    }
  }
  return [...ids];
}

function scheduleLoadComments() {
  // Avoid repeated network calls while navigating across screens.
  if (commentsLoadedOnce) return;
  commentsLoadedOnce = true;
  setTimeout(() => {
    loadComments().catch(() => { });
  }, 0);
}

async function loadComments() {
  const listEl = document.getElementById('comments-list');
  if (!listEl) return;

  openReplyFormId = null;
  const client = _getSupabaseClient();
  if (!client) {
    listEl.innerHTML = '<div class="comments-empty">댓글 서버 연결을 준비 중입니다.</div>';
    return;
  }

  listEl.innerHTML = '<div class="comments-loading">댓글을 불러오는 중...</div>';
  commentsSupportReply = true;
  let data = null;
  let error = null;

  ({ data, error } = await client
    .from('comments')
    .select('id, nickname, content, created_at, parent_id')
    .order('created_at', { ascending: true })
    .limit(COMMENT_FETCH_LIMIT));

  if (error && _isParentColumnMissing(error)) {
    commentsSupportReply = false;
    ({ data, error } = await client
      .from('comments')
      .select('id, nickname, content, created_at')
      .order('created_at', { ascending: false })
      .limit(COMMENT_FETCH_LIMIT));
  }

  if (error) {
    listEl.innerHTML = '<div class="comments-empty">댓글을 불러오지 못했어요.</div>';
    return;
  }

  const rows = _normalizeComments(data, commentsSupportReply);
  latestComments = rows;

  if (rows.length === 0) {
    listEl.innerHTML = '<div class="comments-empty">첫 댓글을 남겨보세요 👋</div>';
    return;
  }

  if (!commentsSupportReply) {
    const flatRows = rows.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    listEl.innerHTML = `
      <div class="comments-note">답글 기능은 DB 설정 후 자동으로 활성화됩니다.</div>
      ${flatRows.map((row) => _renderCommentNode({ ...row, children: [] }, 0)).join('')}
    `;
    return;
  }

  const tree = _buildCommentTree(rows);
  listEl.innerHTML = tree.map((node) => _renderCommentNode(node, 0)).join('');
}

async function submitComment(e) {
  e.preventDefault();

  const nicknameEl = document.getElementById('comment-nickname');
  const passwordEl = document.getElementById('comment-password');
  const contentEl = document.getElementById('comment-content');
  const submitBtn = document.querySelector('.btn-submit-comment');
  if (!nicknameEl || !passwordEl || !contentEl || !submitBtn) return;

  const nickname = nicknameEl.value.trim();
  const password = passwordEl.value.trim();
  const content = contentEl.value.trim();
  if (!nickname || !password || !content) return;

  const client = _getSupabaseClient();
  if (!client) {
    showToast('댓글 서버 연결 실패');
    return;
  }

  submitBtn.disabled = true;
  try {
    const payload = commentsSupportReply
      ? { nickname, password, content, parent_id: null }
      : { nickname, password, content };
    const { error } = await client
      .from('comments')
      .insert([payload]);

    if (error) {
      showToast('댓글 등록 실패');
      return;
    }

    nicknameEl.value = '';
    passwordEl.value = '';
    contentEl.value = '';
    await loadComments();
    showToast('댓글이 등록됐어요!');
  } finally {
    submitBtn.disabled = false;
  }
}

function toggleReplyForm(encodedId) {
  if (!commentsSupportReply) {
    showToast('답글 기능 설정이 필요합니다');
    return;
  }

  const formId = `reply-form-${encodedId}`;
  const targetForm = document.getElementById(formId);
  if (!targetForm) return;

  const shouldOpen = targetForm.classList.contains('hidden');
  document.querySelectorAll('.reply-form').forEach((formEl) => {
    formEl.classList.add('hidden');
  });

  if (!shouldOpen) {
    openReplyFormId = null;
    return;
  }

  targetForm.classList.remove('hidden');
  openReplyFormId = encodedId;
  const textarea = targetForm.querySelector('textarea');
  if (textarea) textarea.focus();
}

function closeReplyForm(encodedId) {
  const formEl = document.getElementById(`reply-form-${encodedId}`);
  if (!formEl) return;
  formEl.classList.add('hidden');
  if (openReplyFormId === encodedId) {
    openReplyFormId = null;
  }
}

async function submitReply(e, encodedParentId) {
  e.preventDefault();
  if (!commentsSupportReply) {
    showToast('답글 기능 설정이 필요합니다');
    return;
  }

  const parentId = _decodeCommentId(encodedParentId);
  const formEl = e.currentTarget;
  const nicknameEl = formEl.querySelector('input[name="reply-nickname"]');
  const passwordEl = formEl.querySelector('input[name="reply-password"]');
  const contentEl = formEl.querySelector('textarea[name="reply-content"]');
  const submitBtn = formEl.querySelector('button[type="submit"]');
  if (!nicknameEl || !passwordEl || !contentEl || !submitBtn) return;

  const nickname = nicknameEl.value.trim();
  const password = passwordEl.value.trim();
  const content = contentEl.value.trim();
  if (!nickname || !password || !content) return;

  const client = _getSupabaseClient();
  if (!client) {
    showToast('댓글 서버 연결 실패');
    return;
  }

  submitBtn.disabled = true;
  try {
    const { error } = await client
      .from('comments')
      .insert([{ nickname, password, content, parent_id: parentId }]);

    if (error) {
      if (_isParentColumnMissing(error)) {
        commentsSupportReply = false;
        showToast('답글용 DB 컬럼 설정이 필요합니다');
      } else {
        showToast('답글 등록 실패');
      }
      return;
    }

    nicknameEl.value = '';
    passwordEl.value = '';
    contentEl.value = '';
    closeReplyForm(encodedParentId);
    await loadComments();
    showToast('답글이 등록됐어요!');
  } finally {
    submitBtn.disabled = false;
  }
}

async function deleteComment(encodedId) {
  const id = _decodeCommentId(encodedId);
  const pwd = prompt('삭제 비밀번호를 입력해주세요.');
  if (pwd === null) return;
  const password = pwd.trim();
  if (!password) return;

  const client = _getSupabaseClient();
  if (!client) {
    showToast('댓글 서버 연결 실패');
    return;
  }

  const { data, error } = await client
    .from('comments')
    .select('password')
    .eq('id', id)
    .single();

  if (error || !data) {
    showToast('댓글 확인 실패');
    return;
  }

  if (data.password !== password) {
    showToast('비밀번호가 일치하지 않아요');
    return;
  }

  let deleteError = null;
  const idsToDelete = commentsSupportReply ? _collectCommentBranchIds(id) : [id];

  if (idsToDelete.length > 1) {
    ({ error: deleteError } = await client
      .from('comments')
      .delete()
      .in('id', idsToDelete));
  } else {
    ({ error: deleteError } = await client
      .from('comments')
      .delete()
      .eq('id', id));
  }

  if (deleteError) {
    showToast('댓글 삭제 실패');
    return;
  }

  await loadComments();
  showToast('댓글이 삭제됐어요');
}

// === INIT ===
(function init() {
  _initMainCharacterImage();
  _preloadMemeAssets();
  applyI18n();
  scheduleLoadParticipants();
  scheduleLoadComments();
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
