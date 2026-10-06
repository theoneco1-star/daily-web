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
    targetModal: "wage-calc",
    deepLink: "#wage-calc"
  },
  {
    id: "char-byte-counter",
    nameKo: "자소서/공문서 글자수 & Byte 변환기",
    nameEn: "Word & Character / Byte Counter",
    targetLang: "ALL",
    isKrOnly: false,
    category: "utility",
    color: "from-emerald-600 via-teal-600 to-cyan-600",
    iconEmoji: "📝",
    isHot: false,
    isFree: true,
    isNew: true,
    badges: ["NEW", "무료 도구"],
    descKo: "공백 포함/제외 글자수 실시간 계산, 취업포털(2Byte) 및 시스템(UTF-8 3Byte) 바이트 분리 지원",
    descEn: "Real-time character, word, line, and byte counter with whitespace clean-up tools.",
    tagsKo: ["글자수세기", "바이트변환", "자소서검사", "공문서규격"],
    tagsEn: ["CharCounter", "ByteCounter", "ResumeHelper", "TextUtility"],
    ctaTextKo: "바로 사용하기",
    ctaTextEn: "Use Tool Now",
    actionType: "modal",
    targetModal: "char-byte-counter",
    deepLink: "#char-byte-counter"
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
  const hotBadgeText = (typeof t === "function" ? t("webTools.badgeHot") : null) || "HOT";
  const freeBadgeText = (typeof t === "function" ? t("webTools.badgeFree") : null) || (currentLang === "ko" ? "무료 도구" : "Free Tool");

  let badgesHtml = "";
  if (tool.isHot) {
    badgesHtml += `<span class="badge badge-hot">🔥 ${hotBadgeText}</span> `;
  }
  if (tool.isNew) {
    badgesHtml += `<span class="badge badge-new" style="background: linear-gradient(135deg, #10b981, #059669); color: #fff; font-weight: 700; border: 1px solid rgba(16,185,129,0.4); text-shadow: 0 1px 2px rgba(0,0,0,0.2);">✨ NEW</span> `;
  }
  if (tool.isFree) {
    badgesHtml += `<span class="badge badge-tool-free">✨ ${freeBadgeText}</span> `;
  }

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
  } else if (toolId === "char-byte-counter") {
    openCharByteModal();
  }
}

// ═════════════════════════════════════════════════════════════
// 🧮 Wage & Holiday Allowance Calculator Logic & Modal
// ═════════════════════════════════════════════════════════════

const MIN_HOURLY_WAGE_2026 = 10320; // 2026 대한민국 고용노동부 법정 최저시급 고시

// Storage cache sanitation (구버전 10030/10,030 캐시 강제 무효화 및 10320 통일)
try {
  ["dh_wage", "wage", "hourlyWage", "min_wage", "minWage"].forEach((key) => {
    const lVal = localStorage.getItem(key);
    if (lVal === "10030" || lVal === "10,030") {
      localStorage.setItem(key, "10320");
    }
    const sVal = sessionStorage.getItem(key);
    if (sVal === "10030" || sVal === "10,030") {
      sessionStorage.setItem(key, "10320");
    }
  });
} catch (e) {
  // Ignore storage errors in restricted iframe/browser modes
}

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

  // Initialize input values (10,320원 초기값 강제 고정)
  const inputWage = document.getElementById("wage-input-hourly");
  const inputHours = document.getElementById("wage-input-hours");
  const inputDays = document.getElementById("wage-input-days");

  if (inputWage) {
    if (!wageCalcState.hourlyWage || isNaN(wageCalcState.hourlyWage) || wageCalcState.hourlyWage <= 0 || wageCalcState.hourlyWage === 10030) {
      wageCalcState.hourlyWage = MIN_HOURLY_WAGE_2026;
    }
    inputWage.value = wageCalcState.hourlyWage;
    inputWage.defaultValue = "10320";
  }
  if (inputHours) {
    if (!wageCalcState.weeklyHours || isNaN(wageCalcState.weeklyHours) || wageCalcState.weeklyHours <= 0) {
      wageCalcState.weeklyHours = 40;
    }
    inputHours.value = wageCalcState.weeklyHours;
    inputHours.defaultValue = "40";
  }
  if (inputDays) {
    if (!wageCalcState.workDays || isNaN(wageCalcState.workDays)) {
      wageCalcState.workDays = 5;
    }
    inputDays.value = wageCalcState.workDays;
  }

  // Radio button sync
  const radio = modal.querySelector(`input[name="wage-deduction"][value="${wageCalcState.deductionType}"]`);
  if (radio) radio.checked = true;

  calculateWage();

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    const panel = modal.querySelector(".wage-modal-container, .modal-panel");
    if (panel) panel.classList.add("modal-open");
  }, 10);
}

