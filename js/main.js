/**
 * Daily Helper (일상의도움) — Main Application Logic
 */

// ── DOM Elements ─────────────────────────────────────────
const appGrid = document.getElementById("app-grid");
const searchInput = document.getElementById("search-input");
const filterContainer = document.getElementById("category-filters");
const modal = document.getElementById("app-modal");
const modalContent = document.getElementById("modal-content");
const langToggleKo = document.getElementById("lang-ko");
const langToggleEn = document.getElementById("lang-en");
const darkToggle = document.getElementById("dark-toggle");
const heroCount = document.getElementById("hero-count");
const pageMain = document.getElementById("page-main");
const pageAbout = document.getElementById("page-about");
const pagePrivacy = document.getElementById("page-privacy");
const pageTerms = document.getElementById("page-terms");
const pageContact = document.getElementById("page-contact");
const pageGuide = document.getElementById("page-guide");
const webToolsSection = document.getElementById("web-tools-section");
const tabBtnApps = document.getElementById("tab-btn-apps");
const tabBtnTools = document.getElementById("tab-btn-tools");
const categorySection = document.getElementById("category-section");

// ── State & Routing ───────────────────────────────────────
let currentView = "main"; // "main" | "guide" | "about" | "privacy" | "terms" | "contact"
let currentMainTab = "apps"; // "apps" | "tools"
let isAppGridLoaded = false;

function toAbsoluteUrl(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/") || url.startsWith("data:")) {
    return url;
  }
  return "/" + url;
}

// ── App & Web Tools Guide Configuration & Management ───────────
const guideAppsConfig = [
  // 1. Mobile Apps
  {
    id: "bakemerge",
    nameKo: "Bake Merge (베이크 머지)",
    nameEn: "Bake Merge",
    iconEmoji: "🥐",
    type: "app",
    badgeKo: "게임",
    badgeEn: "Game",
    isReady: true,
  },
  {
    id: "timekeeper",
    nameKo: "TimeKeeper (타임키퍼)",
    nameEn: "TimeKeeper",
    iconEmoji: "⏱️",
    type: "app",
    badgeKo: "유틸리티",
    badgeEn: "Routine",
    isReady: true,
  },
  {
    id: "daycount",
    nameKo: "DayCount (디데이)",
    nameEn: "DayCount",
    iconEmoji: "📅",
    type: "app",
    badgeKo: "일정",
    badgeEn: "D-Day",
    isReady: true,
  },
  {
    id: "bookspot",
    nameKo: "BookSpot (북스팟 - 스마트 독서 기록 관리)",
    nameEn: "BookSpot (Smart Book Organizer)",
    iconEmoji: "📚",
    type: "app",
    badgeKo: "독서관리",
    badgeEn: "Books",
    isReady: true,
  },
  {
    id: "clipflow-mate",
    nameKo: "ClipFlow Mate (클립플로우 메이트)",
    nameEn: "ClipFlow Mate",
    iconEmoji: "📋",
    type: "app",
    badgeKo: "클립보드",
    badgeEn: "Clipboard",
    isReady: true,
  },
  // 2. Web Utilities
  {
    id: "pdf-checker",
    nameKo: "PDF & 도면 체커",
    nameEn: "PDF Drawing Checker",
    iconEmoji: "📐",
    type: "tool",
    badgeKo: "웹 도구",
    badgeEn: "Web Tool",
    isReady: true,
  },
  {
    id: "annual-leave-calculator",
    nameKo: "연차 자동 계산기",
    nameEn: "Annual Leave Calc",
    iconEmoji: "📅",
    type: "tool",
    badgeKo: "근로기준법",
    badgeEn: "Labor Law",
    isReady: true,
  },
  {
    id: "wage-calc",
    nameKo: "실수령액·주휴수당",
    nameEn: "Wage & Holiday Pay",
    iconEmoji: "🧮",
    type: "tool",
    badgeKo: "급여/세무",
    badgeEn: "Salary & Tax",
    isReady: true,
  },
  {
    id: "char-byte-counter",
    nameKo: "자소서 글자수·Byte",
    nameEn: "Char & Byte Counter",
    iconEmoji: "📝",
    type: "tool",
    badgeKo: "문서 도구",
    badgeEn: "Resume Tool",
    isReady: true,
  },
  {
    id: "excel-delimiter-converter",
    nameKo: "엑셀 구분자 변환기",
    nameEn: "Excel Converter",
    iconEmoji: "📊",
    type: "tool",
    badgeKo: "데이터 정제",
    badgeEn: "Data Tool",
    isReady: true,
  }
];

// Clean Path URL Slug Mapping for SEO & AdSense Crawlers
const GUIDE_SLUG_MAP = {
  // Mobile Apps
  "bakemerge": {
    canonicalSlug: "bake-merge",
    aliases: ["bake-merge", "bakemerge", "bake_merge"]
  },
  "timekeeper": {
    canonicalSlug: "timekeeper",
    aliases: ["timekeeper", "time-keeper", "time_keeper"]
  },
  "daycount": {
    canonicalSlug: "daycount",
    aliases: ["daycount", "day-count", "day_count"]
  },
  "clipflow-mate": {
    canonicalSlug: "clipflow-mate",
    aliases: ["clipflow-mate", "clipflowmate", "clipflow_mate", "clipflow"]
  },
  "bookspot": {
    canonicalSlug: "bookspot",
    aliases: ["bookspot", "book-spot", "book_spot"]
  },
  // Web Tools
  "pdf-checker": {
    canonicalSlug: "pdf-checker",
    aliases: ["pdf-checker", "pdfchecker", "drawing-checker", "pdf-marking"]
  },
  "wage-calc": {
    canonicalSlug: "salary-calculator",
    aliases: ["salary-calculator", "wage-calc", "wage-calculator", "part-time-calculator", "parttime-calculator", "salary"]
  },
  "excel-delimiter-converter": {
    canonicalSlug: "excel-converter",
    aliases: ["excel-converter", "excel-delimiter-converter", "excel-delimiter", "excel-line-break"]
  },
  "annual-leave-calculator": {
    canonicalSlug: "annual-leave-calculator",
    aliases: ["annual-leave-calculator", "annual-leave", "annualleave", "annual-leave-calc"]
  },
  "char-byte-counter": {
    canonicalSlug: "char-byte-counter",
    aliases: ["char-byte-counter", "char-counter", "byte-counter", "charbyte"]
  }
};

let currentGuideTab = "bakemerge";

function getGuideCanonicalSlug(appId) {
  if (appId && GUIDE_SLUG_MAP[appId]) {
    return GUIDE_SLUG_MAP[appId].canonicalSlug;
  }
  return appId || "bake-merge";
}

