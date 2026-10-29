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
      docTitle: 'PDF ↔ 이미지(JPG/PNG) 변환기 (일괄 묶음·분리) | 일상의도움',
      brand: '일상의도움',
      badgeNew: 'NEW',
      badgeFree: '무료 도구',
      badgeClientSide: '100% 브라우저 메모리 처리 (서버 전송 없음)',
      heroTitle: 'PDF ↔ 이미지 변환기',
      heroSubtitle: '서버 업로드 없이 브라우저에서 여러 이미지를 하나의 PDF로 묶거나, 다중 페이지 PDF를 고해상도 이미지(ZIP)로 즉시 분리·변환합니다.',
      tabImgToPdf: '📸 이미지 여러 장 → 단일 PDF 묶기',
      tabPdfToImg: '📑 PDF 문서 → 개별 이미지 분리',
      
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
      successPdfDownload: 'PDF 변환 완료! 다운로드가 시작되었습니다.',
      noImgWarning: '변환할 이미지를 먼저 1장 이상 추가해 주세요.',

      // Feature 2: PDF to Image
      dropPdfTitle: 'PDF 파일을 여기에 끌어다 놓으세요',
      dropPdfDesc: '또는 클릭하여 PDF 파일을 선택하세요 (다중 페이지 지원)',
      selectPdfBtn: 'PDF 파일 선택',
      changePdfBtn: '🔄 다른 PDF 선택',
      pdfInfo: '{name} ({pages}페이지, {size})',
      outFormatLabel: '출력 이미지 포맷',
      formatPng: 'PNG (무손실 고화질, 도면/텍스트 선명)',
      formatJpg: 'JPG (용량 최적화, 사진/일반문서)',
      resolutionLabel: '해상도 / 선명도 (DPI 배율)',
      scale2: '2.0x 고해상도 (FHD급 선명도 - 권장)',
      scale15: '1.5x 표준 해상도 (빠른 처리)',
      scale3: '3.0x 초고해상도 (4K/인쇄용 품질)',
      downloadAllBtn: '✨ 모든 페이지 일괄 다운로드 ({type})',
      downloadSingleBtn: '✨ 고해상도 이미지 다운로드 ({ext})',
      downloadThisPage: '이 페이지만 다운로드',
      renderingPages: 'PDF 페이지 렌더링 중... ({current}/{total})',
      compressingZip: 'ZIP 압축 파일 패키징 중... ({percent}%)',
      successImgDownload: '이미지 변환 완료! 다운로드가 시작되었습니다.',
      noPdfWarning: '변환할 PDF 파일을 먼저 선택해 주세요.',

      // Notices
      noticeTitle: '안내 및 보안 보증',
      notice1: '100% 브라우저 로컬 처리: 모든 변환은 사용자의 PC/스마트폰 브라우저 메모리 안에서 단독 실행되며, 서버로 파일이 전혀 업로드되지 않습니다.',
      notice2: '다양한 포맷 완벽 지원: JPG, PNG는 물론 모바일/최신 웹 규격인 WEBP 등도 캔버스 엔진을 통해 고화질로 정상 묶음 변환됩니다.',
      notice3: '초고해상도 렌더링: 다중 페이지 PDF를 변환할 때 scale 2.0 이상의 고해상도 캔버스로 렌더링하여 작은 글씨와 도면 선도 흐려짐 없이 선명하게 유지됩니다.'
    },
    en: {
      docTitle: 'PDF ↔ Image (JPG/PNG) Converter | Daily Helper',
      brand: 'Daily Helper',
      badgeNew: 'NEW',
      badgeFree: 'Free Tool',
      badgeClientSide: '100% In-Browser Processing (Zero Server Upload)',
      heroTitle: 'PDF ↔ Image Converter',
      heroSubtitle: 'Convert multiple images into a single PDF, or extract multi-page PDFs into high-resolution images (ZIP) entirely in your browser memory.',
      tabImgToPdf: '📸 Images → Single PDF (Combine)',
      tabPdfToImg: '📑 PDF → Images (Split / Extract)',

      // Feature 1: Image to PDF
      dropImgTitle: 'Drag & Drop Image Files Here',
      dropImgDesc: 'or click to browse (JPG, PNG, WEBP, GIF, BMP supported)',
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
      convertImgToPdfBtn: '✨ Convert & Download Combined PDF',
      dragHint: '💡 Drag and drop cards to reorder pages.',
      rotate90: '↻ Rotate 90°',
      moveLeft: '◀ Prev',
      moveRight: 'Next ▶',
      deleteItem: 'Delete',
      processingImg: 'Generating PDF... ({current}/{total} pages)',
      successPdfDownload: 'PDF conversion completed! Download started.',
      noImgWarning: 'Please add at least one image file first.',

      // Feature 2: PDF to Image
      dropPdfTitle: 'Drag & Drop PDF File Here',
      dropPdfDesc: 'or click to browse (Multi-page PDFs supported)',
      selectPdfBtn: 'Select PDF File',
      changePdfBtn: '🔄 Choose Another PDF',
      pdfInfo: '{name} ({pages} pages, {size})',
      outFormatLabel: 'Output Image Format',
      formatPng: 'PNG (Lossless High Quality, Clear Text/Drawings)',
      formatJpg: 'JPG (Optimized Size, Photos/Documents)',
      resolutionLabel: 'Resolution / Scale (DPI)',
      scale2: '2.0x High Resolution (FHD Quality - Recommended)',
      scale15: '1.5x Standard Resolution (Faster)',
      scale3: '3.0x Ultra High Resolution (4K / Print Quality)',
      downloadAllBtn: '✨ Download All Pages ({type})',
      downloadSingleBtn: '✨ Download High-Res Image ({ext})',
      downloadThisPage: 'Download This Page',
      renderingPages: 'Rendering PDF pages... ({current}/{total})',
      compressingZip: 'Packaging ZIP file... ({percent}%)',
      successImgDownload: 'Image conversion completed! Download started.',
      noPdfWarning: 'Please select a PDF file first.',

      // Notices
      noticeTitle: 'Usage & Privacy Security Notice',
      notice1: '100% In-Browser Privacy: All processing runs strictly inside your browser memory. Your files are never uploaded to any external server.',
      notice2: 'Universal Image Support: JPG, PNG, WEBP, and more are processed seamlessly via high-fidelity canvas rendering.',
      notice3: 'Ultra High Resolution: Multi-page PDFs are rendered at 2.0x+ scale to preserve crisp text and sharp lines without blur.'
    }
  };

  // ── Global State ──────────────────────────────────────────
  const state = {
    lang: 'ko',
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
    let text = dict[key] || i18n.ko[key] || key;
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    }
    return text;
  }

  function updateUiLanguage() {
    document.title = t('docTitle');
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key) el.textContent = t(key);
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
        btnKo.className = 'px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-600 text-white shadow-sm';
        btnEn.className = 'px-2.5 py-1 rounded-md text-xs font-semibold text-slate-400 hover:text-white transition-colors';
      } else {
        btnEn.className = 'px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-600 text-white shadow-sm';
        btnKo.className = 'px-2.5 py-1 rounded-md text-xs font-semibold text-slate-400 hover:text-white transition-colors';
      }
    }

    renderImageCount();
    renderPdfInfo();
  }

  window.setLanguage = function (lang) {
    state.lang = lang;
    try {
      localStorage.setItem('selectedLang', lang);
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
      tabBtnPdf.className = 'flex-1 py-3 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all bg-indigo-600 text-white shadow-lg shadow-indigo-600/30';
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
          showToast(state.lang === 'ko' ? '이미지 파일만 업로드할 수 있습니다.' : 'Please drop image files only.', true);
        }
      });
    }
  }

  async function handleImageFiles(files) {
    for (const file of files) {
      const id = 'img_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
      const dataUrl = await readFileAsDataUrl(file);
      const dimensions = await getImageDimensions(dataUrl);

      state.images.push({
        id,
        file,
        name: file.name,
        size: file.size,
        width: dimensions.width,
        height: dimensions.height,
        rotation: 0,
        dataUrl
      });
    }

    // Default output filename from first image
    if (state.images.length > 0 && !document.getElementById('img-pdf-filename').value.trim()) {
      const base = getBaseFilename(state.images[0].name);
      document.getElementById('img-pdf-filename').value = `${base}_combined.pdf`;
    }

    updateImageSectionVisibility();
    renderImageGrid();
    renderImageCount();
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function getImageDimensions(dataUrl) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.naturalWidth || img.width, height: img.naturalHeight || img.height });
      img.onerror = () => resolve({ width: 800, height: 600 });
      img.src = dataUrl;
    });
  }

  function updateImageSectionVisibility() {
    const emptyZone = document.getElementById('img-dropzone');
    const contentZone = document.getElementById('img-content-area');
    if (state.images.length > 0) {
      emptyZone.classList.add('hidden');
      contentZone.classList.remove('hidden');
    } else {
      emptyZone.classList.remove('hidden');
      contentZone.classList.add('hidden');
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
      card.className = 'group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-2.5 flex flex-col gap-2 hover:border-slate-700 transition-all select-none';
      card.setAttribute('data-id', item.id);

      // Card HTML
      card.innerHTML = `
        <div class="relative w-full aspect-[4/3] bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center card-thumbnail-wrap cursor-grab active:cursor-grabbing border border-slate-800/80">
          <img src="${item.dataUrl}" alt="${item.name}" 
               style="transform: rotate(${item.rotation}deg); max-width: 90%; max-height: 90%; object-fit: contain; transition: transform 0.25s ease;" 
               class="select-none pointer-events-none" />
          <div class="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-slate-900/90 text-indigo-400 border border-slate-700/80 font-mono shadow-sm">
            #${index + 1}
          </div>
          ${item.rotation !== 0 ? `<div class="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-600/50">${item.rotation}°</div>` : ''}
        </div>
        <div class="flex flex-col gap-0.5 px-0.5">
          <p class="text-xs font-semibold text-slate-200 truncate" title="${item.name}">${item.name}</p>
          <p class="text-[10px] text-slate-500 font-mono">${item.width}×${item.height} · ${formatBytes(item.size)}</p>
        </div>
        <div class="flex items-center justify-between gap-1 mt-auto pt-1 border-t border-slate-800/80">
          <button type="button" class="btn-rotate flex-1 py-1 px-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold transition-colors flex items-center justify-center gap-1" title="${t('rotate90')}">
            <span>↻</span>
            <span class="hidden sm:inline">90°</span>
          </button>
          <div class="flex items-center gap-0.5">
            <button type="button" class="btn-prev p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-bold transition-colors disabled:opacity-30 disabled:pointer-events-none" ${index === 0 ? 'disabled' : ''} title="${t('moveLeft')}">
              ◀
            </button>
            <button type="button" class="btn-next p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-bold transition-colors disabled:opacity-30 disabled:pointer-events-none" ${index === state.images.length - 1 ? 'disabled' : ''} title="${t('moveRight')}">
              ▶
            </button>
          </div>
          <button type="button" class="btn-delete p-1 rounded-md bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-200 text-xs font-bold transition-colors" title="${t('deleteItem')}">
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
        throw new Error('PDF-lib 라이브러리가 로드되지 않았습니다.');
      }

      const pdfDoc = await PDFLib.PDFDocument.create();

      const layout = document.getElementById('img-page-size').value; // 'a4-portrait', 'a4-landscape', 'fit-image', 'a4-auto'
      const marginType = document.getElementById('img-margin').value; // 'none', 'small', 'normal'

      // Margin in points (72 points = 1 inch, 1mm = 2.83465 pt)
      let marginPt = 0;
      if (marginType === 'small') marginPt = 14.17; // ~5mm
      else if (marginType === 'normal') marginPt = 28.35; // ~10mm

      // Standard A4 dimensions in points: 595.28 x 841.89
      const A4_W = 595.28;
      const A4_H = 841.89;

      const total = state.images.length;

      for (let i = 0; i < total; i++) {
        const item = state.images[i];
        const percent = Math.round(((i + 1) / total) * 100);
        progressBar.style.width = percent + '%';
        progressText.textContent = t('processingImg', { current: i + 1, total });

        // Render rotated image to offscreen canvas
        const renderedCanvas = await renderRotatedImageToCanvas(item.dataUrl, item.rotation);

        // Convert canvas to JPEG blob buffer for embedding
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
          // fit-image: exact image size with 0 margin
          pageW = imgW;
          pageH = imgH;
          marginPt = 0;
        }

        const page = pdfDoc.addPage([pageW, pageH]);

        // Fit image inside available page dimensions preserving aspect ratio
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

      // Save PDF and Trigger Download
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });

      let rawName = document.getElementById('img-pdf-filename').value.trim();
      if (!rawName.toLowerCase().endsWith('.pdf')) rawName += '.pdf';
      const outFilename = sanitizeFilename(rawName, 'converted_images.pdf');

      if (window.saveAs) {
        window.saveAs(blob, outFilename);
      } else {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = outFilename;
        link.click();
      }

      showToast(t('successPdfDownload'));
    } catch (err) {
      console.error(err);
      showToast('PDF 변환 오류: ' + (err.message || err), true);
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
        const rad = (rotation * Math.PI) / 180;
        const isSwap = rotation === 90 || rotation === 270;

        canvas.width = isSwap ? img.naturalHeight || img.height : img.naturalWidth || img.width;
        canvas.height = isSwap ? img.naturalWidth || img.width : img.naturalHeight || img.height;

        const ctx = canvas.getContext('2d');
        // Fill white background for transparent PNG/WEBP
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rad);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);

        resolve(canvas);
      };
      img.onerror = reject;
      img.src = dataUrl;
    });
  }

  function canvasToArrayBuffer(canvas, mimeType, quality) {
    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsArrayBuffer(blob);
        },
        mimeType,
        quality
      );
    });
  }

  // ═════════════════════════════════════════════════════════════
  // FEATURE 2: PDF TO IMAGES (개별 이미지 분리)
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
          showToast(state.lang === 'ko' ? 'PDF 파일만 업로드할 수 있습니다.' : 'Please drop a PDF file.', true);
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
    if (!infoEl || !state.pdfFile) return;

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
      const arrayBuffer = await state.pdfFile.arrayBuffer();
      const pdfjsLib = window.pdfjsLib;
      if (!pdfjsLib) throw new Error('Mozilla pdf.js 라이브러리가 로드되지 않았습니다.');

      state.pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
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
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');

        // White background to avoid transparent black artifacts
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({ canvasContext: ctx, viewport: viewport }).promise;

        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

        state.pdfPages.push({
          pageNum,
          width: canvas.width,
          height: canvas.height,
          canvas
        });

        // Add page preview card to grid
        addPdfPageCard(pageNum, canvas.width, canvas.height, dataUrl);
      }

      updateDownloadBtnLabel();
      downloadBtn.disabled = false;
    } catch (err) {
      console.error(err);
      showToast('PDF 렌더링 오류: ' + (err.message || err), true);
    } finally {
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
        <img src="${dataUrl}" alt="Page ${pageNum}" class="max-w-[90%] max-height-[90%] object-contain select-none" />
        <div class="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-slate-900/90 text-teal-400 border border-slate-700/80 font-mono shadow-sm">
          P. ${pageNum}
        </div>
      </div>
      <div class="flex items-center justify-between text-[11px] text-slate-400 font-mono px-0.5">
        <span>${width} × ${height} px</span>
      </div>
      <button type="button" class="btn-single-download w-full py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 mt-auto border border-slate-700/80">
        <span>⬇</span>
        <span>${t('downloadThisPage')}</span>
      </button>
    `;

    card.querySelector('.btn-single-download').addEventListener('click', () => {
      downloadSinglePage(pageNum);
    });

    grid.appendChild(card);
  }

  function updateDownloadBtnLabel() {
    const downloadBtn = document.getElementById('btn-download-pdf-images');
    if (!downloadBtn || !state.pdfDoc) return;

    const format = document.getElementById('pdf-format').value; // 'png' or 'jpg'
    const totalPages = state.pdfPages.length;

    if (totalPages === 1) {
      downloadBtn.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
        <span>${t('downloadSingleBtn', { ext: format.toUpperCase() })}</span>
      `;
    } else {
      downloadBtn.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
        <span>${t('downloadAllBtn', { type: `ZIP · ${totalPages}P` })}</span>
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

  // Batch Download (Single Image if 1 page, ZIP if 2+ pages)
  window.downloadPdfImages = async function () {
    if (state.pdfPages.length === 0) {
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
      const base = getBaseFilename(state.pdfFile ? state.pdfFile.name : 'document');

      const totalPages = state.pdfPages.length;

      // Case A: Exactly 1 page -> Direct single image download
      if (totalPages === 1) {
        await downloadSinglePage(1);
        return;
      }

      // Case B: 2 or more pages -> JSZip compression
      const JSZip = window.JSZip;
      if (!JSZip) throw new Error('JSZip 라이브러리가 로드되지 않았습니다.');

      const zip = new JSZip();

      for (let i = 0; i < totalPages; i++) {
        const item = state.pdfPages[i];
        const pageNum = item.pageNum;
        const filename = `${base}_${String(pageNum).padStart(2, '0')}.${ext}`;

        const blob = await new Promise((resolve) => item.canvas.toBlob(resolve, mime, quality));
        zip.file(filename, blob);

        const percent = Math.round(((i + 1) / totalPages) * 50); // First 50% for blob extraction
        progressBar.style.width = percent + '%';
        progressText.textContent = `이미지 변환 패키징 중... (${i + 1}/${totalPages})`;
      }

      // Generate ZIP archive
      progressText.textContent = t('compressingZip', { percent: 50 });
      const zipBlob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' }, (metadata) => {
        const overallPercent = 50 + Math.round(metadata.percent / 2);
        progressBar.style.width = overallPercent + '%';
        progressText.textContent = t('compressingZip', { percent: overallPercent });
      });

      const zipFilename = `${base}_images.zip`;
      if (window.saveAs) {
        window.saveAs(zipBlob, zipFilename);
      } else {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(zipBlob);
        a.download = zipFilename;
        a.click();
      }

      showToast(t('successImgDownload'));
    } catch (err) {
      console.error(err);
      showToast('이미지 일괄 다운로드 오류: ' + (err.message || err), true);
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
  document.addEventListener('DOMContentLoaded', () => {
    // Check initial language preference
    try {
      const savedLang = localStorage.getItem('selectedLang');
      if (savedLang === 'en' || savedLang === 'ko') {
        state.lang = savedLang;
      } else {
        const navLang = (navigator.language || '').toLowerCase();
        state.lang = navLang.startsWith('ko') ? 'ko' : 'en';
      }
    } catch (_) {
      state.lang = 'ko';
    }

    updateUiLanguage();
    initImageDropZone();
    initPdfDropZone();

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
  });
})();
