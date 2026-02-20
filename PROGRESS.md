# 투자 유형 테스트 — 진행상황 (PROGRESS.md)

> 다른 AI 또는 개발자가 이 프로젝트를 이어받을 때 참고하는 문서입니다.
> 최종 업데이트: 2026-02-19

---

## 🗂️ 프로젝트 개요

**서비스명**: 나노바나나 — 투자 유형 테스트  
**목적**: 8문항으로 알아보는 투자 성격 유형 테스트 (12가지 결과)  
**배포**: GitHub Pages / Cloudflare Pages 예정  
**GitHub**: https://github.com/phm008/investment-type-test

### 파일 구조

```
investment-type-test/
├── index.html                  # SPA 메인. 3개 화면(시작/질문/결과) 포함
├── style.css                   # 전체 스타일. 캐주얼 코랄-오렌지 테마
├── data.js                     # 12유형 데이터, 8문항, 채점 로직(v3)
├── app.js                      # 상태관리, 화면 전환, i18n, 공유 기능
├── scripts/
│   └── evaluate-routing.js     # 65,536 루트 전수 검증 스크립트
├── memes/                      # 유형별 밈 이미지 폴더 (현재 비어 있음 → TODO)
│   ├── meme_01_pray.png
│   ├── meme_02_study.png
│   └── ... (12개 필요)
└── PROGRESS.md                 # 이 파일
```

---

## ✅ 완료된 작업

### 1. 기획 & 데이터 (`data.js`)
- 12가지 투자 유형 정의 (id, name, tagline, keywords, emoji, oppositeId)
- 6개 대립쌍(PAIRS) + "서로 만나면" 문구
- 8문항 + 선택지(4개씩) + 6개 축(A~F) 점수 매핑
- KR/EN 이중 언어 지원

### 2. 채점 엔진 v3 (공감도 개선)
- 기존 단순 규칙 기반 채점에서 **정규화 + 가중 선형 모델**로 교체
- `QUESTIONS` 기준 축 baseline 자동 계산 후 정규화 점수 사용
- 신규 함수 추가:
  - `computeTypeScores(scores)`
  - `rankTypes(scores)`
  - `getConfidence(scores)`
- `determineType(scores)`는 호환용 래퍼로 유지
- 문항 매핑 보정:
  - 기존 미세 조정 + `Q3/Q7/Q8` 문항/선지 리디자인
  - 중복 질문 축소 (정보원/손실반응 중복 완화)
- 분포 균형 미세 보정:
  - `04`, `08` 타입 score에 `*1.2` 가중 적용

### 3. UI/UX 업데이트

#### 시작/질문 화면
- 기존 캐주얼 UX 유지 (진행바, 자동 다음, 뒤로가기 점수 복원)

#### 결과 화면
- 기존 결과 카드 + 밈 프레임 + 정반대 유형 카드 유지
- **혼합형 결과 노출 추가**:
  - 주유형(1위), 보조유형(2위) 동시 표시
  - 신뢰도 배지(High/Medium/Low)
  - Low일 때 혼합형 안내 문구 표시
- URL 파라미터 `?type=07` 직접 진입은 유지
  - 점수 컨텍스트 없는 직접 진입에서는 혼합형 블록 숨김 처리

### 4. 소셜/공유
- 소셜 공유 5종 유지:
  - 카카오톡, X(Twitter), WhatsApp, Facebook, 링크복사

### 5. 자동 검증 체계 추가
- `scripts/evaluate-routing.js` 추가
- 검증 내용:
  - 65,536 루트 전수 검사
  - 타입 분포/동점률/margin 분포/타입별 단독 우승 횟수
  - 대표 시나리오 회귀 테스트
- 기준 미달 시 non-zero exit

### 6. 최신 검증 결과 (현재 브랜치 기준)
- 실행 명령: `node scripts/evaluate-routing.js`
- 결과:
  - 최대 타입 비중: **16.90%** (기준 <= 18%)
  - 최소 타입 비중: **3.65%** (기준 >= 3%)
  - 최상위 동점률: **0.34%** (기준 <= 5%)
  - 모든 타입 단독 1등 존재: **PASS**
  - `04` 단독 1등: **2536회**
  - 대표 시나리오 4종: **PASS**

### 7. 디자인 시스템
| 항목 | 값 |
|------|----|
| 폰트 | Jua (한국어 제목), Noto Sans KR (본문) |
| 주색상 | `#FF6B6B` (코랄) |
| 그라디언트 | `#FF6B6B → #FF9F43` (코랄→오렌지) |
| 배경 | `#FFF9F0` (크림) |
| 카드 | 흰색, `border-radius: 18px`, 그림자 |
| 레이아웃 | 모바일 우선, 최대 너비 480px |

### 8. Stitch UI 디자인 (Project ID: 2324556674708316857)
| 화면 | Screen ID |
|------|----------|
| 시작 화면 | `99a209770d13417599cb0482af47a4a2` |
| 질문 화면 | `f6f0d52ddd9d46cc926f09fbfe2870a6` |
| 결과 화면 | `818f08d4a9444117b3556eb125517b86` |

---

## ❌ 미완료 / TODO

### 🔴 최우선: 밈 이미지 생성
- **경로**: `memes/meme_01_pray.png` ~ `memes/meme_12_regret.png` (총 12개)
- **스타일**: 한국 웹툰 그림체, 심플, 유형별 상황 표현
- **현황**: 이미지 생성 AI 서버 포화로 미생성. 이미지 없어도 이모지 폴백으로 정상 동작함

