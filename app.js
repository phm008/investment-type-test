// ===================================================
// Ìà¨Ïûê Ïú†Ìòï ÌÖåÏä§Ìä∏ ‚Äî App Logic v2
// ÎÇòÎÖ∏Î∞îÎÇòÎÇò | Casual / Meme Style
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
    startTitle: 'Ïà®Í≤®ÏßÑ ÎÇòÏùò\nÌà¨Ïûê Ïú†Ìòï Ï∞æÏïÑÎ≥¥Í∏∞',
    startSub: '8Î¨∏Ìï≠ÏúºÎ°ú 3Î∂ÑÎßåÏóê ÏïåÏïÑÎ≥¥Îäî ÎÇòÏùò Ìà¨Ïûê ÏÑ±Í≤©.',
    startHook: 'ÏÑ§Îßà ÎÇòÎßå Îß®ÎÇ† Í≥†Ï†êÏóê ÏÇ¨Îäî Í±∞ ÏïÑÎãàÍ≤†ÏßÄ...?',
    startMeta: 'Ï¥ù 8Î¨∏Ìï≠ ¬∑ ÏïΩ 3Î∂Ñ ÏÜåÏöî',
    resultDesc: 'ÎÇ¥ Ìà¨Ïûê ÏÑ±Í≤©ÏùÄ Î∞îÎ°ú...',
    primaryTypeLabel: 'Ï£ºÏú†Ìòï',
    secondaryTypeLabel: 'Î≥¥Ï°∞Ïú†Ìòï',
    confidenceLabel: 'Ïã†Î¢∞ÎèÑ',
    confidenceHigh: 'High',
    confidenceMedium: 'Medium',
    confidenceLow: 'Low',
    confidenceHintLow: 'ÌòºÌï©Ìòï ÏÑ±Ìñ•Ïù¥ Í∞ïÌï¥Ïöî. Ï£º/Î≥¥Ï°∞ Ïú†ÌòïÏùÑ Ìï®Íªò Ï∞∏Í≥†Ìï¥Î≥¥ÏÑ∏Ïöî.',
    oppositeLabel: 'üÜö ÎÇòÏùò Ï†ïÎ∞òÎåÄ Ïú†Ìòï',
    meetTag: 'Ïö∞Î¶¨ ÎëòÏù¥ ÎßåÎÇòÎ©¥?? ü§ù',
    shareTitle: 'ÎÇ¥ Í≤∞Í≥º Í≥µÏú†ÌïòÍ∏∞ üì§',
    copyLink: 'ÎßÅÌÅ¨ Î≥µÏÇ¨',
    retry: 'üîÑ Îã§ÏãúÌïòÍ∏∞',
    toastCopied: 'üîó ÎßÅÌÅ¨Í∞Ä Î≥µÏÇ¨ÎêêÏñ¥Ïöî!',
    shareText: 'ÎÇòÎäî Ìà¨Ïûê Ïú†Ìòï ÌÖåÏä§Ìä∏ÏóêÏÑú {{name}} ÎÇòÏôîÏñ¥!\nÎÑàÎèÑ Ìï¥Î¥ê üëá'
  },
  en: {
    startTitle: "Discover My\nHidden Investor Type",
    startSub: 'Find out your investing personality in 3 minutes.',
    startHook: "Please tell me I'm not the only one who always buys the top...",
    startMeta: '8 questions ¬∑ ~3 minutes',
    resultDesc: 'Your investor type is...',
    primaryTypeLabel: 'Primary Type',
    secondaryTypeLabel: 'Secondary Type',
    confidenceLabel: 'Confidence',
    confidenceHigh: 'High',
    confidenceMedium: 'Medium',
    confidenceLow: 'Low',
    confidenceHintLow: 'Your profile is mixed. Check both primary and secondary types.',
    oppositeLabel: 'üÜö Your Opposite Type',
    meetTag: 'If we ever meet... ü§ù',
    shareTitle: 'Share my result üì§',
    copyLink: 'Copy Link',
    retry: 'üîÑ Try Again',
    toastCopied: 'üîó Link copied!',
    shareText: 'I got {{name}} on the Investor Type Test!\nTake it too üëá'
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
  ['üî•', 'üìä', '‚è≥', 'üò¢'],   // Q1
  ['‚úÇÔ∏è', 'üìâ', 'üôà', 'üò≠'],  // Q2
  ['üîÆ', 'üìö', 'üïØÔ∏è', 'üìà'],  // Q3
  ['üíé', '‚öñÔ∏è', 'üè™', 'üò∂'],  // Q4
  ['üöÄ', 'üßÆ', 'üò©', 'üí™'],  // Q5
  ['üí∞', 'üöÄ', 'ü§Ø', 'üì±'],  // Q6
  ['üì∫', 'üìú', 'üïØÔ∏è', 'üôÖ'],  // Q7
  ['‚úÇÔ∏è', 'üí™', 'üêæ', 'üìâ'],  // Q8
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
    btnStart.textContent = state.lang === 'kr' ? 'ÌÖåÏä§Ìä∏ ÏãúÏûëÌïòÍ∏∞ üöÄ' : 'Start Test üöÄ';
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
  const emojis = CHOICE_EMOJIS[qIndex] || ['üîµ', 'üü°', 'üü¢', 'üî¥'];

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

  // ÌòºÌï©Ìòï Ï†ïÎ≥¥ (Ï£º/Î≥¥Ï°∞ Ïú†Ìòï + Ïã†Î¢∞ÎèÑ)
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

  // Ï†ïÎ∞òÎåÄ Ïú†Ìòï
  document.getElementById('opposite-emoji').textContent = opposite.emoji;
  document.getElementById('opposite-name').textContent = opposite.name[lang];
  document.getElementById('opposite-meet').textContent = pair ? pair.meetLine[lang] : '';

  // meetTag i18n Ï†ÅÏö©
  const meetTagEl = document.querySelector('.meet-tag');
  if (meetTagEl) meetTagEl.textContent = i18n[lang].meetTag;

  // Î∞à Ïù¥ÎØ∏ÏßÄ
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

// ÎßÅÌÅ¨ Î≥µÏÇ¨ (Í∏∞Ï°¥)
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

// Ïπ¥Ïπ¥Ïò§ÌÜ° ‚Äî Î™®Î∞îÏùº: Web Share API, Îç∞Ïä§ÌÅ¨ÌÉë: ÎßÅÌÅ¨ Î≥µÏÇ¨ + ÏïàÎÇ¥
function shareKakao() {
  const url = _getShareUrl();
  const text = _getShareText();
  // Î™®Î∞îÏùºÏóêÏÑúÎäî Web Share API ÏÇ¨Ïö© (ÏãúÏä§ÌÖú Í≥µÏú†ÏãúÌä∏ ‚Üí Ïπ¥Ïπ¥Ïò§ÌÜ° Ìè¨Ìï®)
  if (navigator.share) {
    navigator.share({
      title: state.lang === 'kr' ? 'ÎÇòÎäî Ïñ¥Îñ§ Ìà¨Ïûê Ïú†ÌòïÏùºÍπå?' : 'What Investor Type Am I?',
      text: text,
      url: url
    }).catch(() => { }); // ÏÇ¨Ïö©ÏûêÍ∞Ä Ï∑®ÏÜåÌï¥ÎèÑ ÏóêÎü¨ Î¨¥Ïãú
  } else {
    // Îç∞Ïä§ÌÅ¨ÌÉë fallback: ÎßÅÌÅ¨ Î≥µÏÇ¨ + toast
    shareResult();
    showToast(state.lang === 'kr'
      ? 'üíõ ÎßÅÌÅ¨Î•º Î≥µÏÇ¨ÌñàÏñ¥Ïöî! Ïπ¥Ïπ¥Ïò§ÌÜ°Ïóê Î∂ôÏó¨ÎÑ£Í∏∞ Ìï¥Ï£ºÏÑ∏Ïöî'
      : 'üíõ Link copied! Paste it in KakaoTalk');
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
 
 / /   = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =  
 / /   S U P A B A S E   C O M M E N T S  
 / /   = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =  
  
 c o n s t   S U P A B A S E _ U R L   =   ' h t t p s : / / h z l k y w v k m b a r e w j x d b j p . s u p a b a s e . c o ' ;  
 c o n s t   S U P A B A S E _ K E Y   =   ' e y J h b G c i O i J I U z I 1 N i I s I n R 5 c C I 6 I k p X V C J 9 . e y J p c 3 M i O i J z d X B h Y m F z Z S I s I n J l Z i I 6 I m h 6 b G t 5 d 3 Z r b W J h c m V 3 a n h k Y m p w I i w i c m 9 s Z S I 6 I m F u b 2 4 i L C J p Y X Q i O j E 3 N z E 1 N T M 1 M D U s I m V 4 c C I 6 M j A 4 N z E y O T U w N X 0 . w 3 s U k U V J 2 j V n S X I j n g 4 B y n h D 1 I v j i q u 9 S Q v 7 S z v o s n Q ' ;  
 c o n s t   s u p a b a s e   =   w i n d o w . s u p a b a s e . c r e a t e C l i e n t ( S U P A B A S E _ U R L ,   S U P A B A S E _ K E Y ) ;  
  
 / /   ? ìƒŸŒ  ? Ié3? ?  
 f u n c t i o n   f o r m a t T i m e ( i s o S t r i n g )   {  
         c o n s t   d a t e   =   n e w   D a t e ( i s o S t r i n g ) ;  
         c o n s t   m   =   d a t e . g e t M o n t h ( )   +   1 ;  
         c o n s t   d   =   d a t e . g e t D a t e ( ) ;  
         c o n s t   h   =   S t r i n g ( d a t e . g e t H o u r s ( ) ) . p a d S t a r t ( 2 ,   ' 0 ' ) ;  
         c o n s t   m i n   =   S t r i n g ( d a t e . g e t M i n u t e s ( ) ) . p a d S t a r t ( 2 ,   ' 0 ' ) ;  
         r e t u r n   ` $ { m } / $ { d }   $ { h } : $ { m i n } ` ;  
 }  
  
 / /   ? ‰º?   zêH≥-«? z1∞π 
 a s y n c   f u n c t i o n   l o a d C o m m e n t s ( )   {  
         c o n s t   l i s t E l   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' c o m m e n t s - l i s t ' ) ;  
         t r y   {  
                 c o n s t   {   d a t a :   c o m m e n t s ,   e r r o r   }   =   a w a i t   s u p a b a s e  
                         . f r o m ( ' c o m m e n t s ' )  
                         . s e l e c t ( ' i d ,   n i c k n a m e ,   c o n t e n t ,   c r e a t e d _ a t ' )  
                         . o r d e r ( ' c r e a t e d _ a t ' ,   {   a s c e n d i n g :   f a l s e   } )  
                         . l i m i t ( 5 0 ) ;   / /   ‰˘ñƒäµ  5 0 õZ?  
  
                 i f   ( e r r o r )   t h r o w   e r r o r ;  
  
                 i f   ( c o m m e n t s . l e n g t h   = = =   0 )   {  
                         l i s t E l . i n n e r H T M L   =   ' < d i v   c l a s s = " c o m m e n t s - e m p t y " > ? ©ØEÀ  ? ‰º? ? ? ? Å±1ø? ?   „˘? 0éI≥è3·o? ? c$ºÆBé≥mØ? ?   ? ? / d i v > ' ;  
                         r e t u r n ;  
                 }  
  
                 l i s t E l . i n n e r H T M L   =   c o m m e n t s . m a p ( c   = >   `  
             < d i v   c l a s s = " c o m m e n t - i t e m "   i d = " c o m m e n t - $ { c . i d } " >  
                 < d i v   c l a s s = " c o m m e n t - h e a d e r " >  
                     < s p a n   c l a s s = " c o m m e n t - a u t h o r " > $ { e s c a p e H t m l ( c . n i c k n a m e ) } < / s p a n >  
                     < s p a n   c l a s s = " c o m m e n t - d a t e " > $ { f o r m a t T i m e ( c . c r e a t e d _ a t ) } < / s p a n >  
                 < / d i v >  
                 < p   c l a s s = " c o m m e n t - t e x t " > $ { e s c a p e H t m l ( c . c o n t e n t ) } < / p >  
                 < b u t t o n   c l a s s = " c o m m e n t - d e l e t e - b t n "   o n c l i c k = " d e l e t e C o m m e n t ( ' $ { c . i d } ' ) " > ? ? #»< / b u t t o n >  
             < / d i v >  
         ` ) . j o i n ( ' ' ) ;  
  
         }   c a t c h   ( e r r )   {  
                 c o n s o l e . e r r o r ( ' E r r o r   l o a d i n g   c o m m e n t s : ' ,   e r r ) ;  
                 l i s t E l . i n n e r H T M L   =   ' < d i v   c l a s s = " c o m m e n t s - l o a d i n g " > ? ‰º? ? ? zêH≥-«? {1ó¥? ? ? }1c∂? I≥ø¥? H≥éµ.   ? ü¿< / d i v > ' ;  
         }  
 }  
  
 / /   X S S   €äy$? ? ? H T M L   ? ≥™¥3ÄÄ ? ≥=Ω  ? e$‘≤ 
 f u n c t i o n   e s c a p e H t m l ( u n s a f e )   {  
         r e t u r n   u n s a f e  
                 . r e p l a c e ( / & / g ,   " & a m p ; " )  
                 . r e p l a c e ( / < / g ,   " & l t ; " )  
                 . r e p l a c e ( / > / g ,   " & g t ; " )  
                 . r e p l a c e ( / " / g ,   " & q u o t ; " )  
                 . r e p l a c e ( / ' / g ,   " & # 0 3 9 ; " )  
                 . r e p l a c e ( / \ n / g ,   " < b r / > " ) ;  
 }  
  
 / /   ? ‰º?   ? EÆ	…? ¡∞π 
 a s y n c   f u n c t i o n   s u b m i t C o m m e n t ( e )   {  
         e . p r e v e n t D e f a u l t ( ) ;  
  
         c o n s t   n i c k n a m e E l   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' c o m m e n t - n i c k n a m e ' ) ;  
         c o n s t   p a s s w o r d E l   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' c o m m e n t - p a s s w o r d ' ) ;  
         c o n s t   c o n t e n t E l   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' c o m m e n t - c o n t e n t ' ) ;  
         c o n s t   s u b m i t B t n   =   d o c u m e n t . q u e r y S e l e c t o r ( ' . b t n - s u b m i t - c o m m e n t ' ) ;  
  
         c o n s t   n i c k n a m e   =   n i c k n a m e E l . v a l u e . t r i m ( ) ;  
         c o n s t   p a s s w o r d   =   p a s s w o r d E l . v a l u e . t r i m ( ) ;  
         c o n s t   c o n t e n t   =   c o n t e n t E l . v a l u e . t r i m ( ) ;  
  
         i f   ( ! n i c k n a m e   | |   ! p a s s w o r d   | |   ! c o n t e n t )   r e t u r n ;  
  
         s u b m i t B t n . d i s a b l e d   =   t r u e ;  
         s u b m i t B t n . t e x t C o n t e n t   =   ' ? EÆ	…  ÂN? . . ' ;  
  
         t r y   {  
                 c o n s t   {   e r r o r   }   =   a w a i t   s u p a b a s e  
                         . f r o m ( ' c o m m e n t s ' )  
                         . i n s e r t ( [  
                                 {   n i c k n a m e ,   p a s s w o r d ,   c o n t e n t   }  
                         ] ) ;  
  
                 i f   ( e r r o r )   t h r o w   e r r o r ;  
  
                 / /   ? CÆ¨∞  ? ? ? Ö∞0»  ? ? ÂsG≥∞π? ? €ä? ? H≥…(`é» ª 
                 c o n t e n t E l . v a l u e   =   ' ' ;  
                 p a s s w o r d E l . v a l u e   =   ' ' ;  
                 / /   ? 0¥UØ? ©Ø?   ? Ñ∫˝ƒ? ? ? é»?  
                 a w a i t   l o a d C o m m e n t s ( ) ;  
  
                 s h o w T o a s t ( ' ? †ª  ? ‰º? ? ? ? EÆ	…? ¡¿ø? ≥Ç¬! ' ) ;  
  
         }   c a t c h   ( e r r )   {  
                 c o n s o l e . e r r o r ( ' E r r o r   p o s t i n g   c o m m e n t : ' ,   e r r ) ;  
                 a l e r t ( ' ? ‰º?   ? EÆ	…? ? ? }1c∂? I≥ø¥? H≥éµ. ' ) ;  
         }   f i n a l l y   {  
                 s u b m i t B t n . d i s a b l e d   =   f a l s e ;  
                 s u b m i t B t n . t e x t C o n t e n t   =   ' ? EÆ	…' ;  
         }  
 }  
  
 / /   ? ‰º?   ? ? #»? ¡∞π 
 a s y n c   f u n c t i o n   d e l e t e C o m m e n t ( i d )   {  
         c o n s t   p w d   =   p r o m p t ( ' ? ‰º?   ? ? #»\t? ? ™ØPæ  nì®Ø? 0éJ≥«¿\t? ? Ö∞0»? ≥ˇ? Ñ∫Ç¬. ' ) ;  
         i f   ( p w d   = = =   n u l l )   r e t u r n ;   / /   Õue$¸∞  ? ®ØÎ  
         i f   ( p w d . t r i m ( )   = = =   ' ' )   {  
                 a l e r t ( ' nì®Ø? 0éJ≥«¿\t? ? Ö∞0»? ≥^æ  ? x$rµ? ? ' ) ;  
                 r e t u r n ;  
         }  
  
         t r y   {  
                 / /   Bé≥æ? ? ? ™ØPæ  ? ®Ø…? Ñ∫…ø? ? RvÒ¡?   ?  ≥¶µ  ? ‰º? ? ? nì®Ø? 0éJ≥«¿õZÄ   Õ˘å∆ó¥ﬁ˘Ä   pã‡¨v¬ 
                 c o n s t   {   d a t a ,   e r r o r   }   =   a w a i t   s u p a b a s e  
                         . f r o m ( ' c o m m e n t s ' )  
                         . s e l e c t ( ' p a s s w o r d ' )  
                         . e q ( ' i d ' ,   i d )  
                         . s i n g l e ( ) ;  
  
                 i f   ( e r r o r )   t h r o w   e r r o r ;  
  
                 i f   ( d a t a . p a s s w o r d   ! = =   p w d )   {  
                         a l e r t ( ' nì®Ø? 0éJ≥«¿õZÄ   ? Ò¡Ç“? ¡?   ? µø¥? H≥éµ.   ? ü¬' ) ;  
                         r e t u r n ;  
                 }  
  
                 / /   nì®Ø? 0éJ≥«¿õZÄ   Õ˘é∆]ƒŒ˘? ? ? #»  ? øΩÃÆ 
                 c o n s t   {   e r r o r :   d e l e t e E r r o r   }   =   a w a i t   s u p a b a s e  
                         . f r o m ( ' c o m m e n t s ' )  
                         . d e l e t e ( )  
                         . e q ( ' i d ' ,   i d ) ;  
  
                 i f   ( d e l e t e E r r o r )   t h r o w   d e l e t e E r r o r ;  
  
                 s h o w T o a s t ( ' ?  ø*b? ? ‰º? ? ? ? ? #»? ¡¿ø? Ï¥rµ? ? ' ) ;  
                 a w a i t   l o a d C o m m e n t s ( ) ;  
  
         }   c a t c h   ( e r r )   {  
                 c o n s o l e . e r r o r ( ' E r r o r   d e l e t i n g   c o m m e n t : ' ,   e r r ) ;  
                 a l e r t ( ' ? ? #»  „˘¡%  ÂN? ? {1ü õZÄ   €äñƒnÆ? I≥ø¥? H≥éµ. ' ) ;  
         }  
 }  
  
 / /   I n i t i a l i z e   c o m m e n t s   w h e n   r e s u l t   s c r e e n   s h o w s  
 c o n s t   o r i g i n a l S h o w S c r e e n   =   s h o w S c r e e n ;  
 s h o w S c r e e n   =   f u n c t i o n   ( i d )   {  
         o r i g i n a l S h o w S c r e e n ( i d ) ;  
         i f   ( i d   = = =   ' r e s u l t ' )   {  
                 l o a d C o m m e n t s ( ) ;  
         }  
 } ;  
 