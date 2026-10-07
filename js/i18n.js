/**
 * Daily Helper (일상의도움) — i18n Translation Dictionary
 * Supports: Korean (ko), English (en)
 */
const translations = {
  ko: {
    brand: "일상의도움",
    slogan: "당신의 삶을 풍요롭게 합니다",
    nav: { home: "홈", about: "소개", privacy: "개인정보처리방침", terms: "이용약관", contact: "문의하기", backToHome: "← 홈으로", guide: "앱 가이드" },
    tabs: {
      mobileApps: "모바일 앱",
      webTools: "웹 도구"
    },
    webTools: {
      sectionTitle: "설치 없이 브라우저에서 바로 사용하는 실용 웹 도구",
      heroCount: "개의 웹 도구",
      resultsFound: "개 웹 도구 검색됨",
      badgeHot: "HOT",
      badgeFree: "무료 도구",
      useToolBtn: "바로 사용하기",
      emptyTitle: "검색된 웹 도구가 없습니다",
      emptySubtitle: "다른 키워드로 검색해 보세요.",
      globalComingSoonTitle: "New Global Web Tools Coming Soon!",
      globalComingSoonSubtitle: "전 세계 사용자를 위한 유용한 온라인 도구를 준비하고 있습니다.",
      wageCalc: {
        title: "실수령액 & 주휴수당 계산기",
        subtitle: "2026년 최저시급(10,320원) 기준 알바 및 근로소득 자동 계산",
        desc: "시급과 근무시간만 입력하면 주휴수당과 4대보험/3.3% 공제액을 1초 만에 자동 계산합니다.",
        hourlyWageLabel: "시급 (원)",
        weeklyHoursLabel: "1주 총 근무시간 (시간)",
        workDaysLabel: "1주 근무일수 (일)",
        deductionLabel: "공제 방식 선택",
        deductionNone: "미적용 (0%)",
        deductionFreelance: "3.3% (프리랜서/알바)",
        deductionFourInsurances: "4대보험 (~9.4%)",
        basePay: "월 기본급",
        holidayPay: "월 주휴수당",
        grossPay: "세전 총 급여",
        deductionAmount: "예상 공제액",
        netPay: "최종 예상 실수령액",
        minWageBtn: "2026 최저시급 (10,320원)",
        copyBtn: "📋 결과 복사",
        copySuccess: "복사 완료!",
        tip: "※ 실제 지급액은 회사 규정, 연장/야간 수당, 주휴일 결근 여부에 따라 다소 차이가 있을 수 있습니다.",
        guide: {
          mainTitle: "2026 알바 급여 & 주휴수당 완벽 가이드",
          badge: "노동법 핵심 요약",
          item1Title: "2026년 법정 최저임금 안내",
          item1Content: `<div class="space-y-1.5"><p>• <strong>시간급:</strong> <span class="text-indigo-600 dark:text-indigo-400 font-bold">10,320원</span> (전년 대비 290원 인상)</p><p>• <strong>주 40시간 근무 시 월 환산액:</strong> <span class="font-bold text-slate-900 dark:text-white">2,156,880원</span> (주휴시간 8시간 포함 월 209시간 기준, 10,320원 × 209시간)</p><p>• <strong>기본급 &amp; 주휴수당 구성:</strong> 월 기본급 1,793,616원 (173.8시간) + 월 주휴수당 363,264원 (35.2시간) = 합계 2,156,880원</p><p>• <strong>적용 대상:</strong> 1인 이상 모든 사업장에 적용되며 아르바이트, 파트타임, 일용직, 계약직 등 근로 형태와 무관하게 전면 적용됩니다.</p></div>`,
          item2Title: "주휴수당 발생 3대 핵심 조건",
          item2Content: `<div class="space-y-1.5"><p>근로기준법 제55조에 따라 아래 3대 조건을 모두 충족하면 1주 평균 1회 이상의 유급휴일(주휴수당)이 보장됩니다:</p><p>• <strong>① 주 소정근로시간 15시간 이상:</strong> 4주간 평균 1주일간 정해진 소정근로시간이 15시간 이상이어야 합니다. (15시간 미만 초단기 근로자는 제외)</p><p>• <strong>② 약속한 소정근로일 개근:</strong> 근로계약서상 일하기로 정한 소정근로일에 결근 없이 모두 출근해야 합니다. (지각이나 조퇴는 결근이 아니므로 주휴수당이 전액 정상 발생합니다)</p><p>• <strong>③ 다음 주 근로 예정 여부:</strong> 계속적인 근로 관계가 예정되어 있어야 합니다. (통상적 계속 근무 시 보장)</p><p>• <strong>단시간 근로자 계산식:</strong> (주 근무시간 ÷ 40시간) × 8시간 × 시급</p></div>`,
          item3Title: "공제 방식 차이 (3.3% 프리랜서 vs 4대 보험)",
          item3Content: `<div class="space-y-1.5"><p>• <strong>3.3% 사업소득세 원천징수 (단기/프리랜서):</strong> 사업소득세 3% + 지방소득세 0.3%를 차감합니다. 단기 알바 또는 사업소득 계약 시 주로 적용되며, 매년 5월 종합소득세 신고 시 소득 구간에 따라 원천징수된 세금을 전액 환급받을 수 있습니다.</p><p>• <strong>4대 보험 (~9.4% 근로자 부담분):</strong> 국민연금(4.5%) + 건강보험(3.545%) + 노인장기요양보험(건보의 12.95%) + 고용보험(0.9%)으로 구성되어 약 9.4%가 급여에서 공제됩니다. (산재보험은 사업주가 100% 전액 부담)</p><p>• <strong>의무 가입 기준:</strong> 월 60시간(주 15시간) 이상 근무하고 1개월 이상 지속 근로하는 모든 근로자는 4대보험 가입이 법적 의무입니다.</p></div>`
        }
      },
      annualLeaveCalc: {
        title: "근로기준법 기준 연차 자동 계산기",
        subtitle: "대한민국 근로기준법 제60조 기준 실시간 연차·월차 자동 계산",
        statutoryBadge: "근로기준법 제60조 준수",
        statutoryBadgeTitle: "대한민국 근로기준법 제60조(연차 유급휴가) 법정 규정을 정확히 반영합니다.",
        langToggle: "EN",
        modeLabel: "계산 기준 모드",
        modeHireDate: "📅 입사일 기준 (법정 원칙)",
        modeFiscalYear: "🏢 회계연도 기준 (매년 1월 1일)",
        modeFiscalNotice: "※ 매년 1월 1일 일괄 부여하는 기업 규정 방식입니다. 퇴직 시 입사일 기준과 비교하여 유리한 조건으로 정산해야 합니다.",
        inputHireLabel: "입사일",
        inputBaseLabel: "기준일 (계산 시점)",
        todayBtn: "오늘 날짜로 리셋",
        sampleBtn: "기본 샘플 입력 (2년차)",
        presetsLabel: "빠른 샘플 프리셋",
        presetFreshman: "신입 (6개월)",
        presetOneYear: "만 1년",
        presetThreeYears: "3년차",
        presetFiveYears: "5년차",
        presetTenYears: "10년차",
        dashboardTitle: "연차 산정 결과 대시보드",
        servicePeriodLabel: "근속 기간",
        workingStatus: "근무 중",
        totalGrantedLabel: "총 발생 연차",
        totalUnit: "일",
        totalDaysUnit: "총 {days}일",
        cumulativeBadge: "입사 이래 누적 총 {days}일 발생",
        cardMonthlyTitle: "1년 미만 월차 발생일수",
        cardMonthlyDesc: "1개월 개근 시 1일씩 발생 (최대 11일)",
        cardRegularTitle: "1년 이상 정기 연차 발생일수",
        cardRegularDesc: "기본 15일 + 3년차부터 2년마다 1일 가산 (최대 25일)",
        cardFiscalTitle: "회계연도 기준 비례 연차",
        cardFiscalDesc: "입사 당해 연도 재직일수 비례 환산",
        baseLeaveLabel: "기본 연차",
        addedLeaveLabel: "근속 가산일수",
        copyBtn: "📋 계산 결과 복사하기",
        closeBtn: "닫기",
        toastCopied: "연차 계산 결과가 클립보드에 복사되었습니다!",
        toastSampleLoaded: "샘플 근속 데이터가 입력되었습니다.",
        toastResetToday: "기준일이 오늘 날짜로 재설정되었습니다.",
        errorDateOrder: "기준일은 입사일 이후여야 합니다.",
        guide: {
          mainTitle: "근로기준법 제60조 연차유급휴가 핵심 법정 가이드",
          badge: "노동법 핵심 요약",
          item1Title: "1년 미만 발생 연차의 소멸 시효 (입사 1년 도래 시)",
          item1Content: `<div class="space-y-1.5"><p>• <strong>1년 미만 월차:</strong> 입사 1년 미만 기간 동안에는 1개월 개근 시마다 1일씩, 최대 11일의 유급휴가가 발생합니다.</p><p>• <strong>소멸 시효:</strong> 1년 미만 기간에 발생한 연차는 <strong>입사일로부터 1년이 지나면 사용권이 법적으로 소멸</strong>됩니다 (근로기준법 제60조 제7항). 단, 사용자의 귀책사유로 쓰지 못한 경우에는 미사용 연차수당으로 청구할 수 있습니다.</p></div>`,
          item2Title: "1년 도달 시 기본 15일 부여 및 80% 출근율 전제",
          item2Content: `<div class="space-y-1.5"><p>• <strong>기본 15일 부여:</strong> 1년간 80% 이상 출근한 근로자에게는 1년이 되는 날(입사 1주년) 즉시 15일의 유급휴가가 새롭게 발생합니다.</p><p>• <strong>출근율 80% 미만:</strong> 출근율이 80% 미만인 경우에도 1개월 개근 시 1일씩의 연차가 주어집니다.</p></div>`,
          item3Title: "3년 이상 근속 시 매 2년마다 1일 가산 (최대 법정 25일 한도)",
          item3Content: `<div class="space-y-1.5"><p>• <strong>가산 규정:</strong> 3년 이상 계속 근로한 근로자에게는 최초 1년을 초과하는 계속근로연수 매 2년마다 1일을 가산합니다.</p><p>• <strong>연차 발생 표:</strong> 1~2년차: 15일 / 3~4년차: 16일 / 5~6년차: 17일 / 7~8년차: 18일 ... / 21년차 이상: 25일 (최대 법정 한도 도달 시 고정).</p></div>`,
          item4Title: "회계연도 기준(1월 1일) 도입 기업의 퇴직 정산 원칙",
          item4Content: `<div class="space-y-1.5"><p>• <strong>행정 편의 인정:</strong> 회사의 관리 편의상 매년 1월 1일을 기준으로 전 사원의 연차를 일괄 부여하는 것은 노동부 행정해석상 유효합니다.</p><p>• <strong>퇴직 시 필수 비교 정산:</strong> 근로자가 퇴직할 때는 <strong>'입사일 기준'으로 계산한 총 연차일수</strong>와 비교하여, 회계연도 기준이 근로자에게 불리한 경우 반드시 그 차이일수만큼 미사용 연차수당으로 지급해야 합니다.</p></div>`
        }
      },
      charByteCounter: {
        title: "자소서/공문서 글자수 & Byte 변환기",
        subtitle: "자소서·공문서 제출 규격 1초 실시간 검증",
        desc: "공백 포함/제외 글자수 실시간 계산, 취업포털(2Byte) 및 시스템(UTF-8 3Byte) 바이트 분리 지원",
        inputTitle: "본문 입력",
        placeholder: "자기소개서, 이력서, 공문서 또는 레포트 본문을 여기에 붙여넣거나 직접 작성하세요.\n실시간으로 글자수와 바이트(Byte)가 자동 계산됩니다.",
        pasteBtn: "📋 클립보드 붙여넣기",
        clearBtn: "🗑️ 전체 지우기",
        cleanSpacesBtn: "✨ 공백 1칸 정리",
        cleanLinesBtn: "↵ 빈 줄 정리",
        copyTextBtn: "📋 본문 복사",
        copyStatsBtn: "📊 통계 복사",
        statWithSpaces: "공백 포함 글자수",
        statWithoutSpaces: "공백 제외 글자수",
        statBytes: "바이트 (Byte)",
        statDocStructure: "문서 분량",
        statByteStandard: "한글 2Byte 기준",
        statEucKr: "취업포털 (2Byte)",
        statEucKrDesc: "사람인 · 잡코리아 · 인크루트 (EUC-KR)",
        statUtf8: "시스템/공공 (3Byte)",
        statUtf8Desc: "공공기관 · 대기업 전산시스템 (UTF-8)",
        statWords: "단어 수",
        statLines: "줄 수 (행)",
        statSpaces: "공백 수",
        unitChar: "자",
        unitByte: "Byte",
        unitWord: "단어",
        unitLine: "줄",
        copiedToast: "클립보드에 복사되었습니다!",
        pasteError: "클립보드 읽기 권한이 없습니다. 직접 Ctrl+V로 붙여넣어 주세요.",
        confirmClear: "입력된 내용을 모두 지우시겠습니까?",
        guide: {
          mainTitle: "💡 글자수 및 바이트 계산 기준 안내",
          singleTitle: "💡 글자수 및 바이트 계산 기준 안내",
          badge: "제출 규격 완벽 검증",
          singleContent: `<p>• <strong>공백 포함/제외:</strong> 기업 서류 접수 시 별도 공지가 없다면 통상 '공백 포함' 기준입니다.</p><p>• <strong>바이트(Byte):</strong> 일반 취업포털(사람인, 잡코리아 등)은 한글을 2Byte(영문/기호/공백 1Byte)로 환산합니다.</p>`,
          item1Title: "취업포털별 바이트(Byte) 산정 기준 차이",
          item1Content: `<div class="space-y-1.5"><p>• <strong>사람인 / 잡코리아 / 인크루트:</strong> 대부분 <strong>한글 2Byte (EUC-KR)</strong> 기준을 채택하고 있습니다. 한글 1자는 2Byte, 영문/숫자/공백(스페이스)/줄바꿈(엔터)은 1Byte로 계산됩니다.</p><p>• <strong>예시:</strong> 한글 500자 = 약 1,000Byte (공백 미포함 시), 공백 포함 시 공백 수만큼 Byte 추가.</p></div>`,
          item2Title: "공공기관 · 대기업 채용 시스템 (UTF-8 3Byte) 주의점",
          item2Content: `<div class="space-y-1.5"><p>• <strong>공공기관 / 웹시스템 규격:</strong> 전산 시스템 DB(Oracle, MySQL 등) 설정에 따라 <strong>UTF-8 (한글 3Byte)</strong>을 기준으로 삼는 곳이 있으므로 사전 확인이 필수입니다.</p><p>• <strong>주의사항:</strong> 3,000Byte 제한 공고 시 EUC-KR 기준으로는 한글 1,500자까지 들어가지만, UTF-8 기준 시스템에서는 1,000자만 입력되어 뒷부분이 잘릴 수 있으니 유의하세요.</p></div>`,
          item3Title: "공백 포함 vs 제외 작성 원칙",
          item3Content: `<div class="space-y-1.5"><p>• <strong>작성 원칙:</strong> 기업 채용 공고나 자소서 문항에 <strong>'공백 제외' 명시가 없다면 통상 '공백 포함'을 기준</strong>으로 작성하는 것이 인사담당자 및 채용 시스템의 기본 원칙입니다.</p><p>• <strong>분량 권장 팁:</strong> 제한 글자수의 <strong>85% ~ 95%</strong> 수준으로 꽉 채워 작성할 때 가장 성의 있고 완결성 높은 자소서로 평가받습니다.</p></div>`
        }
      },
      excelDelimiterConverter: {
        title: "엑셀 줄바꿈 ↔ 구분자 변환기",
        subtitle: "엑셀 행/열 데이터를 쉼표(,), SQL IN, 따옴표로 1초 만에 상호 변환",
        securityBadge: "100% 브라우저 로컬 처리 (보안 안심)",
        securityBadgeTitle: "서버로 데이터를 전송하지 않으며 클라이언트에서 즉시 처리됩니다.",
        langToggle: "EN",
        modeLabel: "변환 모드",
        modeLineToDelim: "줄바꿈 → 구분자",
        modeDelimToLine: "구분자 → 줄바꿈",
        inputTitle: "입력 데이터 (Input)",
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
        swapBtn: "🔄 결과를 입력으로 이동",
        toastCopied: "클립보드에 복사되었습니다!",
        toastCleared: "입력창이 초기화되었습니다.",
        toastSampleLoaded: "샘플 데이터가 로드되었습니다.",
        toastPasted: "클립보드 내용을 붙여넣었습니다.",
        toastSwapped: "변환 결과가 입력창으로 이동되었습니다.",
        toastNoResult: "복사할 변환 결과가 없습니다.",
        toastPasteError: "클립보드 읽기 권한이 없습니다. Ctrl+V로 붙여넣어 주세요.",
        guide: {
          mainTitle: "💡 엑셀 줄바꿈 & 구분자 변환기 200% 활용 팁",
          tip1Title: "엑셀(Excel) 다중 열 & 줄바꿈 한 번에 복사하기",
          tip1Content: "엑셀에서 세로 열뿐만 아니라 가로 여러 열(다중 셀)을 복사해 붙여넣어도 탭(Tab) 문자를 자동 인식하여 각각 개별 항목으로 분리 변환합니다.",
          tip2Title: "DB 쿼리 WHERE column IN (...) 작성 팁",
          tip2Content: "엑셀의 사번, ID, 고객번호 목록을 복사한 후 'SQL 작은따옴표' 프리셋과 'SQL IN 괄호 감싸기'를 체크하면 즉시 실행 가능한 SQL IN 구문이 완성됩니다.",
          tip3Title: "개인정보 및 보안 안내",
          tip3Content: "본 도구는 100% 사용자의 웹 브라우저 메모리 안에서만 동작합니다. 어떤 데이터도 외부 서버나 네트워크로 전송되지 않으므로 사내 보안 데이터나 개인정보도 안심하고 변환할 수 있습니다."
        }
      }
    },
    hero: {
      title: "일상을 더 스마트하게",
      titlePrefix: "일상을 더",
      titleHighlight: "스마트하게",
      subtitle: "검증된 안드로이드 앱과 유용한 도구로 당신의 하루를 업그레이드하세요.",
      searchPlaceholder: "앱 또는 도구 이름 검색...",
      totalApps: "개의 앱",
      resultsFound: "개 검색됨",
    },
    proof: {
      apps: "10+ 유용한 스마트폰 앱",
      free: "100% 무료 & 안전한 도구",
      update: "주기적인 신규 앱 업데이트"
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
      <a href="https://play.google.com/store/apps/details?id=com.wgapps.bookspot" target="_blank" rel="noopener noreferrer" class="guide-cta-download-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-600 via-emerald-500 to-green-600 hover:from-teal-700 hover:to-green-700 shadow-md shadow-teal-500/30 hover:shadow-lg hover:shadow-teal-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
        <span class="text-base">▶</span>
        <span>구글 플레이에서 다운로드</span>
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
  <a href="https://play.google.com/store/apps/details?id=com.wgapps.bookspot" target="_blank" rel="noopener noreferrer" class="detail-btn" style="max-width:260px; background: linear-gradient(135deg, #0d9488, #059669); color: white; border: none; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
    <span>구글 플레이 다운로드</span> ↗
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
    tabs: {
      mobileApps: "Mobile Apps",
      webTools: "Web Tools"
    },
    webTools: {
      sectionTitle: "Practical web tools ready in your browser",
      heroCount: "web tools available",
      resultsFound: "web tools found",
      badgeHot: "HOT",
      badgeFree: "Free Tool",
      useToolBtn: "Use Tool Now",
      emptyTitle: "No web tools found",
      emptySubtitle: "Try searching with a different keyword.",
      globalComingSoonTitle: "New Global Web Tools Coming Soon!",
      globalComingSoonSubtitle: "We are currently preparing useful online tools for global users.",
      wageCalc: {
        title: "Net Salary & Holiday Allowance Calculator",
        subtitle: "Hourly wage & statutory holiday allowance calculator",
        desc: "Calculate weekly holiday allowance and deductions automatically in seconds.",
        hourlyWageLabel: "Hourly Wage (KRW)",
        weeklyHoursLabel: "Weekly Work Hours (hrs)",
        workDaysLabel: "Work Days Per Week (days)",
        deductionLabel: "Deduction Type",
        deductionNone: "None (0%)",
        deductionFreelance: "3.3% (Freelance / Part-time)",
        deductionFourInsurances: "4 Major Insurances (~9.4%)",
        basePay: "Monthly Base Pay",
        holidayPay: "Monthly Holiday Allowance",
        grossPay: "Gross Salary",
        deductionAmount: "Estimated Deduction",
        netPay: "Estimated Net Salary",
        minWageBtn: "2026 Min Wage (10,320 KRW)",
        copyBtn: "📋 Copy Results",
        copySuccess: "Copied!",
        tip: "※ Actual pay may vary depending on overtime, night shifts, or company attendance policies.",
        guide: {
          mainTitle: "2026 Salary & Holiday Allowance Complete Guide",
          badge: "Labor Law Summary",
          item1Title: "2026 Statutory Minimum Wage Information",
          item1Content: `<div class="space-y-1.5"><p>• <strong>Hourly Wage:</strong> <span class="text-indigo-600 dark:text-indigo-400 font-bold">10,320 KRW</span> (Increased from previous year)</p><p>• <strong>Monthly Pay (40 hrs/wk):</strong> <span class="font-bold text-slate-900 dark:text-white">2,156,880 KRW</span> (Based on statutory 209 monthly hours including 8h/wk paid holiday, 10,320 × 209 hrs)</p><p>• <strong>Breakdown:</strong> Monthly Base Pay 1,793,616 KRW (173.8h) + Holiday Allowance 363,264 KRW (35.2h) = Total 2,156,880 KRW</p><p>• <strong>Coverage:</strong> Mandatory for all workplaces with 1+ employees, including part-time, temporary, and contractual workers.</p></div>`,
          item2Title: "3 Key Conditions for Weekly Holiday Allowance",
          item2Content: `<div class="space-y-1.5"><p>Under Article 55 of the Labor Standards Act, workers are legally entitled to weekly paid holiday allowance when fulfilling all 3 criteria:</p><p>• <strong>1. 15+ Contractual Hours per Week:</strong> Average work hours over a 4-week span must reach 15 hours or more per week.</p><p>• <strong>2. Perfect Attendance on Scheduled Days:</strong> Must fulfill all contractual work days without unexcused absences (tardiness/early leave does not forfeit the allowance).</p><p>• <strong>3. Continued Employment Scheduled:</strong> A continued work relationship scheduled for the following week.</p><p>• <strong>Part-Time Formula:</strong> (Weekly Hours ÷ 40) × 8 hrs × Hourly Wage</p></div>`,
          item3Title: "Difference in Deductions (3.3% Freelance vs 4 Insurances)",
          item3Content: `<div class="space-y-1.5"><p>• <strong>3.3% Business Income Tax (Freelance/Short-term):</strong> 3% national income tax + 0.3% local income tax withheld at source. Eligible for tax refund during May comprehensive income tax filing if income is below standard exemption thresholds.</p><p>• <strong>4 Major Insurances (~9.4% Employee Contribution):</strong> National Pension (4.5%) + Health Insurance (3.545%) + Long-Term Care (12.95% of health) + Employment Insurance (0.9%). (Workplace Injury Insurance is 100% paid by the employer).</p><p>• <strong>Mandatory Requirement:</strong> Any employee working 60+ hours per month (15+ hours/week) for 1 month or longer must be enrolled in all 4 insurances by law.</p></div>`
        }
      },
      annualLeaveCalc: {
        title: "Annual Leave Calculator (Korean Labor Standards Act)",
        subtitle: "Real-time calculation of statutory annual & monthly paid leave under Art. 60",
        statutoryBadge: "Art. 60 Labor Standards Act",
        statutoryBadgeTitle: "Complies accurately with Article 60 of the Korean Labor Standards Act.",
        langToggle: "KO",
        modeLabel: "Calculation Basis Mode",
        modeHireDate: "📅 Hire Date Basis (Statutory Standard)",
        modeFiscalYear: "🏢 Fiscal Year Basis (Jan 1st Standard)",
        modeFiscalNotice: "※ Used by companies granting leave on January 1st. Upon resignation, it must be reconciled against the hire-date basis so the employee suffers no disadvantage.",
        inputHireLabel: "Hire Date",
        inputBaseLabel: "Base Reference Date",
        todayBtn: "Reset to Today",
        sampleBtn: "Load Sample (2 Years)",
        presetsLabel: "Quick Sample Presets",
        presetFreshman: "New Hire (6 Mo)",
        presetOneYear: "1 Year",
        presetThreeYears: "3 Years",
        presetFiveYears: "5 Years",
        presetTenYears: "10 Years",
        dashboardTitle: "Leave Calculation Dashboard",
        servicePeriodLabel: "Service Period",
        workingStatus: "employed",
        totalGrantedLabel: "Total Annual Leave",
        totalUnit: "days",
        totalDaysUnit: "Total {days} days",
        cumulativeBadge: "Total cumulative leave: {days} days since hire",
        cardMonthlyTitle: "Monthly Leave (< 1 Year)",
        cardMonthlyDesc: "1 day granted per full month worked (up to 11 days)",
        cardRegularTitle: "Regular Annual Leave (≥ 1 Year)",
        cardRegularDesc: "Base 15 days + 1 extra day every 2 yrs from Year 3 (Max 25 days)",
        cardFiscalTitle: "Fiscal Year Pro-rated Leave",
        cardFiscalDesc: "Pro-rated by days worked in the hire year",
        baseLeaveLabel: "Base Leave",
        addedLeaveLabel: "Bonus Days",
        copyBtn: "📋 Copy Calculation Results",
        closeBtn: "Close",
        toastCopied: "Annual leave calculation copied to clipboard!",
        toastSampleLoaded: "Sample employment data has been loaded.",
        toastResetToday: "Base date has been reset to today.",
        errorDateOrder: "Base date must be after hire date.",
        guide: {
          mainTitle: "Core Legal Guide to Article 60 Annual Paid Leave",
          badge: "Labor Law Summary",
          item1Title: "Monthly Leave Expiration for 1st Year Employees",
          item1Content: `<div class="space-y-1.5"><p>• <strong>1st Year Monthly Leave:</strong> Employees with less than 1 year of service earn 1 day of paid leave per full month worked with perfect attendance (max 11 days).</p><p>• <strong>Expiration:</strong> Leave accrued in the 1st year expires legally exactly 1 year after the hire date (Article 60(7)). Unused days must be compensated if prevented by the employer.</p></div>`,
          item2Title: "15 Days Granted at 1-Year Mark with 80% Attendance",
          item2Content: `<div class="space-y-1.5"><p>• <strong>15 Base Days:</strong> Employees who have worked for 1 full year with at least 80% attendance receive 15 days of paid annual leave.</p><p>• <strong>Under 80% Attendance:</strong> If attendance is under 80%, leave is granted at 1 day per full month worked.</p></div>`,
          item3Title: "Service Bonus Days from Year 3 (Capped at 25 Days)",
          item3Content: `<div class="space-y-1.5"><p>• <strong>Bonus Rule:</strong> 1 extra day is added for every 2 consecutive years of service starting from year 3.</p><p>• <strong>Progression:</strong> Years 1-2: 15 days / Years 3-4: 16 days / Years 5-6: 17 days / Years 7-8: 18 days ... / Year 21+: 25 days (statutory cap).</p></div>`,
          item4Title: "Fiscal Year Basis Adoption & Final Settlement",
          item4Content: `<div class="space-y-1.5"><p>• <strong>Administrative Convenience:</strong> Companies may adopt a calendar/fiscal year basis (Jan 1) for collective leave administration.</p><p>• <strong>Settlement on Resignation:</strong> When an employee leaves, the total leave must be compared against the hire-date basis. If the fiscal calculation yields fewer days, the company must compensate the difference.</p></div>`
        }
      },
      charByteCounter: {
        title: "Word & Character / Byte Counter",
        subtitle: "Instant character, word, line and byte count validator",
        desc: "Real-time character, word, line, and byte counter with whitespace clean-up tools.",
        inputTitle: "Text Input",
        placeholder: "Paste or type your resume, document, essay, or text here.\nCharacter, word, and byte counts will be calculated instantly in real time.",
        pasteBtn: "📋 Paste from Clipboard",
        clearBtn: "🗑️ Clear All",
        cleanSpacesBtn: "✨ Clean Spaces",
        cleanLinesBtn: "↵ Clean Empty Lines",
        copyTextBtn: "📋 Copy Text",
        copyStatsBtn: "📊 Copy Stats",
        statWithSpaces: "With Spaces",
        statWithoutSpaces: "No Spaces",
        statBytes: "Bytes (Byte)",
        statDocStructure: "Document Volume",
        statByteStandard: "Standard Byte (ASCII / UTF-8)",
        statEucKr: "Job Portals (2-Byte)",
        statEucKrDesc: "Saramin · JobKorea standard (EUC-KR)",
        statUtf8: "System / DB (3-Byte)",
        statUtf8Desc: "Public & Enterprise DB standard (UTF-8)",
        statWords: "Words",
        statLines: "Lines",
        statSpaces: "Spaces",
        unitChar: "chars",
        unitByte: "Bytes",
        unitWord: "words",
        unitLine: "lines",
        copiedToast: "Copied to clipboard!",
        pasteError: "Clipboard permission denied. Please press Ctrl+V directly.",
        confirmClear: "Are you sure you want to clear the entire text?",
        guide: {
          mainTitle: "💡 Character & Byte Counting Guide",
          singleTitle: "💡 Character & Byte Counting Guide",
          badge: "Specification Guide",
          singleContent: `<p>• <strong>With/Without Spaces:</strong> Unless explicitly specified, job application systems count characters with whitespace included.</p><p>• <strong>Byte (Byte):</strong> Standard Korean job portals (Saramin, JobKorea, etc.) calculate Korean characters as 2 Bytes (English, symbols, spaces as 1 Byte).</p>`,
          item1Title: "Byte Differences Across Job Portals",
          item1Content: `<div class="space-y-1.5"><p>• <strong>Saramin / JobKorea:</strong> Standard Korean job portals adopt <strong>EUC-KR (2-Byte)</strong> encoding where 1 Korean character equals 2 Bytes, and English letters, digits, spaces, and line breaks equal 1 Byte.</p><p>• <strong>Example:</strong> 500 Korean chars = approx. 1,000 Bytes (excluding spaces), plus 1 Byte per whitespace.</p></div>`,
          item2Title: "Public Sector & Enterprise Systems (UTF-8 3-Byte)",
          item2Content: `<div class="space-y-1.5"><p>• <strong>Database Standard:</strong> Depending on system DB settings (Oracle, MySQL, etc.), some public recruiting portals calculate Korean characters as <strong>UTF-8 (3-Byte)</strong>. Always verify portal notices beforehand.</p><p>• <strong>Caution:</strong> A 3,000-byte limit allows 1,500 Korean characters in 2-byte systems, but only 1,000 characters in 3-byte systems.</p></div>`,
          item3Title: "With Spaces vs Without Spaces Rule",
          item3Content: `<div class="space-y-1.5"><p>• <strong>General Rule:</strong> Unless explicitly noted as 'without spaces', recruiting limits standardly include whitespace characters.</p><p>• <strong>Ideal Word Length:</strong> Aim for <strong>85% to 95%</strong> of the maximum character allowance for optimal readability and completeness.</p></div>`
        }
      },
      excelDelimiterConverter: {
        title: "Excel Line Break ↔ Delimiter Converter",
        subtitle: "Convert Excel rows/columns into commas, SQL IN clauses, or quotes in 1 second",
        securityBadge: "100% Client-Side Only (Zero Data Leak)",
        securityBadgeTitle: "Processed 100% locally in your browser. No data is sent to any server.",
        langToggle: "KO",
        modeLabel: "Conversion Mode",
        modeLineToDelim: "Line Break → Delimiter",
        modeDelimToLine: "Delimiter → Line Break",
        inputTitle: "Input Data",
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
        swapBtn: "🔄 Send Result to Input",
        toastCopied: "Copied to clipboard!",
        toastCleared: "Input cleared.",
        toastSampleLoaded: "Sample data loaded.",
        toastPasted: "Pasted from clipboard.",
        toastSwapped: "Result moved to input.",
        toastNoResult: "No result to copy.",
        toastPasteError: "Clipboard permission denied. Please press Ctrl+V directly.",
        guide: {
          mainTitle: "💡 Excel Line Break & Delimiter Tips",
          tip1Title: "Copying columns & multi-row cells from Excel",
          tip1Content: "Select columns or multiple cells in Excel / Google Sheets and copy (Ctrl+C). Both line breaks and multi-column tabs (\\t) are split automatically into individual items.",
          tip2Title: "Generate DB Query WHERE col IN (...)",
          tip2Content: "Select 'SQL Single Quotes' and check 'Wrap with SQL IN (...)' to generate ready-to-run SQL IN clauses in seconds.",
          tip3Title: "100% Client-Side Privacy & Security",
          tip3Content: "All processing runs completely in your local browser runtime. Zero data is transmitted to external servers, making it safe for confidential and corporate data."
        }
      }
    },
    hero: {
      title: "Make Daily Life Smarter",
      titlePrefix: "Make Daily Life",
      titleHighlight: "Smarter",
      subtitle: "Upgrade your daily routine with handpicked Android apps and essential tools.",
      searchPlaceholder: "Search apps or tools...",
      totalApps: "apps available",
      resultsFound: "results found",
    },
    proof: {
      apps: "10+ Useful Android Apps",
      free: "100% Free & Secure Tools",
      update: "Regular App Updates"
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
      <a href="https://play.google.com/store/apps/details?id=com.wgapps.bookspot" target="_blank" rel="noopener noreferrer" class="guide-cta-download-btn inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-600 via-emerald-500 to-green-600 hover:from-teal-700 hover:to-green-700 shadow-md shadow-teal-500/30 hover:shadow-lg hover:shadow-teal-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
        <span class="text-base">▶</span>
        <span>Download on Google Play</span>
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
  <a href="https://play.google.com/store/apps/details?id=com.wgapps.bookspot" target="_blank" rel="noopener noreferrer" class="detail-btn" style="max-width:260px; background: linear-gradient(135deg, #0d9488, #059669); color: white; border: none; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
    <span>Download on Google Play</span> ↗
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
  if (typeof renderWebTools === "function") renderWebTools();
  if (typeof updateHeroCount === "function") updateHeroCount();
  if (typeof updateTabBadges === "function") updateTabBadges();
  if (typeof calculateWage === "function") calculateWage();
  if (typeof updateCharByteStats === "function") updateCharByteStats();
  if (typeof updateExcelDelimiterStats === "function") updateExcelDelimiterStats();
  if (typeof setExcelDelimiterLang === "function") setExcelDelimiterLang(lang);
  if (typeof setAnnualLeaveLang === "function") setAnnualLeaveLang(lang);
  if (typeof calculateAnnualLeave === "function") calculateAnnualLeave();
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
    const key = el.getAttribute("data-i18n-html");
    const val = t(key);
    if (val && val !== key) {
      el.innerHTML = val;
    }
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const val = t(el.getAttribute("data-i18n-title"));
    if (val) el.setAttribute("title", val);
  });
}
