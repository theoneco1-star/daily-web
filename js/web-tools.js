/**
 * Daily Helper (일상의도움) — Web Tools Manager & Utilities
 * Manages web tools data, rendering, and interactive tool modals.
 */

// ── Default Web Tools Data (Instant fallback & offline ready) ──
let webToolsData = [
  {
    id: "wage-calc",
    nameKo: "실수령액 & 주휴수당 계산기",
    nameEn: "Net Salary & Holiday Allowance Calculator",
    targetLang: "KO",
    isKrOnly: true,
    category: "salary",
    color: "from-blue-600 via-indigo-600 to-violet-600",
    iconEmoji: "🧮",
    isHot: true,
    isFree: true,
    isNew: true,
    badges: ["HOT", "무료 도구"],
    descKo: "시급과 근무시간만 입력하면 주휴수당과 4대보험/3.3% 공제액을 1초 만에 자동 계산합니다.",
    descEn: "Automatically calculate weekly holiday allowances and 4 major insurances/3.3% deductions in seconds just by entering hourly wage and working hours.",
    tagsKo: ["알바계산기", "주휴수당", "실수령액", "급여계산"],
    tagsEn: ["PartTimeCalc", "HolidayPay", "NetSalary", "WageCalc"],
    ctaTextKo: "바로 사용하기",
    ctaTextEn: "Use Tool Now",
    actionType: "modal",
    targetModal: "wage-calc"
  }
];

let webToolsCategories = [
  { id: "all", nameKo: "전체", nameEn: "All" },
  { id: "salary", nameKo: "급여/세무", nameEn: "Salary & Tax" },
  { id: "utility", nameKo: "생활/계산", nameEn: "Living & Calc" }
];

/**
 * Load web tools data from data/web-tools.json
 */
async function loadWebToolsData() {
  try {
    const response = await fetch("data/web-tools.json?v=" + Date.now(), { cache: "no-cache" });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.tools) && data.tools.length > 0) {
        webToolsData = data.tools;
      }
      if (Array.isArray(data.categories) && data.categories.length > 0) {
        webToolsCategories = data.categories;
      }
    }
  } catch (err) {
    console.warn("Using default webToolsData fallback:", err);
  }
  if (typeof updateTabBadges === "function") {
    updateTabBadges();
  }
  if (typeof updateHeroCount === "function") {
    updateHeroCount();
  }
  return webToolsData;
}

/**
 * Check if a web tool is available for the given language ('ko' or 'en')
 * - KO mode: Shows tools with targetLang 'KO', 'ALL', isKrOnly: true, or default
 * - EN mode: Hides tools with targetLang 'KO' or isKrOnly: true. Shows 'ALL' or 'EN'
 */
function isToolAvailableForLang(tool, lang) {
  if (!tool) return false;
  const currentLanguage = lang || (typeof currentLang !== "undefined" ? currentLang : "ko");
  const target = (tool.targetLang || "").toUpperCase();
  const isKrOnly = tool.isKrOnly === true || target === "KO" || target === "KR";

  if (currentLanguage === "en") {
    // EN mode: Filter out Korean-specific tools
    if (isKrOnly || target === "KO" || target === "KR") {
      return false;
    }
    return target === "ALL" || target === "EN" || (!target && !tool.isKrOnly);
  }

  // KO mode: Hide EN-only tools if any, otherwise visible
  if (target === "EN") {
    return false;
  }
  return true;
}

/**
 * Get all web tools available for the active language
 */
function getAvailableWebTools(lang) {
  if (!Array.isArray(webToolsData)) return [];
  const currentLanguage = lang || (typeof currentLang !== "undefined" ? currentLang : "ko");
  return webToolsData.filter((tool) => isToolAvailableForLang(tool, currentLanguage));
}

/**
 * Filter available web tools by search query
 */
function getFilteredWebTools() {
  const available = getAvailableWebTools();
  const query = typeof searchQuery !== "undefined" ? searchQuery.toLowerCase().trim() : "";
  if (!query) return available;

  return available.filter((tool) => {
    const name = (currentLang === "ko" ? tool.nameKo : tool.nameEn).toLowerCase();
    const desc = (currentLang === "ko" ? tool.descKo : tool.descEn).toLowerCase();
    const tagsArr = (currentLang === "ko" ? tool.tagsKo : tool.tagsEn) || [];
    const tagsStr = tagsArr.join(" ").toLowerCase();
    return name.includes(query) || desc.includes(query) || tagsStr.includes(query);
  });
}

/**
 * Render Web Tools Card Grid
 */