function resolveGuideAppId(slugOrId) {
  if (!slugOrId) return "bakemerge";
  const cleaned = String(slugOrId).trim().toLowerCase().replace(/^guide[-/]?/, "");
  for (const [appId, config] of Object.entries(GUIDE_SLUG_MAP)) {
    if (appId.toLowerCase() === cleaned) return appId;
    if (config.canonicalSlug.toLowerCase() === cleaned) return appId;
    if (config.aliases.some(a => a.toLowerCase() === cleaned)) return appId;
  }
  const found = guideAppsConfig.find(g => g.id.toLowerCase() === cleaned);
  if (found) return found.id;
  return "bakemerge";
}

function resolveCurrentRoute() {
  try {
    const pathname = (window.location.pathname || "/").toLowerCase();
    const rawHash = (window.location.hash || "").trim().toLowerCase();
    const hash = decodeURIComponent(rawHash).replace(/^#/, "");

    // 1. Clean Path Routing (/guide, /guide/bake-merge, /about, /privacy, /terms, /contact)
    const normalizedPath = pathname.replace(/\/+$/, "") || "/";

    if (normalizedPath === "/guide" || normalizedPath.startsWith("/guide/")) {
      const parts = normalizedPath.split("/").filter(Boolean); // ["guide"] or ["guide", "bake-merge"]
      const slug = parts[1] || "";
      const targetGuide = slug ? resolveGuideAppId(slug) : "bakemerge";
      return { view: "guide", guideTab: targetGuide };
    }

    if (normalizedPath === "/about") return { view: "about" };
    if (normalizedPath === "/privacy") return { view: "privacy" };
    if (normalizedPath === "/terms") return { view: "terms" };
    if (normalizedPath === "/contact") return { view: "contact" };
    if (normalizedPath === "/tools" || normalizedPath === "/web-tools") return { view: "main", mainTab: "tools" };
    if (normalizedPath === "/apps" || normalizedPath === "/mobile-apps") return { view: "main", mainTab: "apps" };

    // 2. Hash Routing Fallback (for backwards compatibility: #guide, #guide-bakemerge, #about, etc.)
    if (hash === "guide" || hash.startsWith("guide-") || hash.startsWith("guide/")) {
      const slug = hash.replace(/^guide[-/]?/, "");
      const targetGuide = slug ? resolveGuideAppId(slug) : "bakemerge";
      return { view: "guide", guideTab: targetGuide };
    }
    if (hash === "about") return { view: "about" };
    if (hash === "privacy") return { view: "privacy" };
    if (hash === "terms") return { view: "terms" };
    if (hash === "contact") return { view: "contact" };

    return { view: "main", mainTab: "apps" };
  } catch (_) {
    return { view: "main", mainTab: "apps" };
  }
}

// ── Dynamic SEO & Canonical Link Synchronizer for Clean URLs ─────
function updateSeoForRoute(view, guideTab) {
  try {
    const isEn = (typeof currentLang !== "undefined" ? currentLang : "ko") === "en";
    let title = typeof SITE_DEFAULT_TITLE !== "undefined" ? SITE_DEFAULT_TITLE : "일상의도움 (Daily Helper) | 스마트한 일상의 도구 모음";
    let canonicalPath = "/";
    let desc = "";

    if (view === "guide") {
      const targetId = guideTab || currentGuideTab || "bakemerge";
      const targetApp = guideAppsConfig.find(a => a.id === targetId) || guideAppsConfig[0];
      const appName = targetApp ? (isEn ? targetApp.nameEn : targetApp.nameKo) : "Bake Merge";
      const slug = getGuideCanonicalSlug(targetId);
      canonicalPath = `/guide/${slug}`;
      title = isEn
        ? `${appName} User Guide & Tips | Daily Helper`
        : `${appName} 이용 가이드 & 활용 팁 | 일상의도움`;
      desc = isEn
        ? `Learn key features, step-by-step guides, and pro tips for ${appName} on Daily Helper Hub.`
        : `일상의도움 ${appName}의 핵심 기능, 단계별 상세 이용 방법과 실무 꿀팁을 확인하세요.`;
    } else if (view === "about") {
      canonicalPath = "/about";
      title = isEn ? "About Us | Daily Helper" : "서비스 소개 (About) | 일상의도움";
      desc = isEn
        ? "Daily Helper Hub - Safe, client-side web utility tools and productive lifestyle apps."
        : "일상의도움(Daily Helper) - 서버 저장 없는 안전한 웹 도구와 안드로이드 생산성 앱 모음.";
    } else if (view === "privacy") {
      canonicalPath = "/privacy";
      title = isEn ? "Privacy Policy | Daily Helper" : "개인정보처리방침 | 일상의도움";
      desc = isEn
        ? "Privacy Policy of Daily Helper Hub. 100% on-device client processing."
        : "일상의도움 개인정보처리방침 - 100% 온디바이스 클라이언트 연산 및 개인정보 보호 방침.";
    } else if (view === "terms") {
      canonicalPath = "/terms";
      title = isEn ? "Terms of Service | Daily Helper" : "이용약관 | 일상의도움";
      desc = isEn
        ? "Terms of Service of Daily Helper Hub."
        : "일상의도움 이용약관 및 서비스 이용 가이드라인 안내.";
    } else if (view === "contact") {
      canonicalPath = "/contact";
      title = isEn ? "Contact Us | Daily Helper" : "문의하기 | 일상의도움";
      desc = isEn
        ? "Contact Daily Helper Hub team for feedback, support, and app requests."
        : "일상의도움 문의하기 - 신규 앱 요청, 버그 제보, 제휴 및 피드백 문의.";
    } else {
      canonicalPath = "/";
      title = isEn ? "Daily Helper | Smart Tools for Everyday Life" : (typeof SITE_DEFAULT_TITLE !== "undefined" ? SITE_DEFAULT_TITLE : "일상의도움 (Daily Helper) | 스마트한 일상의 도구 모음");
      desc = "일상의도움(Daily Helper) - 무설치 PDF & 도면/이미지 검토·마킹 툴, 대한민국 근로기준법 연차 자동 계산기, 2026 최저시급·주휴수당 계산기, 자소서 글자수·Byte 변환기 등 서버 저장 없이 안전한 무료 웹 도구 모음.";
    }

    if (typeof setSiteTitle === "function") {
      setSiteTitle(title);
    } else {
      document.title = title;
    }

    const fullCanonical = `https://www.dailyhelperhub.com${canonicalPath}`;
    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.setAttribute("href", fullCanonical);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", fullCanonical);
    const twUrl = document.querySelector('meta[property="twitter:url"]');
    if (twUrl) twUrl.setAttribute("content", fullCanonical);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
    const twTitle = document.querySelector('meta[property="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", title);

    if (desc) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", desc);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", desc);
      const twDesc = document.querySelector('meta[property="twitter:description"]');
      if (twDesc) twDesc.setAttribute("content", desc);
    }
  } catch (err) {
    console.warn("Error updating SEO meta for route:", err);
  }
}
window.updateSeoForRoute = updateSeoForRoute;

