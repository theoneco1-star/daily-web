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

// ── State ─────────────────────────────────────────────────
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
  return catId;
}

// ── Category Navigation & Filters ─────────────────────────
function buildHeaderCatNav() {
  const headerNav = document.getElementById("header-cat-nav");
  if (!headerNav) return;
  const cats = (typeof categoriesData !== "undefined" && categoriesData.length > 0)
    ? categoriesData.map(c => c.id)
    : ["all", "tools", "utility", "daily", "kids"];

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
    : ["all", "tools", "utility", "daily", "kids"];

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
}

// ── App Rendering ─────────────────────────────────────────
function getFilteredApps() {
  if (typeof appsData === "undefined") return [];
  return appsData.filter(app => {
    const matchCat = activeCategory === "all" || app.category === activeCategory;
    const name = (currentLang === "ko" ? app.nameKo : app.nameEn).toLowerCase();
    const desc = (currentLang === "ko" ? app.descKo : app.descEn).toLowerCase();
    const tagsArr = (currentLang === "ko" ? app.tagsKo || app.tags : app.tagsEn || app.tags) || [];
    const tagsStr = Array.isArray(tagsArr) ? tagsArr.join(" ").toLowerCase() : "";
    const matchSearch = !searchQuery || name.includes(searchQuery) || desc.includes(searchQuery) || tagsStr.includes(searchQuery);
    return matchCat && matchSearch;
  });
}