function renderWebTools() {
  const toolsGrid = document.getElementById("web-tools-grid");
  if (!toolsGrid) return;

  const available = getAvailableWebTools();
  const filtered = getFilteredWebTools();

  // Update count badges across header and hero
  if (typeof updateTabBadges === "function") {
    updateTabBadges();
  }
  if (typeof updateHeroCount === "function") {
    updateHeroCount();
  }

  // Case 1: When 0 tools are available for current language (e.g. EN mode)
  if (available.length === 0) {
    const isEn = (typeof currentLang !== "undefined" ? currentLang : "ko") === "en";
    const comingSoonTitle = isEn
      ? "New Global Web Tools Coming Soon!"
      : (t("webTools.globalComingSoonTitle") || "새로운 글로벌 웹 도구가 곧 출시됩니다!");
    const comingSoonSubtitle = isEn
      ? "We are currently preparing useful online tools for global users."
      : (t("webTools.globalComingSoonSubtitle") || "전 세계 사용자를 위한 유용한 온라인 도구를 준비하고 있습니다.");

    toolsGrid.innerHTML = `
      <div class="col-span-full">
        <div class="web-tools-coming-soon-card">
          <div class="coming-soon-badge-wrap">
            <span class="coming-soon-pill">
              <span class="coming-soon-pulse-dot"></span>
              <span>GLOBAL WEB TOOLS</span>
            </span>
          </div>
          <div class="coming-soon-icon-wrap">
            <div class="coming-soon-icon-glow"></div>
            <span class="coming-soon-icon">🌐</span>
          </div>
          <h3 class="coming-soon-title">${comingSoonTitle}</h3>
          <p class="coming-soon-sub">${comingSoonSubtitle}</p>
          <div class="coming-soon-preview-label">Upcoming Utilities</div>
          <div class="coming-soon-tags">
            <span class="coming-soon-tag"><span>🕒</span> World Time & Timezone</span>
            <span class="coming-soon-tag"><span>💱</span> Currency & Exchange Rate</span>
            <span class="coming-soon-tag"><span>📐</span> Smart Unit Converter</span>
            <span class="coming-soon-tag"><span>📝</span> Markdown & JSON Tools</span>
          </div>
        </div>
      </div>`;
    return;
  }

  // Case 2: Tools are available, but search query yielded 0 results
  if (filtered.length === 0) {
    const emptyTitle = t("webTools.emptyTitle") || (currentLang === "ko" ? "검색된 웹 도구가 없습니다" : "No web tools found");
    const emptySub = t("webTools.emptySubtitle") || (currentLang === "ko" ? "다른 키워드로 검색해 보세요." : "Try a different search term.");

    toolsGrid.innerHTML = `
      <div class="col-span-full flex flex-col items-center justify-center py-20 text-center">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">${emptyTitle}</h3>
        <p class="text-slate-500 dark:text-slate-400">${emptySub}</p>
      </div>`;
    return;
  }

  // Case 3: Render visible tool cards
  let html = "";
  filtered.forEach((tool) => {
    html += buildWebToolCard(tool);
  });
  toolsGrid.innerHTML = html;
}

/**
 * Build HTML for a single Web Tool Card
 */
