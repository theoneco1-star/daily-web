/**
 * Daily Helper (일상의도움) — i18n Translation Dictionary
 * Supports: Korean (ko), English (en)
 */
const translations = {
  ko: {
    brand: "일상의도움",
    slogan: "당신의 삶을 풍요롭게 합니다",
    nav: { home: "홈", about: "소개", privacy: "개인정보처리방침", terms: "이용약관", contact: "문의하기", backToHome: "← 홈으로", guide: "앱 가이드" },
    hero: {
      title: "일상을 더 스마트하게",
      titlePrefix: "일상을 더",
      titleHighlight: "스마트하게",
      subtitle: "검증된 안드로이드 앱과 유용한 도구로 당신의 하루를 업그레이드하세요.",
      searchPlaceholder: "앱 이름 또는 기능으로 검색...",
      totalApps: "개의 앱",
      resultsFound: "개 검색됨",
    },
    categories: { all: "전체", tools: "도구/업무", utility: "유틸리티", daily: "일상/일정", games: "게임", game: "게임" },
    card: { detailBtn: "상세보기 & 다운로드", freeTag: "무료", newTag: "신규", featuredTag: "추천", comingSoonBadge: "준비중", comingSoonBtn: "출시 예정" },
    modal: {
      close: "닫기", downloadBtn: "Google Play에서 다운로드",
      features: "주요 기능", guide: "사용 가이드 & 꿀팁", versionInfo: "버전 정보",
      version: "버전", updated: "최종 업데이트", size: "앱 크기",
      requires: "최소 요구 사양", developer: "개발사", screenshots: "스크린샷", noScreenshots: "스크린샷 준비 중입니다.",
    },
    ad: { label: "광고" },
    appGuideText: "📖 앱 가이드",
    badge: {
      guide: "📖 앱 가이드 →",
    },
    guide: {
      mainTitle: "앱 사용 가이드",
      mainSubtitle: "일상의도움에서 제공하는 앱별 핵심 기능과 상세 활용 팁을 확인해보세요.",
      tabComingSoon: "준비 중",
      comingSoonNotice: "현재 구글 플레이 출시 준비 중입니다. 정식 출시 후 상세 가이드가 업데이트됩니다.",
      timekeeper: {
        title: "TimeKeeper (타임키퍼) - 나만의 스마트 루틴 & 습관 관리",
        appName: "TimeKeeper (타임키퍼) - 나만의 스마트 루틴 & 습관 관리",
        overview: "TimeKeeper는 본인만의 맞춤형 루틴을 등록하고 원하는 시간과 주기에 맞춰 정확한 알림을 받아볼 수 있는 안드로이드 시간·습관 관리 도구입니다. 복잡한 가입 없이 오프라인에서도 완벽하게 동작하며, 하루의 달성률을 한눈에 시각화해 줍니다.",
        featuresTitle: "핵심 기능",
        features: [
          { title: "맞춤형 루틴 및 정밀 주기 설정", desc: "매일, 평일, 주말 또는 월~일 특정 요일을 자유롭게 선택하여 AM/PM 원하는 시각에 루틴 알림을 세팅할 수 있습니다." },
          { title: "직관적인 아이콘 & 루틴 관리", desc: "약 먹기, 물 마시기, 산책, 독서, 명상 등 다양한 감성 이모지 아이콘으로 루틴을 직관적으로 분류하고 생성합니다." },
          { title: "연속 달성 스트릭(Streak) & 대시보드", desc: "당일 달성률(%) 프로그레스 바와 함께 '연속 달성 스트릭(불꽃 카운트)'을 제공하여 매일 습관을 이어가는 동기를 부여합니다." },
          { title: "인앱 타이머 & 스톱워치 탑재", desc: "루틴 카드마다 스톱워치 기능이 연동되어 있어 독서, 운동 등 집중 시간이 필요한 루틴을 실시간으로 측정할 수 있습니다." },
          { title: "라이프스타일 맞춤 리셋 시각 설정", desc: "기본 새벽 04:00 등 하루가 리셋되는 기준 시각을 사용자가 직접 변경할 수 있어 밤샘 작업자나 교대근무자도 끊김 없이 관리할 수 있습니다." },
          { title: "철저한 개인정보 보호 및 데이터 관리", desc: "외부 서버로 데이터를 전송하지 않고 기기 내 로컬(Local)에만 안전하게 저장되며, JSON 백업 및 복원을 간편하게 지원합니다." },
          { title: "다크 모드 & 다국어 완벽 지원", desc: "눈이 편안한 다크 모드/라이트 모드 테마와 한국어/영어 인터페이스를 기본 제공합니다." }
        ],
        quickGuideTitle: "간단 사용 가이드",
        quickGuide: [
          "메인 화면의 `+ 루틴 추가` 버튼을 누릅니다.",
          "이모지 아이콘을 고르고 루틴 이름(예: 아침 약 먹기)을 입력합니다.",
          "알림을 받을 시각(AM/PM)과 반복 주기(매일/특정 요일)를 선택한 후 `저장`을 누릅니다.",
          "알림 시간에 맞춰 활동을 진행하고, 스톱워치가 필요하다면 시계 아이콘을 눌러 집중 시간을 측정합니다.",
          "실천 완료 후 `Check`를 누르면 상단 대시보드의 달성률(%)과 연속 달성 스트릭이 갱신됩니다."
        ],
        openDetailBtn: "TimeKeeper 앱 상세 정보",
        body: `<div class="guide-lead-box p-4 rounded-xl mb-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60"><h3 class="text-base font-bold text-slate-800 dark:text-slate-100 mb-2" style="margin-top:0;">앱 개요</h3><p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-0">TimeKeeper는 본인만의 맞춤형 루틴을 등록하고 원하는 시간과 주기에 맞춰 정확한 알림을 받아볼 수 있는 안드로이드 시간·습관 관리 도구입니다. 복잡한 가입 없이 오프라인에서도 완벽하게 동작하며, 하루의 달성률을 한눈에 시각화해 줍니다.</p></div><h3 class="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-4 flex items-center gap-2"><span class="w-2 h-5 rounded bg-indigo-600 inline-block"></span>핵심 기능</h3><ul class="guide-feature-list space-y-3 mb-8"><li class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><strong class="text-indigo-600 dark:text-indigo-400 block mb-1">1. 맞춤형 루틴 및 정밀 주기 설정:</strong><span class="text-slate-600 dark:text-slate-300">매일, 평일, 주말 또는 월~일 특정 요일을 자유롭게 선택하여 AM/PM 원하는 시각에 루틴 알림을 세팅할 수 있습니다.</span></li><li class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><strong class="text-indigo-600 dark:text-indigo-400 block mb-1">2. 직관적인 아이콘 &amp; 루틴 관리:</strong><span class="text-slate-600 dark:text-slate-300">약 먹기, 물 마시기, 산책, 독서, 명상 등 다양한 감성 이모지 아이콘으로 루틴을 직관적으로 분류하고 생성합니다.</span></li><li class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><strong class="text-indigo-600 dark:text-indigo-400 block mb-1">3. 연속 달성 스트릭(Streak) &amp; 대시보드:</strong><span class="text-slate-600 dark:text-slate-300">당일 달성률(%) 프로그레스 바와 함께 '연속 달성 스트릭(불꽃 카운트)'을 제공하여 매일 습관을 이어가는 동기를 부여합니다.</span></li><li class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><strong class="text-indigo-600 dark:text-indigo-400 block mb-1">4. 인앱 타이머 &amp; 스톱워치 탑재:</strong><span class="text-slate-600 dark:text-slate-300">루틴 카드마다 스톱워치 기능이 연동되어 있어 독서, 운동 등 집중 시간이 필요한 루틴을 실시간으로 측정할 수 있습니다.</span></li><li class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><strong class="text-indigo-600 dark:text-indigo-400 block mb-1">5. 라이프스타일 맞춤 리셋 시각 설정:</strong><span class="text-slate-600 dark:text-slate-300">기본 새벽 04:00 등 하루가 리셋되는 기준 시각을 사용자가 직접 변경할 수 있어 밤샘 작업자나 교대근무자도 끊김 없이 관리할 수 있습니다.</span></li><li class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><strong class="text-indigo-600 dark:text-indigo-400 block mb-1">6. 철저한 개인정보 보호 및 데이터 관리:</strong><span class="text-slate-600 dark:text-slate-300">외부 서버로 데이터를 전송하지 않고 기기 내 로컬(Local)에만 안전하게 저장되며, JSON 백업 및 복원을 간편하게 지원합니다.</span></li><li class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><strong class="text-indigo-600 dark:text-indigo-400 block mb-1">7. 다크 모드 &amp; 다국어 완벽 지원:</strong><span class="text-slate-600 dark:text-slate-300">눈이 편안한 다크 모드/라이트 모드 테마와 한국어/영어 인터페이스를 기본 제공합니다.</span></li></ul><h3 class="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-4 flex items-center gap-2"><span class="w-2 h-5 rounded bg-indigo-600 inline-block"></span>간단 사용 가이드</h3><ol class="guide-steps-list space-y-3 mb-8"><li class="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><span class="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span><span class="text-slate-700 dark:text-slate-200">메인 화면의 <code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-mono text-sm">+ 루틴 추가</code> 버튼을 누릅니다.</span></li><li class="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><span class="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span><span class="text-slate-700 dark:text-slate-200">이모지 아이콘을 고르고 루틴 이름(예: 아침 약 먹기)을 입력합니다.</span></li><li class="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><span class="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span><span class="text-slate-700 dark:text-slate-200">알림을 받을 시각(AM/PM)과 반복 주기(매일/특정 요일)를 선택한 후 <code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-mono text-sm">저장</code>을 누릅니다.</span></li><li class="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><span class="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">4</span><span class="text-slate-700 dark:text-slate-200">알림 시간에 맞춰 활동을 진행하고, 스톱워치가 필요하다면 시계 아이콘을 눌러 집중 시간을 측정합니다.</span></li><li class="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><span class="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">5</span><span class="text-slate-700 dark:text-slate-200">실천 완료 후 <code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-mono text-sm">Check</code>를 누르면 상단 대시보드의 달성률(%)과 연속 달성 스트릭이 갱신됩니다.</span></li></ol>`
      },
      daycount: {
        title: "DayCount",
        appName: "DayCount",
        subtitle: "소중한 기념일과 목표를 직관적으로 관리하는 스마트 D-Day 카운터",
        overview: "소중한 기념일과 목표를 직관적으로 관리하는 스마트 D-Day 카운터",
        featuresTitle: "주요 핵심 기능",
        features: [
          { title: "직관적인 카드 뷰", desc: "시험, 생일, 기념일 등 다가오는 일정을 깔끔한 카드 형태로 한눈에 확인" },
          { title: "맞춤 카테고리 분류", desc: "시험 / 기념일 / 생일 / 여행 등 목적별로 자유롭게 그룹화하여 체계적 관리" },
          { title: "스마트 정렬 & 로컬 보안", desc: "남은 날짜순 및 생성순 정렬 지원, 외부 유출 없이 기기 내 안전한 데이터 보관" }
        ],
        quickGuideTitle: "3단계 간편 사용법",
        quickGuide: [
          "STEP 1. 일정 등록: 우측 하단 '+' 버튼을 눌러 목표일과 타이틀을 입력합니다.",
          "STEP 2. 카테고리 지정: 목적에 맞는 카테고리 태그를 선택하여 목록을 정리합니다.",
          "STEP 3. D-Day 확인 & 관리: 남은 날짜순으로 자동 정렬된 카드를 통해 디데이를 편리하게 확인합니다."
        ],
        tipTitle: "활용 팁",
        tipContent: "시험일이나 기념일이 여러 개일 때는 '가까운 일정순' 정렬을 활용해 보세요. 놓치기 쉬운 주요 일정을 우선순위로 빠르게 파악할 수 있습니다.",
        openDetailBtn: "DayCount 상세정보",
        body: `<div class="guide-header-hero mb-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-rose-500/10 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-rose-950/30 border border-amber-200/80 dark:border-amber-700/50 shadow-sm">
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
    <div class="flex items-start md:items-center gap-4">
      <div class="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-3xl md:text-4xl shadow-lg shadow-orange-500/25 shrink-0 border border-white/20">
        📅
      </div>
      <div>
        <div class="flex items-center gap-2.5 flex-wrap">
          <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">DayCount</h2>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border border-amber-200 dark:border-amber-700/60">
            v1.0.3 정식 지원
          </span>
        </div>
        <p class="text-slate-600 dark:text-slate-300 text-sm md:text-base mt-2 leading-relaxed max-w-xl">
          소중한 기념일과 목표를 직관적으로 관리하는 스마트 D-Day 카운터
        </p>
      </div>
    </div>
    <div class="flex items-center gap-3 flex-wrap sm:flex-nowrap shrink-0">
      <a href="https://play.google.com/store/apps/details?id=com.wgapps.daycount" target="_blank" rel="noopener noreferrer" class="guide-cta-download-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 shadow-md shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.61-1.424V3.238c0-.555.228-1.056.609-1.424zM15.207 13.414l2.76-2.76-13.358-7.712 10.598 10.472zm2.76-4.068l2.973 1.716c.866.5.866 1.317 0 1.818l-2.973 1.716-2.227-2.227 2.227-3.023zm-2.76 5.482L4.609 25.302l13.358-7.712-2.76-2.76z" transform="scale(0.85) translate(2, 2)"/></svg>
        <span>구글 플레이에서 다운로드</span>
      </a>
      <button type="button" onclick="showPage('main')" class="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 hover:-translate-y-0.5 active:translate-y-0 shadow-sm transition-all duration-200">
        <span>← 홈으로</span>
      </button>
    </div>
  </div>
</div>

<h3 class="text-lg md:text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4 flex items-center gap-2.5">
  <span class="w-2.5 h-6 rounded-full bg-gradient-to-b from-amber-500 to-rose-500 inline-block"></span>
  <span>주요 핵심 기능</span>
</h3>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
  <div class="p-5 rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
    <div>
      <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl mb-3">
        📌
      </div>
      <h4 class="font-bold text-base text-slate-900 dark:text-white mb-2">직관적인 카드 뷰</h4>
      <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        시험, 생일, 기념일 등 다가오는 일정을 깔끔한 카드 형태로 한눈에 확인
      </p>
    </div>
  </div>
  <div class="p-5 rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
    <div>
      <div class="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xl mb-3">
        🏷️
      </div>
      <h4 class="font-bold text-base text-slate-900 dark:text-white mb-2">맞춤 카테고리 분류</h4>
      <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        시험 / 기념일 / 생일 / 여행 등 목적별로 자유롭게 그룹화하여 체계적 관리
      </p>
    </div>
  </div>
  <div class="p-5 rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
    <div>
      <div class="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xl mb-3">
        ⏱️
      </div>
      <h4 class="font-bold text-base text-slate-900 dark:text-white mb-2">스마트 정렬 &amp; 로컬 보안</h4>
      <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        남은 날짜순 및 생성순 정렬 지원, 외부 유출 없이 기기 내 안전한 데이터 보관
      </p>
    </div>
  </div>
</div>

<h3 class="text-lg md:text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4 flex items-center gap-2.5">
  <span class="w-2.5 h-6 rounded-full bg-gradient-to-b from-amber-500 to-rose-500 inline-block"></span>
  <span>3단계 간편 사용법</span>
</h3>
<ol class="guide-steps-list space-y-3.5 mb-8">
  <li class="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/50 hover:border-amber-300 dark:hover:border-amber-700 transition-all">
    <span class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-extrabold tracking-wide shrink-0 mt-0.5 shadow-sm">
      STEP 1
    </span>
    <div class="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed">
      <strong class="text-slate-900 dark:text-white font-semibold mr-1.5">일정 등록:</strong>
      우측 하단 <code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-orange-600 dark:text-orange-400 font-mono text-xs font-bold">+</code> 버튼을 눌러 목표일과 타이틀을 입력합니다.
    </div>
  </li>
  <li class="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/50 hover:border-amber-300 dark:hover:border-amber-700 transition-all">
    <span class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-extrabold tracking-wide shrink-0 mt-0.5 shadow-sm">
      STEP 2
    </span>
    <div class="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed">
      <strong class="text-slate-900 dark:text-white font-semibold mr-1.5">카테고리 지정:</strong>
      목적에 맞는 카테고리 태그를 선택하여 목록을 정리합니다.
    </div>
  </li>
  <li class="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/50 hover:border-amber-300 dark:hover:border-amber-700 transition-all">
    <span class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-extrabold tracking-wide shrink-0 mt-0.5 shadow-sm">
      STEP 3
    </span>
    <div class="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed">
      <strong class="text-slate-900 dark:text-white font-semibold mr-1.5">D-Day 확인 &amp; 관리:</strong>
      남은 날짜순으로 자동 정렬된 카드를 통해 디데이를 편리하게 확인합니다.
    </div>
  </li>
</ol>

<div class="p-4 md:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-amber-950/20 border-l-4 border-amber-500 border-t border-r border-b border-amber-200/80 dark:border-amber-700/50 shadow-sm mb-8">
  <div class="flex items-start gap-3">
    <span class="text-2xl shrink-0 mt-0.5">💡</span>
    <div>
      <h4 class="text-sm font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wide mb-1">
        활용 팁 (Tip)
      </h4>
      <p class="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed font-medium">
        "시험일이나 기념일이 여러 개일 때는 <strong>'가까운 일정순'</strong> 정렬을 활용해 보세요. 놓치기 쉬운 주요 일정을 우선순위로 빠르게 파악할 수 있습니다."
      </p>
    </div>
  </div>
</div>

<div class="flex items-center gap-3 mt-8 flex-wrap pt-6 border-t border-slate-200 dark:border-slate-800">
  <button type="button" onclick="showPage('main')" class="detail-btn" style="max-width:200px;">
    ← 홈으로
  </button>
  <a href="https://play.google.com/store/apps/details?id=com.wgapps.daycount" target="_blank" rel="noopener noreferrer" class="detail-btn" style="max-width:260px; background: linear-gradient(135deg, #f59e0b, #ef4444); color: white; border: none; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
    <span>구글 플레이에서 다운로드</span> ↗
  </a>
  <button type="button" onclick="openModal('daycount')" class="detail-btn" style="max-width:220px; background: rgba(248, 250, 252, 0.9); border: 1px solid #cbd5e1;">
    📅 <span>DayCount 상세정보</span>
  </button>
</div>`
      },
      bookspot: {
        title: "BookSpot (책 쏙쏙)",
        appName: "BookSpot (책 쏙쏙)",
        subtitle: "말하듯 쉽게 등록하고 한눈에 찾는 우리 집 스마트 서재 관리 도구",
        overview: "우리 집 책장 구역별 도서 보관부터 음성 인식 초고속 등록까지, 스마트한 온디바이스 도서 정리 도구",
        featuresTitle: "주요 핵심 기능",
        features: [
          { title: "구역별 맞춤 보관함", desc: "거실 책장, 아이 방, 서재 등 구역을 자유롭게 생성하고 책 권수 한눈에 확인" },
          { title: "음성 인식 & 초고속 입력", desc: "마이크를 켜고 책 제목을 말하기만 하면 타이핑 없이 즉시 리스트업" },
          { title: "초성/키워드 고속 검색", desc: "\"ㄱㅅ\"만 쳐도 관련 도서와 보관된 책장 단수를 1초 만에 확인" }
        ],
        quickGuideTitle: "3단계 간편 사용법",
        quickGuide: [
          "STEP 1. 보관 구역 추가: '+' 버튼으로 도서를 보관할 책장이나 서랍 구역을 생성합니다.",
          "STEP 2. 음성으로 책 등록: 등록할 구역을 선택하고 마이크 음성이나 키보드로 책 제목을 빠르게 추가합니다.",
          "STEP 3. 위치 검색 & 완독 관리: 찾고 싶은 책을 제목이나 초성으로 검색해 어느 책장에 꽂혀 있는지 즉시 확인합니다."
        ],
        tipTitle: "활용 팁",
        tipContent: "도서 정리 시 '거실 책장 1단', '2단'처럼 층별로 구역명을 세분화해 두면 나중에 책을 꺼낼 때 헤매지 않고 바로 찾을 수 있습니다.",
        openDetailBtn: "BookSpot 상세정보",
        body: `<div class="guide-header-hero mb-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-green-500/10 dark:from-teal-950/40 dark:via-emerald-950/30 dark:to-green-950/30 border border-teal-200/80 dark:border-teal-700/50 shadow-sm">
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
    <div class="flex items-start md:items-center gap-4">
      <div class="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-teal-600 via-emerald-500 to-green-600 flex items-center justify-center text-3xl md:text-4xl shadow-lg shadow-teal-500/25 shrink-0 border border-white/20">
        📚
      </div>
      <div>
        <div class="flex items-center gap-2.5 flex-wrap">
          <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">BookSpot (책 쏙쏙)</h2>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300 border border-teal-200 dark:border-teal-700/60">
            v1.0.0 온디바이스 지원
          </span>
        </div>
        <p class="text-slate-600 dark:text-slate-300 text-sm md:text-base mt-2 leading-relaxed max-w-xl">
          말하듯 쉽게 등록하고 한눈에 찾는 우리 집 스마트 서재 관리 도구
        </p>
      </div>
    </div>
    <div class="flex items-center gap-3 flex-wrap sm:flex-nowrap shrink-0">
      <a href="javascript:void(0)" onclick="alert(currentLang === 'ko' ? '현재 구글 플레이 스토어 심사 및 출시 준비 중입니다. 곧 다운로드가 제공될 예정입니다!' : 'Google Play release is currently in preparation. Coming soon!');" class="guide-cta-download-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-600 via-emerald-500 to-green-600 hover:from-teal-700 hover:to-green-700 shadow-md shadow-teal-500/30 hover:shadow-lg hover:shadow-teal-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
        <span class="text-base">⏳</span>
        <span>Google Play 출시 예정</span>
      </a>
      <button type="button" onclick="showPage('main')" class="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 hover:-translate-y-0.5 active:translate-y-0 shadow-sm transition-all duration-200">
        <span>← 홈으로</span>
      </button>
    </div>
  </div>
</div>

<h3 class="text-lg md:text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4 flex items-center gap-2.5">
  <span class="w-2.5 h-6 rounded-full bg-gradient-to-b from-teal-500 to-emerald-500 inline-block"></span>
  <span>주요 핵심 기능</span>
</h3>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
  <div class="p-5 rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
    <div>
      <div class="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xl mb-3">
        🗄️
      </div>
      <h4 class="font-bold text-base text-slate-900 dark:text-white mb-2">구역별 맞춤 보관함</h4>
      <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        거실 책장, 아이 방, 서재 등 구역을 자유롭게 생성하고 책 권수 한눈에 확인
      </p>
    </div>
  </div>
  <div class="p-5 rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
    <div>
      <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl mb-3">
        🎙️
      </div>
      <h4 class="font-bold text-base text-slate-900 dark:text-white mb-2">음성 인식 &amp; 초고속 입력</h4>
      <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        마이크를 켜고 책 제목을 말하기만 하면 타이핑 없이 즉시 리스트업
      </p>
    </div>
  </div>
  <div class="p-5 rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
    <div>
      <div class="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-950/80 text-green-600 dark:text-green-400 flex items-center justify-center text-xl mb-3">
        🔍
      </div>
      <h4 class="font-bold text-base text-slate-900 dark:text-white mb-2">초성/키워드 고속 검색</h4>
      <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        "ㄱㅅ"만 쳐도 관련 도서와 보관된 책장 단수를 1초 만에 확인
      </p>
    </div>
  </div>
</div>

<h3 class="text-lg md:text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4 flex items-center gap-2.5">
  <span class="w-2.5 h-6 rounded-full bg-gradient-to-b from-teal-500 to-emerald-500 inline-block"></span>
  <span>3단계 간편 사용법</span>
</h3>
<ol class="guide-steps-list space-y-3.5 mb-8">
  <li class="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/50 hover:border-teal-300 dark:hover:border-teal-700 transition-all">
    <span class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 text-white text-xs font-extrabold tracking-wide shrink-0 mt-0.5 shadow-sm">
      STEP 1
    </span>
    <div class="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed">
      <strong class="text-slate-900 dark:text-white font-semibold mr-1.5">보관 구역 추가:</strong>
      <code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-teal-600 dark:text-teal-400 font-mono text-xs font-bold">+</code> 버튼으로 도서를 보관할 책장이나 서랍 구역을 생성합니다.
    </div>
  </li>
  <li class="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/50 hover:border-teal-300 dark:hover:border-teal-700 transition-all">
    <span class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 text-white text-xs font-extrabold tracking-wide shrink-0 mt-0.5 shadow-sm">
      STEP 2
    </span>
    <div class="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed">
      <strong class="text-slate-900 dark:text-white font-semibold mr-1.5">음성으로 책 등록:</strong>
      등록할 구역을 선택하고 마이크 음성이나 키보드로 책 제목을 빠르게 추가합니다.
    </div>
  </li>
  <li class="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/50 hover:border-teal-300 dark:hover:border-teal-700 transition-all">
    <span class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 text-white text-xs font-extrabold tracking-wide shrink-0 mt-0.5 shadow-sm">
      STEP 3
    </span>
    <div class="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed">
      <strong class="text-slate-900 dark:text-white font-semibold mr-1.5">위치 검색 &amp; 완독 관리:</strong>
      찾고 싶은 책을 제목이나 초성으로 검색해 어느 책장에 꽂혀 있는지 즉시 확인합니다.
    </div>
  </li>
</ol>

<div class="p-4 md:p-5 rounded-2xl bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-teal-500/5 dark:from-teal-950/40 dark:via-emerald-950/30 dark:to-teal-950/20 border-l-4 border-teal-500 border-t border-r border-b border-teal-200/80 dark:border-teal-700/50 shadow-sm mb-8">
  <div class="flex items-start gap-3">
    <span class="text-2xl shrink-0 mt-0.5">💡</span>
    <div>
      <h4 class="text-sm font-bold text-teal-900 dark:text-teal-300 uppercase tracking-wide mb-1">
        활용 팁 (Tip)
      </h4>
      <p class="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed font-medium">
        "도서 정리 시 <strong>'거실 책장 1단'</strong>, <strong>'2단'</strong>처럼 층별로 구역명을 세분화해 두면 나중에 책을 꺼낼 때 헤매지 않고 바로 찾을 수 있습니다."
      </p>
    </div>
  </div>
</div>

<div class="flex items-center gap-3 mt-8 flex-wrap pt-6 border-t border-slate-200 dark:border-slate-800">
  <button type="button" onclick="showPage('main')" class="detail-btn" style="max-width:200px;">
    ← 홈으로
  </button>
  <a href="javascript:void(0)" onclick="alert(currentLang === 'ko' ? '현재 구글 플레이 스토어 심사 및 출시 준비 중입니다. 곧 다운로드가 제공될 예정입니다!' : 'Google Play release is currently in preparation. Coming soon!');" class="detail-btn" style="max-width:260px; background: linear-gradient(135deg, #0d9488, #059669); color: white; border: none; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
    <span>Google Play 출시 예정</span> ⏳
  </a>
  <button type="button" onclick="openModal('bookspot')" class="detail-btn" style="max-width:220px; background: rgba(248, 250, 252, 0.9); border: 1px solid #cbd5e1;">
    📚 <span>BookSpot 상세정보</span>
  </button>
</div>`
      },
      clipflow: {
        title: "ClipFlow (클립플로우) - 스마트 클립보드 매니저",
        appName: "ClipFlow",
      },
      freshcue: {
        title: "FreshCue (프레시큐) - 냉장고 신선도 & 소비기한 관리",
        appName: "FreshCue",
      }
    },
    about: {
      title: "서비스 소개",
      subtitle: "일상의도움 포털에 오신 것을 환영합니다",
      body: `<p>일상의도움(Daily Helper)은 바쁜 현대인의 일상 속 불편함을 해소해 줄 안드로이드 앱과 유용한 디지털 도구를 한자리에서 소개하는 큐레이션 포털 서비스입니다.</p><br/><p>저희는 직접 개발하거나 엄선한 앱만을 소개하며, 각 앱에 대한 상세한 사용 가이드와 꿀팁을 제공합니다.</p><br/><h3 class="text-lg font-semibold mt-4 mb-2">우리의 미션</h3><ul class="list-disc pl-5 space-y-1"><li>불필요한 시간 낭비를 줄이는 스마트한 도구 제공</li><li>복잡한 기능을 누구나 쉽게 사용할 수 있도록 안내</li><li>개인 정보를 존중하는 안전한 앱만 선별</li><li>지속적인 업데이트와 새로운 앱 발굴</li></ul>`,
    },
    privacy: {
      title: "개인정보처리방침",
      subtitle: "귀하의 개인정보는 소중히 보호됩니다",
      body: `<p class="text-sm opacity-60 mb-4">최종 수정일: 2026년 8월 11일</p><h3 class="text-lg font-semibold mt-4 mb-2">1. 수집하는 개인정보</h3><p>일상의도움은 <strong>어떠한 개인정보도 서버에 수집하거나 저장하지 않습니다.</strong> 본 서비스는 순수 정적 웹 페이지입니다.</p><h3 class="text-lg font-semibold mt-4 mb-2">2. 로컬 스토리지</h3><p>언어 설정 및 다크모드 설정만 브라우저 로컬 스토리지에 저장되며, 서버로 전송되지 않습니다.</p><h3 class="text-lg font-semibold mt-4 mb-2">3. 광고</h3><p>Google AdSense를 통한 광고가 표시될 수 있으며, 이 과정에서 Google의 쿠키 정책이 적용될 수 있습니다.</p><h3 class="text-lg font-semibold mt-4 mb-2">4. 문의</h3><p>개인정보 관련 문의: theoneco1@gmail.com</p>`,
    },
    terms: {
      title: "이용약관",
      subtitle: "서비스 이용에 관한 약관",
      body: `<p class="text-sm opacity-60 mb-4">최종 수정일: 2026년 8월 11일</p><h3 class="text-lg font-semibold mt-4 mb-2">1. 서비스 목적</h3><p>일상의도움은 Android 앱 및 유틸리티 도구에 대한 정보를 제공하는 큐레이션 포털 서비스입니다.</p><h3 class="text-lg font-semibold mt-4 mb-2">2. 이용자 의무</h3><ul class="list-disc pl-5 mt-2 space-y-1"><li>본 서비스를 불법적인 목적으로 이용하지 않습니다.</li><li>다른 이용자나 제3자에게 피해를 주는 행위를 하지 않습니다.</li></ul><h3 class="text-lg font-semibold mt-4 mb-2">3. 면책사항</h3><p>일상의도움은 소개된 외부 앱의 사용으로 인한 손해에 대해 책임을 지지 않습니다.</p><h3 class="text-lg font-semibold mt-4 mb-2">4. 문의</h3><p>이용약관 관련 문의: theoneco1@gmail.com</p>`,
    },
    contact: {
      title: "문의하기",
      subtitle: "궁금한 점이 있으시면 언제든지 연락해 주세요",
      lastUpdated: "최종 수정일: 2026년 8월 11일",
      emailLabel: "이메일 문의",
      emailDesc: "앱 관련 문의, 버그 제보, 협업 제안 등 모든 문의를 환영합니다.",
      emailBtn: "이메일 보내기",
      responseTime: "영업일 기준 1~2일 내 답변 드립니다.",
      appRequest: "앱 추가 요청",
      appRequestDesc: "유용한 앱을 알고 계신가요? 소개하고 싶은 앱이 있으시면 알려주세요!",
    },
    footer: {
      tagline: "당신의 일상을 더 풍요롭게",
      copyright: "© 2026 일상의도움 (Daily Helper). All rights reserved.",
      links: "빠른 링크", legal: "법적 고지", emailLabel: "문의 이메일: ",
    },
    empty: {
      title: "검색 결과가 없습니다",
      subtitle: "다른 키워드나 카테고리를 선택해 보세요.",
      noAppsTitle: "등록된 앱이 없습니다.",
      noAppsSubtitle: "곧 유용한 앱들로 찾아뵙겠습니다.",
    },
    proof: { apps: "10+ 유용한 스마트폰 앱", free: "100% 무료 & 안전한 도구", update: "주기적인 신규 앱 업데이트", guide: "📖 앱 가이드" },
  },

  en: {
    brand: "Daily Helper",
    slogan: "Enriching Your Daily Life",
    nav: { home: "Home", about: "About", privacy: "Privacy Policy", terms: "Terms of Service", contact: "Contact", backToHome: "← Back to Home", guide: "App Guide" },
    hero: {
      title: "Make Daily Life Smarter",
      titlePrefix: "Make Daily Life",
      titleHighlight: "Smarter",
      subtitle: "Upgrade your daily routine with handpicked Android apps and essential tools.",
      searchPlaceholder: "Search by app name or feature...",
      totalApps: "apps available",
      resultsFound: "results found",
    },
    categories: { all: "All", tools: "Tools & Work", utility: "Utility", daily: "Daily & Routine", games: "Games", game: "Games" },
    card: { detailBtn: "Details & Download", freeTag: "Free", newTag: "New", featuredTag: "Featured", comingSoonBadge: "Coming Soon", comingSoonBtn: "Coming Soon" },
    modal: {
      close: "Close", downloadBtn: "Get it on Google Play",
      features: "Key Features", guide: "Usage Guide & Tips", versionInfo: "Version Info",
      version: "Version", updated: "Last Updated", size: "App Size",
      requires: "Requires Android", developer: "Developer", screenshots: "Screenshots", noScreenshots: "Screenshots coming soon.",
    },
    ad: { label: "Advertisement" },
    appGuideText: "📖 App Guide",
    badge: {
      guide: "📖 App Guide →",
    },
    guide: {
      mainTitle: "App Guides",
      mainSubtitle: "Explore key features and useful tips for each Daily Helper app.",
      tabComingSoon: "Coming Soon",
      comingSoonNotice: "Currently preparing for Google Play release. Detailed guide will be updated soon.",
      timekeeper: {
        title: "TimeKeeper - Smart Daily Routine & Habit Tracker",
        appName: "TimeKeeper - Smart Daily Routine & Habit Tracker",
        overview: "TimeKeeper is a dedicated Android habit and routine tracker that lets you create custom routines and receive timely notifications exactly when you need them. It operates completely offline with zero sign-up required, providing a visual overview of your daily progress.",
        featuresTitle: "Key Features",
        features: [
          { title: "Custom Schedules & Flexible Frequency", desc: "Easily schedule routines for Daily, Weekdays, Weekends, or specific days of the week at your chosen AM/PM time." },
          { title: "Intuitive Emoji Icons", desc: "Personalize routines with visual icons for medication, hydration, workouts, reading, mindfulness, and more." },
          { title: "Streak Tracking & Progress Dashboard", desc: "Track daily completion rate (%) and keep your motivation high with continuous streak counters (flame badges)." },
          { title: "Integrated Timer & Stopwatch", desc: "Built-in stopwatch directly inside each routine card to measure focus time for studying or exercising." },
          { title: "Customizable Day-Reset Time", desc: "Set your own daily reset time (default AM 04:00), making it ideal for night owls and shift workers." },
          { title: "Privacy-First & Easy Data Backup", desc: "All data is safely stored locally on your device without server tracking. Supports one-click JSON backup and restore." },
          { title: "Dark Theme & Multilingual Support", desc: "Comfortable Dark/Light themes and full Korean/English language toggling." }
        ],
        quickGuideTitle: "Quick Guide",
        quickGuide: [
          "Tap the `+ Add Routine` button on the main screen.",
          "Select an emoji icon and enter your routine title (e.g., Take Morning Medicine).",
          "Set the target time (AM/PM) and repetition days, then tap `Save`.",
          "When notified, begin your routine and tap the stopwatch icon if you need to track focus time.",
          "Tap `Check` upon completion to instantly update your daily progress (%) and streak."
        ],
        openDetailBtn: "View TimeKeeper Details",
        body: `<div class="guide-lead-box p-4 rounded-xl mb-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60"><h3 class="text-base font-bold text-slate-800 dark:text-slate-100 mb-2" style="margin-top:0;">App Overview</h3><p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-0">TimeKeeper is a dedicated Android habit and routine tracker that lets you create custom routines and receive timely notifications exactly when you need them. It operates completely offline with zero sign-up required, providing a visual overview of your daily progress.</p></div><h3 class="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-4 flex items-center gap-2"><span class="w-2 h-5 rounded bg-indigo-600 inline-block"></span>Key Features</h3><ul class="guide-feature-list space-y-3 mb-8"><li class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><strong class="text-indigo-600 dark:text-indigo-400 block mb-1">1. Custom Schedules &amp; Flexible Frequency:</strong><span class="text-slate-600 dark:text-slate-300">Easily schedule routines for Daily, Weekdays, Weekends, or specific days of the week at your chosen AM/PM time.</span></li><li class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><strong class="text-indigo-600 dark:text-indigo-400 block mb-1">2. Intuitive Emoji Icons:</strong><span class="text-slate-600 dark:text-slate-300">Personalize routines with visual icons for medication, hydration, workouts, reading, mindfulness, and more.</span></li><li class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><strong class="text-indigo-600 dark:text-indigo-400 block mb-1">3. Streak Tracking &amp; Progress Dashboard:</strong><span class="text-slate-600 dark:text-slate-300">Track daily completion rate (%) and keep your motivation high with continuous streak counters (flame badges).</span></li><li class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><strong class="text-indigo-600 dark:text-indigo-400 block mb-1">4. Integrated Timer &amp; Stopwatch:</strong><span class="text-slate-600 dark:text-slate-300">Built-in stopwatch directly inside each routine card to measure focus time for studying or exercising.</span></li><li class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><strong class="text-indigo-600 dark:text-indigo-400 block mb-1">5. Customizable Day-Reset Time:</strong><span class="text-slate-600 dark:text-slate-300">Set your own daily reset time (default AM 04:00), making it ideal for night owls and shift workers.</span></li><li class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><strong class="text-indigo-600 dark:text-indigo-400 block mb-1">6. Privacy-First &amp; Easy Data Backup:</strong><span class="text-slate-600 dark:text-slate-300">All data is safely stored locally on your device without server tracking. Supports one-click JSON backup and restore.</span></li><li class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><strong class="text-indigo-600 dark:text-indigo-400 block mb-1">7. Dark Theme &amp; Multilingual Support:</strong><span class="text-slate-600 dark:text-slate-300">Comfortable Dark/Light themes and full Korean/English language toggling.</span></li></ul><h3 class="text-lg font-bold text-slate-900 dark:text-white mt-8 mb-4 flex items-center gap-2"><span class="w-2 h-5 rounded bg-indigo-600 inline-block"></span>Quick Guide</h3><ol class="guide-steps-list space-y-3 mb-8"><li class="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><span class="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span><span class="text-slate-700 dark:text-slate-200">Tap the <code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-mono text-sm">+ Add Routine</code> button on the main screen.</span></li><li class="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><span class="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span><span class="text-slate-700 dark:text-slate-200">Select an emoji icon and enter your routine title (e.g., Take Morning Medicine).</span></li><li class="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><span class="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span><span class="text-slate-700 dark:text-slate-200">Set the target time (AM/PM) and repetition days, then tap <code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-mono text-sm">Save</code>.</span></li><li class="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><span class="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">4</span><span class="text-slate-700 dark:text-slate-200">When notified, begin your routine and tap the stopwatch icon if you need to track focus time.</span></li><li class="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40"><span class="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">5</span><span class="text-slate-700 dark:text-slate-200">Tap <code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-mono text-sm">Check</code> upon completion to instantly update your daily progress (%) and streak.</span></li></ol>`
      },
      daycount: {
        title: "DayCount Guide",
        appName: "DayCount",
        subtitle: "Smart D-Day countdown tool for managing anniversaries and goals.",
        overview: "Smart D-Day countdown tool for managing anniversaries and goals.",
        featuresTitle: "Key Features",
        features: [
          { title: "Intuitive Card View", desc: "Check upcoming events like exams, birthdays, and anniversaries at a glance in clean card layouts." },
          { title: "Custom Categories", desc: "Systematically group and manage schedules by purpose (Exam / Anniversary / Birthday / Trip)." },
          { title: "Smart Sorting & Local Security", desc: "Support sorting by remaining days or date created, with all data kept safely on device without leaks." }
        ],
        quickGuideTitle: "3-Step Simple Guide",
        quickGuide: [
          "STEP 1. Add Event: Tap the '+' button at the bottom right to enter your target date and title.",
          "STEP 2. Assign Category: Select an appropriate category tag to organize your milestone list.",
          "STEP 3. Track D-Day: Conveniently view your countdown with cards automatically sorted by days remaining."
        ],
        tipTitle: "Usage Tip",
        tipContent: "Use 'Nearest Date' sorting when managing multiple exams or events to easily keep track of upcoming priorities.",
        openDetailBtn: "View DayCount Details",
        body: `<div class="guide-header-hero mb-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-rose-500/10 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-rose-950/30 border border-amber-200/80 dark:border-amber-700/50 shadow-sm">
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
    <div class="flex items-start md:items-center gap-4">
      <div class="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-3xl md:text-4xl shadow-lg shadow-orange-500/25 shrink-0 border border-white/20">
        📅
      </div>
      <div>
        <div class="flex items-center gap-2.5 flex-wrap">
          <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">DayCount Guide</h2>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border border-amber-200 dark:border-amber-700/60">
            v1.0.3 Official
          </span>
        </div>
        <p class="text-slate-600 dark:text-slate-300 text-sm md:text-base mt-2 leading-relaxed max-w-xl">
          Smart D-Day countdown tool for managing anniversaries and goals.
        </p>
      </div>
    </div>
    <div class="flex items-center gap-3 flex-wrap sm:flex-nowrap shrink-0">
      <a href="https://play.google.com/store/apps/details?id=com.wgapps.daycount" target="_blank" rel="noopener noreferrer" class="guide-cta-download-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 shadow-md shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.61-1.424V3.238c0-.555.228-1.056.609-1.424zM15.207 13.414l2.76-2.76-13.358-7.712 10.598 10.472zm2.76-4.068l2.973 1.716c.866.5.866 1.317 0 1.818l-2.973 1.716-2.227-2.227 2.227-3.023zm-2.76 5.482L4.609 25.302l13.358-7.712-2.76-2.76z" transform="scale(0.85) translate(2, 2)"/></svg>
        <span>Get it on Google Play</span>
      </a>
      <button type="button" onclick="showPage('main')" class="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 hover:-translate-y-0.5 active:translate-y-0 shadow-sm transition-all duration-200">
        <span>← Back to Home</span>
      </button>
    </div>
  </div>
</div>

<h3 class="text-lg md:text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4 flex items-center gap-2.5">
  <span class="w-2.5 h-6 rounded-full bg-gradient-to-b from-amber-500 to-rose-500 inline-block"></span>
  <span>Key Features</span>
</h3>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
  <div class="p-5 rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
    <div>
      <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl mb-3">
        📌
      </div>
      <h4 class="font-bold text-base text-slate-900 dark:text-white mb-2">Intuitive Card View</h4>
      <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        Check upcoming events like exams, birthdays, and anniversaries at a glance in clean card layouts.
      </p>
    </div>
  </div>
  <div class="p-5 rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
    <div>
      <div class="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xl mb-3">
        🏷️
      </div>
      <h4 class="font-bold text-base text-slate-900 dark:text-white mb-2">Custom Categories</h4>
      <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        Systematically group and manage schedules by purpose (Exam / Anniversary / Birthday / Trip).
      </p>
    </div>
  </div>
  <div class="p-5 rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
    <div>
      <div class="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xl mb-3">
        ⏱️
      </div>
      <h4 class="font-bold text-base text-slate-900 dark:text-white mb-2">Smart Sorting &amp; Local Security</h4>
      <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        Support sorting by remaining days or date created, with all data kept safely on device without leaks.
      </p>
    </div>
  </div>
</div>

<h3 class="text-lg md:text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4 flex items-center gap-2.5">
  <span class="w-2.5 h-6 rounded-full bg-gradient-to-b from-amber-500 to-rose-500 inline-block"></span>
  <span>3-Step Simple Guide</span>
</h3>
<ol class="guide-steps-list space-y-3.5 mb-8">
  <li class="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/50 hover:border-amber-300 dark:hover:border-amber-700 transition-all">
    <span class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-extrabold tracking-wide shrink-0 mt-0.5 shadow-sm">
      STEP 1
    </span>
    <div class="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed">
      <strong class="text-slate-900 dark:text-white font-semibold mr-1.5">Add Event:</strong>
      Tap the <code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-orange-600 dark:text-orange-400 font-mono text-xs font-bold">+</code> button at the bottom right to enter your target date and title.
    </div>
  </li>
  <li class="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/50 hover:border-amber-300 dark:hover:border-amber-700 transition-all">
    <span class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-extrabold tracking-wide shrink-0 mt-0.5 shadow-sm">
      STEP 2
    </span>
    <div class="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed">
      <strong class="text-slate-900 dark:text-white font-semibold mr-1.5">Assign Category:</strong>
      Select an appropriate category tag to organize your milestone list.
    </div>
  </li>
  <li class="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/50 hover:border-amber-300 dark:hover:border-amber-700 transition-all">
    <span class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-extrabold tracking-wide shrink-0 mt-0.5 shadow-sm">
      STEP 3
    </span>
    <div class="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed">
      <strong class="text-slate-900 dark:text-white font-semibold mr-1.5">Track D-Day:</strong>
      Conveniently view your countdown with cards automatically sorted by days remaining.
    </div>
  </li>
</ol>

<div class="p-4 md:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-amber-950/20 border-l-4 border-amber-500 border-t border-r border-b border-amber-200/80 dark:border-amber-700/50 shadow-sm mb-8">
  <div class="flex items-start gap-3">
    <span class="text-2xl shrink-0 mt-0.5">💡</span>
    <div>
      <h4 class="text-sm font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wide mb-1">
        Usage Tip (Tip)
      </h4>
      <p class="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed font-medium">
        "Use <strong>'Nearest Date'</strong> sorting when managing multiple exams or events to easily keep track of upcoming priorities."
      </p>
    </div>
  </div>
</div>

<div class="flex items-center gap-3 mt-8 flex-wrap pt-6 border-t border-slate-200 dark:border-slate-800">
  <button type="button" onclick="showPage('main')" class="detail-btn" style="max-width:200px;">
    ← Back to Home
  </button>
  <a href="https://play.google.com/store/apps/details?id=com.wgapps.daycount" target="_blank" rel="noopener noreferrer" class="detail-btn" style="max-width:260px; background: linear-gradient(135deg, #f59e0b, #ef4444); color: white; border: none; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
    <span>Get it on Google Play</span> ↗
  </a>
  <button type="button" onclick="openModal('daycount')" class="detail-btn" style="max-width:220px; background: rgba(248, 250, 252, 0.9); border: 1px solid #cbd5e1;">
    📅 <span>View DayCount Details</span>
  </button>
</div>`
      },
      bookspot: {
        title: "BookSpot Guide",
        appName: "BookSpot",
        subtitle: "Smart on-device book organizer: Register books hands-free with voice recognition and locate any book at a glance.",
        overview: "Smart on-device book organizer: Manage bookshelf zones and register books instantly via voice recognition.",
        featuresTitle: "Key Features",
        features: [
          { title: "Custom Bookshelf Zones", desc: "Freely create custom zones (Living Room Shelf, Kids Room, Study) and check total book counts at a glance." },
          { title: "Voice Input & Fast Add", desc: "Simply turn on the microphone and speak the title to catalog books without typing." },
          { title: "Fast Search", desc: "Type initial consonants (e.g., \"ㄱㅅ\") or title keywords to discover the exact shelf location in 1 second." }
        ],
        quickGuideTitle: "3-Step Simple Guide",
        quickGuide: [
          "STEP 1. Add Storage Zones: Tap '+' to create custom bookshelf tiers, drawers, or rooms for storing books.",
          "STEP 2. Register via Voice: Select a zone and quickly add books using voice recognition or keyboard.",
          "STEP 3. Locate & Track: Search by title or consonants to find exactly which shelf and tier your book is placed in."
        ],
        tipTitle: "Usage Tip",
        tipContent: "When organizing books, name zones specifically like 'Living Room Shelf - Tier 1' or 'Tier 2' so you can locate and pull out books without hesitation.",
        openDetailBtn: "View BookSpot Details",
        body: `<div class="guide-header-hero mb-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-green-500/10 dark:from-teal-950/40 dark:via-emerald-950/30 dark:to-green-950/30 border border-teal-200/80 dark:border-teal-700/50 shadow-sm">
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
    <div class="flex items-start md:items-center gap-4">
      <div class="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-teal-600 via-emerald-500 to-green-600 flex items-center justify-center text-3xl md:text-4xl shadow-lg shadow-teal-500/25 shrink-0 border border-white/20">
        📚
      </div>
      <div>
        <div class="flex items-center gap-2.5 flex-wrap">
          <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">BookSpot Guide</h2>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300 border border-teal-200 dark:border-teal-700/60">
            v1.0.0 On-Device Local
          </span>
        </div>
        <p class="text-slate-600 dark:text-slate-300 text-sm md:text-base mt-2 leading-relaxed max-w-xl">
          Smart on-device book organizer: Register books hands-free with voice recognition and locate any book at a glance.
        </p>
      </div>
    </div>
    <div class="flex items-center gap-3 flex-wrap sm:flex-nowrap shrink-0">
      <a href="javascript:void(0)" onclick="alert(currentLang === 'ko' ? '현재 구글 플레이 스토어 심사 및 출시 준비 중입니다. 곧 다운로드가 제공될 예정입니다!' : 'Google Play release is currently in preparation. Coming soon!');" class="guide-cta-download-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-600 via-emerald-500 to-green-600 hover:from-teal-700 hover:to-green-700 shadow-md shadow-teal-500/30 hover:shadow-lg hover:shadow-teal-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
        <span class="text-base">⏳</span>
        <span>Coming Soon on Google Play</span>
      </a>
      <button type="button" onclick="showPage('main')" class="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 hover:-translate-y-0.5 active:translate-y-0 shadow-sm transition-all duration-200">
        <span>← Back to Home</span>
      </button>
    </div>
  </div>
</div>

<h3 class="text-lg md:text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4 flex items-center gap-2.5">
  <span class="w-2.5 h-6 rounded-full bg-gradient-to-b from-teal-500 to-emerald-500 inline-block"></span>
  <span>Key Features</span>
</h3>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
  <div class="p-5 rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
    <div>
      <div class="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xl mb-3">
        🗄️
      </div>
      <h4 class="font-bold text-base text-slate-900 dark:text-white mb-2">Custom Bookshelf Zones</h4>
      <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        Freely create custom zones (Living Room Shelf, Kids Room, Study) and check total book counts at a glance.
      </p>
    </div>
  </div>
  <div class="p-5 rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
    <div>
      <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl mb-3">
        🎙️
      </div>
      <h4 class="font-bold text-base text-slate-900 dark:text-white mb-2">Voice Input &amp; Fast Add</h4>
      <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        Simply turn on the microphone and speak the title to catalog books without typing.
      </p>
    </div>
  </div>
  <div class="p-5 rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
    <div>
      <div class="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-950/80 text-green-600 dark:text-green-400 flex items-center justify-center text-xl mb-3">
        🔍
      </div>
      <h4 class="font-bold text-base text-slate-900 dark:text-white mb-2">Fast Search</h4>
      <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
        Type initial consonants (e.g., "ㄱㅅ") or title keywords to discover the exact shelf location in 1 second.
      </p>
    </div>
  </div>
</div>

<h3 class="text-lg md:text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4 flex items-center gap-2.5">
  <span class="w-2.5 h-6 rounded-full bg-gradient-to-b from-teal-500 to-emerald-500 inline-block"></span>
  <span>3-Step Simple Guide</span>
</h3>
<ol class="guide-steps-list space-y-3.5 mb-8">
  <li class="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/50 hover:border-teal-300 dark:hover:border-teal-700 transition-all">
    <span class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 text-white text-xs font-extrabold tracking-wide shrink-0 mt-0.5 shadow-sm">
      STEP 1
    </span>
    <div class="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed">
      <strong class="text-slate-900 dark:text-white font-semibold mr-1.5">Add Storage Zones:</strong>
      Tap <code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-teal-600 dark:text-teal-400 font-mono text-xs font-bold">+</code> to create custom bookshelf tiers, drawers, or rooms for storing books.
    </div>
  </li>
  <li class="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/50 hover:border-teal-300 dark:hover:border-teal-700 transition-all">
    <span class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 text-white text-xs font-extrabold tracking-wide shrink-0 mt-0.5 shadow-sm">
      STEP 2
    </span>
    <div class="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed">
      <strong class="text-slate-900 dark:text-white font-semibold mr-1.5">Register via Voice:</strong>
      Select a zone and quickly add books using voice recognition or keyboard.
    </div>
  </li>
  <li class="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/50 hover:border-teal-300 dark:hover:border-teal-700 transition-all">
    <span class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 text-white text-xs font-extrabold tracking-wide shrink-0 mt-0.5 shadow-sm">
      STEP 3
    </span>
    <div class="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed">
      <strong class="text-slate-900 dark:text-white font-semibold mr-1.5">Locate &amp; Track:</strong>
      Search by title or consonants to find exactly which shelf and tier your book is placed in.
    </div>
  </li>
</ol>

<div class="p-4 md:p-5 rounded-2xl bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-teal-500/5 dark:from-teal-950/40 dark:via-emerald-950/30 dark:to-teal-950/20 border-l-4 border-teal-500 border-t border-r border-b border-teal-200/80 dark:border-teal-700/50 shadow-sm mb-8">
  <div class="flex items-start gap-3">
    <span class="text-2xl shrink-0 mt-0.5">💡</span>
    <div>
      <h4 class="text-sm font-bold text-teal-900 dark:text-teal-300 uppercase tracking-wide mb-1">
        Usage Tip (Tip)
      </h4>
      <p class="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed font-medium">
        "When organizing books, name zones specifically like <strong>'Living Room Shelf - Tier 1'</strong> or <strong>'Tier 2'</strong> so you can locate and pull out books without hesitation."
      </p>
    </div>
  </div>
</div>

<div class="flex items-center gap-3 mt-8 flex-wrap pt-6 border-t border-slate-200 dark:border-slate-800">
  <button type="button" onclick="showPage('main')" class="detail-btn" style="max-width:200px;">
    ← Back to Home
  </button>
  <a href="javascript:void(0)" onclick="alert(currentLang === 'ko' ? '현재 구글 플레이 스토어 심사 및 출시 준비 중입니다. 곧 다운로드가 제공될 예정입니다!' : 'Google Play release is currently in preparation. Coming soon!');" class="detail-btn" style="max-width:260px; background: linear-gradient(135deg, #0d9488, #059669); color: white; border: none; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
    <span>Coming Soon on Google Play</span> ⏳
  </a>
  <button type="button" onclick="openModal('bookspot')" class="detail-btn" style="max-width:220px; background: rgba(248, 250, 252, 0.9); border: 1px solid #cbd5e1;">
    📚 <span>View BookSpot Details</span>
  </button>
</div>`
      },
      clipflow: {
        title: "ClipFlow - Smart Clipboard Manager",
        appName: "ClipFlow",
      },
      freshcue: {
        title: "FreshCue - Freshness & Expiration Tracker",
        appName: "FreshCue",
      }
    },
    about: {
      title: "About Us",
      subtitle: "Welcome to Daily Helper Portal",
      body: `<p>Daily Helper is a curated portal introducing handpicked Android apps and useful digital tools designed to make your everyday life easier and smarter.</p><br/><p>We introduce only carefully selected apps, providing detailed usage guides and tips so everyone can take full advantage of these tools.</p><br/><h3 class="text-lg font-semibold mt-4 mb-2">Our Mission</h3><ul class="list-disc pl-5 space-y-1"><li>Provide smart tools that eliminate unnecessary time waste</li><li>Guide users to easily utilize complex features</li><li>Curate only safe apps that respect personal privacy</li><li>Continuously update with newly discovered apps</li></ul>`,
    },
    privacy: {
      title: "Privacy Policy",
      subtitle: "Your privacy is our priority",
      body: `<p class="text-sm opacity-60 mb-4">Last updated: August 11, 2026</p><h3 class="text-lg font-semibold mt-4 mb-2">1. Information We Collect</h3><p>Daily Helper <strong>does not collect or store any personal information on our servers.</strong> This is a purely static web page.</p><h3 class="text-lg font-semibold mt-4 mb-2">2. Local Storage</h3><p>Only language and dark mode preferences are stored in your browser's local storage — never sent to any server.</p><h3 class="text-lg font-semibold mt-4 mb-2">3. Advertising</h3><p>Ads may be displayed through Google AdSense. Google's cookie policy may apply.</p><h3 class="text-lg font-semibold mt-4 mb-2">4. Contact</h3><p>Privacy inquiries: theoneco1@gmail.com</p>`,
    },
    terms: {
      title: "Terms of Service",
      subtitle: "Terms governing use of our service",
      body: `<p class="text-sm opacity-60 mb-4">Last updated: August 11, 2026</p><h3 class="text-lg font-semibold mt-4 mb-2">1. Service Purpose</h3><p>Daily Helper is a curation portal providing information about Android apps and utility tools.</p><h3 class="text-lg font-semibold mt-4 mb-2">2. User Obligations</h3><ul class="list-disc pl-5 mt-2 space-y-1"><li>Do not use this service for illegal purposes.</li><li>Do not harm other users or third parties.</li></ul><h3 class="text-lg font-semibold mt-4 mb-2">3. Disclaimer</h3><p>Daily Helper is not responsible for damages arising from the use of external apps introduced on this service.</p><h3 class="text-lg font-semibold mt-4 mb-2">4. Contact</h3><p>Terms inquiries: theoneco1@gmail.com</p>`,
    },
    contact: {
      title: "Contact Us",
      subtitle: "Feel free to reach out anytime",
      lastUpdated: "Last updated: August 11, 2026",
      emailLabel: "Email Inquiry",
      emailDesc: "We welcome all inquiries regarding apps, bug reports, and collaboration proposals.",
      emailBtn: "Send Email",
      responseTime: "We typically respond within 1-2 business days.",
      appRequest: "App Request",
      appRequestDesc: "Know a useful app? Tell us about it and we might feature it!",
    },
    footer: {
      tagline: "Enriching your daily life",
      copyright: "© 2026 Daily Helper. All rights reserved.",
      links: "Quick Links", legal: "Legal", emailLabel: "Contact Email: ",
    },
    empty: {
      title: "No results found",
      subtitle: "Try a different keyword or category.",
      noAppsTitle: "No apps available yet.",
      noAppsSubtitle: "New apps are coming soon!",
    },
    proof: { apps: "10+ Useful Smartphone Apps", free: "100% Free & Safe Tools", update: "Regular New App Updates", guide: "📖 App Guide" },
  },
};

