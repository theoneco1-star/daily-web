/**
 * Daily Helper (일상의도움) — i18n Translation Dictionary
 * Supports: Korean (ko), English (en)
 */
const translations = {
  ko: {
    brand: "일상의도움",
    slogan: "당신의 삶을 풍요롭게 합니다",
    nav: { home: "홈", about: "소개", privacy: "개인정보처리방침", terms: "이용약관", contact: "문의하기", backToHome: "← 홈으로" },
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
    card: { detailBtn: "상세보기 & 다운로드", freeTag: "무료", newTag: "신규", featuredTag: "추천" },
    modal: {
      close: "닫기", downloadBtn: "Google Play에서 다운로드",
      features: "주요 기능", guide: "사용 가이드 & 꿀팁", versionInfo: "버전 정보",
      version: "버전", updated: "최종 업데이트", size: "앱 크기",
      requires: "최소 요구 사양", developer: "개발사", screenshots: "스크린샷", noScreenshots: "스크린샷 준비 중입니다.",
    },
    ad: { label: "광고" },
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
    proof: { apps: "10+ 유용한 스마트폰 앱", free: "100% 무료 & 안전한 도구", update: "주기적인 신규 앱 업데이트" },
  },

  en: {
    brand: "Daily Helper",
    slogan: "Enriching Your Daily Life",
    nav: { home: "Home", about: "About", privacy: "Privacy Policy", terms: "Terms of Service", contact: "Contact", backToHome: "← Back to Home" },
    hero: {
      title: "Make Every Day Smarter",
      titlePrefix: "Make Every Day",
      titleHighlight: "Smarter",
      subtitle: "Upgrade your daily routine with handpicked Android apps and essential tools.",
      searchPlaceholder: "Search by app name or feature...",
      totalApps: "apps available",
      resultsFound: "results found",
    },
    categories: { all: "All", tools: "Tools & Work", utility: "Utility", daily: "Daily & Routine", kids: "Kids & Quiz" },
    card: { detailBtn: "Details & Download", freeTag: "Free", newTag: "New", featuredTag: "Featured" },
    modal: {
      close: "Close", downloadBtn: "Get it on Google Play",
      features: "Key Features", guide: "Usage Guide & Tips", versionInfo: "Version Info",
      version: "Version", updated: "Last Updated", size: "App Size",
      requires: "Requires Android", developer: "Developer", screenshots: "Screenshots", noScreenshots: "Screenshots coming soon.",
    },
    ad: { label: "Advertisement" },
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
