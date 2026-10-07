/**
 * Daily Helper (일상의도움) — Web Tools Manager & Utilities
 * Manages web tools data, rendering, and interactive tool modals.
 */

// ── Default Web Tools Data (Instant fallback & offline ready) ──
let webToolsData = [
  {
    id: "pdf-checker",
    nameKo: "무설치 PDF & 도면/이미지 검토·마킹 툴",
    nameEn: "PDF & Drawing Review / Marking Tool (PDF & JPG Checker)",
    targetLang: "ALL",
    isKrOnly: false,
    category: "utility",
    color: "from-sky-600 via-indigo-600 to-blue-700",
    iconEmoji: "📐",
    isHot: true,
    isFree: true,
    isNew: true,
    badges: ["HOT", "NEW", "무료 도구", "Web Utility"],
    descKo: "서버 업로드 없이 브라우저 단독으로 대용량 PDF 및 도면(JPG/PNG)을 병합·검토하고, 텍스트·도형 마킹 후 고화질 최적화 PDF로 즉시 내보냅니다.",
    descEn: "Review, merge and annotate large CAD/PDF/image drawings directly in your browser with zero upload, then export to ultra-high-definition optimized PDF instantly.",
    tagsKo: ["PDF검토", "도면마킹", "이미지병합", "무설치"],
    tagsEn: ["PDFReview", "DrawingMarkup", "MergeImages", "NoInstall"],
    ctaTextKo: "바로 사용하기",
    ctaTextEn: "Use Tool Now",
    actionType: "modal",
    targetModal: "pdf-checker-modal",
    deepLink: "#pdf-checker"
  },
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
    id: "annual-leave-calculator",
    nameKo: "근로기준법 연차 자동 계산기",
    nameEn: "Annual Leave Calculator",
    targetLang: "ALL",
    isKrOnly: false,
    category: "salary",
    color: "from-blue-600 via-indigo-600 to-sky-500",
    iconEmoji: "📅",
    isHot: true,
    isFree: true,
    isNew: true,
    badges: ["HOT", "근로기준법"],
    descKo: "입사일만 넣으면 1년 미만 월차부터 근속 가산 연차까지 대한민국 근로기준법 제60조 기준으로 실시간 자동 계산합니다.",
    descEn: "Automatically calculate monthly and annual paid leave under Article 60 of Korean Labor Standards Act with hire & fiscal modes.",
    tagsKo: ["연차계산기", "근로기준법", "월차계산", "연차발생일수"],
    tagsEn: ["LeaveCalc", "LaborLaw", "AnnualLeave", "VacationCalc"],
    ctaTextKo: "바로 사용하기",
    ctaTextEn: "Use Tool Now",
    actionType: "modal",
    targetModal: "annual-leave-calculator",
    deepLink: "#annual-leave-calculator"
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
  },
  {
    id: "excel-delimiter-converter",
    nameKo: "엑셀 줄바꿈 ↔ 구분자 변환기",
    nameEn: "Excel Line Break ↔ Delimiter Converter",
    targetLang: "ALL",
    isKrOnly: false,
    category: "utility",
    color: "from-emerald-600 via-green-600 to-teal-700",
    iconEmoji: "📊",
    isHot: true,
    isFree: true,
    isNew: true,
    badges: ["HOT", "NEW"],
    descKo: "엑셀 줄바꿈 데이터를 쉼표(,), SQL IN 조건절('A', 'B'), 큰따옴표 등으로 1초 만에 상호 변환합니다.",
    descEn: "Instantly convert Excel line breaks into commas, SQL IN clauses ('A', 'B'), quotes, or vice versa.",
    tagsKo: ["엑셀변환기", "줄바꿈쉼표", "SQL IN", "구분자변환"],
    tagsEn: ["ExcelConverter", "LineBreakToComma", "SqlInClause", "Delimiter"],
    ctaTextKo: "바로 사용하기",
    ctaTextEn: "Use Tool Now",
    actionType: "modal",
    targetModal: "excel-delimiter-converter",
    deepLink: "#excel-delimiter-converter"
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
  } else if (toolId === "excel-delimiter-converter") {
    openExcelDelimiterModal();
  } else if (toolId === "annual-leave-calculator" || toolId === "leave-calc") {
    openAnnualLeaveModal();
  } else if (toolId === "pdf-checker" || toolId === "pdf-checker-modal" || toolId === "pdf-marking" || toolId === "drawing-checker") {
    if (typeof openPdfCheckerModal === "function") {
      openPdfCheckerModal();
    } else if (typeof window.openPdfCheckerModal === "function") {
      window.openPdfCheckerModal();
    }
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
  const elEucKrPreview = document.getElementById("stat-bytes-2b-preview");
  const elUtf8Preview = document.getElementById("stat-bytes-utf8-preview");
  const elWords = document.getElementById("stat-words");
  const elLines = document.getElementById("stat-lines");
  const elSpaces = document.getElementById("stat-spaces");
  const elSpacesPrefix = document.getElementById("stat-spaces-prefix");

  const charUnit = isKo ? "자" : "chars";
  const byteUnit = "Byte";
  const wordUnit = isKo ? "단어" : "words";
  const lineUnit = isKo ? "줄" : "lines";

  if (elWithSpaces) elWithSpaces.textContent = isKo ? `${fmt(charsWithSpaces)}자` : `${fmt(charsWithSpaces)} chars`;
  if (elWithoutSpaces) elWithoutSpaces.textContent = isKo ? `${fmt(charsWithoutSpaces)}자` : `${fmt(charsWithoutSpaces)} chars`;
  if (elEucKr) elEucKr.textContent = `${fmt(eucKrBytes)} ${byteUnit}`;
  if (elUtf8) elUtf8.textContent = `${fmt(utf8Bytes)} ${byteUnit}`;
  if (elEucKrPreview) elEucKrPreview.textContent = fmt(eucKrBytes);
  if (elUtf8Preview) elUtf8Preview.textContent = fmt(utf8Bytes);
  if (elWords) elWords.textContent = `${fmt(words)} ${wordUnit}`;
  if (elLines) elLines.textContent = `${fmt(lines)} ${lineUnit}`;
  if (elSpaces) {
    if (isKo) {
      if (elSpacesPrefix) elSpacesPrefix.textContent = "공백 ";
      elSpaces.textContent = `${fmt(spaces)}개`;
    } else {
      if (elSpacesPrefix) elSpacesPrefix.textContent = "";
      elSpaces.textContent = `${fmt(spaces)} spaces`;
    }
  }
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
      btn.classList.add("bg-blue-700");
      setTimeout(() => {
        btn.innerHTML = origHtml;
        btn.classList.remove("bg-blue-700");
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

// ═════════════════════════════════════════════════════════════
// 📊 Excel Line Break ↔ Delimiter Converter Engine & Modal
// ═════════════════════════════════════════════════════════════

/**
 * i18n Translation Dictionary for Excel Delimiter Converter
 * Supports Korean (ko) and English (en)
 */
const excelDelimiterI18n = {
  ko: {
    title: "엑셀 줄바꿈 ↔ 구분자 변환기",
    subtitle: "엑셀 행/열 데이터를 쉼표(,), SQL IN, 따옴표로 1초 만에 상호 변환",
    securityBadge: "100% 브라우저 로컬 처리 (보안 안심)",
    securityBadgeTitle: "서버로 데이터를 전송하지 않으며 클라이언트에서 즉시 처리됩니다.",
    langToggle: "EN",
    modeLabel: "변환 모드",
    modeLineToDelim: "줄바꿈 → 구분자",
    modeDelimToLine: "구분자 → 줄바꿈",
    inputTitle: "입력 데이터 (Input)",
    inputStats: "{lines} 줄 · {chars}자",
    inputPlaceholderLine: "엑셀에서 복사한 여러 줄의 데이터를 여기에 붙여넣으세요.\n예시:\n홍길동\n이순신\n강감찬\n유관순",
    inputPlaceholderDelim: "쉼표나 공백 등으로 구분된 데이터를 여기에 붙여넣으세요.\n예시:\n'홍길동', '이순신', '강감찬', '유관순'\n또는 IN ('홍길동', '이순신')",
    pasteBtn: "📋 붙여넣기",
    clearBtn: "🗑️ 비우기",
    sampleBtn: "💡 샘플 넣기",
    optionsTitle: "변환 옵션 및 구분자 설정",
    presetLabel: "구분자 프리셋",
    presetComma: "쉼표 (, )",
    presetSqlSingle: "SQL 작은따옴표 ('A', 'B')",
    presetDoubleQuote: "큰따옴표 (\"A\", \"B\")",
    presetSpace: "공백 (Space)",
    presetTab: "탭 (Tab)",
    presetCustom: "직접 입력",
    customDelimPlaceholder: "구분자 입력 (예: | or ;)",
    optTrim: "빈 줄 및 양쪽 공백 제거",
    optDedupe: "중복 항목 제거",
    optSqlIn: "SQL IN (...) 괄호 감싸기",
    outputTitle: "변환 결과 (Output)",
    outputPlaceholder: "변환된 결과가 여기에 실시간으로 표시됩니다.",
    countBadge: "총 {count}개 항목 변환 완료",
    copyBtn: "📋 결과 복사하기",
    copySuccess: "✓ 복사 완료!",
    swapBtn: "🔄 결과를 입력으로",
    toastCopied: "클립보드에 복사되었습니다!",
    toastCleared: "입력창이 초기화되었습니다.",
    toastSampleLoaded: "샘플 데이터가 로드되었습니다.",
    toastPasted: "클립보드 내용을 붙여넣었습니다.",
    toastSwapped: "변환 결과가 입력창으로 이동되었습니다.",
    toastNoResult: "복사할 변환 결과가 없습니다.",
    toastPasteError: "클립보드 읽기 권한이 없습니다. Ctrl+V로 붙여넣어 주세요.",
    closeBtn: "닫기"
  },
  en: {
    title: "Excel Line Break ↔ Delimiter Converter",
    subtitle: "Convert Excel rows/columns into commas, SQL IN clauses, or quotes in 1 second",
    securityBadge: "100% Client-Side Only (Zero Data Leak)",
    securityBadgeTitle: "Processed 100% locally in your browser. No data is sent to any server.",
    langToggle: "KO",
    modeLabel: "Conversion Mode",
    modeLineToDelim: "Line Break → Delimiter",
    modeDelimToLine: "Delimiter → Line Break",
    inputTitle: "Input Data",
    inputStats: "{lines} lines · {chars} chars",
    inputPlaceholderLine: "Paste multiple lines of data copied from Excel here.\nExample:\nItemA\nItemB\nItemC\nItemD",
    inputPlaceholderDelim: "Paste delimited data (commas, quotes, etc.) here.\nExample:\n'ItemA', 'ItemB', 'ItemC'\nor IN ('ItemA', 'ItemB')",
    pasteBtn: "📋 Paste",
    clearBtn: "🗑️ Clear",
    sampleBtn: "💡 Sample",
    optionsTitle: "Options & Delimiter Presets",
    presetLabel: "Delimiter Preset",
    presetComma: "Comma (, )",
    presetSqlSingle: "SQL Single Quotes ('A', 'B')",
    presetDoubleQuote: "Double Quotes (\"A\", \"B\")",
    presetSpace: "Space",
    presetTab: "Tab",
    presetCustom: "Custom",
    customDelimPlaceholder: "Enter delimiter (e.g. | or ;)",
    optTrim: "Trim & Remove Empty Lines",
    optDedupe: "Remove Duplicates",
    optSqlIn: "Wrap with SQL IN (...)",
    outputTitle: "Output Result",
    outputPlaceholder: "Converted results will appear here in real time.",
    countBadge: "{count} items converted",
    copyBtn: "📋 Copy Result",
    copySuccess: "✓ Copied!",
    swapBtn: "🔄 Send Result to Input",
    toastCopied: "Copied to clipboard!",
    toastCleared: "Input cleared.",
    toastSampleLoaded: "Sample data loaded.",
    toastPasted: "Pasted from clipboard.",
    toastSwapped: "Result moved to input.",
    toastNoResult: "No result to copy.",
    toastPasteError: "Clipboard permission denied. Please press Ctrl+V directly.",
    closeBtn: "Close"
  }
};

let currentEdMode = "line-to-delim";
let currentEdPreset = "comma";
let edDebounceTimer = null;
let edToastTimer = null;
let edCurrentLang = (typeof currentLang !== "undefined") ? currentLang : "ko";

const ED_SAMPLE_DATA = {
  ko: [
    "홍길동",
    "이순신",
    "강감찬",
    "유관순",
    "안중근",
    "세종대왕",
    "신사임당",
    "홍길동"
  ].join("\n"),
  en: [
    "Customer_01",
    "Customer_02",
    "Customer_03",
    "Customer_04",
    "Customer_05",
    "Customer_06",
    "Customer_07",
    "Customer_01"
  ].join("\n")
};

/**
 * Open Excel Delimiter Converter Modal
 */
function openExcelDelimiterModal() {
  const modal = document.getElementById("tool-excel-delimiter-modal");
  if (!modal) return;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";

  const panel = modal.querySelector(".ed-modal-container");
  if (panel) {
    panel.classList.add("modal-open");
  }

  try {
    if (window.location.hash !== "#excel-delimiter-converter") {
      history.replaceState(null, document.title, window.location.pathname + window.location.search + "#excel-delimiter-converter");
    }
  } catch (e) {
    // Ignore history error
  }

  // Sync active language
  if (typeof currentLang !== "undefined") {
    setExcelDelimiterLang(currentLang);
  } else {
    setExcelDelimiterLang("ko");
  }

  runExcelConversion();

  setTimeout(() => {
    const input = document.getElementById("excel-delimiter-input");
    if (input) input.focus();
  }, 100);
}

/**
 * Close Excel Delimiter Converter Modal
 */
function closeExcelDelimiterModal() {
  const modal = document.getElementById("tool-excel-delimiter-modal");
  if (!modal) return;

  const panel = modal.querySelector(".ed-modal-container");
  if (panel) panel.classList.remove("modal-open");

  try {
    const rawHash = (window.location.hash || "").trim().toLowerCase();
    const hash = decodeURIComponent(rawHash).replace(/^#/, "");
    const excelAliases = [
      "excel-delimiter-converter",
      "excel-delimiter",
      "excel-converter",
      "excel-to-comma",
      "line-to-delimiter",
      "엑셀줄바꿈변환기",
      "엑셀변환기",
      "엑셀구분자",
      "줄바꿈변환기",
      "엑셀쉼표"
    ];
    if (excelAliases.includes(hash)) {
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
 * Switch Conversion Mode: 'line-to-delim' | 'delim-to-line'
 */
function setExcelConverterMode(mode) {
  currentEdMode = mode;
  const btnLine = document.getElementById("ed-mode-btn-line-to-delim");
  const btnDelim = document.getElementById("ed-mode-btn-delim-to-line");
  const sqlInWrap = document.getElementById("ed-opt-sql-in-wrapper");

  if (mode === "line-to-delim") {
    if (btnLine) {
      btnLine.classList.add("active");
      btnLine.setAttribute("aria-selected", "true");
    }
    if (btnDelim) {
      btnDelim.classList.remove("active");
      btnDelim.setAttribute("aria-selected", "false");
    }
    if (sqlInWrap) sqlInWrap.classList.remove("opacity-40", "pointer-events-none");
  } else {
    if (btnLine) {
      btnLine.classList.remove("active");
      btnLine.setAttribute("aria-selected", "false");
    }
    if (btnDelim) {
      btnDelim.classList.add("active");
      btnDelim.setAttribute("aria-selected", "true");
    }
    if (sqlInWrap) sqlInWrap.classList.add("opacity-40", "pointer-events-none");
  }

  // Update input placeholder based on mode
  const inputEl = document.getElementById("excel-delimiter-input");
  if (inputEl) {
    const dict = excelDelimiterI18n[edCurrentLang] || excelDelimiterI18n.ko;
    inputEl.placeholder = mode === "line-to-delim" ? dict.inputPlaceholderLine : dict.inputPlaceholderDelim;
  }

  runExcelConversion();
}

/**
 * Set Delimiter Preset Chip
 */
function setExcelDelimiterPreset(preset) {
  currentEdPreset = preset;
  const container = document.getElementById("ed-presets-container");
  if (container) {
    container.querySelectorAll(".ed-preset-chip").forEach((chip) => {
      if (chip.getAttribute("data-preset") === preset) {
        chip.classList.add("active");
      } else {
        chip.classList.remove("active");
      }
    });
  }

  const customWrap = document.getElementById("ed-custom-delim-wrapper");
  if (customWrap) {
    if (preset === "custom") {
      customWrap.classList.remove("hidden");
      customWrap.classList.add("flex");
      const customInput = document.getElementById("ed-custom-delim-input");
      if (customInput) customInput.focus();
    } else {
      customWrap.classList.add("hidden");
      customWrap.classList.remove("flex");
    }
  }

  runExcelConversion();
}

/**
 * Sanitize item for quotation:
 * Strips pre-existing outer single/double quotes and trims outer whitespace
 * to avoid issues like ' 'A' ' or 'A ' , 'B'.
 */
function sanitizeExcelItemForQuotes(s) {
  if (s == null) return "";
  let val = String(s).trim();
  if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"'))) {
    if (val.length >= 2) {
      val = val.slice(1, -1).trim();
    }
  }
  return val;
}

/**
 * Real-time 150ms debounced input handler
 */
function handleExcelInputChanged() {
  clearTimeout(edDebounceTimer);
  edDebounceTimer = setTimeout(() => {
    runExcelConversion();
  }, 150);
}

/**
 * Handler for SQL IN checkbox change
 * Automatically switches delimiter preset to SQL single quotes ('A', 'B') if on comma preset
 */
function handleExcelSqlInChanged() {
  const sqlInEl = document.getElementById("ed-opt-sql-in");
  if (sqlInEl && sqlInEl.checked) {
    if (currentEdPreset === "comma") {
      setExcelDelimiterPreset("sql-single");
      return;
    }
  }
  runExcelConversion();
}

/**
 * Robust Delimited String Tokenizer
 */
function parseDelimitedText(text, preset, customDelim) {
  if (!text) return [];
  let cleaned = text.trim();

  // Strip SQL IN (...) wrapper if present
  const inMatch = cleaned.match(/^\s*IN\s*\(\s*([\s\S]*)\s*\)\s*$/i);
  if (inMatch) {
    cleaned = inMatch[1].trim();
  }

  let delimiter = ",";
  if (preset === "space") delimiter = " ";
  else if (preset === "tab") delimiter = "\t";
  else if (preset === "custom" && customDelim) delimiter = customDelim;

  // If text contains single or double quotes, parse with tokenizer
  if (cleaned.includes("'") || cleaned.includes('"')) {
    const tokens = [];
    const tokenRegex = /'((?:''|[^'])*)'|"((?:""|[^"])*)"|([^,\t\r\n|;\s][^,\t\r\n|;]*)/g;
    let match;
    while ((match = tokenRegex.exec(cleaned)) !== null) {
      if (match[1] !== undefined) {
        const val = match[1].replace(/''/g, "'").trim();
        if (val) tokens.push(val);
      } else if (match[2] !== undefined) {
        const val = match[2].replace(/""/g, '"').trim();
        if (val) tokens.push(val);
      } else if (match[3] !== undefined) {
        const val = match[3].trim();
        if (val) tokens.push(val);
      }
    }
    if (tokens.length > 0) return tokens;
  }

  // Standard delimiter split
  const escapedDelim = delimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const items = cleaned.split(new RegExp(escapedDelim + "|\\r?\\n|\\t+"));
  return items.map((s) => s.trim()).filter((s) => s.length > 0);
}

/**
 * Run Core Excel Delimiter Conversion
 */
function runExcelConversion() {
  const inputEl = document.getElementById("excel-delimiter-input");
  const outputEl = document.getElementById("excel-delimiter-output");
  const statsBadge = document.getElementById("ed-output-items-badge");
  const inputStatsEl = document.getElementById("ed-input-stats");
  const optTrim = document.getElementById("ed-opt-trim")?.checked ?? true;
  const optDedupe = document.getElementById("ed-opt-dedupe")?.checked ?? false;
  const optSqlIn = document.getElementById("ed-opt-sql-in")?.checked ?? false;
  const customDelimInput = document.getElementById("ed-custom-delim-input");
  const customDelim = customDelimInput && customDelimInput.value ? customDelimInput.value : ",";

  if (!inputEl || !outputEl) return;

  const rawInput = inputEl.value;

  // Update input stats (lines & characters)
  const inputLines = rawInput ? rawInput.split(/\r\n|\r|\n/).length : 0;
  const inputChars = rawInput.length;
  if (inputStatsEl) {
    const dict = excelDelimiterI18n[edCurrentLang] || excelDelimiterI18n.ko;
    const statTpl = dict.inputStats || "{lines} 줄 · {chars}자";
    inputStatsEl.textContent = statTpl.replace("{lines}", inputLines.toLocaleString()).replace("{chars}", inputChars.toLocaleString());
  }

  if (!rawInput.trim()) {
    outputEl.value = "";
    if (statsBadge) {
      const dict = excelDelimiterI18n[edCurrentLang] || excelDelimiterI18n.ko;
      const badgeTpl = dict.countBadge || "총 {count}개 항목 변환 완료";
      statsBadge.textContent = badgeTpl.replace("{count}", "0");
    }
    return;
  }

  let items = [];

  if (currentEdMode === "line-to-delim") {
    // Mode 1: Line Break & Multi-column Tabs → Delimiter
    items = rawInput.split(/(?:\r\n|\r|\n|\t)+/);
    if (optTrim) {
      items = items.map((s) => s.trim()).filter((s) => s.length > 0);
    } else {
      items = items.filter((s) => s.trim().length > 0);
    }
    if (optDedupe) {
      items = Array.from(new Set(items));
    }

    let result = "";
    if (optSqlIn) {
      // When SQL IN (...) is checked, default to SQL single quotes ('A', 'B') unless double-quote is selected
      if (currentEdPreset === "double-quote") {
        result = items
          .map((s) => {
            const val = sanitizeExcelItemForQuotes(s);
            if (!val && optTrim) return null;
            return '"' + val.replace(/"/g, '""') + '"';
          })
          .filter((s) => s !== null)
          .join(", ");
      } else {
        result = items
          .map((s) => {
            const val = sanitizeExcelItemForQuotes(s);
            if (!val && optTrim) return null;
            return "'" + val.replace(/'/g, "''") + "'";
          })
          .filter((s) => s !== null)
          .join(", ");
      }
      // Wrap with SQL IN (...) cleanly without leading/trailing spaces inside parentheses
      const trimmedResult = result.trim();
      if (trimmedResult.length > 0) {
        result = `IN (${trimmedResult})`;
      } else {
        result = "";
      }
    } else {
      if (currentEdPreset === "comma") {
        result = items.map((s) => (optTrim ? s.trim() : s)).join(", ");
      } else if (currentEdPreset === "sql-single") {
        result = items
          .map((s) => {
            const val = sanitizeExcelItemForQuotes(s);
            if (!val && optTrim) return null;
            return "'" + val.replace(/'/g, "''") + "'";
          })
          .filter((s) => s !== null)
          .join(", ");
      } else if (currentEdPreset === "double-quote") {
        result = items
          .map((s) => {
            const val = sanitizeExcelItemForQuotes(s);
            if (!val && optTrim) return null;
            return '"' + val.replace(/"/g, '""') + '"';
          })
          .filter((s) => s !== null)
          .join(", ");
      } else if (currentEdPreset === "space") {
        result = items.map((s) => (optTrim ? s.trim() : s)).join(" ");
      } else if (currentEdPreset === "tab") {
        result = items.map((s) => (optTrim ? s.trim() : s)).join("\t");
      } else if (currentEdPreset === "custom") {
        result = items.map((s) => (optTrim ? s.trim() : s)).join(customDelim);
      }
    }

    outputEl.value = result;
  } else {
    // Mode 2: Delimiter → Line Break
    items = parseDelimitedText(rawInput, currentEdPreset, customDelim);
    if (optTrim) {
      items = items.map((s) => s.trim()).filter((s) => s.length > 0);
    }
    if (optDedupe) {
      items = Array.from(new Set(items));
    }

    outputEl.value = items.join("\n");
  }

  // Update output count badge
  if (statsBadge) {
    const dict = excelDelimiterI18n[edCurrentLang] || excelDelimiterI18n.ko;
    const badgeTpl = dict.countBadge || "총 {count}개 항목 변환 완료";
    statsBadge.textContent = badgeTpl.replace("{count}", items.length.toLocaleString());
  }
}

/**
 * Paste from Clipboard to Input
 */
async function pasteExcelFromClipboard() {
  const dict = excelDelimiterI18n[edCurrentLang] || excelDelimiterI18n.ko;
  try {
    const text = await navigator.clipboard.readText();
    if (text) {
      const input = document.getElementById("excel-delimiter-input");
      if (input) {
        input.value = text;
        runExcelConversion();
        showExcelToast(dict.toastPasted);
        input.focus();
      }
    }
  } catch (err) {
    showExcelToast(dict.toastPasteError);
  }
}

/**
 * Clear Input & Output
 */
function clearExcelInput() {
  const dict = excelDelimiterI18n[edCurrentLang] || excelDelimiterI18n.ko;
  const input = document.getElementById("excel-delimiter-input");
  const output = document.getElementById("excel-delimiter-output");
  if (input) input.value = "";
  if (output) output.value = "";
  runExcelConversion();
  showExcelToast(dict.toastCleared);
}

/**
 * Load Sample Excel Data
 */
function loadExcelSampleData() {
  const dict = excelDelimiterI18n[edCurrentLang] || excelDelimiterI18n.ko;
  const input = document.getElementById("excel-delimiter-input");
  if (input) {
    const sample = edCurrentLang === "en" ? ED_SAMPLE_DATA.en : ED_SAMPLE_DATA.ko;
    input.value = sample;
    runExcelConversion();
    showExcelToast(dict.toastSampleLoaded);
    input.focus();
  }
}

/**
 * Swap Output to Input & Toggle Mode
 */
function swapExcelInputOutput() {
  const dict = excelDelimiterI18n[edCurrentLang] || excelDelimiterI18n.ko;
  const input = document.getElementById("excel-delimiter-input");
  const output = document.getElementById("excel-delimiter-output");
  if (!output || !output.value.trim()) {
    showExcelToast(dict.toastNoResult);
    return;
  }

  const resultVal = output.value;
  input.value = resultVal;

  // Toggle Mode
  const newMode = currentEdMode === "line-to-delim" ? "delim-to-line" : "line-to-delim";
  setExcelConverterMode(newMode);
  showExcelToast(dict.toastSwapped);
}

/**
 * Copy Converted Output to Clipboard
 */
function copyExcelOutput() {
  const dict = excelDelimiterI18n[edCurrentLang] || excelDelimiterI18n.ko;
  const output = document.getElementById("excel-delimiter-output");
  if (!output || !output.value.trim()) {
    showExcelToast(dict.toastNoResult);
    return;
  }

  navigator.clipboard.writeText(output.value).then(() => {
    showExcelToast(dict.toastCopied);
    const btn = document.getElementById("ed-btn-copy");
    if (btn) {
      const origHtml = btn.innerHTML;
      btn.innerHTML = `<span>✓</span> <span>${dict.copySuccess}</span>`;
      btn.classList.add("bg-emerald-600");
      setTimeout(() => {
        btn.innerHTML = origHtml;
        btn.classList.remove("bg-emerald-600");
      }, 1800);
    }
  }).catch((err) => {
    console.error("Copy failed:", err);
  });
}

/**
 * Display Floating Toast Feedback
 */
function showExcelToast(message) {
  const toast = document.getElementById("excel-delimiter-toast");
  const msgEl = document.getElementById("excel-delimiter-toast-msg");
  if (!toast) return;

  if (msgEl && message) {
    msgEl.textContent = message;
  }
  toast.classList.add("show");

  clearTimeout(edToastTimer);
  edToastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2300);
}

/**
 * Set Language for Excel Delimiter Converter (ko | en)
 * User requirement: setLanguage('ko') / setLanguage('en')
 */
function setExcelDelimiterLang(lang) {
  edCurrentLang = lang === "en" ? "en" : "ko";
  const dict = excelDelimiterI18n[edCurrentLang] || excelDelimiterI18n.ko;

  // Mini toggle button label shows the NEXT language
  const toggleLabel = document.getElementById("ed-lang-toggle-label");
  if (toggleLabel) {
    toggleLabel.textContent = dict.langToggle;
  }

  // Update input placeholder based on current mode
  const inputEl = document.getElementById("excel-delimiter-input");
  if (inputEl) {
    inputEl.placeholder = currentEdMode === "line-to-delim" ? dict.inputPlaceholderLine : dict.inputPlaceholderDelim;
  }

  const outputEl = document.getElementById("excel-delimiter-output");
  if (outputEl) {
    outputEl.placeholder = dict.outputPlaceholder;
  }

  // Update elements with data-i18n
  const modal = document.getElementById("tool-excel-delimiter-modal");
  if (modal) {
    modal.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key && key.startsWith("webTools.excelDelimiterConverter.")) {
        const subKey = key.replace("webTools.excelDelimiterConverter.", "");
        if (dict[subKey]) {
          el.textContent = dict[subKey];
        }
      }
    });

    modal.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      if (key && key.startsWith("webTools.excelDelimiterConverter.")) {
        const subKey = key.replace("webTools.excelDelimiterConverter.", "");
        if (dict[subKey]) {
          el.setAttribute("title", dict[subKey]);
        }
      }
    });
  }

  // Re-run conversion to refresh badges with new locale
  runExcelConversion();
}

// Alias for requirement specification: setLanguage('ko') / setLanguage('en')
function setLanguage(lang) {
  setExcelDelimiterLang(lang);
  if (typeof setLang === "function") {
    setLang(lang);
  }
}

/**
 * Toggle between KO and EN for Excel Delimiter Converter
 */
function toggleExcelDelimiterLang() {
  const nextLang = edCurrentLang === "ko" ? "en" : "ko";
  setExcelDelimiterLang(nextLang);
  if (typeof setLang === "function") {
    setLang(nextLang);
  }
}

function updateExcelDelimiterStats() {
  runExcelConversion();
}

// Window global bindings for Excel Delimiter Converter
if (typeof window !== "undefined") {
  window.openExcelDelimiterModal = openExcelDelimiterModal;
  window.closeExcelDelimiterModal = closeExcelDelimiterModal;
  window.setExcelConverterMode = setExcelConverterMode;
  window.setExcelDelimiterPreset = setExcelDelimiterPreset;
  window.handleExcelInputChanged = handleExcelInputChanged;
  window.handleExcelSqlInChanged = handleExcelSqlInChanged;
  window.runExcelConversion = runExcelConversion;
  window.pasteExcelFromClipboard = pasteExcelFromClipboard;
  window.clearExcelInput = clearExcelInput;
  window.loadExcelSampleData = loadExcelSampleData;
  window.swapExcelInputOutput = swapExcelInputOutput;
  window.copyExcelOutput = copyExcelOutput;
  window.showExcelToast = showExcelToast;
  window.setExcelDelimiterLang = setExcelDelimiterLang;
  window.setLanguage = setLanguage;
  window.toggleExcelDelimiterLang = toggleExcelDelimiterLang;
  window.updateExcelDelimiterStats = updateExcelDelimiterStats;
  window.excelDelimiterI18n = excelDelimiterI18n;
}

// ═════════════════════════════════════════════════════════════
// 📅 Annual Leave Calculator (대한민국 근로기준법 제60조 연차 자동 계산기)
// ═════════════════════════════════════════════════════════════

let annualLeaveState = {
  mode: "hire", // "hire" (입사일 기준) | "fiscal" (회계연도 기준)
  hireDate: "",
  baseDate: "",
  lang: "ko"
};

let annualLeaveToastTimer = null;

const annualLeaveI18n = {
  ko: {
    title: "근로기준법 기준 연차 자동 계산기",
    subtitle: "대한민국 근로기준법 제60조 기준 실시간 연차·월차 자동 계산",
    statutoryBadge: "근로기준법 제60조 준수",
    statutoryBadgeTitle: "대한민국 근로기준법 제60조(연차 유급휴가) 법정 규정을 정확히 반영합니다.",
    langToggle: "EN",
    modeLabel: "계산 기준 모드",
    modeHireDate: "입사일 기준 (법정 원칙)",
    modeFiscalYear: "회계연도 기준 (매년 1월 1일)",
    modeFiscalNotice: "※ 매년 1월 1일 일괄 부여하는 기업 규정 방식입니다. 퇴직 시 입사일 기준과 비교하여 유리한 조건으로 정산해야 합니다.",
    inputHireLabel: "입사일",
    inputBaseLabel: "기준일 (계산 시점)",
    todayBtn: "오늘 날짜로 리셋",
    sampleBtn: "기본 샘플 입력 (2년차)",
    presetsLabel: "빠른 샘플 프리셋:",
    presetFreshman: "신입 (6개월)",
    presetOneYear: "만 1년",
    presetThreeYears: "3년차",
    presetFiveYears: "5년차",
    presetTenYears: "10년차",
    servicePeriodLabel: "근속 기간",
    workingStatus: "근무 중",
    totalGrantedLabel: "총 발생 연차",
    cumulativeBadge: "입사 이래 누적 총 {days}일 발생",
    cardMonthlyTitle: "1년 미만 월차 발생일수",
    cardMonthlyDesc: "1개월 개근 시 1일씩 발생 (최대 11일)",
    cardRegularTitle: "1년 이상 정기 연차 발생일수",
    cardRegularDesc: "기본 15일 + 3년차부터 2년마다 1일 가산 (최대 25일)",
    copyBtn: "📋 계산 결과 복사하기",
    copiedBtn: "✓ 복사 완료!",
    toastCopied: "연차 계산 결과가 클립보드에 복사되었습니다!",
    toastSampleLoaded: "기본 샘플 데이터(입사 2년차)가 입력되었습니다.",
    toastResetToday: "기준일이 오늘 날짜로 재설정되었습니다.",
    errorDateOrder: "기준일이 입사일보다 이전입니다."
  },
  en: {
    title: "Annual Leave Calculator (Korean Labor Standards Act)",
    subtitle: "Real-time calculation of statutory annual & monthly paid leave under Art. 60",
    statutoryBadge: "Art. 60 Labor Standards Act",
    statutoryBadgeTitle: "Complies accurately with Article 60 of the Korean Labor Standards Act.",
    langToggle: "KO",
    modeLabel: "Calculation Mode",
    modeHireDate: "Hire Date Basis (Statutory Standard)",
    modeFiscalYear: "Fiscal Year Basis (Jan 1st)",
    modeFiscalNotice: "※ Company standard granting leave on Jan 1st. Upon resignation, it must be reconciled against the hire-date basis so the employee suffers no disadvantage.",
    inputHireLabel: "Hire Date",
    inputBaseLabel: "Base Reference Date",
    todayBtn: "Reset to Today",
    sampleBtn: "Load Sample (2 Years)",
    presetsLabel: "Quick Sample Presets:",
    presetFreshman: "New Hire (6 Mo)",
    presetOneYear: "1 Year",
    presetThreeYears: "3 Years",
    presetFiveYears: "5 Years",
    presetTenYears: "10 Years",
    servicePeriodLabel: "Service Period",
    workingStatus: "employed",
    totalGrantedLabel: "Total Annual Leave",
    cumulativeBadge: "Total cumulative leave: {days} days since hire",
    cardMonthlyTitle: "Monthly Leave (< 1 Year)",
    cardMonthlyDesc: "1 day granted per full month worked (up to 11 days)",
    cardRegularTitle: "Regular Annual Leave (≥ 1 Year)",
    cardRegularDesc: "Base 15 days + 1 bonus day every 2 yrs from Year 3 (Max 25 days)",
    copyBtn: "📋 Copy Calculation Results",
    copiedBtn: "✓ Copied!",
    toastCopied: "Annual leave calculation copied to clipboard!",
    toastSampleLoaded: "Sample 2-year employment data loaded.",
    toastResetToday: "Base date has been reset to today.",
    errorDateOrder: "Base date must be after hire date."
  }
};

function formatLeaveIsoDate(d) {
  if (!d || isNaN(d.getTime())) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseLeaveIsoDate(str) {
  if (!str || typeof str !== "string") return null;
  const parts = str.trim().split("-").map(Number);
  if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) return null;
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function getLeaveServicePeriod(hire, base) {
  if (!hire || !base || base < hire) {
    return { years: 0, months: 0, days: 0, totalDays: 0, isValid: false };
  }

  let y = base.getFullYear() - hire.getFullYear();
  let m = base.getMonth() - hire.getMonth();
  let d = base.getDate() - hire.getDate();

  if (d < 0) {
    m -= 1;
    const prevMonthDays = new Date(base.getFullYear(), base.getMonth(), 0).getDate();
    d += prevMonthDays;
  }
  if (m < 0) {
    y -= 1;
    m += 12;
  }

  const oneDayMs = 86400000;
  const totalDays = Math.round((base.getTime() - hire.getTime()) / oneDayMs) + 1;

  return { years: y, months: m, days: d, totalDays, isValid: true };
}

function getLeaveCompletedMonthsUnderOneYear(hire, base) {
  if (!hire || !base || base < hire) return 0;
  let count = 0;
  for (let i = 1; i <= 11; i++) {
    const target = new Date(hire.getFullYear(), hire.getMonth() + i, hire.getDate());
    const maxDayInTargetMonth = new Date(hire.getFullYear(), hire.getMonth() + i + 1, 0).getDate();
    if (hire.getDate() > maxDayInTargetMonth) {
      target.setDate(maxDayInTargetMonth);
    }
    if (base >= target) {
      count++;
    } else {
      break;
    }
  }
  return count;
}

function getLeaveCompletedYears(hire, base) {
  if (!hire || !base || base < hire) return 0;
  let years = 0;
  while (true) {
    const nextAnniversary = new Date(hire.getFullYear() + years + 1, hire.getMonth(), hire.getDate());
    const maxDay = new Date(hire.getFullYear() + years + 1, hire.getMonth() + 1, 0).getDate();
    if (hire.getDate() > maxDay) {
      nextAnniversary.setDate(maxDay);
    }
    if (base >= nextAnniversary) {
      years++;
    } else {
      break;
    }
  }
  return years;
}

function calculateHireDateLeave(hire, base) {
  const period = getLeaveServicePeriod(hire, base);
  if (!period.isValid) {
    return {
      isValid: false,
      period,
      completedYears: 0,
      monthlyLeave: 0,
      regularLeave: 0,
      addedLeave: 0,
      currentLeave: 0,
      cumulativeLeave: 0
    };
  }

  const completedYears = getLeaveCompletedYears(hire, base);
  let monthlyLeave = 0;
  let regularLeave = 0;
  let addedLeave = 0;
  let currentLeave = 0;
  let cumulativeLeave = 0;

  if (completedYears === 0) {
    monthlyLeave = getLeaveCompletedMonthsUnderOneYear(hire, base);
    regularLeave = 0;
    addedLeave = 0;
    currentLeave = monthlyLeave;
    cumulativeLeave = monthlyLeave;
  } else {
    monthlyLeave = 11;
    addedLeave = Math.floor((completedYears - 1) / 2);
    regularLeave = Math.min(25, 15 + addedLeave);
    currentLeave = regularLeave;

    let sumRegular = 0;
    for (let y = 1; y <= completedYears; y++) {
      const added = Math.floor((y - 1) / 2);
      sumRegular += Math.min(25, 15 + added);
    }
    cumulativeLeave = 11 + sumRegular;
  }

  return {
    isValid: true,
    completedYears,
    period,
    monthlyLeave,
    regularLeave,
    addedLeave,
    currentLeave,
    cumulativeLeave
  };
}

function calculateFiscalYearLeave(hire, base) {
  const period = getLeaveServicePeriod(hire, base);
  if (!period.isValid) {
    return {
      isValid: false,
      period,
      completedYears: 0,
      monthlyLeave: 0,
      regularLeave: 0,
      addedLeave: 0,
      currentLeave: 0,
      cumulativeLeave: 0,
      proRatedDays: 0
    };
  }

  const hireYear = hire.getFullYear();
  const baseYear = base.getFullYear();
  const completedYears = getLeaveCompletedYears(hire, base);
  const monthlyLeave = completedYears >= 1 ? 11 : getLeaveCompletedMonthsUnderOneYear(hire, base);

  const dec31HireYear = new Date(hireYear, 11, 31);
  const daysWorkedInHireYear = Math.round((dec31HireYear.getTime() - hire.getTime()) / 86400000) + 1;
  const isHireLeap = (hireYear % 4 === 0 && hireYear % 100 !== 0) || (hireYear % 400 === 0);
  const totalDaysInHireYear = isHireLeap ? 366 : 365;
  const proRatedDays = Math.round((15 * (daysWorkedInHireYear / totalDaysInHireYear)) * 10) / 10;

  let currentLeave = 0;
  let regularLeave = 0;
  let addedLeave = 0;
  let cumulativeLeave = 0;

  if (baseYear === hireYear) {
    currentLeave = monthlyLeave;
    regularLeave = 0;
    addedLeave = 0;
    cumulativeLeave = monthlyLeave;
  } else {
    const passedFiscalYears = baseYear - hireYear;
    if (passedFiscalYears === 1) {
      regularLeave = proRatedDays;
      addedLeave = 0;
      currentLeave = proRatedDays;
      cumulativeLeave = 11 + proRatedDays;
    } else if (passedFiscalYears === 2) {
      regularLeave = 15;
      addedLeave = 0;
      currentLeave = 15;
      cumulativeLeave = 11 + proRatedDays + 15;
    } else {
      addedLeave = Math.floor((passedFiscalYears - 1) / 2);
      regularLeave = Math.min(25, 15 + addedLeave);
      currentLeave = regularLeave;

      let sum = 11 + proRatedDays + 15;
      for (let py = 3; py <= passedFiscalYears; py++) {
        const add = Math.floor((py - 1) / 2);
        sum += Math.min(25, 15 + add);
      }
      cumulativeLeave = Math.round(sum * 10) / 10;
    }
  }

  return {
    isValid: true,
    period,
    completedYears,
    monthlyLeave,
    regularLeave,
    addedLeave,
    currentLeave,
    cumulativeLeave,
    proRatedDays,
    daysWorkedInHireYear,
    totalDaysInHireYear
  };
}

function calculateAnnualLeave() {
  const inputHire = document.getElementById("leave-input-hire");
  const inputBase = document.getElementById("leave-input-base");
  if (!inputHire || !inputBase) return;

  const hireVal = (inputHire.value || "").trim();
  const baseVal = (inputBase.value || "").trim();

  annualLeaveState.hireDate = hireVal;
  annualLeaveState.baseDate = baseVal;

  const hire = parseLeaveIsoDate(hireVal);
  const base = parseLeaveIsoDate(baseVal);

  const isKo = (annualLeaveState.lang || "ko") === "ko";
  const dict = annualLeaveI18n[isKo ? "ko" : "en"] || annualLeaveI18n.ko;

  const textService = document.getElementById("leave-service-text");
  const modeBadge = document.getElementById("leave-mode-badge");
  const resTotal = document.getElementById("leave-res-total");
  const resCumulative = document.getElementById("leave-res-cumulative");
  const monthlyBadge = document.getElementById("leave-monthly-days-badge");
  const monthlyProgressBar = document.getElementById("leave-monthly-progress-bar");
  const regularBadge = document.getElementById("leave-regular-days-badge");
  const regularBreakdown = document.getElementById("leave-regular-breakdown");
  const fiscalNotice = document.getElementById("leave-fiscal-notice");

  if (!hire || !base) {
    if (resTotal) resTotal.textContent = isKo ? "날짜를 선택하세요" : "Select dates";
    return;
  }

  if (base < hire) {
    if (textService) textService.textContent = dict.errorDateOrder;
    if (resTotal) resTotal.textContent = isKo ? "0일 (날짜 확인)" : "0 days (Check dates)";
    if (resCumulative) resCumulative.textContent = isKo ? "기준일이 입사일 이전입니다" : "Base date is earlier than hire date";
    if (monthlyBadge) monthlyBadge.textContent = "0일 / 11일";
    if (monthlyProgressBar) monthlyProgressBar.style.width = "0%";
    if (regularBadge) regularBadge.textContent = "0일";
    if (regularBreakdown) regularBreakdown.textContent = isKo ? "기본 0일 + 가산 0일" : "Base 0 + Bonus 0";
    return;
  }

  const isHireMode = annualLeaveState.mode === "hire";
  const result = isHireMode ? calculateHireDateLeave(hire, base) : calculateFiscalYearLeave(hire, base);
  const p = result.period;

  // 1. Service period badge
  if (textService) {
    const periodStr = isKo
      ? `${p.years}년 ${p.months}개월 ${p.days}일 근무 중 (총 ${p.totalDays}일)`
      : `${p.years}y ${p.months}m ${p.days}d employed (Total ${p.totalDays}d)`;
    textService.textContent = periodStr;
  }

  // 2. Mode badge
  if (modeBadge) {
    modeBadge.textContent = isHireMode
      ? (isKo ? "⚖️ 입사일 기준 산정" : "⚖️ Hire Date Basis")
      : (isKo ? "🏢 회계연도(1.1) 기준 산정" : "🏢 Fiscal Year (Jan 1) Basis");
  }

  // 3. Fiscal notice banner
  if (fiscalNotice) {
    if (!isHireMode) {
      fiscalNotice.classList.remove("hidden");
    } else {
      fiscalNotice.classList.add("hidden");
    }
  }

  // 4. Hero Total
  if (resTotal) {
    resTotal.textContent = isKo ? `총 ${result.currentLeave}일` : `Total ${result.currentLeave} days`;
  }
  if (resCumulative) {
    resCumulative.textContent = isKo
      ? `입사 이래 누적 총 ${result.cumulativeLeave}일 발생`
      : `Total cumulative leave: ${result.cumulativeLeave} days`;
  }

  // 5. Monthly leave card
  if (monthlyBadge) {
    monthlyBadge.textContent = `${result.monthlyLeave}일 / 11일`;
  }
  if (monthlyProgressBar) {
    const pct = Math.min(100, Math.round((result.monthlyLeave / 11) * 100));
    monthlyProgressBar.style.width = `${pct}%`;
  }

  // 6. Regular leave card
  if (regularBadge) {
    regularBadge.textContent = `${result.regularLeave}일`;
  }
  if (regularBreakdown) {
    if (isHireMode) {
      regularBreakdown.textContent = isKo
        ? `기본 15일 + 가산 ${result.addedLeave}일`
        : `Base 15 + Bonus ${result.addedLeave}`;
    } else {
      if (result.period.years === 0 && (base.getFullYear() === hire.getFullYear())) {
        regularBreakdown.textContent = isKo
          ? `입사 당해 연도 (다음해 1.1 비례 ${result.proRatedDays}일 예정)`
          : `Hire year (Next Jan 1: ${result.proRatedDays} pro-rated days)`;
      } else if (result.completedYears <= 1) {
        regularBreakdown.textContent = isKo
          ? `전년도 재직 비례 ${result.proRatedDays}일`
          : `Prior year pro-rated ${result.proRatedDays} days`;
      } else {
        regularBreakdown.textContent = isKo
          ? `기본 15일 + 가산 ${result.addedLeave}일`
          : `Base 15 + Bonus ${result.addedLeave}`;
      }
    }
  }
}

function setAnnualLeaveMode(mode) {
  annualLeaveState.mode = mode === "fiscal" ? "fiscal" : "hire";
  const btnHire = document.getElementById("leave-mode-btn-hire");
  const btnFiscal = document.getElementById("leave-mode-btn-fiscal");

  if (btnHire && btnFiscal) {
    if (annualLeaveState.mode === "hire") {
      btnHire.classList.add("active");
      btnHire.classList.remove("text-slate-400");
      btnHire.setAttribute("aria-selected", "true");
      btnFiscal.classList.remove("active");
      btnFiscal.classList.add("text-slate-400");
      btnFiscal.setAttribute("aria-selected", "false");
    } else {
      btnFiscal.classList.add("active");
      btnFiscal.classList.remove("text-slate-400");
      btnFiscal.setAttribute("aria-selected", "true");
      btnHire.classList.remove("active");
      btnHire.classList.add("text-slate-400");
      btnHire.setAttribute("aria-selected", "false");
    }
  }

  calculateAnnualLeave();
}

function resetLeaveBaseDateToday() {
  const inputBase = document.getElementById("leave-input-base");
  const todayStr = formatLeaveIsoDate(new Date());
  if (inputBase) {
    inputBase.value = todayStr;
  }
  annualLeaveState.baseDate = todayStr;
  calculateAnnualLeave();
  const isKo = (annualLeaveState.lang || "ko") === "ko";
  showAnnualLeaveToast(isKo ? "기준일이 오늘 날짜로 재설정되었습니다." : "Base date reset to today.");
}

function loadLeaveDefaultSample() {
  const today = new Date();
  const d = new Date(today);
  d.setFullYear(d.getFullYear() - 2);

  const hireStr = formatLeaveIsoDate(d);
  const baseStr = formatLeaveIsoDate(today);

  const inputHire = document.getElementById("leave-input-hire");
  const inputBase = document.getElementById("leave-input-base");

  if (inputHire) inputHire.value = hireStr;
  if (inputBase) inputBase.value = baseStr;

  annualLeaveState.hireDate = hireStr;
  annualLeaveState.baseDate = baseStr;

  const modal = document.getElementById("annual-leave-calculator") || document.getElementById("tool-annual-leave-calculator-modal");
  if (modal) {
    modal.querySelectorAll(".leave-chip-btn").forEach(btn => btn.classList.remove("active"));
  }

  calculateAnnualLeave();
  const isKo = (annualLeaveState.lang || "ko") === "ko";
  showAnnualLeaveToast(isKo ? "기본 샘플 데이터(입사 2년차)가 입력되었습니다." : "Sample 2-year employment data loaded.");
}

function setLeavePreset(presetType) {
  const baseInput = document.getElementById("leave-input-base");
  const hireInput = document.getElementById("leave-input-hire");
  const today = new Date();
  const baseDate = baseInput && baseInput.value ? parseLeaveIsoDate(baseInput.value) || today : today;

  const hireDate = new Date(baseDate);
  if (presetType === "6m") {
    hireDate.setMonth(hireDate.getMonth() - 6);
  } else if (presetType === "1y") {
    hireDate.setFullYear(hireDate.getFullYear() - 1);
  } else if (presetType === "3y") {
    hireDate.setFullYear(hireDate.getFullYear() - 3);
  } else if (presetType === "5y") {
    hireDate.setFullYear(hireDate.getFullYear() - 5);
  } else if (presetType === "10y") {
    hireDate.setFullYear(hireDate.getFullYear() - 10);
  }

  const hireIso = formatLeaveIsoDate(hireDate);
  const baseIso = formatLeaveIsoDate(baseDate);

  if (hireInput) hireInput.value = hireIso;
  if (baseInput) baseInput.value = baseIso;
  annualLeaveState.hireDate = hireIso;
  annualLeaveState.baseDate = baseIso;

  const modal = document.getElementById("annual-leave-calculator") || document.getElementById("tool-annual-leave-calculator-modal");
  if (modal) {
    modal.querySelectorAll(".leave-chip-btn").forEach(btn => btn.classList.remove("active"));
    const activeBtn = modal.querySelector(`.leave-chip-btn[onclick*="'${presetType}'"]`);
    if (activeBtn) activeBtn.classList.add("active");
  }

  calculateAnnualLeave();
}

function copyAnnualLeaveResult() {
  const isKo = (annualLeaveState.lang || "ko") === "ko";
  const dict = annualLeaveI18n[isKo ? "ko" : "en"] || annualLeaveI18n.ko;

  const hire = parseLeaveIsoDate(annualLeaveState.hireDate);
  const base = parseLeaveIsoDate(annualLeaveState.baseDate);

  if (!hire || !base || base < hire) {
    showAnnualLeaveToast(dict.errorDateOrder);
    return;
  }

  const isHire = annualLeaveState.mode === "hire";
  const result = isHire ? calculateHireDateLeave(hire, base) : calculateFiscalYearLeave(hire, base);
  const p = result.period;
  const modeName = isHire ? "입사일 기준 (법정 원칙)" : "회계연도 기준 (매년 1월 1일)";

  const textToCopy = `[근로기준법 제60조 기준 연차 계산 결과]
• 산정 모드: ${modeName}
• 입사일: ${annualLeaveState.hireDate}
• 기준일: ${annualLeaveState.baseDate}
• 근속 기간: ${p.years}년 ${p.months}개월 ${p.days}일 (총 ${p.totalDays}일 근무)
───────────────────────────────
★ 당해 발생 연차: 총 ${result.currentLeave}일
• 1년 미만 월차 발생: ${result.monthlyLeave}일 (최대 11일 중)
• 1년 이상 정기 연차: ${result.regularLeave}일 (기본 15일 + 근속 가산 ${result.addedLeave}일)
• 입사 이래 누적 연차: 총 ${result.cumulativeLeave}일
───────────────────────────────
※ 대한민국 근로기준법 제60조 준수 (출근율 80% 이상 전제)
※ 1년 미만 발생 월차는 입사일로부터 1년이 지나면 사용권이 소멸됩니다.
(연차 자동 계산기 바로가기: https://www.dailyhelperhub.com/#annual-leave-calculator)`;

  navigator.clipboard.writeText(textToCopy).then(() => {
    showAnnualLeaveToast(dict.toastCopied);
    const copyBtns = document.querySelectorAll(".leave-btn-copy, #leave-btn-copy");
    copyBtns.forEach((copyBtn) => {
      const origHtml = copyBtn.dataset.origHtml || copyBtn.innerHTML;
      copyBtn.dataset.origHtml = origHtml;
      copyBtn.innerHTML = `<span>✓</span> <span>${dict.copiedBtn}</span>`;
      copyBtn.classList.add("bg-emerald-600", "copied");
      setTimeout(() => {
        copyBtn.innerHTML = copyBtn.dataset.origHtml || origHtml;
        copyBtn.classList.remove("bg-emerald-600", "copied");
      }, 1800);
    });
  }).catch((err) => {
    console.error("Clipboard copy failed:", err);
  });
}

function showAnnualLeaveToast(message) {
  const toast = document.getElementById("annual-leave-toast");
  const msgEl = document.getElementById("annual-leave-toast-msg");
  if (!toast) return;

  if (msgEl && message) {
    msgEl.textContent = message;
  }
  toast.classList.add("show");

  clearTimeout(annualLeaveToastTimer);
  annualLeaveToastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2300);
}

function setAnnualLeaveLang(lang) {
  annualLeaveState.lang = lang === "en" ? "en" : "ko";
  const dict = annualLeaveI18n[annualLeaveState.lang] || annualLeaveI18n.ko;

  const toggleLabel = document.getElementById("leave-lang-toggle-label");
  if (toggleLabel) {
    toggleLabel.textContent = dict.langToggle;
  }

  const modal = document.getElementById("annual-leave-calculator") || document.getElementById("tool-annual-leave-calculator-modal");
  if (modal) {
    modal.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key && (key.startsWith("webTools.annualLeaveCalc.") || key.startsWith("webTools.annualLeaveCalculator."))) {
        const subKey = key.replace("webTools.annualLeaveCalc.", "").replace("webTools.annualLeaveCalculator.", "");
        if (dict[subKey]) {
          el.textContent = dict[subKey];
        }
      }
    });

    modal.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      if (key && (key.startsWith("webTools.annualLeaveCalc.") || key.startsWith("webTools.annualLeaveCalculator."))) {
        const subKey = key.replace("webTools.annualLeaveCalc.", "").replace("webTools.annualLeaveCalculator.", "");
        if (dict[subKey]) {
          el.setAttribute("title", dict[subKey]);
        }
      }
    });
  }

  calculateAnnualLeave();
}

