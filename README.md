# Daily Helper (일상의도움) 📱

> **"당신의 삶을 풍요롭게 합니다" (Enriching Your Daily Life)**  
> 검증된 안드로이드 네이티브 앱 및 유용한 일상 도구를 큐레이션하여 소개하고 다운로드와 상세 가이드를 제공하는 모던 웹 포털입니다.  
> 🌐 **공식 웹 포털:** [https://www.dailyhelperhub.com](https://www.dailyhelperhub.com)

---

## 📂 카테고리 구성 (Categories)

웹사이트 메인 필터 및 애플리케이션 분류는 아래 5개 핵심 카테고리로 구성되어 있으며, 다국어(한국어/영어) 및 실시간 필터링을 지원합니다:

| 카테고리 ID | 한글 명칭 (KO) | 영문 명칭 (EN) | 설명 |
| :--- | :--- | :--- | :--- |
| `all` | **전체** | **All** | 등록된 모든 애플리케이션 표시 |
| `tools` | **도구/업무** | **Tools & Work** | 작업 효율과 업무 생산성을 높이는 스마트 도구 |
| `utility` | **유틸리티** | **Utility** | 기기 및 생활 편의 관리를 돕는 필수 유틸리티 |
| `daily` | **일상/일정** | **Daily & Routine** | 습관, 루틴, 시간, D-Day 등 일상 관리 앱 |
| `games` | **게임** | **Games** | 두뇌 훈련, 캐주얼, 퀴즈 및 엔터테인먼트 게임 |

---

## 🌟 최근 UI/UX 개선 내역 (Latest Updates)

- **카테고리 탭 개편 ('게임 / Games')**
  - 기존 '키즈/퀴즈' 카테고리를 직관적인 **'게임(Games)'**으로 개편하여 다양한 플레이 콘텐츠 수용
  - 카테고리 필터링 내부 키값(`games`/`game`) 및 i18n 번역 딕셔너리 동기화
- **콤팩트 & 고대비 Hero 배너**
  - 배너 높이를 콤팩트하게 압축하여 접속 즉시 앱 목록 탐색 가능
  - 그라디언트 뱃지 키워드 및 고대비 타이포그래피로 시인성 대폭 개선
- **다크 모드 / 라이트 모드 (Theme)**
  - 원클릭 테마 전환 (시스템 설정 및 LocalStorage 연동)
  - 다크/라이트 모드 전반의 카드 보더 및 배경 대비를 강화하여 최적의 가독성 유지
- **앱 사용 가이드 (App Guide) & 서브탭**
  - 앱별 핵심 기능과 실전 꿀팁을 안내하는 전용 가이드 섹션 구축
  - 향후 신규 앱 확장을 지원하는 앱 선택 서브탭 시스템 및 '준비 중' 안내 반영
- **상세 정보 모달 & 스마트폰 목업 뷰어**
  - 상세 스펙, 버전 정보, 요구 사양 및 실제 스마트폰 목업 스크린샷 뷰어 탑재
  - Google Play 스토어 다운로드 다이렉트 링크 제공
- **실시간 다국어(i18n) 지원**
  - 한국어(KO) 및 영어(EN) 원터치 실시간 전환 (모든 텍스트, 카테고리, 뱃지 동기화)
- **광고 영역 최적화 (Clean Layout)**
  - 불필요한 배너를 제거하고 페이지 하단에 규격화된 단일 슬롯(728x90)으로 통합 배치
- **SEO & 웹 표준 최적화**
  - 검색 엔진 및 AI 크롤러 지침이 포함된 `robots.txt`, `sitemap.xml`
  - `SoftwareApplication` Schema.org 구조화 데이터 마크업 및 공식 도메인(`dailyhelperhub.com`) 반영
  - Google AdMob `app-ads.txt` 정적 라우팅 완비

---

## 📱 앱 라인업 (Apps & Utilities)

### 1. TimeKeeper (타임키퍼) `[정식 서비스 중]`
- **분류:** 일상/일정 (`daily`)
- **개요:** 복잡한 회원가입 없이 오프라인에서도 즉시 동작하는 스마트 루틴 & 습관 관리 도구
- **주요 기능:**
  - 맞춤형 루틴 및 일정 등록, 정확한 정밀 알림 지원
  - 직관적인 집중 타이머 & 스톱워치 기능
  - 일일/주간 시간 활용 통계 시각화 및 루틴 달성 스트릭
- **플랫폼:** Android Native App ([Google Play Store](https://play.google.com/store/apps/details?id=com.wgapps.timekeeper))

### 2. DayCount `[Coming Soon]`
- **분류:** 일상/일정 (`daily`)
- **개요:** 소중한 기념일, 시험, 여행 등의 D-Day를 실시간 카운트다운으로 관리하는 디데이 도구

### 3. ClipFlow `[Coming Soon]`
- **분류:** 도구/업무 (`tools`)
- **개요:** 자주 쓰는 문구, 서식 템플릿을 스마트하게 저장하고 원터치로 복사하는 클립보드 매니저

### 4. FreshCue `[Coming Soon]`
- **분류:** 유틸리티 (`utility`)
- **개요:** 냉장고 속 식자재와 소모품의 소비기한과 신선도를 똑똑하게 챙겨주는 알림 도우미

---

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend:** Vanilla HTML5, Modern CSS3, JavaScript (ES6+)
- **Architecture:** Static Jamstack (JSON 기반 비동기 데이터 로딩 구조)
- **Deployment & Hosting:** Vercel
- **Domain:** [https://www.dailyhelperhub.com](https://www.dailyhelperhub.com)
- **Developer / Publisher:** WG Apps Studio

---

## 🚀 로컬 실행 방법 (Run Locally)

정적 웹 서버(VSCode Live Server, Python http.server 등)를 통해 간편하게 실행할 수 있습니다:

```bash
# Python 3 내장 서버 실행
python -m http.server 8080

# 브라우저 접속
# http://localhost:8080
```
또는 프로젝트 루트의 `run_server.bat`을 실행하세요.