function buildWebToolCard(tool) {
  const name = currentLang === "ko" ? tool.nameKo : tool.nameEn;
  const desc = currentLang === "ko" ? tool.descKo : tool.descEn;
  const tagsList = (currentLang === "ko" ? tool.tagsKo : tool.tagsEn) || [];
  const ctaText = (currentLang === "ko" ? tool.ctaTextKo : tool.ctaTextEn) || (currentLang === "ko" ? "바로 사용하기" : "Use Tool Now");

  // Badges
  const hotBadgeText = t("webTools.badgeHot") || "HOT";
  const freeBadgeText = t("webTools.badgeFree") || (currentLang === "ko" ? "무료 도구" : "Free Tool");

  const badgesHtml = `
    <span class="badge badge-hot">🔥 ${hotBadgeText}</span>
    <span class="badge badge-tool-free">✨ ${freeBadgeText}</span>
  `;

  // Tags
  const tagsHtml = tagsList.length > 0
    ? `<div class="app-tags-wrap">
        ${tagsList.map(tag => `<span class="app-tag">#${tag}</span>`).join("")}
      </div>`
    : "";

  return `
    <div class="app-card web-tool-card" onclick="handleWebToolAction('${tool.id}')">
      <div class="app-card-inner">
        <div class="flex items-start gap-3 mb-3">
          <div class="app-icon-wrap bg-gradient-to-br ${tool.color}">
            <span class="text-2xl">${tool.iconEmoji || "⚡"}</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-1.5 flex-wrap">
              <h3 class="app-card-title">${name}</h3>
              ${badgesHtml}
            </div>
            <span class="cat-badge web-tool-cat-badge">Web Utility</span>
          </div>
        </div>
        <p class="app-card-desc">${desc}</p>
        ${tagsHtml}
        <button class="detail-btn web-tool-cta-btn mt-auto" onclick="event.stopPropagation(); handleWebToolAction('${tool.id}')">
          <span>${ctaText}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </button>
      </div>
    </div>`;
}

/**
 * Handle Web Tool Click / Action
 */
function handleWebToolAction(toolId) {
  if (toolId === "wage-calc") {
    openWageCalcModal();
  }
}

// ═════════════════════════════════════════════════════════════
// 🧮 Wage & Holiday Allowance Calculator Logic & Modal
// ═════════════════════════════════════════════════════════════

const MIN_HOURLY_WAGE_2026 = 10030; // 2026/2025 대한민국 법정 최저시급

let wageCalcState = {
  hourlyWage: MIN_HOURLY_WAGE_2026,
  weeklyHours: 40,
  workDays: 5,
  deductionType: "freelance" // "none" | "freelance" (3.3%) | "four" (~9.4%)
};

/**
 * Open Wage Calculator Modal
 */
function openWageCalcModal() {
  const modal = document.getElementById("tool-wage-calc-modal");
  if (!modal) return;

  // Initialize input values
  const inputWage = document.getElementById("wage-input-hourly");
  const inputHours = document.getElementById("wage-input-hours");
  const inputDays = document.getElementById("wage-input-days");

  if (inputWage) inputWage.value = wageCalcState.hourlyWage;
  if (inputHours) inputHours.value = wageCalcState.weeklyHours;
  if (inputDays) inputDays.value = wageCalcState.workDays;

  // Radio button sync
  const radio = modal.querySelector(`input[name="wage-deduction"][value="${wageCalcState.deductionType}"]`);
  if (radio) radio.checked = true;

  calculateWage();

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    const panel = modal.querySelector(".modal-panel");
    if (panel) panel.classList.add("modal-open");
  }, 10);
}

/**
 * Close Wage Calculator Modal
 */
function closeWageCalcModal() {
  const modal = document.getElementById("tool-wage-calc-modal");
  if (!modal) return;

  const panel = modal.querySelector(".modal-panel");
  if (panel) panel.classList.remove("modal-open");

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  }, 250);
}

/**
 * Set hourly wage preset
 */
function setWagePreset(val) {
  wageCalcState.hourlyWage = Number(val);
  const inputWage = document.getElementById("wage-input-hourly");
  if (inputWage) inputWage.value = val;
  calculateWage();
}

/**
 * Set hours preset
 */
function setHoursPreset(val) {
  wageCalcState.weeklyHours = Number(val);
  const inputHours = document.getElementById("wage-input-hours");
  if (inputHours) inputHours.value = val;
  calculateWage();
}

/**
 * Set deduction type from radio input
 */
function setDeductionType(type) {
  wageCalcState.deductionType = type;
  calculateWage();
}

/**
 * Core Wage & Holiday Allowance Calculation
 */
function calculateWage() {
  const inputWage = document.getElementById("wage-input-hourly");
  const inputHours = document.getElementById("wage-input-hours");
  const inputDays = document.getElementById("wage-input-days");

  if (inputWage) wageCalcState.hourlyWage = Math.max(0, parseInt(inputWage.value) || 0);
  if (inputHours) wageCalcState.weeklyHours = Math.max(0, parseFloat(inputHours.value) || 0);
  if (inputDays) wageCalcState.workDays = Math.max(1, Math.min(7, parseInt(inputDays?.value) || 5));

  const { hourlyWage, weeklyHours, deductionType } = wageCalcState;
  const WEEKS_PER_MONTH = 4.345; // 통상 한달 평균 주수 (365 / 7 / 12)

  // 1. 기본급 (월)
  const monthlyBasePay = Math.round(hourlyWage * weeklyHours * WEEKS_PER_MONTH);

  // 2. 주휴수당 (1주 15시간 이상 근무 시 발생)
  let weeklyHolidayHours = 0;
  let isHolidayPayEligible = weeklyHours >= 15;

  if (isHolidayPayEligible) {
    if (weeklyHours >= 40) {
      weeklyHolidayHours = 8;
    } else {
      // 주 15시간 이상 40시간 미만 비례 계산: (주간근무시간 / 40) * 8
      weeklyHolidayHours = (weeklyHours / 40) * 8;
    }
  }

  const weeklyHolidayPay = Math.round(weeklyHolidayHours * hourlyWage);
  const monthlyHolidayPay = Math.round(weeklyHolidayPay * WEEKS_PER_MONTH);

  // 3. 세전 총 급여 (월)
  const monthlyGrossPay = monthlyBasePay + monthlyHolidayPay;

  // 4. 공제액 계산
  let deductionRate = 0;
  let deductionAmount = 0;

  if (deductionType === "freelance") {
    deductionRate = 0.033;
    deductionAmount = Math.round(monthlyGrossPay * deductionRate);
  } else if (deductionType === "four") {
    // 4대보험 근로자 부담분: 국민연금 4.5% + 건강보험 3.545% + 요양보험(건보의 12.95%) + 고용보험 0.9% ≈ 9.4%
    deductionRate = 0.094;
    deductionAmount = Math.round(monthlyGrossPay * deductionRate);
  } else {
    deductionAmount = 0;
  }

  // 5. 세후 실수령액 (월)
  const monthlyNetPay = Math.max(0, monthlyGrossPay - deductionAmount);

  // Update UI Elements
  const elBasePay = document.getElementById("res-base-pay");
  const elHolidayPay = document.getElementById("res-holiday-pay");
  const elGrossPay = document.getElementById("res-gross-pay");
  const elDeduction = document.getElementById("res-deduction");
  const elNetPay = document.getElementById("res-net-pay");
  const elBadgeNotice = document.getElementById("wage-eligibility-badge");

  const fmt = (num) => Number(num || 0).toLocaleString("ko-KR");

  if (elBasePay) elBasePay.textContent = `${fmt(monthlyBasePay)}원`;
  if (elHolidayPay) {
    elHolidayPay.textContent = isHolidayPayEligible ? `${fmt(monthlyHolidayPay)}원` : (currentLang === "ko" ? "0원 (미발생)" : "0 KRW");
  }
  if (elGrossPay) elGrossPay.textContent = `${fmt(monthlyGrossPay)}원`;
  if (elDeduction) elDeduction.textContent = deductionAmount > 0 ? `-${fmt(deductionAmount)}원` : "0원";
  if (elNetPay) elNetPay.textContent = `${fmt(monthlyNetPay)}원`;

  if (elBadgeNotice) {
    if (isHolidayPayEligible) {
      elBadgeNotice.className = "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60";
      elBadgeNotice.innerHTML = `<span>✅</span> <span>${currentLang === "ko" ? `주 ${weeklyHours}시간 근무 : 주휴수당 발생 대상 (주당 +${weeklyHolidayHours.toFixed(1)}시간분)` : `15+ hrs/week: Holiday Allowance Applied (+${weeklyHolidayHours.toFixed(1)}h/wk)`}</span>`;
    } else {
      elBadgeNotice.className = "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60";
      elBadgeNotice.innerHTML = `<span>⚠️</span> <span>${currentLang === "ko" ? "주 15시간 미만 근무 : 주휴수당 미적용 대상" : "Under 15 hrs/week: Ineligible for Holiday Allowance"}</span>`;
    }
  }
}

/**
 * Copy calculation result summary to clipboard
 */
function copyWageResult() {
  const { hourlyWage, weeklyHours, deductionType } = wageCalcState;
  const fmt = (num) => Number(num || 0).toLocaleString("ko-KR");

  const elNetPay = document.getElementById("res-net-pay")?.textContent || "";
  const elBasePay = document.getElementById("res-base-pay")?.textContent || "";
  const elHolidayPay = document.getElementById("res-holiday-pay")?.textContent || "";
  const elDeduction = document.getElementById("res-deduction")?.textContent || "";

  const deductionLabel = deductionType === "freelance" ? "3.3% 프리랜서" : deductionType === "four" ? "4대보험" : "미적용";

  const textToCopy = `[Daily Helper 실수령액 & 주휴수당 계산 결과]
- 시급: ${fmt(hourlyWage)}원
- 1주 근무시간: ${weeklyHours}시간
- 공제 기준: ${deductionLabel}
-----------------------------
- 월 기본급: ${elBasePay}
- 월 주휴수당: ${elHolidayPay}
- 예상 공제액: ${elDeduction}
★ 최종 예상 실수령액: ${elNetPay}
(출처: https://www.dailyhelperhub.com/)`;

  navigator.clipboard.writeText(textToCopy).then(() => {
    const copyBtn = document.getElementById("btn-copy-wage-res");
    if (copyBtn) {
      const origText = copyBtn.innerHTML;
      copyBtn.innerHTML = `<span>✓</span> <span>${currentLang === "ko" ? "복사 완료!" : "Copied!"}</span>`;
      copyBtn.classList.add("bg-emerald-600");
      setTimeout(() => {
        copyBtn.innerHTML = origText;
        copyBtn.classList.remove("bg-emerald-600");
      }, 2000);
    }
  }).catch((err) => {
    console.error("Clipboard copy failed:", err);
  });
}

// Global modal overlay dismiss for Wage Calc Modal
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("tool-wage-calc-modal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeWageCalcModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeWageCalcModal();
  });
});