function toggleAnnualLeaveLang() {
  const nextLang = annualLeaveState.lang === "ko" ? "en" : "ko";
  setAnnualLeaveLang(nextLang);
  if (typeof setLang === "function") {
    setLang(nextLang);
  }
}

function openAnnualLeaveModal() {
  const modal = document.getElementById("annual-leave-calculator") || document.getElementById("tool-annual-leave-calculator-modal");
  if (!modal) return;

  const todayStr = formatLeaveIsoDate(new Date());
  const inputHire = document.getElementById("leave-input-hire");
  const inputBase = document.getElementById("leave-input-base");

  if (inputBase && !inputBase.value) {
    inputBase.value = todayStr;
    annualLeaveState.baseDate = todayStr;
  }
  if (inputHire && !inputHire.value) {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 2);
    const defaultHire = formatLeaveIsoDate(d);
    inputHire.value = defaultHire;
    annualLeaveState.hireDate = defaultHire;
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";

  const panel = modal.querySelector(".leave-modal-container, .ed-modal-container, .modal-panel");
  if (panel) {
    panel.classList.add("modal-open");
  }

  try {
    if (window.location.hash !== "#annual-leave-calculator") {
      history.replaceState(null, document.title, window.location.pathname + window.location.search + "#annual-leave-calculator");
    }
  } catch (e) {
    // Ignore history error
  }

  if (typeof currentLang !== "undefined") {
    setAnnualLeaveLang(currentLang);
  } else {
    setAnnualLeaveLang("ko");
  }

  calculateAnnualLeave();
}

