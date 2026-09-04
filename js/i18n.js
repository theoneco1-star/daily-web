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
    categories: { all: "전체", tools: "도구/업무", utility: "유틸리티", daily: "일상/일정", kids: "키즈/퀴즈" },
    card: { detailBtn: "상세보기 & 다운로드", freeTag: "무료", newTag: "신규", featuredTag: "추천", comingSoonBadge: "준비중", comingSoonBtn: "출시 예정" },
    modal: {
      close: "닫기", downloadBtn: "Google Play에서 다운로드",
      features: "주요 기능", guide: "사용 가이드 & 꿀팁", versionInfo: "버전 정보",
      version: "버전", updated: "최종 업데이트", size: "앱 크기",
      requires: "최소 요구 사양", developer: "개발사", screenshots: "스크린샷", noScreenshots: "스크린샷 준비 중입니다.",
    },
    ad: { label: "광고" },
    badge: {
      guide: "📖 앱 가이드",
    },
    guide: {
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
    categories: { all: "All", tools: "Tools & Work", utility: "Utility", daily: "Daily & Routine", kids: "Kids & Quiz" },
    card: { detailBtn: "Details & Download", freeTag: "Free", newTag: "New", featuredTag: "Featured", comingSoonBadge: "Coming Soon", comingSoonBtn: "Coming Soon" },
    modal: {
      close: "Close", downloadBtn: "Get it on Google Play",
      features: "Key Features", guide: "Usage Guide & Tips", versionInfo: "Version Info",
      version: "Version", updated: "Last Updated", size: "App Size",
      requires: "Requires Android", developer: "Developer", screenshots: "Screenshots", noScreenshots: "Screenshots coming soon.",
    },
    ad: { label: "Advertisement" },
    badge: {
      guide: "📖 App Guide",
    },
    guide: {
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
    proof: { apps: "10+ Useful Smartphone Apps", free: "100% Free & Safe Tools", update: "Regular New App Updates" },
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