function getInitialLang() {
  const savedLang = localStorage.getItem("dh_lang");
  if (savedLang) return savedLang;
  const navLang = (navigator.language || navigator.userLanguage || "").toLowerCase();
  return navLang.startsWith("ko") ? "ko" : "en";
}

let currentLang = getInitialLang();

function t(key) {
  if (!key) return "";
  const keys = key.split(".");
  let value = translations[currentLang];
  if (!value) value = translations["ko"];
  for (const k of keys) {
    if (value === undefined || value === null) return key;
    value = value[k];
  }
  return (value !== undefined && value !== null) ? value : key;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("dh_lang", lang);
  if (typeof buildHeaderCatNav === "function") buildHeaderCatNav();
  if (typeof buildFilters === "function") buildFilters();
  applyTranslations();
  if (typeof renderApps === "function") renderApps();
  if (typeof updateLangToggle === "function") updateLangToggle();
  if (typeof renderGuideSubtabs === "function") renderGuideSubtabs();
  if (typeof renderGuideContent === "function") renderGuideContent();
  if (typeof currentModalApp !== "undefined" && currentModalApp && typeof openModal === "function") {
    openModal(currentModalApp.id);
  }
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key.startsWith("categories.")) {
      const catId = key.replace("categories.", "");
      el.textContent = (typeof getCategoryLabel === "function") ? getCategoryLabel(catId) : t(key);
    } else {
      const val = t(key);
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = val;
      } else {
        el.textContent = (val !== key) ? val : el.textContent;
      }
    }
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = t(el.getAttribute("data-i18n-html"));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
  });
}