function closeAnnualLeaveModal() {
  const modal = document.getElementById("annual-leave-calculator") || document.getElementById("tool-annual-leave-calculator-modal");
  if (!modal) return;

  const panel = modal.querySelector(".leave-modal-container, .ed-modal-container, .modal-panel");
  if (panel) panel.classList.remove("modal-open");

  try {
    const rawHash = (window.location.hash || "").trim().toLowerCase();
    const hash = decodeURIComponent(rawHash).replace(/^#/, "");
    const leaveAliases = [
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
    if (leaveAliases.includes(hash)) {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  } catch (e) {
    // Ignore history error
  }

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  }, 250);
}

// Global ESC and backdrop click event listeners
if (typeof document !== "undefined") {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const leaveModal = document.getElementById("annual-leave-calculator") || document.getElementById("tool-annual-leave-calculator-modal");
      if (leaveModal && !leaveModal.classList.contains("hidden")) {
        closeAnnualLeaveModal();
      }
    }
  });

  document.addEventListener("click", (e) => {
    const leaveModal = document.getElementById("annual-leave-calculator") || document.getElementById("tool-annual-leave-calculator-modal");
    if (leaveModal && !leaveModal.classList.contains("hidden")) {
      if (e.target === leaveModal) {
        closeAnnualLeaveModal();
      }
    }
  });
}

// Window global bindings for Annual Leave Calculator
if (typeof window !== "undefined") {
  window.openAnnualLeaveModal = openAnnualLeaveModal;
  window.closeAnnualLeaveModal = closeAnnualLeaveModal;
  window.setAnnualLeaveMode = setAnnualLeaveMode;
  window.calculateAnnualLeave = calculateAnnualLeave;
  window.resetLeaveBaseDateToday = resetLeaveBaseDateToday;
  window.loadLeaveDefaultSample = loadLeaveDefaultSample;
  window.setLeavePreset = setLeavePreset;
  window.copyAnnualLeaveResult = copyAnnualLeaveResult;
  window.showAnnualLeaveToast = showAnnualLeaveToast;
  window.setAnnualLeaveLang = setAnnualLeaveLang;
  window.toggleAnnualLeaveLang = toggleAnnualLeaveLang;
  window.annualLeaveI18n = annualLeaveI18n;
}