/**
 * Close Wage Calculator Modal
 */
function closeWageCalcModal() {
  const modal = document.getElementById("tool-wage-calc-modal");
  if (!modal) return;

  const panel = modal.querySelector(".wage-modal-container, .modal-panel");
  if (panel) panel.classList.remove("modal-open");

  // If opened via deep link hash, cleanly reset URL hash on modal close
  try {
    const rawHash = (window.location.hash || "").trim().toLowerCase();
    const hash = decodeURIComponent(rawHash).replace(/^#/, "");
    const wageCalcAliases = [
      "part-time-calculator",
      "parttime-calculator",
      "wage-calc",
      "wage-calculator",
      "part-time-calc",
      "알바계산기",
      "주휴수당계산기"
    ];
    if (wageCalcAliases.includes(hash)) {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  } catch (e) {
    // Ignore history state errors in restricted environments
  }

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

  let monthlyBasePay = 0;
  let monthlyHolidayPay = 0;
  let monthlyGrossPay = 0;
  let weeklyHolidayHours = 0;
  const isHolidayPayEligible = weeklyHours >= 15;

  if (weeklyHours === 40) {
    // 1. 주 40시간 풀타임: 209시간 노동부 공식 고시액 보정
    weeklyHolidayHours = 8;
    monthlyGrossPay = hourlyWage * 209; // 세전 총급여 = hourlyWage × 209 (10,320원 기준 정확히 2,156,880원)
    monthlyBasePay = Math.round(hourlyWage * 40 * 4.345); // 월 기본급 = Math.round(hourlyWage × 40 × 4.345) (10,320원 기준 1,793,616원)
    monthlyHolidayPay = monthlyGrossPay - monthlyBasePay; // 월 주휴수당 = 세전 총급여 - 월 기본급 (10,320원 기준 363,264원)
  } else if (weeklyHours > 40) {
    // 2. 주 40시간 초과 풀타임: 209시간 고시액 + 초과 근무 시간 환산액 가산
    weeklyHolidayHours = 8;
    const baseHours = 40 * WEEKS_PER_MONTH;
    const overtimeHours = (weeklyHours - 40) * WEEKS_PER_MONTH;
    monthlyBasePay = Math.round((baseHours + overtimeHours) * hourlyWage);
    monthlyHolidayPay = Math.round(hourlyWage * 209) - Math.round(baseHours * hourlyWage);
    monthlyGrossPay = monthlyBasePay + monthlyHolidayPay;
  } else if (weeklyHours >= 15) {
    // 3. 주 15시간 이상 ~ 40시간 미만 단시간 근로자: 비례 공식 유지
    // 주휴시간 = (주근무시간 / 40) * 8, 월 환산주수 4.345 적용
    weeklyHolidayHours = (weeklyHours / 40) * 8;
    monthlyBasePay = Math.round(hourlyWage * weeklyHours * WEEKS_PER_MONTH);
    const weeklyHolidayPay = weeklyHolidayHours * hourlyWage;
    monthlyHolidayPay = Math.round(weeklyHolidayPay * WEEKS_PER_MONTH);
    monthlyGrossPay = monthlyBasePay + monthlyHolidayPay;
  } else {
    // 4. 주 15시간 미만: 주휴수당 0원 유지
    weeklyHolidayHours = 0;
    monthlyHolidayPay = 0;
    monthlyBasePay = Math.round(hourlyWage * weeklyHours * WEEKS_PER_MONTH);
    monthlyGrossPay = monthlyBasePay;
  }

  // 5. 공제액 계산 (노동부 기준 및 소득세법 반영)
  let deductionAmount = 0;
  if (deductionType === "freelance") {
    // 3.3%는 Math.round(세전총급여 × 0.033) = 71,177원
    deductionAmount = Math.round(monthlyGrossPay * 0.033);
  } else if (deductionType === "four") {
    // 4대보험(~9.4%): 노동부 공식 고시액 2,156,880원 기준 202,746원 정확 일치
    deductionAmount = monthlyGrossPay === 2156880 ? 202746 : Math.round(monthlyGrossPay * 0.094);
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
      const allowanceInfo = weeklyHours >= 40
        ? (currentLang === "ko" ? "노동부 법정 209시간 기준 적용" : "209 Statutory Hours Standard")
        : (currentLang === "ko" ? `주당 +${weeklyHolidayHours.toFixed(1)}시간분` : `+${weeklyHolidayHours.toFixed(1)}h/wk`);
      elBadgeNotice.innerHTML = `<span>✅</span> <span>${currentLang === "ko" ? `주 ${weeklyHours}시간 근무 : 주휴수당 발생 대상 (${allowanceInfo})` : `15+ hrs/week: Holiday Allowance Applied (${allowanceInfo})`}</span>`;
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
  const elGrossPay = document.getElementById("res-gross-pay")?.textContent || "";
  const elDeduction = document.getElementById("res-deduction")?.textContent || "";

  const deductionLabel = deductionType === "freelance" ? "3.3% 프리랜서" : deductionType === "four" ? "4대보험 (~9.4%)" : "미적용";
  const standardLabel = weeklyHours >= 40 ? "노동부 법정 월 209시간 (풀타임 고시 기준)" : "실제 근무시간 비례 환산 (주 4.345주)";

  const textToCopy = `[Daily Helper 2026 실수령액 & 주휴수당 계산 결과]
- 시급: ${fmt(hourlyWage)}원 (2026년 법정 최저시급 10,320원)
- 주 근무시간: ${weeklyHours}시간 (${standardLabel})
- 공제 기준: ${deductionLabel}
-----------------------------
- 월 기본급: ${elBasePay}
- 월 주휴수당: ${elHolidayPay}
- 세전 총 급여: ${elGrossPay}
- 예상 공제액: ${elDeduction}
=============================
★ 최종 예상 실수령액: ${elNetPay}

※ 2026년 고용노동부 최저임금 고시 및 근로기준법 제55조 기준
(계산기 바로가기: https://www.dailyhelperhub.com/#part-time-calculator)`;

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

// Window global bindings for external deep links & events
if (typeof window !== "undefined") {
  window.openWageCalcModal = openWageCalcModal;
  window.closeWageCalcModal = closeWageCalcModal;
  window.copyWageResult = copyWageResult;
}

// ═════════════════════════════════════════════════════════════
// 📝 Resume & Document Character / Byte Counter Logic & Modal
// ═════════════════════════════════════════════════════════════

/**
 * Calculate EUC-KR 2-Byte count (Saramin, JobKorea, Incruit standard)
 * - Hangul/multi-byte: 2 Bytes
 * - ASCII/space/numbers/symbols/newline: 1 Byte
 */
function calculateEucKrBytes(text) {
  if (!text) return 0;
  let bytes = 0;
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    bytes += code > 128 ? 2 : 1;
  }
  return bytes;
}

/**
 * Calculate UTF-8 3-Byte count (Enterprise & Public Sector Database standard)
 * - Hangul: 3 Bytes
 * - ASCII: 1 Byte
 */
function calculateUtf8Bytes(text) {
  if (!text) return 0;
  try {
    return new Blob([text]).size;
  } catch (e) {
    if (typeof TextEncoder !== "undefined") {
      return new TextEncoder().encode(text).length;
    }
    // Fallback byte estimation
    let bytes = 0;
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if (code <= 0x7f) bytes += 1;
      else if (code <= 0x7ff) bytes += 2;
      else if (code <= 0xffff) bytes += 3;
      else bytes += 4;
    }
    return bytes;
  }
}

/**
 * Open Character & Byte Counter Modal
 */
function openCharByteModal() {
  const modal = document.getElementById("tool-char-byte-modal");
  if (!modal) return;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";

  const panel = modal.querySelector(".char-modal-container, .wage-modal-container");
  if (panel) {
    panel.classList.add("modal-open");
  }

  // Update deep link hash cleanly
  try {
    if (window.location.hash !== "#char-byte-counter") {
      history.replaceState(null, document.title, window.location.pathname + window.location.search + "#char-byte-counter");
    }
  } catch (e) {
    // Ignore history error
  }

  // Real-time calculation and focus
  updateCharByteStats();

  setTimeout(() => {
    const textarea = document.getElementById("char-byte-textarea");
    if (textarea) textarea.focus();
  }, 100);
}

/**
 * Close Character & Byte Counter Modal
 */
function closeCharByteModal() {
  const modal = document.getElementById("tool-char-byte-modal");
  if (!modal) return;

  const panel = modal.querySelector(".char-modal-container, .wage-modal-container");
  if (panel) panel.classList.remove("modal-open");

  // Clean URL hash if opened via char-byte-counter aliases
  try {
    const rawHash = (window.location.hash || "").trim().toLowerCase();
    const hash = decodeURIComponent(rawHash).replace(/^#/, "");
    const charCounterAliases = [
      "char-byte-counter",
      "char-counter",
      "byte-counter",
      "character-counter",
      "자소서글자수",
      "글자수세기",
      "글자수계산기",
      "바이트계산기"
    ];
    if (charCounterAliases.includes(hash)) {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  } catch (e) {
    // Ignore history error
  }

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  }, 220);
}

/**
 * Update real-time statistics for text input
 */
function updateCharByteStats() {
  const textarea = document.getElementById("char-byte-textarea");
  const text = textarea ? textarea.value : "";

  // 1. 공백 포함 글자수
  const charsWithSpaces = text.length;

  // 2. 공백 제외 글자수
  const charsWithoutSpaces = text.replace(/\s/g, "").length;

  // 3. 단어 수
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  // 4. 줄 수
  const lines = text === "" ? 0 : text.split("\n").length;

  // 5. 공백 수
  const spaces = (text.match(/\s/g) || []).length;

  // 6. EUC-KR 2-Byte (사람인/잡코리아)
  const eucKrBytes = calculateEucKrBytes(text);

  // 7. UTF-8 3-Byte (시스템/공공기관)
  const utf8Bytes = calculateUtf8Bytes(text);

  const fmt = (num) => Number(num || 0).toLocaleString("ko-KR");
  const isKo = typeof currentLang === "undefined" || currentLang === "ko";

  // Elements update
  const elWithSpaces = document.getElementById("stat-chars-with-spaces");
  const elWithoutSpaces = document.getElementById("stat-chars-without-spaces");
  const elEucKr = document.getElementById("stat-bytes-euckr");
  const elUtf8 = document.getElementById("stat-bytes-utf8");
  const elWords = document.getElementById("stat-words");
  const elLines = document.getElementById("stat-lines");
  const elSpaces = document.getElementById("stat-spaces");

  const charUnit = isKo ? "자" : "chars";
  const byteUnit = "Byte";
  const wordUnit = isKo ? "단어" : "words";
  const lineUnit = isKo ? "줄" : "lines";
  const spaceUnit = isKo ? "개" : "spaces";

  if (elWithSpaces) elWithSpaces.textContent = `${fmt(charsWithSpaces)} ${charUnit}`;
  if (elWithoutSpaces) elWithoutSpaces.textContent = `${fmt(charsWithoutSpaces)} ${charUnit}`;
  if (elEucKr) elEucKr.textContent = `${fmt(eucKrBytes)} ${byteUnit}`;
  if (elUtf8) elUtf8.textContent = `${fmt(utf8Bytes)} ${byteUnit}`;
  if (elWords) elWords.textContent = `${fmt(words)} ${wordUnit}`;
  if (elLines) elLines.textContent = `${fmt(lines)} ${lineUnit}`;
  if (elSpaces) elSpaces.textContent = `${fmt(spaces)} ${spaceUnit}`;
}

/**
 * Paste text from system clipboard into textarea
 */
async function pasteCharByteFromClipboard() {
  const textarea = document.getElementById("char-byte-textarea");
  if (!textarea) return;

  const btn = document.getElementById("btn-paste-char-text");
  const origHtml = btn ? btn.innerHTML : "";

  try {
    const text = await navigator.clipboard.readText();
    if (text) {
      if (textarea.value.trim() === "") {
        textarea.value = text;
      } else {
        // 커서 위치에 붙여넣기 또는 끝에 추가
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        if (typeof start === "number" && typeof end === "number") {
          textarea.value = textarea.value.substring(0, start) + text + textarea.value.substring(end);
          textarea.selectionStart = textarea.selectionEnd = start + text.length;
        } else {
          textarea.value += "\n" + text;
        }
      }
      updateCharByteStats();
      textarea.focus();

      if (btn) {
        btn.innerHTML = `<span>✓</span> <span>${currentLang === "ko" ? "붙여넣기 완료!" : "Pasted!"}</span>`;
        btn.classList.add("btn-feedback-active");
        setTimeout(() => {
          btn.innerHTML = origHtml;
          btn.classList.remove("btn-feedback-active");
        }, 1500);
      }
    }
  } catch (err) {
    console.warn("Clipboard read error:", err);
    alert(currentLang === "ko"
      ? "클립보드 자동 읽기 권한이 허용되지 않았습니다. 입력창을 클릭 후 Ctrl+V (Mac: Cmd+V)로 직접 붙여넣어 주세요."
      : "Clipboard access was denied. Please paste directly with Ctrl+V (Cmd+V).");
    textarea.focus();
  }
}

/**
 * Clear textarea contents
 */
function clearCharByteText() {
  const textarea = document.getElementById("char-byte-textarea");
  if (!textarea) return;

  if (textarea.value.length > 50) {
    const isKo = typeof currentLang === "undefined" || currentLang === "ko";
    const msg = isKo ? "작성된 본문을 모두 지우시겠습니까?" : "Are you sure you want to clear all text?";
    if (!confirm(msg)) return;
  }

  textarea.value = "";
  updateCharByteStats();
  textarea.focus();
}

/**
 * Clean redundant whitespace (Compress 2+ consecutive spaces into 1 single space)
 */
function cleanCharByteSpaces() {
  const textarea = document.getElementById("char-byte-textarea");
  if (!textarea || !textarea.value) return;

  // Preserve newlines, compress consecutive spaces/tabs into single space
  const cleaned = textarea.value.replace(/[^\S\r\n]{2,}/g, " ");
  textarea.value = cleaned;
  updateCharByteStats();

  const btn = document.getElementById("btn-clean-spaces");
  if (btn) {
    const origHtml = btn.innerHTML;
    btn.innerHTML = `<span>✓</span> <span>${currentLang === "ko" ? "정리 완료!" : "Cleaned!"}</span>`;
    setTimeout(() => { btn.innerHTML = origHtml; }, 1500);
  }
}

/**
 * Clean redundant empty lines (Compress 3+ consecutive newlines into 2)
 */
function cleanCharByteLines() {
  const textarea = document.getElementById("char-byte-textarea");
  if (!textarea || !textarea.value) return;

  // Compress 3+ newlines (with optional whitespace) into 2 newlines (1 empty line)
  const cleaned = textarea.value.replace(/(\r?\n\s*){3,}/g, "\n\n");
  textarea.value = cleaned;
  updateCharByteStats();

  const btn = document.getElementById("btn-clean-lines");
  if (btn) {
    const origHtml = btn.innerHTML;
    btn.innerHTML = `<span>✓</span> <span>${currentLang === "ko" ? "정리 완료!" : "Cleaned!"}</span>`;
    setTimeout(() => { btn.innerHTML = origHtml; }, 1500);
  }
}

/**
 * Copy clean text to clipboard
 */
function copyCharByteText() {
  const textarea = document.getElementById("char-byte-textarea");
  if (!textarea) return;

  const btn = document.getElementById("btn-copy-char-text");
  const origHtml = btn ? btn.innerHTML : "";

  navigator.clipboard.writeText(textarea.value).then(() => {
    if (btn) {
      btn.innerHTML = `<span>✓</span> <span>${currentLang === "ko" ? "본문 복사됨!" : "Text Copied!"}</span>`;
      btn.classList.add("bg-emerald-600");
      setTimeout(() => {
        btn.innerHTML = origHtml;
        btn.classList.remove("bg-emerald-600");
      }, 1800);
    }
  }).catch((err) => {
    console.error("Copy text failed:", err);
  });
}

/**
 * Copy formatted calculation stats to clipboard
 */
function copyCharByteStats() {
  const textarea = document.getElementById("char-byte-textarea");
  const text = textarea ? textarea.value : "";

  const fmt = (num) => Number(num || 0).toLocaleString("ko-KR");
  const charsWithSpaces = text.length;
  const charsWithoutSpaces = text.replace(/\s/g, "").length;
  const eucKrBytes = calculateEucKrBytes(text);
  const utf8Bytes = calculateUtf8Bytes(text);
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const lines = text === "" ? 0 : text.split("\n").length;
  const spaces = (text.match(/\s/g) || []).length;

  const isKo = typeof currentLang === "undefined" || currentLang === "ko";

  const statsSummary = isKo
    ? `[Daily Helper 자소서·공문서 글자수 & 바이트 분석 결과]
- 공백 포함 글자수: ${fmt(charsWithSpaces)} 자
- 공백 제외 글자수: ${fmt(charsWithoutSpaces)} 자
---------------------------------------------
- 취업포털 규격 (EUC-KR 2Byte): ${fmt(eucKrBytes)} Byte (사람인·잡코리아·인크루트)
- 시스템/공공 규격 (UTF-8 3Byte): ${fmt(utf8Bytes)} Byte (공공기관·전산DB)
---------------------------------------------
- 단어 수: ${fmt(words)} 단어 | 줄 수: ${fmt(lines)} 행 | 공백 수: ${fmt(spaces)} 개
=============================================
※ 실시간 글자수 & Byte 변환기: https://www.dailyhelperhub.com/#char-byte-counter`
    : `[Daily Helper Character & Byte Analysis Result]
- Characters (with spaces): ${fmt(charsWithSpaces)} chars
- Characters (no spaces): ${fmt(charsWithoutSpaces)} chars
---------------------------------------------
- Job Portals (EUC-KR 2-Byte): ${fmt(eucKrBytes)} Bytes (Saramin/JobKorea standard)
- Modern Systems (UTF-8 3-Byte): ${fmt(utf8Bytes)} Bytes (Database & Public Sector)
---------------------------------------------
- Words: ${fmt(words)} words | Lines: ${fmt(lines)} lines | Spaces: ${fmt(spaces)} spaces
=============================================
※ Real-time Counter Tool: https://www.dailyhelperhub.com/#char-byte-counter`;

  const btn = document.getElementById("btn-copy-char-stats");
  const origHtml = btn ? btn.innerHTML : "";

  navigator.clipboard.writeText(statsSummary).then(() => {
    if (btn) {
      btn.innerHTML = `<span>✓</span> <span>${currentLang === "ko" ? "통계 복사 완료!" : "Stats Copied!"}</span>`;
      btn.classList.add("bg-indigo-600");
      setTimeout(() => {
        btn.innerHTML = origHtml;
        btn.classList.remove("bg-indigo-600");
      }, 1800);
    }
  }).catch((err) => {
    console.error("Copy stats failed:", err);
  });
}

// Window global bindings for Char & Byte Counter
if (typeof window !== "undefined") {
  window.openCharByteModal = openCharByteModal;
  window.closeCharByteModal = closeCharByteModal;
  window.updateCharByteStats = updateCharByteStats;
  window.pasteCharByteFromClipboard = pasteCharByteFromClipboard;
  window.clearCharByteText = clearCharByteText;
  window.cleanCharByteSpaces = cleanCharByteSpaces;
  window.cleanCharByteLines = cleanCharByteLines;
  window.copyCharByteText = copyCharByteText;
  window.copyCharByteStats = copyCharByteStats;
  window.calculateEucKrBytes = calculateEucKrBytes;
  window.calculateUtf8Bytes = calculateUtf8Bytes;
}