function renderApps() {
  if (!appGrid) return;
  buildFilters();
  applyTranslations();
  const filtered = getFilteredApps();

  // Update hero count
  if (heroCount) {
    const totalCount = typeof appsData !== "undefined" ? appsData.length : 0;
    heroCount.textContent = searchQuery
      ? `${filtered.length} ${t("hero.resultsFound")}`
      : `${totalCount} ${t("hero.totalApps")}`;
  }

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
    ? `<img src="${app.icon}" alt="${name}" class="w-8 h-8 object-contain rounded-lg" onerror="this.onerror=null; this.outerHTML='<span class=\\'text-2xl\\'>${fallbackEmoji}</span>';"/>`
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
    ? `<div class="modal-hero-icon flex items-center justify-center overflow-hidden"><img src="${app.icon}" alt="${name}" class="w-12 h-12 object-contain" onerror="this.onerror=null; this.parentElement.outerHTML='<div class=\\'modal-hero-icon\\'>${fallbackEmoji}</div>';"/></div>`
    : `<div class="modal-hero-icon">${app.icon || fallbackEmoji}</div>`;

  const screenshotsHtml = (app.screenshots && app.screenshots.length)
    ? `<div class="modal-screenshot-showcase">
        <div class="phone-device-frame">
          <div class="phone-device-speaker"></div>
          <div class="phone-device-camera"></div>
          <div class="phone-device-screen">
            ${app.screenshots.length === 1
              ? `<img src="${app.screenshots[0]}" class="phone-screenshot-img" alt="${name} screenshot" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'p-8 text-center text-slate-400 dark:text-slate-500\\'>🖼️ 스크린샷 이미지 준비 중입니다.</div>';"/>`
              : `<div class="gallery-track" id="gallery-track">
                  ${app.screenshots.map(s => `<img src="${s}" class="phone-screenshot-img flex-shrink-0 w-full" alt="screenshot"/>`).join("")}
                </div>`
            }
          </div>
          <div class="phone-device-home"></div>
          ${app.screenshots.length > 1 ? `
          <button class="gallery-btn gallery-btn-prev" onclick="moveGallery(-1)">&#8249;</button>
          <button class="gallery-btn gallery-btn-next" onclick="moveGallery(1)">&#8250;</button>
          <div class="gallery-dots" id="gallery-dots">
            ${app.screenshots.map((_, i) => `<button class="dot ${i === 0 ? 'dot-active' : ''}" onclick="goGallery(${i})"></button>`).join("")}
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
        <a href="${app.playStoreUrl}" target="_blank" rel="noopener noreferrer" class="play-store-link">
          <span class="play-store-link-icon">▶</span>
          <span class="play-store-link-text">
            <span class="play-store-link-sub">GET IT ON</span>
            <span class="play-store-link-main">Google Play</span>
          </span>
        </a>
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
  setTimeout(() => modal.querySelector(".modal-panel").classList.add("modal-open"), 10);
}

function closeModal() {
  const panel = modal.querySelector(".modal-panel");
  if (panel) panel.classList.remove("modal-open");
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
    currentModalApp = null;
  }, 300);
}

function moveGallery(dir) {
  if (!currentModalApp || !currentModalApp.screenshots) return;
  const count = currentModalApp.screenshots.length;
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

function showPage(name) {
  if (typeof closeModal === "function") closeModal();
  Object.entries(pages).forEach(([key, el]) => {
    if (!el) return;
    el.classList.toggle("hidden", key !== name);
  });
  if (name === "guide") {
    renderGuideSubtabs();
    renderGuideContent();
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ── App Guide Subtabs Configuration & Management ───────────
const guideAppsConfig = [
  {
    id: "timekeeper",
    nameKo: "TimeKeeper",
    nameEn: "TimeKeeper",
    iconEmoji: "⏱️",
    isReady: true,
  },
  {
    id: "daycount",
    nameKo: "DayCount",
    nameEn: "DayCount",
    iconEmoji: "📅",
    isReady: false,
  },
  {
    id: "clipflow",
    nameKo: "ClipFlow",
    nameEn: "ClipFlow",
    iconEmoji: "📋",
    isReady: false,
  },
  {
    id: "freshcue",
    nameKo: "FreshCue",
    nameEn: "FreshCue",
    iconEmoji: "🥬",
    isReady: false,
  }
];

let currentGuideTab = "timekeeper";

function setGuideTab(appId) {
  currentGuideTab = appId;
  renderGuideSubtabs();
  renderGuideContent();
}

function renderGuideSubtabs() {
  const container = document.getElementById("guide-subtabs");
  if (!container) return;

  const comingSoonText = t("guide.tabComingSoon");

  container.innerHTML = guideAppsConfig.map(app => {
    const isActive = app.id === currentGuideTab;
    const isReady = !!app.isReady;
    const name = currentLang === "ko" ? app.nameKo : app.nameEn;
    const badgeHtml = !isReady
      ? `<span class="guide-tab-badge">${comingSoonText}</span>`
      : "";

    return `
      <button type="button" 
              class="guide-tab-btn ${isActive ? 'guide-tab-active' : ''}" 
              onclick="setGuideTab('${app.id}')"
              role="tab"
              aria-selected="${isActive}">
        <span class="guide-tab-icon">${app.iconEmoji}</span>
        <span class="guide-tab-name">${name}</span>
        ${badgeHtml}
      </button>
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
    const title = t(`${guideKey}.title`) || `${appName} - ${t("badge.guide")}`;
    const bodyHtml = t(`${guideKey}.body`);
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
  } else {
    // 준비 중인 다른 앱 안내 카드 노출
    const noticeText = t("guide.comingSoonNotice");
    const comingSoonText = t("guide.tabComingSoon");
    const backBtnText = t("nav.backToHome");
    const timekeeperBtnText = currentLang === "ko" ? "TimeKeeper 가이드 보기" : "View TimeKeeper Guide";

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
          <button type="button" onclick="setGuideTab('timekeeper')" class="guide-cs-btn-primary">
            ⏱️ <span>${timekeeperBtnText}</span>
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
    renderApps();
  });
}

// ── Event Listeners ───────────────────────────────────────
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Close modal on overlay click
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

// ── Scroll to Category (Header Quick Menu) ────────────────
/**
 * 헤더 카테고리 버튼 클릭 → 필터 적용 + 카테고리 탭으로 스무스 스크롤
 */
function scrollToCategory(cat) {
  // 1. 메인 페이지로 이동
  showPage('main');
  // 2. 카테고리 필터 적용 (active-cat 동기화 포함)
  setCategory(cat);
  // 3. 카테고리 탭 섹션으로 스무스 스크롤
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

// ── Init ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  initDarkMode();
  updateLangToggle();
  await loadAppsData();
  if (categoriesData.length > 0 && !categoriesData.some(c => c.id === activeCategory)) {
    activeCategory = categoriesData[0].id;
  }
  buildHeaderCatNav();
  buildFilters();
  applyTranslations();
  renderApps();
  renderGuideSubtabs();
  renderGuideContent();
  initSearch();
  initScrollHeader();
});