function updateHomeSeoVisibility() {
  const homeSeo = document.getElementById("home-about-seo");
  if (!homeSeo) return;
  const isHomeAll = (currentView === "main" && currentMainTab === "apps" && activeCategory === "all" && !searchQuery.trim());
  homeSeo.classList.toggle("hidden", !isHomeAll);
  homeSeo.style.display = isHomeAll ? "" : "none";
  if (isHomeAll && isAppGridLoaded) {
    requestAnimationFrame(() => {
      homeSeo.classList.add("is-loaded");
    });
  } else {
    homeSeo.classList.remove("is-loaded");
  }
}
let activeCategory = "all"; // Default: 전체
let searchQuery = "";
let isDark = localStorage.getItem("dh_dark") !== "false";
let currentGalleryIndex = 0;
let currentModalApp = null;

// ── Dark Mode ─────────────────────────────────────────────
function initDarkMode() {
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  updateDarkToggleIcon();
}

function toggleDark() {
  isDark = !isDark;
  localStorage.setItem("dh_dark", isDark);
  document.documentElement.classList.toggle("dark", isDark);
  updateDarkToggleIcon();
}

function updateDarkToggleIcon() {
  if (!darkToggle) return;
  darkToggle.innerHTML = isDark
    ? `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.71.71M6.34 17.66l-.71.71m12.73 0-.71-.71M6.34 6.34l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;
}

// ── Language Toggle ───────────────────────────────────────
function updateLangToggle() {
  if (langToggleKo) langToggleKo.classList.toggle("active-lang", currentLang === "ko");
  if (langToggleEn) langToggleEn.classList.toggle("active-lang", currentLang === "en");
}

// ── Category Helper ───────────────────────────────────────
function getCategoryLabel(catId) {
  if (typeof t === "function") {
    const translated = t("categories." + catId);
    if (translated && !translated.startsWith("categories.")) {
      return translated;
    }
  }
  const catObj = (typeof categoriesData !== "undefined" && Array.isArray(categoriesData))
    ? categoriesData.find(c => c.id === catId)
    : null;
  if (catObj) {
    return currentLang === "ko" ? catObj.nameKo : catObj.nameEn;
  }
  if (catId === "work" || catId === "tools") {
    return currentLang === "ko" ? "도구/업무" : "Tools & Work";
  }
  if (catId === "utility") {
    return currentLang === "ko" ? "유틸리티" : "Utility";
  }
  if (catId === "daily") {
    return currentLang === "ko" ? "일상/일정" : "Daily & Routine";
  }
  if (catId === "game" || catId === "games") {
    return currentLang === "ko" ? "게임" : "Game";
  }
  return catId;
}

// ── Category Navigation & Filters ─────────────────────────
function buildHeaderCatNav() {
  const headerNav = document.getElementById("header-cat-nav");
  if (!headerNav) return;
  const cats = (typeof categoriesData !== "undefined" && categoriesData.length > 0)
    ? categoriesData.map(c => c.id)
    : ["all", "work", "utility", "daily", "game"];

  headerNav.innerHTML = cats.map(cat => `
    <button
      class="header-cat-btn${cat === activeCategory ? " active-cat" : ""}"
      onclick="scrollToCategory('${cat}')"
      data-i18n="categories.${cat}"
    >${getCategoryLabel(cat)}</button>
  `).join("");
}

function buildFilters() {
  if (!filterContainer) return;
  const cats = (typeof categoriesData !== "undefined" && categoriesData.length > 0)
    ? categoriesData.map(c => c.id)
    : ["all", "work", "utility", "daily", "game"];

  filterContainer.innerHTML = cats.map(cat => `
    <button
      class="filter-btn${cat === activeCategory ? " filter-btn-active" : ""}"
      data-cat="${cat}"
      data-i18n="categories.${cat}"
      onclick="setCategory('${cat}')"
    >${getCategoryLabel(cat)}</button>
  `).join("");
}

function setCategory(cat) {
  activeCategory = cat;
  buildFilters();
  buildHeaderCatNav();
  renderApps();
  updateHomeSeoVisibility();
}

// ── App Rendering ─────────────────────────────────────────
function getFilteredApps() {
  if (typeof appsData === "undefined") return [];
  return appsData.filter(app => {
    // 1:1 엄격한 단일 카테고리 매핑 필터링 (고유 'category' 속성 값으로만 정확히 필터링)
    let matchCat = false;
    if (activeCategory === "all") {
      matchCat = true;
    } else if (activeCategory === "work" || activeCategory === "tools") {
      matchCat = (app.category === "work" || app.category === "tools");
    } else if (activeCategory === "game" || activeCategory === "games") {
      matchCat = (app.category === "game" || app.category === "games");
    } else {
      matchCat = (app.category === activeCategory);
    }

    // 검색어 필터링 (검색창에 입력이 있을 때만 적용)
    const name = (currentLang === "ko" ? app.nameKo : app.nameEn).toLowerCase();
    const desc = (currentLang === "ko" ? app.descKo : app.descEn).toLowerCase();
    const tagsArr = (currentLang === "ko" ? app.tagsKo || app.tags : app.tagsEn || app.tags) || [];
    const tagsStr = Array.isArray(tagsArr) ? tagsArr.join(" ").toLowerCase() : "";
    const matchSearch = !searchQuery || name.includes(searchQuery) || desc.includes(searchQuery) || tagsStr.includes(searchQuery);

    return matchCat && matchSearch;
  });
}

function updateTabBadges() {
  const badgeAppsList = document.querySelectorAll(".badge-apps-count, #badge-apps-count");
  badgeAppsList.forEach(b => {
    if (typeof appsData !== "undefined") {
      b.textContent = String(appsData.length);
    }
  });

  const availableTools = typeof getAvailableWebTools === "function"
    ? getAvailableWebTools()
    : [];
  const visibleToolsCount = availableTools.length;

  const badgeToolsList = document.querySelectorAll(".badge-tools-count, #badge-tools-count");
  badgeToolsList.forEach(b => {
    b.textContent = String(visibleToolsCount);
    if (visibleToolsCount > 0) {
      b.classList.add("new-badge");
    } else {
      b.classList.remove("new-badge");
    }
  });
}

function updateHeroCount() {
  const filteredApps = getFilteredApps();
  const totalApps = typeof appsData !== "undefined" ? appsData.length : 0;
  const filteredTools = typeof getFilteredWebTools === "function" ? getFilteredWebTools() : [];
  const availableTools = typeof getAvailableWebTools === "function" ? getAvailableWebTools() : [];
  const totalTools = availableTools.length;

  const appCountText = searchQuery
    ? `${filteredApps.length} ${t("hero.resultsFound")}`
    : (currentLang === "ko" ? `${totalApps}개의 앱` : `${totalApps} apps available`);

  const toolCountLabel = t("webTools.heroCount") || (currentLang === "ko" ? "개의 웹 도구" : "web tools");
  const toolFoundLabel = t("webTools.resultsFound") || (currentLang === "ko" ? "개 검색됨" : "results found");
  const toolCountText = searchQuery
    ? `${filteredTools.length} ${toolFoundLabel}`
    : `${totalTools} ${toolCountLabel}`;

  const appsCountBadge = document.getElementById("apps-count-badge");
  if (appsCountBadge) {
    appsCountBadge.textContent = appCountText;
  }
  const toolsCountBadge = document.getElementById("tools-count-badge");
  if (toolsCountBadge) {
    toolsCountBadge.textContent = toolCountText;
  }
  if (heroCount) {
    heroCount.textContent = currentMainTab === "apps" ? appCountText : toolCountText;
  }
  updateTabBadges();
}

// ── Major Tab Switching (모바일 앱 ↔ 웹 도구) ─────────────
function switchMainTab(tab) {
  // If user is viewing a sub-page (guide, about, etc.), return to main page
  if (currentView !== "main") {
    showPage("main");
  }

  currentMainTab = tab;
  const isApps = (tab === "apps");

  const appBtns = document.querySelectorAll(".tab-btn-apps, #tab-btn-apps");
  const toolBtns = document.querySelectorAll(".tab-btn-tools, #tab-btn-tools");
  const appsContainer = document.getElementById("apps-container");
  const catSec = document.getElementById("category-section");
  const appGridEl = document.getElementById("app-grid");
  const proofBar = document.getElementById("proof-bar");
  const toolsSec = document.getElementById("web-tools-section");

  appBtns.forEach(btn => {
    btn.classList.toggle("active", isApps);
    btn.setAttribute("aria-selected", isApps ? "true" : "false");
  });

  toolBtns.forEach(btn => {
    btn.classList.toggle("active", !isApps);
    btn.setAttribute("aria-selected", !isApps ? "true" : "false");
  });

  if (appsContainer) appsContainer.classList.toggle("hidden", !isApps);
  if (catSec) catSec.classList.toggle("hidden", !isApps);
  if (appGridEl) appGridEl.classList.toggle("hidden", !isApps);
  if (proofBar) proofBar.classList.toggle("hidden", !isApps);
  if (toolsSec) toolsSec.classList.toggle("hidden", isApps);

  if (isApps) {
    renderApps();
  } else {
    if (typeof renderWebTools === "function") renderWebTools();
  }
  updateHeroCount();
  updateHomeSeoVisibility();
}

function renderApps() {
  if (!appGrid) return;
  buildFilters();
  applyTranslations();
  const filtered = getFilteredApps();

  // Update hero count & badge counts across desktop and mobile
  updateHeroCount();
  updateTabBadges();
  updateHomeSeoVisibility();

  if (filtered.length === 0) {
    const isNoApps = typeof appsData === "undefined" || appsData.length === 0;
    const icon = isNoApps ? "📱" : "🔍";
    const titleText = isNoApps ? t("empty.noAppsTitle") : t("empty.title");
    const subtitleText = isNoApps ? t("empty.noAppsSubtitle") : t("empty.subtitle");

    appGrid.innerHTML = `
      <div class="col-span-full flex flex-col items-center justify-center py-24 text-center">
        <div class="text-6xl mb-4">${icon}</div>
        <h3 class="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">${titleText}</h3>
        <p class="text-slate-500 dark:text-slate-400">${subtitleText}</p>
      </div>`;
    return;
  }

  let html = "";
  filtered.forEach((app) => {
    html += buildAppCard(app);
  });

  appGrid.innerHTML = html;
}

function buildAppCard(app) {
  const name = currentLang === "ko" ? app.nameKo : app.nameEn;
  const desc = currentLang === "ko" ? app.descKo : app.descEn;
  const catLabel = getCategoryLabel(app.category);
  const badges = app.isComingSoon
    ? `<span class="badge badge-coming-soon">${t("card.comingSoonBadge")}</span>`
    : [
        app.isFree ? `<span class="badge badge-free">${t("card.freeTag")}</span>` : "",
        app.isNew ? `<span class="badge badge-new">${t("card.newTag")}</span>` : "",
        app.isFeatured ? `<span class="badge badge-featured">${t("card.featuredTag")}</span>` : "",
      ].join("");

  const tagsList = (currentLang === "ko" ? app.tagsKo || app.tags : app.tagsEn || app.tags) || [];
  const tagsHtml = Array.isArray(tagsList) && tagsList.length > 0
    ? `<div class="app-tags-wrap">
        ${tagsList.map(tag => `<span class="app-tag">#${tag}</span>`).join("")}
      </div>`
    : "";

  const fallbackEmoji = app.iconEmoji || "📱";
  const isImageIcon = app.icon && (app.icon.includes("/") || app.icon.includes("."));
  const iconMarkup = isImageIcon
    ? `<img src="${toAbsoluteUrl(app.icon)}" alt="${name}" class="w-8 h-8 object-contain rounded-lg" onerror="this.onerror=null; this.outerHTML='<span class=\\'text-2xl\\'>${fallbackEmoji}</span>';"/>`
    : `<span class="text-2xl">${app.icon || fallbackEmoji}</span>`;

  const cardClass = app.isComingSoon ? "app-card app-card-coming-soon" : "app-card";
  const clickHandler = app.isComingSoon ? "" : ` onclick="openModal('${app.id}')"`;
  const actionButton = app.isComingSoon
    ? `<button class="detail-btn detail-btn-coming-soon mt-auto" disabled aria-disabled="true">
        ${t("card.comingSoonBtn")}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      </button>`
    : `<button class="detail-btn mt-auto">
        ${t("card.detailBtn")}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
      </button>`;

  return `
    <div class="${cardClass}"${clickHandler}>
      <div class="app-card-inner">
        <div class="flex items-start gap-3 mb-3">
          <div class="app-icon-wrap bg-gradient-to-br ${app.color}">
            ${iconMarkup}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-1.5 flex-wrap">
              <h3 class="app-card-title">${name}</h3>
              ${badges}
            </div>
            <span class="cat-badge">${catLabel}</span>
          </div>
        </div>
        <p class="app-card-desc">${desc}</p>
        ${tagsHtml}
        ${actionButton}
      </div>
    </div>`;
}

// ── Modal ─────────────────────────────────────────────────
function openModal(appId) {
  if (typeof appsData === "undefined") return;
  const app = appsData.find(a => a.id === appId);
  if (!app) return;
  currentModalApp = app;
  currentGalleryIndex = 0;

  const name = currentLang === "ko" ? app.nameKo : app.nameEn;
  const features = currentLang === "ko" ? app.featuresKo : app.featuresEn;
  const guide = currentLang === "ko" ? app.guideKo : app.guideEn;
  const fallbackEmoji = app.iconEmoji || "📱";

  const badges = [
    app.isFree ? `<span class="badge badge-free">${t("card.freeTag")}</span>` : "",
    app.isNew ? `<span class="badge badge-new">${t("card.newTag")}</span>` : "",
    app.isFeatured ? `<span class="badge badge-featured">${t("card.featuredTag")}</span>` : "",
  ].join("");

  const featuresList = (features || []).map(f => `
    <li class="flex items-start gap-2">
      <svg class="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
      <span>${f}</span>
    </li>`).join("");

  const isImageIcon = app.icon && (app.icon.includes("/") || app.icon.includes("."));
  const heroIconMarkup = isImageIcon
    ? `<div class="modal-hero-icon flex items-center justify-center overflow-hidden"><img src="${toAbsoluteUrl(app.icon)}" alt="${name}" class="w-12 h-12 object-contain" onerror="this.onerror=null; this.parentElement.outerHTML='<div class=\\'modal-hero-icon\\'>${fallbackEmoji}</div>';"/></div>`
    : `<div class="modal-hero-icon">${app.icon || fallbackEmoji}</div>`;

  const appScreenshotsRaw = (currentLang === "ko" && app.screenshotsKo)
    ? [...app.screenshotsKo, ...(app.screenshotsEn || [])]
    : ((currentLang === "en" && app.screenshotsEn)
        ? [...app.screenshotsEn, ...(app.screenshotsKo || [])]
        : (app.screenshots || []));
  const appScreenshots = (appScreenshotsRaw || []).map(toAbsoluteUrl);
  app.activeScreenshots = appScreenshots;

  const screenshotsHtml = (appScreenshots && appScreenshots.length)
    ? `<div class="modal-screenshot-showcase">
        <div class="phone-device-frame">
          <div class="phone-device-speaker"></div>
          <div class="phone-device-camera"></div>
          <div class="phone-device-screen">
            ${appScreenshots.length === 1
              ? `<img src="${appScreenshots[0]}" class="phone-screenshot-img" alt="${name} screenshot" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'p-8 text-center text-slate-400 dark:text-slate-500\\'>🖼️ 스크린샷 이미지 준비 중입니다.</div>';"/>`
              : `<div class="gallery-track" id="gallery-track">
                  ${appScreenshots.map(s => `<img src="${s}" class="phone-screenshot-img flex-shrink-0 w-full" alt="screenshot" onerror="this.onerror=null; this.src='/images/screenshot-placeholder.svg';"/>`).join("")}
                </div>`
            }
          </div>
          <div class="phone-device-home"></div>
          ${appScreenshots.length > 1 ? `
          <button class="gallery-btn gallery-btn-prev" onclick="moveGallery(-1)">&#8249;</button>
          <button class="gallery-btn gallery-btn-next" onclick="moveGallery(1)">&#8250;</button>
          <div class="gallery-dots" id="gallery-dots">
            ${appScreenshots.map((_, i) => `<button class="dot ${i === 0 ? 'dot-active' : ''}" onclick="goGallery(${i})"></button>`).join("")}
          </div>` : ""}
        </div>
      </div>`
    : `<div class="no-screenshots">
        <div class="phone-mockup">
          <div class="phone-mockup-notch"></div>
          <div class="phone-mockup-screen">
            <span class="phone-mockup-icon">${fallbackEmoji}</span>
          </div>
          <div class="phone-mockup-btn"></div>
        </div>
        <p class="no-screenshots-label">${t("modal.noScreenshots")}</p>
      </div>`;

  modalContent.innerHTML = `
    <button class="modal-close-btn" onclick="closeModal()" id="modal-close-btn">${t("modal.close")} ✕</button>

    <div class="modal-hero bg-gradient-to-br ${app.color}">
      ${heroIconMarkup}
      <div>
        <div class="flex items-center gap-2 flex-wrap mb-1">
          <h2 class="text-2xl font-bold text-white">${name}</h2>
          ${badges}
        </div>
        <p class="text-white/80 text-sm">${app.developer}</p>
      </div>
    </div>

    <div class="modal-body">
      <!-- Screenshots -->
      <section class="modal-section">
        <h3 class="modal-section-title">${t("modal.screenshots")}</h3>
        ${screenshotsHtml}
      </section>

      <!-- Download -->
      <div class="play-store-btn">
        ${(app.playStoreUrl && app.playStoreUrl !== '#' && app.playStoreUrl.startsWith('http'))
          ? `<a href="${app.playStoreUrl}" target="_blank" rel="noopener noreferrer" class="play-store-link">
              <span class="play-store-link-icon">▶</span>
              <span class="play-store-link-text">
                <span class="play-store-link-sub">GET IT ON</span>
                <span class="play-store-link-main">Google Play</span>
              </span>
            </a>`
          : `<a href="javascript:void(0)" onclick="alert(currentLang === 'ko' ? '현재 구글 플레이 스토어 심사 및 출시 준비 중입니다. 곧 다운로드가 제공될 예정입니다!' : 'Google Play release is currently in preparation. Coming soon!');" class="play-store-link opacity-95">
              <span class="play-store-link-icon">⏳</span>
              <span class="play-store-link-text">
                <span class="play-store-link-sub">COMING SOON TO</span>
                <span class="play-store-link-main">Google Play</span>
              </span>
            </a>`
        }
      </div>

      <!-- Features -->
      <section class="modal-section">
        <h3 class="modal-section-title">${t("modal.features")}</h3>
        <ul class="space-y-2 text-slate-700 dark:text-slate-300">${featuresList}</ul>
      </section>

      <!-- Guide -->
      <section class="modal-section">
        <h3 class="modal-section-title">${t("modal.guide")}</h3>
        <div class="guide-box">
          <span class="text-2xl">💡</span>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed">${guide}</p>
        </div>
      </section>

      <!-- Version Info -->
      <section class="modal-section">
        <h3 class="modal-section-title">${t("modal.versionInfo")}</h3>
        <div class="version-table">
          ${[
            [t("modal.version"), app.version],
            [t("modal.updated"), app.updated],
            [t("modal.size"), app.size],
            [t("modal.requires"), app.requires],
            [t("modal.developer"), app.developer],
          ].map(([k, v]) => `
            <div class="version-row">
              <span class="version-key">${k}</span>
              <span class="version-val">${v}</span>
            </div>`).join("")}
        </div>
      </section>
    </div>`;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
  if (typeof setSiteTitle === "function") {
    setSiteTitle(`${name} | 일상의도움`);
  } else {
    document.title = `${name} | 일상의도움`;
  }
  setTimeout(() => modal.querySelector(".modal-panel").classList.add("modal-open"), 10);
}

function closeModal() {
  const panel = modal.querySelector(".modal-panel");
  if (panel) panel.classList.remove("modal-open");
  if (typeof restoreDefaultTitle === "function") {
    restoreDefaultTitle();
  } else {
    document.title = "일상의도움 (Daily Helper) | 스마트한 일상의 도구 모음";
  }
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
    currentModalApp = null;
  }, 300);
}

function moveGallery(dir) {
  const screenshots = currentModalApp?.activeScreenshots || currentModalApp?.screenshots;
  if (!screenshots) return;
  const count = screenshots.length;
  if (count === 0) return;
  currentGalleryIndex = (currentGalleryIndex + dir + count) % count;
  goGallery(currentGalleryIndex);
}

function goGallery(idx) {
  currentGalleryIndex = idx;
  const track = document.getElementById("gallery-track");
  if (track) track.style.transform = `translateX(-${idx * 100}%)`;
  document.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("dot-active", i === idx));
}

// ── Page Navigation ───────────────────────────────────────
const pages = { main: pageMain, about: pageAbout, privacy: pagePrivacy, terms: pageTerms, contact: pageContact, guide: pageGuide };

function showPage(name, targetTab, shouldPushState = true) {
  currentView = name || "main";
  window.currentView = currentView;
  try {
    document.documentElement.classList.remove("view-guide");
  } catch (_) {}

  if (typeof closeModal === "function") closeModal();

  ["main", "about", "privacy", "terms", "contact", "guide"].forEach((key) => {
    const el = pages[key] || document.getElementById(`page-${key}`);
    if (!el) return;
    const isTarget = (key === currentView);
    el.classList.toggle("hidden", !isTarget);
    el.style.display = isTarget ? "" : "none";
  });

  const isMain = (currentView === "main");
  const isGuide = (currentView === "guide");

  // Sync tab active states in header and mobile sub-nav
  const isApps = (currentMainTab === "apps");
  const appBtns = document.querySelectorAll(".tab-btn-apps, #tab-btn-apps");
  const toolBtns = document.querySelectorAll(".tab-btn-tools, #tab-btn-tools");

  if (isMain) {
    appBtns.forEach(b => {
      b.classList.toggle("active", isApps);
      b.setAttribute("aria-selected", isApps ? "true" : "false");
    });
    toolBtns.forEach(b => {
      b.classList.toggle("active", !isApps);
      b.setAttribute("aria-selected", !isApps ? "true" : "false");
    });
  } else {
    appBtns.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    toolBtns.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
  }

  // Manage Home SEO introduction box visibility (only on main Home 전체 보기)
  updateHomeSeoVisibility();

  if (isGuide) {
    if (targetTab) {
      currentGuideTab = resolveGuideAppId(targetTab);
    }
    renderGuideSubtabs();
    renderGuideContent();
  }

  // Determine clean URL path for History API
  let targetPath = "/";
  if (isGuide) {
    const slug = getGuideCanonicalSlug(currentGuideTab);
    targetPath = `/guide/${slug}`;
  } else if (currentView === "about") {
    targetPath = "/about";
  } else if (currentView === "privacy") {
    targetPath = "/privacy";
  } else if (currentView === "terms") {
    targetPath = "/terms";
  } else if (currentView === "contact") {
    targetPath = "/contact";
  } else {
    targetPath = "/";
  }

  if (shouldPushState && window.location.pathname !== targetPath) {
    try {
      history.pushState({ view: currentView, guideTab: currentGuideTab }, "", targetPath);
    } catch (_) {}
  }

  updateSeoForRoute(currentView, currentGuideTab);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setGuideTab(appId, shouldPushState = true) {
  const resolvedId = resolveGuideAppId(appId);
  currentGuideTab = resolvedId;
  const slug = getGuideCanonicalSlug(resolvedId);
  const targetPath = `/guide/${slug}`;

  if (shouldPushState && window.location.pathname !== targetPath) {
    try {
      history.pushState({ view: "guide", guideTab: resolvedId }, "", targetPath);
    } catch (_) {}
  }

  updateSeoForRoute("guide", resolvedId);
  renderGuideSubtabs();
  renderGuideContent();
}
window.setGuideTab = setGuideTab;

function openGuideTab(appId) {
  const resolvedId = resolveGuideAppId(appId);
  currentGuideTab = resolvedId;
  showPage("guide", resolvedId, true);
}
window.openGuideTab = openGuideTab;

function onGuideTabClick(event, appId) {
  if (event && !event.ctrlKey && !event.metaKey && !event.shiftKey && event.button === 0) {
    event.preventDefault();
  }
  setGuideTab(appId, true);
}
window.onGuideTabClick = onGuideTabClick;

function navigateRoute(event, targetPath) {
  if (event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) {
      return; // Allow open in new tab
    }
    event.preventDefault();
  }
  navigateToPath(targetPath);
}
window.navigateRoute = navigateRoute;

function navigateToPath(targetPath, shouldPushState = true) {
  const cleanPath = (targetPath || "/").toLowerCase().trim().replace(/\/+$/, "") || "/";

  if (cleanPath === "/guide" || cleanPath.startsWith("/guide/")) {
    const parts = cleanPath.split("/").filter(Boolean);
    const slug = parts[1] || "";
    const targetApp = slug ? resolveGuideAppId(slug) : "bakemerge";
    showPage("guide", targetApp, shouldPushState);
  } else if (cleanPath === "/about") {
    showPage("about", undefined, shouldPushState);
  } else if (cleanPath === "/privacy") {
    showPage("privacy", undefined, shouldPushState);
  } else if (cleanPath === "/terms") {
    showPage("terms", undefined, shouldPushState);
  } else if (cleanPath === "/contact") {
    showPage("contact", undefined, shouldPushState);
  } else if (cleanPath === "/tools" || cleanPath === "/web-tools") {
    if (currentView !== "main") showPage("main", undefined, false);
    switchMainTab("tools");
    if (shouldPushState && window.location.pathname !== "/") {
      try { history.pushState(null, "", "/"); } catch (_) {}
    }
  } else {
    showPage("main", undefined, shouldPushState);
  }
}
window.navigateToPath = navigateToPath;

function renderGuideSubtabs() {
  const container = document.getElementById("guide-subtabs");
  if (!container) return;

  container.innerHTML = guideAppsConfig.map(app => {
    const isActive = app.id === currentGuideTab;
    const name = currentLang === "ko" ? app.nameKo : app.nameEn;
    const typeBadge = currentLang === "ko" ? app.badgeKo : app.badgeEn;
    const badgeHtml = typeBadge
      ? `<span class="guide-tab-badge-type ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${app.type === 'tool' ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'}">${typeBadge}</span>`
      : "";
    const canonicalSlug = getGuideCanonicalSlug(app.id);
    const href = `/guide/${canonicalSlug}`;

    return `
      <a href="${href}"
         class="guide-tab-btn ${isActive ? 'guide-tab-active' : ''}"
         onclick="onGuideTabClick(event, '${app.id}')"
         role="tab"
         aria-selected="${isActive}">
        <span class="guide-tab-icon">${app.iconEmoji}</span>
        <span class="guide-tab-name">${name}</span>
        ${badgeHtml}
      </a>
    `;
  }).join("");
}

function renderGuideContent() {
  const container = document.getElementById("guide-content-area");
  if (!container) return;

  const appConfig = guideAppsConfig.find(a => a.id === currentGuideTab) || guideAppsConfig[0];
  const appName = currentLang === "ko" ? appConfig.nameKo : appConfig.nameEn;
  const appEmoji = appConfig.iconEmoji;

  if (appConfig.isReady) {
    const guideKey = `guide.${appConfig.id}`;
    const bodyHtml = t(`${guideKey}.body`);

    if (bodyHtml && !bodyHtml.startsWith("guide.")) {
      container.innerHTML = `
        <div class="guide-active-content animate-fadeIn">
          ${bodyHtml}
        </div>
      `;
    } else {
      const title = t(`${guideKey}.title`) || `${appName} - ${t("badge.guide")}`;
      const backBtnText = t("nav.backToHome");
      const detailBtnText = t(`${guideKey}.openDetailBtn`) || `${appName} ${t("card.detailBtn")}`;

      container.innerHTML = `
        <div class="guide-active-content animate-fadeIn">
          <h3 class="guide-app-title text-slate-900 dark:text-white font-bold text-xl md:text-2xl mb-6 flex items-center gap-2.5">
            <span class="text-2xl">${appEmoji}</span>
            <span>${title}</span>
          </h3>
          <div class="static-page-body">
            ${bodyHtml}
          </div>
          <div class="flex items-center gap-3 mt-8 flex-wrap">
            <button onclick="showPage('main')" class="detail-btn" style="max-width:200px;">
              ${backBtnText}
            </button>
            <button onclick="openModal('${appConfig.id}')" class="detail-btn" style="max-width:240px; background: linear-gradient(135deg, #4f46e5, #06b6d4); color: white; border: none;">
              ${appEmoji} <span>${detailBtnText}</span>
            </button>
          </div>
        </div>
      `;
    }
  } else {
    // 안내 카드 노출
    const noticeText = t("guide.comingSoonNotice");
    const comingSoonText = t("guide.tabComingSoon");
    const backBtnText = t("nav.backToHome");
    const defaultBtnText = currentLang === "ko" ? "Bake Merge 가이드 보기" : "View Bake Merge Guide";

    container.innerHTML = `
      <div class="guide-coming-soon-card animate-fadeIn">
        <div class="guide-cs-icon-wrap">
          <span class="text-4xl">${appEmoji}</span>
        </div>
        <h3 class="guide-cs-title text-slate-900 dark:text-white">${appName}</h3>
        <div>
          <span class="guide-cs-badge">${comingSoonText}</span>
        </div>
        <p class="guide-cs-notice">
          ${noticeText}
        </p>
        <div class="guide-cs-actions">
          <button type="button" onclick="setGuideTab('bakemerge')" class="guide-cs-btn-primary">
            🥐 <span>${defaultBtnText}</span>
          </button>
          <button type="button" onclick="showPage('main')" class="guide-cs-btn-secondary">
            ${backBtnText}
          </button>
        </div>
      </div>
    `;
  }
}

// ── Search ────────────────────────────────────────────────
function initSearch() {
  if (!searchInput) return;
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    if (currentMainTab === "apps") {
      renderApps();
    } else {
      if (typeof renderWebTools === "function") renderWebTools();
    }
    updateHomeSeoVisibility();
  });
}

// ── Event Listeners ───────────────────────────────────────
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    if (typeof closeWageCalcModal === "function") closeWageCalcModal();
    if (typeof closeCharByteModal === "function") closeCharByteModal();
    if (typeof closeExcelDelimiterModal === "function") closeExcelDelimiterModal();
    if (typeof closeAnnualLeaveModal === "function") closeAnnualLeaveModal();
    if (typeof closePdfCheckerModal === "function") closePdfCheckerModal();
  }
});

// 모달 외부 어두운 배경(오버레이) 클릭 시 창 닫힘 차단
// (우측 상단 X 버튼과 하단 닫기 버튼으로만 닫히도록 overlay click 이벤트 핸들러 제거)


// ── Scroll to Category (Header Quick Menu) ────────────────
/**
 * 헤더 카테고리 버튼 클릭 → 필터 적용 + 카테고리 탭으로 스무스 스크롤
 */
function scrollToCategory(cat) {
  // 1. 메인 페이지로 이동
  showPage('main');
  // 2. 모바일 앱 탭으로 전환
  if (currentMainTab !== 'apps') {
    switchMainTab('apps');
  }
  // 3. 카테고리 필터 적용 (active-cat 동기화 포함)
  setCategory(cat);
  // 4. 카테고리 탭 섹션으로 스무스 스크롤
  setTimeout(() => {
    const section = document.getElementById('category-section');
    if (section) {
      const headerH = document.querySelector('.site-header')?.offsetHeight || 64;
      const top = section.getBoundingClientRect().top + window.scrollY - headerH - 4;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, 80);
}

// ── Sticky Header Scroll Effect ────────────────────────
function initScrollHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // initial check
}

// ── Deep Link Handling (Direct URL Routing for Tools & Modals) ─────
function checkDeepLinks() {
  try {
    const rawHash = (window.location.hash || "").trim().toLowerCase();
    let hash = "";
    try {
      hash = decodeURIComponent(rawHash).replace(/^#/, "");
    } catch (_) {
      hash = rawHash.replace(/^#/, "");
    }
    const params = new URLSearchParams(window.location.search);
    const toolParam = (params.get("tool") || params.get("calc") || "").trim().toLowerCase();

    if (!hash && !toolParam) {
      if (typeof restoreDefaultTitle === "function") {
        restoreDefaultTitle();
      }
    }

    const wageCalcAliases = [
      "part-time-calculator",
      "parttime-calculator",
      "wage-calc",
      "wage-calculator",
      "part-time-calc",
      "알바계산기",
      "주휴수당계산기"
    ];

    if (wageCalcAliases.includes(hash) || wageCalcAliases.includes(toolParam)) {
      if (typeof showPage === "function") {
        showPage("main");
      }
      if (typeof switchMainTab === "function") {
        switchMainTab("tools");
      }
      const openWage = (typeof openWageCalcModal === "function") ? openWageCalcModal : window.openWageCalcModal;
      if (typeof openWage === "function") {
        openWage();
        setTimeout(openWage, 60);
      }
    }

    const charByteAliases = [
      "char-byte-counter",
      "char-counter",
      "byte-counter",
      "character-counter",
      "word-counter",
      "charbytecounter",
      "charbyte",
      "글자수세기",
      "글자수계산기",
      "바이트계산기",
      "자소서글자수",
      "자소서글자수세기",
      "자소서바이트",
      "자소서-글자수",
      "자소서",
      "글자수",
      "바이트"
    ];

    if (charByteAliases.includes(hash) || charByteAliases.includes(toolParam)) {
      if (typeof showPage === "function") {
        showPage("main");
      }
      if (typeof switchMainTab === "function") {
        switchMainTab("tools");
      }
      const openChar = (typeof openCharByteModal === "function") ? openCharByteModal : window.openCharByteModal;
      if (typeof openChar === "function") {
        openChar();
        setTimeout(openChar, 60);
      }
    }

    const excelDelimiterAliases = [
      "excel-delimiter-converter",
      "excel-delimiter",
      "excel-converter",
      "excel-to-comma",
      "line-to-delimiter",
      "excel-line-break",
      "excel-line-break-to-comma",
      "column-to-comma",
      "column-to-comma-converter",
      "excel-to-comma-converter",
      "엑셀줄바꿈변환기",
      "엑셀줄바꿈쉼표변환",
      "엑셀줄바꿈쉼표",
      "엑셀쉼표변환기",
      "엑셀변환기",
      "엑셀구분자",
      "엑셀열가로로",
      "구분자변환기",
      "텍스트줄바꿈제거",
      "줄바꿈변환기",
      "엑셀쉼표",
      "줄바꿈쉼표",
      "sqlin변환기",
      "sql-in-변환기",
      "sqlin",
      "sql-in"
    ];

    if (excelDelimiterAliases.includes(hash) || excelDelimiterAliases.includes(toolParam)) {
      if (typeof showPage === "function") {
        showPage("main");
      }
      if (typeof switchMainTab === "function") {
        switchMainTab("tools");
      }
      const openExcel = (typeof openExcelDelimiterModal === "function") ? openExcelDelimiterModal : window.openExcelDelimiterModal;
      if (typeof openExcel === "function") {
        openExcel();
        setTimeout(openExcel, 60);
      }
    }

    const annualLeaveAliases = [
      "annual-leave-calculator",
      "annual-leave",
      "annual-leave-calc",
      "leave-calc",
      "leave-calculator",
      "annualleave",
      "annualleavecalculator",
      "연차계산기",
      "연차계산",
      "연차자동계산기",
      "근로기준법연차계산기",
      "연차-계산기",
      "월차계산기",
      "회계연도연차계산기",
      "연차"
    ];

    if (annualLeaveAliases.includes(hash) || annualLeaveAliases.includes(toolParam)) {
      if (typeof showPage === "function") {
        showPage("main");
      }
      if (typeof switchMainTab === "function") {
        switchMainTab("tools");
      }
      const openLeave = (typeof openAnnualLeaveModal === "function") ? openAnnualLeaveModal : window.openAnnualLeaveModal;
      if (typeof openLeave === "function") {
        openLeave();
        setTimeout(openLeave, 60);
      }
    }

    const pdfCheckerAliases = [
      "pdf-checker",
      "pdf-checker-modal",
      "pdf-marking",
      "drawing-checker",
      "pdf-jpg-checker",
      "blueprint-checker",
      "pdfchecker",
      "pdf검토",
      "도면검토",
      "도면마킹",
      "도면검토툴",
      "pdf마킹",
      "도면"
    ];

    if (pdfCheckerAliases.includes(hash) || pdfCheckerAliases.includes(toolParam)) {
      if (typeof showPage === "function") {
        showPage("main");
      }
      if (typeof switchMainTab === "function") {
        switchMainTab("tools");
      }
      const openPdf = (typeof openPdfCheckerModal === "function") ? openPdfCheckerModal : window.openPdfCheckerModal;
      if (typeof openPdf === "function") {
        openPdf();
        setTimeout(openPdf, 60);
      }
    }

    if (hash === "guide" || hash.startsWith("guide-") || hash.startsWith("guide/")) {
      const targetGuide = hash.replace(/^guide[-/]?/, "");
      const resolved = resolveGuideAppId(targetGuide);
      if (typeof showPage === "function") {
        showPage("guide", resolved, false);
      }
    }
  } catch (err) {
    console.warn("Deep link handling error:", err);
  }
}

function initDeepLinks() {
  checkDeepLinks();
  window.addEventListener("hashchange", checkDeepLinks);
  window.addEventListener("load", checkDeepLinks);
  window.addEventListener("popstate", () => {
    const route = resolveCurrentRoute();
    currentView = route.view;
    window.currentView = currentView;
    if (route.mainTab) currentMainTab = route.mainTab;
    if (route.guideTab) currentGuideTab = route.guideTab;

    showPage(currentView, currentGuideTab, false);
    if (currentView === "main" && route.mainTab) {
      switchMainTab(route.mainTab);
    }
  });
}

// Immediate check on script parse
try {
  checkDeepLinks();
} catch (_) {}

// ── Init ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  initDarkMode();
  updateLangToggle();

  // 1. Synchronously resolve route and enforce view state immediately before async operations
  const initialRoute = resolveCurrentRoute();
  currentView = initialRoute.view;
  window.currentView = currentView;
  if (initialRoute.mainTab) currentMainTab = initialRoute.mainTab;
  if (initialRoute.guideTab) currentGuideTab = initialRoute.guideTab;

  showPage(currentView, currentGuideTab, false);

  // Immediate trigger for direct hash link entry
  initDeepLinks();

  await loadAppsData();
  if (typeof loadWebToolsData === "function") {
    await loadWebToolsData();
  }
  if (categoriesData.length > 0 && !categoriesData.some(c => c.id === activeCategory)) {
    activeCategory = categoriesData[0].id;
  }
  buildHeaderCatNav();
  buildFilters();
  applyTranslations();
  renderApps();
  if (typeof renderWebTools === "function") {
    renderWebTools();
  }
  if (currentView === "guide") {
    renderGuideSubtabs();
    renderGuideContent();
    updateSeoForRoute("guide", currentGuideTab);
  }
  initSearch();
  initScrollHeader();

  // Mark app grid as loaded and smoothly reveal bottom service info box
  isAppGridLoaded = true;
  updateHomeSeoVisibility();

  // Re-verify after data load and render
  checkDeepLinks();
  if (typeof updateCharByteStats === "function") {
    updateCharByteStats();
  }
});