| 파일명 | 유형 | 표현 제안 |
|--------|------|---------|
| `meme_01_pray.png` | 🙏 기도메타 | 두 손 모아 기도, 뒤에 하락 차트 |
| `meme_02_study.png` | 📚 공부만 A+ | 책 더미에 파묻힘, 기회 로켓이 날아감 |
| `meme_03_cut.png` | ✂️ 손절귀신 | 거대 가위 들고 조금만 떨어져도 잘라버림 |
| `meme_04_hold.png` | 🐾 반려 종목 | -50% 폰을 소중하게 안고 있음 |
| `meme_05_fomo.png` | 🏔️ 꼭대기 VIP | 산 정상에서 "드디어 탔다!" + 즉시 폭락 |
| `meme_06_chart.png` | 🕯️ 봉차트도사 | 캔들차트 뚫어지게 응시, 뉴스 무시 |
| `meme_07_revenge.png` | 😤 복수매매왕 | 분노 상태로 키보드 연타, 눈물 |
| `meme_08_dip.png` | 💧 물만 타다 파산 | 계속 물타기, 밑 빠진 독에 물붓기 표현 |
| `meme_09_blind.png` | 🙈 슈뢰딩거 계좌 | 눈 가리고 앱 삭제, "안 보면 안 잃은 거야" |
| `meme_10_allin.png` | 🎰 시드 올인러 | 카지노 칩 전부 한 종목에 올인 |
| `meme_11_diverse.png` | 🏪 종목 다이소 | 47개 쪼개진 계좌, 편의점처럼 알록달록 |
| `meme_12_regret.png` | 😢 껄무새 | "살 껄... 팔 껄..." 되새기며 울고 있음 |

### 🟡 선택사항
- [ ] **카카오 공유 SDK 연동**: 배포 후 도메인 확정되면 Kakao Developers에서 앱 등록 → 썸네일+버튼 있는 공유 카드 구현
- [ ] **Google AdSense 연동**: `index.html`의 `<!-- 광고 자리 -->` 주석 위치에 `<ins class="adsbygoogle">` 코드 삽입
- [ ] **OG 이미지 생성**: 공유 시 썸네일로 표시될 og:image 메타 태그 추가 (유형별 or 공통 1장)
- [ ] **GA4(Google Analytics) 연동**: 유입 경로, 이탈율, 유형별 분포 추적
- [ ] **실사용자 피드백 수집**: 표본 30~50명으로 체감 공감도 조사 후 질문/가중치 미세 튜닝

---

## 🔧 로컬 실행 방법

별도 빌드 없음. `index.html`을 Chrome에서 직접 열면 실행됩니다.

```
c:\Users\hyung\.gemini\antigravity\scratch\investment-type-test\index.html
```

채점 품질 검증:

```
node scripts/evaluate-routing.js
```

---

## 📦 Git / 배포

- **안정 브랜치**: `main`
- **작업 브랜치(현재)**: `feature/scoring-rebalance-v2`
- **원격 반영 상태**: `origin/feature/scoring-rebalance-v2` 푸시 완료
- **최근 커밋**:
  - `75cd230` feat: refine question set and rebalance type weights
  - `26340d0` feat: rebalance scoring and add confidence-based dual result
- **PR 링크**: https://github.com/phm008/investment-type-test/pull/new/feature/scoring-rebalance-v2
- **배포 플랫폼**: Cloudflare Pages (예정)
- **빌드 설정**: 빌드 명령어 없음(정적 파일), 루트 디렉토리 `/`

---

## 💬 대화 이력

이 프로젝트는 Antigravity AI와 나노바나나 팀이 여러 차례 대화를 통해 진행했습니다.

- **1차 대화** (`796884cc`): 기획안 기반 초기 구현 (다크/골드 프리미엄 테마, 12유형 채점 로직)
- **2차 대화** (`da4c2d1d`): 캐주얼/밈 스타일 전면 리디자인, 공유 기능 5종, 정반대 유형 섹션 추가
- **3차 대화** (`26340d0`): 채점 엔진 v3, 상위 2유형/신뢰도 UI, 전수검증 스크립트 도입
- **4차 대화** (`75cd230`): `Q3/Q7/Q8` 질문 리디자인 + 분포 균형 가중치 미세 조정
- **5차 대화 (최근 작업)**: 
  - **시작 화면 개선**: 타이틀, 서브타이틀 텍스트("숨겨진 나의 투자 유형 찾아보기") 및 예상 소요시간(3분) 변경. 만화적 말풍선 UI 컨테이너 추가.
  - **이미지 적용**: 한국 일상웹툰 스타일의 심플하고 귀여운 직장인 캐릭터(좌절/기도 연출) 생성 후 메인 그래픽으로 적용.
  - **댓글/방명록 추가**: 회원가입 없는 하단 익명 방명록(닉네임, 내용, 삭제용 비밀번호) UI 구현 및 Supabase Database 연동 (조회, 등록, 비밀번호 대조 후 삭제 기능 완성).
  - **발생한 문제 및 해결(Troubleshooting)**: PowerShell을 통한 스크립트(`>>`) 문자열 추가 시 UTF-16 및 UTF-8 인코딩이 혼용되어 `app.js`, `style.css` 에 구문 오류(SyntaxError, 잘못된 줄바꿈 `\n`) 발생. 배포 시 프론트엔드 브레이킹 에러를 유발함. 이를 해결하기 위해 git reset 후 Node.js의 fs.readFileSync / replace 기반 스크립트를 거쳐 UTF-8 포맷으로 안전하게 코드를 재생성 및 반영 중.
