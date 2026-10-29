/**
 * Daily Helper (일상의도움) — PDF ↔ Image Bulk Converter
 * 100% Client-Side In-Memory Execution (Zero Server Transmission)
 * Core Engines: Mozilla pdf.js v3.11, pdf-lib v1.17.1, JSZip v3.10.1, FileSaver.js, SortableJS
 */

(function () {
  'use strict';

  // ── Configure Mozilla pdf.js Worker ────────────────────────
  if (typeof window !== 'undefined' && window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  // ── Translation Dictionary ────────────────────────────────
  const i18n = {
    ko: {
      docTitle: 'PDF ↔ 이미지(JPG/PNG) 변환기 (일괄 묶음·분리) | 일상의도움 (Daily Helper)',
      metaDesc: '서버 업로드 없이 브라우저 메모리 안에서 여러 이미지를 하나의 PDF로 묶거나, 다중 페이지 PDF를 고해상도 이미지(ZIP)로 즉시 분리·변환합니다. 100% 무료 무설치 웹 도구.',
      brand: '일상의도움',
      mainHub: '메인 허브',
      badgeNew: 'NEW',
      badgeFree: '무료 도구',
      badgeClientSide: '100% 브라우저 메모리 처리 (서버 전송 없음)',
      heroTitle: 'PDF ↔ 이미지 변환기',
      heroSubtitle: '서버 업로드 없이 브라우저에서 여러 이미지를 하나의 PDF로 묶거나, 다중 페이지 PDF를 고해상도 이미지(ZIP)로 즉시 분리·변환합니다.',
      tabImgToPdf: '📷 이미지 여러 장 → 단일 PDF 묶기',
      tabPdfToImg: '📄 PDF 문서 → 개별 이미지 분리',

      // Feature 1: Image to PDF
      dropImgTitle: '이미지 파일들을 여기에 끌어다 놓으세요',
      dropImgDesc: '또는 클릭하여 파일을 선택하세요 (JPG, PNG, WEBP, GIF, BMP 등 다중 선택 가능)',
      selectImgBtn: '이미지 파일 선택',
      addMoreImgBtn: '＋ 이미지 추가',
      clearAllImgBtn: '전체 비우기',
      imgCountLabel: '선택된 이미지: {count}개',
      pageSizeLabel: '용지 규격 / 맞춤',
      pageA4Portrait: 'A4 세로 맞춤 (210×297mm)',
      pageA4Landscape: 'A4 가로 맞춤 (297×210mm)',
      pageFitImage: '원본 이미지 크기·비율 유지 (여백 없음)',
      pageA4Auto: 'A4 자동 방향 (종횡비 감지)',
      marginLabel: '용지 여백',
      marginNone: '여백 없음 (0mm)',
      marginSmall: '좁은 여백 (5mm)',
      marginNormal: '보통 여백 (10mm)',
      filenameLabel: 'PDF 저장 파일명',
      convertImgToPdfBtn: '✨ 단일 PDF 파일로 묶어서 다운로드',
      dragHint: '💡 마우스로 드래그하여 페이지 순서를 변경할 수 있습니다.',
      rotate90: '↻ 90° 회전',
      moveLeft: '◀ 앞',
      moveRight: '뒤 ▶',
      deleteItem: '삭제',
      processingImg: 'PDF 생성 중... ({current}/{total} 페이지)',
      imgProgressInitial: 'PDF 생성 중...',
      successPdfDownload: 'PDF 변환 완료! 다운로드가 시작되었습니다.',
      noImgWarning: '변환할 이미지를 먼저 1장 이상 추가해 주세요.',

      // Feature 2: PDF to Image
      dropPdfTitle: 'PDF 문서를 여기에 끌어다 놓으세요',
      dropPdfDesc: '또는 클릭하여 PDF 파일을 선택하세요 (다중 페이지 지원)',
      selectPdfBtn: 'PDF 파일 선택',
      changePdfBtn: '다른 PDF 선택',
      pdfDocLoading: '문서 로딩 중...',
      pdfInfo: '{name} ({pages}페이지, {size})',
      outFormatLabel: '출력 이미지 포맷',
      formatPng: 'PNG (무손실 고화질, 도면/텍스트 선명)',
      formatJpg: 'JPG (고압축, 사진 최적화)',
      resolutionLabel: '해상도 / 선명도 (DPI 배율)',
      scale2: '2.0x 고해상도 (FHD급 선명도 - 권장)',
      scale1: '1.0x 일반 해상도 (빠른 처리, 기본 크기)',
      scale15: '1.5x 표준 해상도 (빠른 처리)',
      scale3: '3.0x 초고해상도 (인쇄/정밀 도면용)',
      downloadAllBtn: '✨ 모든 페이지 일괄 다운로드 (ZIP)',
      downloadSingleBtn: '✨ 고해상도 이미지 다운로드 ({ext})',
      downloadThisPage: '이 페이지만 다운로드',
      renderingPages: 'PDF 페이지 렌더링 중... ({current}/{total})',
      pdfProgressInitial: '렌더링 중...',
      compressingZip: 'ZIP 압축 파일 패키징 중... ({percent}%)',
      successImgDownload: '이미지 변환 완료! 다운로드가 시작되었습니다.',
      noPdfWarning: '변환할 PDF 파일을 먼저 선택해 주세요.',
      onlyPdfWarning: 'PDF 파일만 업로드할 수 있습니다.',
      errorPdfRender: 'PDF 렌더링 오류: ',
      errorImgBatch: '이미지 일괄 다운로드 오류: ',
      errorPdfLibNotLoaded: 'PDF-lib 라이브러리가 로드되지 않았습니다.',

      // Notices
      noticeTitle: '안내 및 보안 보증',
      notice1: '<strong>100% 브라우저 로컬 처리:</strong> 모든 변환은 사용자의 PC/스마트폰 브라우저 메모리 안에서 단독 실행되며, 서버로 파일이 전혀 업로드되지 않습니다.',
      notice2: '<strong>다양한 포맷 완벽 지원:</strong> JPG, PNG는 물론 최신 웹 규격인 WEBP, GIF, BMP 등도 브라우저 캔버스 엔진을 통해 손실 없이 고화질 PDF로 묶을 수 있습니다.',
      notice3: '<strong>초고해상도 렌더링:</strong> 다중 페이지 PDF를 변환할 때 scale 2.0 이상의 고해상도 캔버스로 렌더링하여 작은 글씨와 도면 선도 흐려짐 없이 선명하게 유지됩니다.',

      // Footer
      footerHome: '홈 (메인 허브)',
      footerAbout: '소개',
      footerPrivacy: '개인정보처리방침',
      footerTerms: '이용약관',
      footerContact: '문의하기',
      footerCopyright: '© 2026 일상의도움 (Daily Helper). All rights reserved.'
    },
    en: {
      docTitle: 'PDF ↔ Image Converter (Batch Combine & Extract) | Daily Helper',
      metaDesc: 'Combine multiple images into a single PDF or extract multi-page PDFs into high-resolution images (ZIP) right in your browser with zero server uploads.',
      brand: 'Daily Helper',
      mainHub: 'Main Hub',
      badgeNew: 'NEW',
      badgeFree: 'Free Tool',
      badgeClientSide: '100% Client-Side In-Memory (Zero Server Upload)',
      heroTitle: 'PDF ↔ Image Converter',
      heroSubtitle: 'Combine multiple images into a single PDF or extract multi-page PDFs into high-resolution images (ZIP) right in your browser with zero server uploads.',
      tabImgToPdf: '📷 Multiple Images to Single PDF',
      tabPdfToImg: '📄 Multi-page PDF to Images',

      // Feature 1: Image to PDF
      dropImgTitle: 'Drag & drop image files here',
      dropImgDesc: 'or click to browse files (Supports JPG, PNG, WEBP, GIF, BMP, etc.)',
      selectImgBtn: 'Select Images',
      addMoreImgBtn: '＋ Add More Images',
      clearAllImgBtn: 'Clear All',
      imgCountLabel: 'Selected Images: {count}',
      pageSizeLabel: 'Page Size / Layout',
      pageA4Portrait: 'A4 Portrait (210×297mm)',
      pageA4Landscape: 'A4 Landscape (297×210mm)',
      pageFitImage: 'Fit to Original Image (No margin)',
      pageA4Auto: 'A4 Auto Orientation',
      marginLabel: 'Page Margins',
      marginNone: 'No Margin (0mm)',
      marginSmall: 'Small (5mm)',
      marginNormal: 'Normal (10mm)',
      filenameLabel: 'Output PDF Filename',
      convertImgToPdfBtn: '✨ Combine & Download PDF',
      dragHint: '💡 Drag and drop cards to reorder pages.',
      rotate90: '↻ Rotate 90°',
      moveLeft: '◀ Prev',
      moveRight: 'Next ▶',
      deleteItem: 'Delete',
      processingImg: 'Generating PDF... ({current}/{total} pages)',
      imgProgressInitial: 'Generating PDF...',
      successPdfDownload: 'PDF conversion completed! Download started.',
      noImgWarning: 'Please add at least one image file first.',

      // Feature 2: PDF to Image
      dropPdfTitle: 'Drag & drop a PDF file here',
      dropPdfDesc: 'or click to browse files (Supports multi-page PDF)',
      selectPdfBtn: 'Select PDF File',
      changePdfBtn: 'Change PDF',
      pdfDocLoading: 'Loading document...',
      pdfInfo: '{name} ({pages} pages, {size})',
      outFormatLabel: 'Output Image Format',
      formatPng: 'PNG (Lossless, sharp lines/text)',
      formatJpg: 'JPG (High compression, photo optimized)',
      resolutionLabel: 'Resolution / Clarity (DPI Scale)',
      scale2: '2.0x High Resolution (FHD - Recommended)',
      scale1: '1.0x Standard (Fast processing)',
      scale15: '1.5x Standard Resolution (Faster)',
      scale3: '3.0x Ultra-HD (Print & precise CAD)',
      downloadAllBtn: '✨ Download All Pages as ZIP',
      downloadSingleBtn: '✨ Download High-Res Image ({ext})',
      downloadThisPage: 'Download this page',
      renderingPages: 'Rendering PDF pages... ({current}/{total})',
      pdfProgressInitial: 'Rendering pages...',
      compressingZip: 'Packaging ZIP file... ({percent}%)',
      successImgDownload: 'Image conversion completed! Download started.',
      noPdfWarning: 'Please select a PDF file first.',
      onlyPdfWarning: 'Please upload a PDF file only.',
      errorPdfRender: 'PDF rendering error: ',
      errorImgBatch: 'Image batch download error: ',
      errorPdfLibNotLoaded: 'PDF-lib library failed to load.',

      // Notices
      noticeTitle: 'Security & Info Guide',
      notice1: '<strong>100% Client-side Local Processing:</strong> All tasks run entirely inside your device\'s browser memory. Your files are never uploaded to any server.',
      notice2: '<strong>Universal Format Support:</strong> JPG, PNG, WEBP, GIF, and BMP can all be converted and combined into high-quality PDFs with zero compression loss.',
      notice3: '<strong>Ultra-clear Rendering:</strong> Multi-page PDFs are rendered on high-density canvases (scale 2.0+) ensuring crisp text and fine CAD line-art.',

      // Footer
      footerHome: 'Home (Main Hub)',
      footerAbout: 'About',
      footerPrivacy: 'Privacy Policy',
      footerTerms: 'Terms of Service',
      footerContact: 'Contact Us',
      footerCopyright: '© 2026 Daily Helper. All rights reserved.'
    }
  };

  // ── Language Retrieval & Global State ─────────────────────
  function getInitialLanguage() {
    try {
      const saved = localStorage.getItem('lang') || localStorage.getItem('dh_lang') || localStorage.getItem('selectedLang');
      if (saved) {
        const s = String(saved).toLowerCase().trim();
        if (s === 'en' || s === 'ko') return s;
      }
      const navLang = (navigator.language || '').toLowerCase();
      return navLang.startsWith('ko') ? 'ko' : 'en';
    } catch (_) {
      return 'ko';
    }
  }

  const state = {
    lang: getInitialLanguage(),
    activeTab: 'img-to-pdf', // 'img-to-pdf' | 'pdf-to-img'
    
    // Feature 1: Image to PDF
    images: [], // { id, file, name, size, width, height, rotation, dataUrl }
    sortableInstance: null,
    
    // Feature 2: PDF to Image
    pdfFile: null,
    pdfDoc: null,
    pdfPages: [], // { pageNum, width, height, canvas, dataUrl, blob }
    
    isProcessing: false
  };

  // ── Helpers ───────────────────────────────────────────────
  function formatBytes(bytes) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  function sanitizeFilename(name, fallback) {
    if (!name) return fallback;
    return name.replace(/[\\/:*?"<>|]/g, '_').trim() || fallback;
  }

  function getBaseFilename(fullname) {
    if (!fullname) return 'document';
    const lastDot = fullname.lastIndexOf('.');
    return lastDot !== -1 ? fullname.substring(0, lastDot) : fullname;
  }

  function showToast(msg, isError = false) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    toast.textContent = msg;
    toast.className = `fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl z-50 transition-all duration-300 ${
      isError ? 'bg-rose-600 text-white' : 'bg-slate-800 text-white border border-slate-700 shadow-indigo-500/20'
    }`;
    toast.style.opacity = '1';
    toast.style.transform = 'translate(-50%, 0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, 20px)';
    }, 3200);
  }

  // ── Language Toggle & Translation ─────────────────────────
  function t(key, vars = {}) {
    const dict = i18n[state.lang] || i18n.ko;
    let text = dict[key] !== undefined ? dict[key] : (i18n.ko[key] !== undefined ? i18n.ko[key] : key);
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    }
    return text;
  }

  function updateUiLanguage() {
    document.title = t('docTitle');
    document.documentElement.lang = state.lang;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('metaDesc'));

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        const val = t(key);
        if (typeof val === 'string' && val.includes('<') && val.includes('>')) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (key) el.innerHTML = t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) el.setAttribute('placeholder', t(key));
    });

    // Update Language Buttons
    const btnKo = document.getElementById('lang-btn-ko');
    const btnEn = document.getElementById('lang-btn-en');
    if (btnKo && btnEn) {
      if (state.lang === 'ko') {
        btnKo.className = 'px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-600 text-white shadow-sm cursor-pointer';
        btnEn.className = 'px-2.5 py-1 rounded-md text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer';
      } else {
        btnEn.className = 'px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-600 text-white shadow-sm cursor-pointer';
        btnKo.className = 'px-2.5 py-1 rounded-md text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer';
      }
    }

    renderImageCount();
    renderPdfInfo();
    updateDownloadBtnLabel();
    if (state.images.length > 0) {
      renderImageGrid();
    }
  }

  window.setLanguage = function (lang) {
    const target = (lang || '').toLowerCase().trim() === 'en' ? 'en' : 'ko';
    state.lang = target;
    try {
      localStorage.setItem('lang', target);
      localStorage.setItem('dh_lang', target);
      localStorage.setItem('selectedLang', target);
    } catch (_) {}
    updateUiLanguage();
  };

  // ── Tab Switching ──────────────────────────────────────────
  window.switchTab = function (tabName) {
    state.activeTab = tabName;
    const tabBtnImg = document.getElementById('tab-btn-img-to-pdf');
    const tabBtnPdf = document.getElementById('tab-btn-pdf-to-img');
    const panelImg = document.getElementById('panel-img-to-pdf');
    const panelPdf = document.getElementById('panel-pdf-to-img');

    if (tabName === 'img-to-pdf') {
      tabBtnImg.className = 'flex-1 py-3 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all bg-indigo-600 text-white shadow-lg shadow-indigo-600/30';
      tabBtnPdf.className = 'flex-1 py-3 px-4 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800';
      panelImg.classList.remove('hidden');
      panelPdf.classList.add('hidden');
    } else {
      tabBtnPdf.className = 'flex-1 py-3 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all bg-teal-600 text-white shadow-lg shadow-teal-600/30';
      tabBtnImg.className = 'flex-1 py-3 px-4 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800';
      panelPdf.classList.remove('hidden');
      panelImg.classList.add('hidden');
    }
  };

  // ═════════════════════════════════════════════════════════════
  // FEATURE 1: IMAGE TO SINGLE PDF (묶음 변환)
  // ═════════════════════════════════════════════════════════════

  function initImageDropZone() {
    const dropZone = document.getElementById('img-dropzone');
    const fileInput = document.getElementById('img-file-input');
    const selectBtn = document.getElementById('img-select-btn');
    const addMoreBtn = document.getElementById('img-add-more-btn');
    const clearAllBtn = document.getElementById('img-clear-all-btn');

    if (selectBtn && fileInput) {
      selectBtn.addEventListener('click', () => fileInput.click());
    }
    if (addMoreBtn && fileInput) {
      addMoreBtn.addEventListener('click', () => fileInput.click());
    }
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', clearAllImages);
    }

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          handleImageFiles(Array.from(e.target.files));
          fileInput.value = '';
        }
      });
    }

    if (dropZone) {
      ['dragenter', 'dragover'].forEach((eventName) => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropZone.classList.add('border-indigo-500', 'bg-indigo-950/20');
        });
      });

      ['dragleave', 'drop'].forEach((eventName) => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropZone.classList.remove('border-indigo-500', 'bg-indigo-950/20');
        });
      });

      dropZone.addEventListener('drop', (e) => {
        const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
        if (files.length > 0) {
          handleImageFiles(files);
        } else {
          showToast(state.lang === 'ko' ? '유효한 이미지 파일을 추가해 주세요.' : 'Please add valid image files.', true);
        }
      });
    }
  }

  async function handleImageFiles(files) {
    const validFiles = files.filter((f) => f.type.startsWith('image/'));
    if (validFiles.length === 0) return;

    for (const file of validFiles) {
      const item = await readFileAsImageItem(file);
      state.images.push(item);
    }

    updateImageSectionVisibility();
    renderImageGrid();
    renderImageCount();
  }

  function readFileAsImageItem(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        const img = new Image();
        img.onload = () => {
          resolve({
            id: 'img_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            file: file,
            name: file.name,
            size: file.size,
            width: img.naturalWidth,
            height: img.naturalHeight,
            rotation: 0,
            dataUrl: dataUrl
          });
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    });
  }

  function updateImageSectionVisibility() {
    const emptyZone = document.getElementById('img-dropzone');
    const contentArea = document.getElementById('img-content-area');

    if (state.images.length === 0) {
      emptyZone.classList.remove('hidden');
      contentArea.classList.add('hidden');
    } else {
      emptyZone.classList.add('hidden');
      contentArea.classList.remove('hidden');
    }
  }

  function renderImageCount() {
    const badge = document.getElementById('img-count-badge');
    if (badge) {
      badge.textContent = t('imgCountLabel', { count: state.images.length });
    }
  }

  function clearAllImages() {
    state.images = [];
    updateImageSectionVisibility();
    renderImageGrid();
    renderImageCount();
  }

  function renderImageGrid() {
    const grid = document.getElementById('img-grid');
    if (!grid) return;
    grid.innerHTML = '';

    state.images.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-2 flex flex-col gap-2 shadow-md hover:border-slate-700 transition-all';
      card.setAttribute('data-id', item.id);

      card.innerHTML = `
        <div class="relative w-full aspect-[4/3] bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center card-thumbnail-wrap cursor-grab active:cursor-grabbing border border-slate-800/80">
          <img src="${item.dataUrl}" alt="${item.name}" class="max-w-[90%] max-h-[90%] object-contain pointer-events-none select-none transition-transform duration-200" style="transform: rotate(${item.rotation}deg);" />
          <div class="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-slate-900/90 text-indigo-400 border border-slate-700/80 font-mono shadow-sm">
            #${index + 1}
          </div>
        </div>
        <div class="flex flex-col px-1">
          <span class="text-xs font-semibold text-slate-200 truncate" title="${item.name}">${item.name}</span>
          <span class="text-[11px] text-slate-500 font-mono">${formatBytes(item.size)} · ${item.width}×${item.height}</span>
        </div>
        <div class="flex items-center justify-between gap-1 p-1 bg-slate-950/60 rounded-lg border border-slate-800/60 mt-auto">
          <button type="button" class="btn-rotate p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer" title="${t('rotate90')}">
            ↻ 90°
          </button>
          <div class="flex items-center gap-0.5">
            <button type="button" class="btn-prev p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-bold transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer" ${index === 0 ? 'disabled' : ''} title="${t('moveLeft')}">
              ◀
            </button>
            <button type="button" class="btn-next p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-bold transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer" ${index === state.images.length - 1 ? 'disabled' : ''} title="${t('moveRight')}">
              ▶
            </button>
          </div>
          <button type="button" class="btn-delete p-1 rounded-md bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-200 text-xs font-bold transition-colors cursor-pointer" title="${t('deleteItem')}">
            ✕
          </button>
        </div>
      `;

      // Event Listeners for actions
      card.querySelector('.btn-rotate').addEventListener('click', (e) => {
        e.stopPropagation();
        item.rotation = (item.rotation + 90) % 360;
        renderImageGrid();
      });

      card.querySelector('.btn-delete').addEventListener('click', (e) => {
        e.stopPropagation();
        state.images = state.images.filter((img) => img.id !== item.id);
        updateImageSectionVisibility();
        renderImageGrid();
        renderImageCount();
      });

      card.querySelector('.btn-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        if (index > 0) {
          const temp = state.images[index - 1];
          state.images[index - 1] = state.images[index];
          state.images[index] = temp;
          renderImageGrid();
        }
      });

      card.querySelector('.btn-next').addEventListener('click', (e) => {
        e.stopPropagation();
        if (index < state.images.length - 1) {
          const temp = state.images[index + 1];
          state.images[index + 1] = state.images[index];
          state.images[index] = temp;
          renderImageGrid();
        }
      });

      grid.appendChild(card);
    });

    // Initialize SortableJS
    if (window.Sortable && !state.sortableInstance) {
      state.sortableInstance = new window.Sortable(grid, {
        animation: 180,
        ghostClass: 'opacity-40',
        chosenClass: 'scale-105',
        dragClass: 'shadow-2xl',
        handle: '.card-thumbnail-wrap',
        onEnd: function (evt) {
          if (evt.oldIndex !== evt.newIndex) {
            const moved = state.images.splice(evt.oldIndex, 1)[0];
            state.images.splice(evt.newIndex, 0, moved);
            renderImageGrid();
          }
        }
      });
    }
  }

  // Convert Images to Single PDF via pdf-lib
  window.convertImagesToPdf = async function () {
    if (state.images.length === 0) {
      showToast(t('noImgWarning'), true);
      return;
    }
    if (state.isProcessing) return;
    state.isProcessing = true;

    const convertBtn = document.getElementById('btn-convert-img-to-pdf');
    const progressBar = document.getElementById('img-progress-bar');
    const progressText = document.getElementById('img-progress-text');
    const progressContainer = document.getElementById('img-progress-container');

    convertBtn.disabled = true;
    progressContainer.classList.remove('hidden');

    try {
      const PDFLib = window.PDFLib;
      if (!PDFLib || !PDFLib.PDFDocument) {
        throw new Error(t('errorPdfLibNotLoaded'));
      }

      const pdfDoc = await PDFLib.PDFDocument.create();

      const layout = document.getElementById('img-page-size').value;
      const marginType = document.getElementById('img-margin').value;

      let marginPt = 0;
      if (marginType === 'small') marginPt = 14.17; // ~5mm
      else if (marginType === 'normal') marginPt = 28.35; // ~10mm

      const A4_W = 595.28;
      const A4_H = 841.89;

      const total = state.images.length;

      for (let i = 0; i < total; i++) {
        const item = state.images[i];
        const percent = Math.round(((i + 1) / total) * 100);
        progressBar.style.width = percent + '%';
        progressText.textContent = t('processingImg', { current: i + 1, total });

        const renderedCanvas = await renderRotatedImageToCanvas(item.dataUrl, item.rotation);
        const imgBuffer = await canvasToArrayBuffer(renderedCanvas, 'image/jpeg', 0.95);
        const embeddedImage = await pdfDoc.embedJpg(imgBuffer);

        const imgW = embeddedImage.width;
        const imgH = embeddedImage.height;

        let pageW, pageH;
        if (layout === 'a4-portrait') {
          pageW = A4_W;
          pageH = A4_H;
        } else if (layout === 'a4-landscape') {
          pageW = A4_H;
          pageH = A4_W;
        } else if (layout === 'a4-auto') {
          if (imgW > imgH) {
            pageW = A4_H;
            pageH = A4_W;
          } else {
            pageW = A4_W;
            pageH = A4_H;
          }
        } else {
          // fit-image
          pageW = imgW + marginPt * 2;
          pageH = imgH + marginPt * 2;
        }

        const page = pdfDoc.addPage([pageW, pageH]);

        const availW = Math.max(10, pageW - marginPt * 2);
        const availH = Math.max(10, pageH - marginPt * 2);

        const scale = Math.min(availW / imgW, availH / imgH);
        const drawW = imgW * scale;
        const drawH = imgH * scale;

        const x = marginPt + (availW - drawW) / 2;
        const y = marginPt + (availH - drawH) / 2;

        page.drawImage(embeddedImage, {
          x,
          y,
          width: drawW,
          height: drawH
        });
      }

      const pdfBytes = await pdfDoc.save();
      const filenameInput = document.getElementById('img-pdf-filename');
      const filename = sanitizeFilename(filenameInput ? filenameInput.value : '', 'combined_images.pdf');

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      if (window.saveAs) {
        window.saveAs(blob, filename);
      } else {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();
      }

      showToast(t('successPdfDownload'));
    } catch (err) {
      console.error(err);
      showToast('Error: ' + (err.message || err), true);
    } finally {
      state.isProcessing = false;
      convertBtn.disabled = false;
      setTimeout(() => {
        progressContainer.classList.add('hidden');
        progressBar.style.width = '0%';
      }, 1000);
    }
  };

  function renderRotatedImageToCanvas(dataUrl, rotation) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const rad = (rotation * Math.PI) / 180;

        if (rotation === 90 || rotation === 270) {
          canvas.width = img.naturalHeight;
          canvas.height = img.naturalWidth;
        } else {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
        }

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rad);
        ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

        resolve(canvas);
      };
      img.onerror = reject;
      img.src = dataUrl;
    });
  }

  function canvasToArrayBuffer(canvas, type = 'image/jpeg', quality = 0.95) {
    return new Promise((resolve) => {
      canvas.toBlob(
        async (blob) => {
          const buffer = await blob.arrayBuffer();
          resolve(new Uint8Array(buffer));
        },
        type,
        quality
      );
    });
  }

  // ═════════════════════════════════════════════════════════════
  // FEATURE 2: PDF TO IMAGES (다중 페이지 분리)
  // ═════════════════════════════════════════════════════════════

  function initPdfDropZone() {
    const dropZone = document.getElementById('pdf-dropzone');
    const fileInput = document.getElementById('pdf-file-input');
    const selectBtn = document.getElementById('pdf-select-btn');
    const changeBtn = document.getElementById('pdf-change-btn');

    if (selectBtn && fileInput) {
      selectBtn.addEventListener('click', () => fileInput.click());
    }
    if (changeBtn && fileInput) {
      changeBtn.addEventListener('click', () => fileInput.click());
    }

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          handlePdfFile(e.target.files[0]);
          fileInput.value = '';
        }
      });
    }

    if (dropZone) {
      ['dragenter', 'dragover'].forEach((eventName) => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropZone.classList.add('border-indigo-500', 'bg-indigo-950/20');
        });
      });

      ['dragleave', 'drop'].forEach((eventName) => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropZone.classList.remove('border-indigo-500', 'bg-indigo-950/20');
        });
      });

      dropZone.addEventListener('drop', (e) => {
        const file = Array.from(e.dataTransfer.files).find((f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'));
        if (file) {
          handlePdfFile(file);
        } else {
          showToast(t('onlyPdfWarning'), true);
        }
      });
    }
  }

  async function handlePdfFile(file) {
    state.pdfFile = file;
    state.pdfPages = [];

    const emptyZone = document.getElementById('pdf-dropzone');
    const contentZone = document.getElementById('pdf-content-area');
    emptyZone.classList.add('hidden');
    contentZone.classList.remove('hidden');

    renderPdfInfo();
    await renderAllPdfPages();
  }

  function renderPdfInfo() {
    const infoEl = document.getElementById('pdf-info-badge');
    if (!infoEl) return;
    if (!state.pdfFile) {
      infoEl.textContent = t('pdfDocLoading');
      return;
    }

    infoEl.textContent = t('pdfInfo', {
      name: state.pdfFile.name,
      pages: state.pdfDoc ? state.pdfDoc.numPages : '...',
      size: formatBytes(state.pdfFile.size)
    });
  }

  async function renderAllPdfPages() {
    if (!state.pdfFile) return;
    const grid = document.getElementById('pdf-preview-grid');
    const progressBar = document.getElementById('pdf-progress-bar');
    const progressText = document.getElementById('pdf-progress-text');
    const progressContainer = document.getElementById('pdf-progress-container');
    const downloadBtn = document.getElementById('btn-download-pdf-images');

    downloadBtn.disabled = true;
    progressContainer.classList.remove('hidden');
    grid.innerHTML = '';
    state.pdfPages = [];

    try {
      const pdfjsLib = window.pdfjsLib;
      if (!pdfjsLib) {
        throw new Error('Mozilla pdf.js 라이브러리가 로드되지 않았습니다.');
      }

      const fileBuffer = await state.pdfFile.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: fileBuffer });
      state.pdfDoc = await loadingTask.promise;

      renderPdfInfo();

      const numPages = state.pdfDoc.numPages;
      const scale = parseFloat(document.getElementById('pdf-scale').value) || 2.0;

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const percent = Math.round((pageNum / numPages) * 100);
        progressBar.style.width = percent + '%';
        progressText.textContent = t('renderingPages', { current: pageNum, total: numPages });

        const page = await state.pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: ctx,
          viewport: viewport
        }).promise;

        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

        state.pdfPages.push({
          pageNum,
          width: Math.round(viewport.width),
          height: Math.round(viewport.height),
          canvas,
          dataUrl
        });

        addPdfPageCard(pageNum, Math.round(viewport.width), Math.round(viewport.height), dataUrl);
      }

      updateDownloadBtnLabel();
    } catch (err) {
      console.error(err);
      showToast(t('errorPdfRender') + (err.message || err), true);
    } finally {
      downloadBtn.disabled = false;
      setTimeout(() => {
        progressContainer.classList.add('hidden');
        progressBar.style.width = '0%';
      }, 600);
    }
  }

  function addPdfPageCard(pageNum, width, height, dataUrl) {
    const grid = document.getElementById('pdf-preview-grid');
    if (!grid) return;

    const card = document.createElement('div');
    card.className = 'group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-2.5 flex flex-col gap-2 hover:border-slate-700 transition-all';

    card.innerHTML = `
      <div class="relative w-full aspect-[4/3] bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center border border-slate-800/80">
        <img src="${dataUrl}" alt="Page ${pageNum}" class="max-w-[90%] max-h-[90%] object-contain select-none" />
        <div class="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-slate-900/90 text-teal-400 border border-slate-700/80 font-mono shadow-sm">
          P. ${pageNum}
        </div>
      </div>
      <div class="flex items-center justify-between text-[11px] text-slate-400 font-mono px-0.5">
        <span>${width} × ${height} px</span>
      </div>
      <button type="button" class="btn-single-download w-full py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 mt-auto border border-slate-700/80 cursor-pointer">
        <span>⬇</span>
        <span data-i18n="downloadThisPage">${t('downloadThisPage')}</span>
      </button>
    `;

    card.querySelector('.btn-single-download').addEventListener('click', () => {
      downloadSinglePage(pageNum);
    });

    grid.appendChild(card);
  }

  function updateDownloadBtnLabel() {
    const downloadBtn = document.getElementById('btn-download-pdf-images');
    if (!downloadBtn) return;

    const format = (document.getElementById('pdf-format')?.value || 'png').toUpperCase();
    const totalPages = state.pdfPages.length;

    if (state.pdfDoc && totalPages === 1) {
      downloadBtn.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
        <span>${t('downloadSingleBtn', { ext: format })}</span>
      `;
    } else {
      downloadBtn.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
        <span data-i18n="downloadAllBtn">${t('downloadAllBtn')}</span>
      `;
    }
  }

  // Download a single page immediately
  async function downloadSinglePage(pageNum) {
    const pageItem = state.pdfPages.find((p) => p.pageNum === pageNum);
    if (!pageItem || !pageItem.canvas) return;

    const format = document.getElementById('pdf-format').value;
    const isPng = format === 'png';
    const mime = isPng ? 'image/png' : 'image/jpeg';
    const ext = isPng ? 'png' : 'jpg';
    const quality = isPng ? undefined : 0.95;

    const base = getBaseFilename(state.pdfFile ? state.pdfFile.name : 'page');
    const filename = `${base}_p${String(pageNum).padStart(2, '0')}.${ext}`;

    pageItem.canvas.toBlob(
      (blob) => {
        if (window.saveAs) {
          window.saveAs(blob, filename);
        } else {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = filename;
          a.click();
        }
        showToast(t('successImgDownload'));
      },
      mime,
      quality
    );
  }

  // Download all pages packaged as ZIP
  window.downloadPdfImages = async function () {
    if (!state.pdfFile || !state.pdfDoc || state.pdfPages.length === 0) {
      showToast(t('noPdfWarning'), true);
      return;
    }
    if (state.isProcessing) return;
    state.isProcessing = true;

    const downloadBtn = document.getElementById('btn-download-pdf-images');
    const progressBar = document.getElementById('pdf-progress-bar');
    const progressText = document.getElementById('pdf-progress-text');
    const progressContainer = document.getElementById('pdf-progress-container');

    downloadBtn.disabled = true;
    progressContainer.classList.remove('hidden');

    try {
      const format = document.getElementById('pdf-format').value;
      const isPng = format === 'png';
      const mime = isPng ? 'image/png' : 'image/jpeg';
      const ext = isPng ? 'png' : 'jpg';
      const quality = isPng ? undefined : 0.95;
      const baseName = getBaseFilename(state.pdfFile.name);

      if (state.pdfPages.length === 1) {
        // Single page download directly
        progressBar.style.width = '100%';
        await downloadSinglePage(1);
        return;
      }

      // Multi-page ZIP packaging via JSZip
      const JSZip = window.JSZip;
      if (!JSZip) {
        throw new Error('JSZip 라이브러리가 로드되지 않았습니다.');
      }

      const zip = new JSZip();
      const folderName = `${baseName}_images`;
      const imgFolder = zip.folder(folderName) || zip;

      const total = state.pdfPages.length;

      for (let i = 0; i < total; i++) {
        const pageItem = state.pdfPages[i];
        const pagePercent = Math.round(((i + 1) / total) * 70);
        progressBar.style.width = pagePercent + '%';
        progressText.textContent = t('renderingPages', { current: i + 1, total });

        const blob = await new Promise((resolve) => pageItem.canvas.toBlob(resolve, mime, quality));
        const filename = `${baseName}_p${String(pageItem.pageNum).padStart(2, '0')}.${ext}`;
        imgFolder.file(filename, blob);
      }

      progressText.textContent = t('compressingZip', { percent: 80 });
      progressBar.style.width = '85%';

      const zipContent = await zip.generateAsync(
        { type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } },
        (metadata) => {
          const zipPercent = Math.round(85 + (metadata.percent * 0.15));
          progressBar.style.width = zipPercent + '%';
          progressText.textContent = t('compressingZip', { percent: Math.round(metadata.percent) });
        }
      );

      progressBar.style.width = '100%';
      const zipFilename = `${baseName}_images.zip`;

      if (window.saveAs) {
        window.saveAs(zipContent, zipFilename);
      } else {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(zipContent);
        a.download = zipFilename;
        a.click();
      }

      showToast(t('successImgDownload'));
    } catch (err) {
      console.error(err);
      showToast(t('errorImgBatch') + (err.message || err), true);
    } finally {
      state.isProcessing = false;
      downloadBtn.disabled = false;
      setTimeout(() => {
        progressContainer.classList.add('hidden');
        progressBar.style.width = '0%';
      }, 1000);
    }
  };

  // ── Initialization ─────────────────────────────────────────
  function initApp() {
    state.lang = getInitialLanguage();
    updateUiLanguage();
    initImageDropZone();
    initPdfDropZone();

    // Event listeners for KO / EN toggles
    const btnKo = document.getElementById('lang-btn-ko');
    const btnEn = document.getElementById('lang-btn-en');
    if (btnKo) {
      btnKo.addEventListener('click', (e) => {
        e.preventDefault();
        window.setLanguage('ko');
      });
    }
    if (btnEn) {
      btnEn.addEventListener('click', (e) => {
        e.preventDefault();
        window.setLanguage('en');
      });
    }

    // Cross-tab synchronization
    window.addEventListener('storage', (e) => {
      if (e.key === 'lang' || e.key === 'dh_lang' || e.key === 'selectedLang') {
        if (e.newValue) {
          const l = String(e.newValue).toLowerCase().trim();
          if ((l === 'en' || l === 'ko') && l !== state.lang) {
            state.lang = l;
            updateUiLanguage();
          }
        }
      }
    });

    // Re-render PDF preview if options (format or scale) change
    const scaleSelect = document.getElementById('pdf-scale');
    if (scaleSelect) {
      scaleSelect.addEventListener('change', () => {
        if (state.pdfFile) {
          renderAllPdfPages();
        }
      });
    }

    const formatSelect = document.getElementById('pdf-format');
    if (formatSelect) {
      formatSelect.addEventListener('change', () => {
        updateDownloadBtnLabel();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
