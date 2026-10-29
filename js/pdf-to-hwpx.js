/**
 * Daily Helper (일상의도움) — PDF to HWPX Converter Engine
 * 100% Client-Side In-Memory Execution (Zero Server Transmission)
 * Converts PDF text into Hancom Office HWPX (OWPML / KS X 6101) document format
 * using an authentic verified Hancom Base HWPX package template injection mechanism.
 */

(function (window, document) {
  'use strict';

  // ── Configure Mozilla pdf.js Worker ────────────────────────
  if (typeof window !== 'undefined' && window.pdfjsLib) {
    if (!window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
  }

  // ── Authentic Hancom Office Blank HWPX Base64 Template ──────
  // Pre-validated KS X 6101 / OWPML package created by Hancom Office.
  // Contains authentic version.xml (hv:HCFVersion), content.hpf,
  // container.xml, header.xml (full styles & fonts), and settings.xml.
  const BASE64_HWPX_TEMPLATE =
    "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";

  // Fallback section properties (A4 margins, paper size) if regex extraction fails
  const DEFAULT_SEC_PR =
    '<hp:secPr id="" textDirection="HORIZONTAL" spaceColumns="1134" tabStop="8000" tabStopVal="4000" tabStopUnit="HWPUNIT" outlineShapeIDRef="1" memoShapeIDRef="0" textVerticalWidthHead="0" masterPageCnt="0">' +
    '<hp:grid lineGrid="0" charGrid="0" wonggojiFormat="0"/>' +
    '<hp:startNum pageStartsOn="BOTH" page="0" pic="0" tbl="0" equation="0"/>' +
    '<hp:visibility hideFirstHeader="0" hideFirstFooter="0" hideFirstMasterPage="0" border="SHOW_ALL" fill="SHOW_ALL" hideFirstPageNum="0" hideFirstEmptyLine="0" showLineNumber="0"/>' +
    '<hp:lineNumberShape restartType="0" countBy="0" distance="0" startNumber="0"/>' +
    '<hp:pagePr landscape="WIDELY" width="59528" height="84186" gutterType="LEFT_ONLY">' +
    '<hp:margin header="4252" footer="4252" gutter="0" left="8504" right="8504" top="5668" bottom="4252"/>' +
    '</hp:pagePr>' +
    '<hp:footNotePr>' +
    '<hp:autoNumFormat type="DIGIT" userChar="" prefixChar="" suffixChar=")" supscript="0"/>' +
    '<hp:noteLine length="-1" type="SOLID" width="0.12 mm" color="#000000"/>' +
    '<hp:noteSpacing betweenNotes="283" belowLine="567" aboveLine="850"/>' +
    '<hp:numbering type="CONTINUOUS" newNum="1"/>' +
    '<hp:placement place="EACH_COLUMN" beneathText="0"/>' +
    '</hp:footNotePr>' +
    '<hp:endNotePr>' +
    '<hp:autoNumFormat type="DIGIT" userChar="" prefixChar="" suffixChar=")" supscript="0"/>' +
    '<hp:noteLine length="14692344" type="SOLID" width="0.12 mm" color="#000000"/>' +
    '<hp:noteSpacing betweenNotes="0" belowLine="567" aboveLine="850"/>' +
    '<hp:numbering type="CONTINUOUS" newNum="1"/>' +
    '<hp:placement place="END_OF_DOCUMENT" beneathText="0"/>' +
    '</hp:endNotePr>' +
    '<hp:pageBorderFill type="BOTH" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill>' +
    '<hp:pageBorderFill type="EVEN" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill>' +
    '<hp:pageBorderFill type="ODD" borderFillIDRef="1" textBorder="PAPER" headerInside="0" footerInside="0" fillArea="PAPER"><hp:offset left="1417" right="1417" top="1417" bottom="1417"/></hp:pageBorderFill>' +
    '</hp:secPr>';

  // ── State ──────────────────────────────────────────────────
  const state = {
    selectedFile: null,
    pdfDoc: null,
    pageCount: 0,
    isProcessing: false,
    convertedBlob: null,
    convertedFilename: '',
    extractedTextPreview: '',
    stats: {
      totalPages: 0,
      totalLines: 0,
      totalChars: 0,
      fileSizeBytes: 0
    }
  };

  // ── Helpers ────────────────────────────────────────────────
  function formatBytes(bytes) {
    if (!bytes || bytes <= 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  function escapeXml(unsafe) {
    if (!unsafe) return '';
    return String(unsafe)
      // Strip XML 1.0 illegal control characters (tabs, newlines, CR are preserved)
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
      .replace(/[<>&'"]/g, function (c) {
        switch (c) {
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '&': return '&amp;';
          case '\'': return '&apos;';
          case '"': return '&quot;';
          default: return c;
        }
      });
  }

  function triggerDownload(blob, filename) {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'document.hwpx';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1500);
  }

  // ── Section0 XML Generator via Template Injection ────────────
  function buildSection0Xml(origSectionXml, pagesData) {
    // 1. Preserve root <hs:sec ...> opening tag and namespaces from template
    const rootSecMatch = origSectionXml ? origSectionXml.match(/<hs:sec\b[^>]*>/) : null;
    const rootSecOpenTag = rootSecMatch
      ? rootSecMatch[0]
      : '<hs:sec xmlns:ha="http://www.hancom.co.kr/hwpml/2011/app" xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph" xmlns:hp10="http://www.hancom.co.kr/hwpml/2016/paragraph" xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section" xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core" xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head" xmlns:hhs="http://www.hancom.co.kr/hwpml/2011/history" xmlns:hm="http://www.hancom.co.kr/hwpml/2011/master-page" xmlns:hpf="http://www.hancom.co.kr/schema/2011/hpf" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf/" xmlns:ooxmlchart="http://www.hancom.co.kr/hwpml/2016/ooxmlchart" xmlns:hwpunitchar="http://www.hancom.co.kr/hwpml/2016/HwpUnitChar" xmlns:epub="http://www.idpf.org/2007/ops" xmlns:config="urn:oasis:names:tc:opendocument:xmlns:config:1.0">';

    // 2. Extract authentic <hp:secPr>...</hp:secPr> from template (strictly required for 1st paragraph)
    let secPrXml = '';
    if (origSectionXml) {
      const secPrMatch = origSectionXml.match(/<hp:secPr[\s\S]*?<\/hp:secPr>/);
      if (secPrMatch) {
        secPrXml = secPrMatch[0];
      }
    }
    if (!secPrXml) {
      secPrXml = DEFAULT_SEC_PR;
    }

    // 3. Extract <hp:ctrl> containing <hp:colPr> if present in the first run of the template
    let colPrCtrlXml = '<hp:ctrl><hp:colPr id="" type="NEWSPAPER" layout="LEFT" colCount="1" sameSz="1" sameGap="0"/></hp:ctrl>';
    if (origSectionXml) {
      const colPrMatch = origSectionXml.match(/<hp:ctrl>[\s\S]*?<hp:colPr\b[\s\S]*?<\/hp:ctrl>/);
      if (colPrMatch) {
        colPrCtrlXml = colPrMatch[0];
      }
    }

    // 4. Construct paragraphs
    let paragraphsXml = '';
    let paraId = 0;
    let isFirstPara = true;

    if (!pagesData || pagesData.length === 0) {
      // Empty document fallback: single paragraph with secPr
      paragraphsXml += '  <hp:p id="0" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">\n' +
        '    <hp:run charPrIDRef="0">\n' +
        '      ' + secPrXml + '\n' +
        '      ' + colPrCtrlXml + '\n' +
        '      <hp:t></hp:t>\n' +
        '    </hp:run>\n' +
        '  </hp:p>\n';
    } else {
      for (let pIdx = 0; pIdx < pagesData.length; pIdx++) {
        const page = pagesData[pIdx];
        const lines = page.lines || [];
        const linesToProcess = lines.length > 0 ? lines : [''];

        for (let lIdx = 0; lIdx < linesToProcess.length; lIdx++) {
          const rawText = linesToProcess[lIdx];
          const safeText = escapeXml(rawText);
          const isPageBreak = (pIdx > 0 && lIdx === 0);
          const pageBreakVal = isPageBreak ? '1' : '0';

          if (isFirstPara) {
            // First paragraph MUST contain <hp:secPr> in its first run
            paragraphsXml += `  <hp:p id="${paraId}" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">\n` +
              '    <hp:run charPrIDRef="0">\n' +
              '      ' + secPrXml + '\n' +
              '      ' + colPrCtrlXml + '\n' +
              (safeText ? `      <hp:t>${safeText}</hp:t>\n` : '      <hp:t></hp:t>\n') +
              '    </hp:run>\n' +
              '  </hp:p>\n';
            isFirstPara = false;
          } else {
            // Subsequent paragraphs
            paragraphsXml += `  <hp:p id="${paraId}" paraPrIDRef="0" styleIDRef="0" pageBreak="${pageBreakVal}" columnBreak="0" merged="0">\n` +
              '    <hp:run charPrIDRef="0">\n' +
              (safeText ? `      <hp:t>${safeText}</hp:t>\n` : '      <hp:t></hp:t>\n') +
              '    </hp:run>\n' +
              '  </hp:p>\n';
          }
          paraId++;
        }
      }
    }

    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
      rootSecOpenTag + '\n' +
      paragraphsXml +
      '</hs:sec>';
  }

  // ── PDF Text & Coordinates Parsing Engine ────────────────────
  async function parsePdfToPages(pdfDoc, onProgress) {
    const totalPages = pdfDoc.numPages;
    const allPages = [];
    let grandTotalLines = 0;
    let grandTotalChars = 0;

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      if (onProgress) {
        const percent = Math.round((pageNum / totalPages) * 70);
        onProgress(percent, `${pageNum} / ${totalPages} 페이지 텍스트 추출 및 좌표 분석 중...`);
      }

      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent({ normalizeWhitespace: true });
      const rawItems = textContent.items || [];

      if (rawItems.length === 0) {
        allPages.push({ pageNum, lines: [] });
        continue;
      }

      // 1. Filter and normalize items
      // PDF transform: [scaleX, skewY, skewX, scaleY, transX, transY]
      const items = [];
      for (let i = 0; i < rawItems.length; i++) {
        const it = rawItems[i];
        if (!it || typeof it.str !== 'string') continue;
        if (it.str.length === 0 && (!it.width || it.width <= 0)) continue;

        const x = it.transform ? it.transform[4] : 0;
        const y = it.transform ? it.transform[5] : 0;
        const width = it.width || 0;
        const height = it.height || 10;

        items.push({
          str: it.str,
          x: x,
          y: y,
          width: width,
          height: height
        });
      }

      // 2. Sort by Y descending (PDF origin is bottom-left, higher Y is higher on page)
      items.sort((a, b) => b.y - a.y);

      // 3. Cluster into lines based on Y coordinate proximity
      const lines = [];
      let currentLine = [];
      let currentLineY = null;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (currentLineY === null) {
          currentLine.push(item);
          currentLineY = item.y;
        } else if (Math.abs(currentLineY - item.y) <= 4.2) {
          // Within same line threshold
          currentLine.push(item);
        } else {
          lines.push(currentLine);
          currentLine = [item];
          currentLineY = item.y;
        }
      }
      if (currentLine.length > 0) {
        lines.push(currentLine);
      }

      // 4. Sort words horizontally within each line and reconstruct string
      const pageLines = [];
      for (let l = 0; l < lines.length; l++) {
        const lineItems = lines[l];
        lineItems.sort((a, b) => a.x - b.x);

        let lineText = '';
        let lastRight = null;

        for (let w = 0; w < lineItems.length; w++) {
          const word = lineItems[w];
          if (lastRight !== null) {
            const gap = word.x - lastRight;
            // Insert space if there is a distinct horizontal gap and neither side is whitespace
            if (gap >= 2.0 && !lineText.endsWith(' ') && !word.str.startsWith(' ')) {
              lineText += ' ';
            }
          }
          lineText += word.str;
          lastRight = word.x + word.width;
        }

        const trimmed = lineText.trim();
        if (trimmed.length > 0) {
          pageLines.push(trimmed);
          grandTotalLines++;
          grandTotalChars += trimmed.length;
        }
      }

      allPages.push({ pageNum, lines: pageLines });
    }

    return {
      pages: allPages,
      totalLines: grandTotalLines,
      totalChars: grandTotalChars
    };
  }

  // ── HWPX Packaging via Template Injection ───────────────────
  async function createHwpxBlob(pagesData, docTitle, onProgress) {
    if (typeof JSZip === 'undefined') {
      throw new Error('JSZip 라이브러리가 로드되지 않았습니다. 브라우저 캐시를 새로고침해 주세요.');
    }

    if (onProgress) {
      onProgress(75, '검증된 HWPX 베이스 템플릿 로드 중...');
    }

    // 1. Load authentic Hancom HWPX package template from Base64
    const zip = await JSZip.loadAsync(BASE64_HWPX_TEMPLATE, { base64: true });

    if (onProgress) {
      onProgress(82, '템플릿 구역 속성(secPr) 및 본문 치환 준비 중...');
    }

    // 2. Read original section0.xml to preserve authentic secPr, pagePr, margin, etc.
    const sectionFile = zip.file('Contents/section0.xml');
    let origSectionXml = '';
    if (sectionFile) {
      origSectionXml = await sectionFile.async('text');
    }

    // 3. Generate compliant section0.xml with extracted PDF text paragraphs
    const newSectionXml = buildSection0Xml(origSectionXml, pagesData);
    zip.file('Contents/section0.xml', newSectionXml);

    // 4. Update title in content.hpf metadata if docTitle exists
    if (docTitle) {
      const hpfFile = zip.file('Contents/content.hpf');
      if (hpfFile) {
        const hpfXml = await hpfFile.async('text');
        const safeTitle = escapeXml(docTitle);
        const updatedHpf = hpfXml.replace(/<opf:title\s*\/>/, `<opf:title>${safeTitle}</opf:title>`);
        zip.file('Contents/content.hpf', updatedHpf);
      }
    }

    // 5. Ensure mimetype is stored uncompressed (STORE) per OPC specification
    zip.file('mimetype', 'application/hwp+zip', { compression: 'STORE' });

    if (onProgress) {
      onProgress(90, 'HWPX 바이너리 패키징 중...');
    }

    // 6. Generate final HWPX Blob with application/haansofthwpx
    const blob = await zip.generateAsync(
      {
        type: 'blob',
        mimeType: 'application/haansofthwpx',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      },
      (metadata) => {
        if (onProgress && metadata.percent) {
          const p = 90 + Math.round((metadata.percent / 100) * 10);
          onProgress(Math.min(p, 99), 'HWPX 파일 바이너리 빌드 중...');
        }
      }
    );

    return blob;
  }

  // ── UI Manager ──────────────────────────────────────────────
  const UI = {
    // Containers
    modal: null,
    dropZone: null,
    fileInput: null,
    uploadStep: null,
    processingStep: null,
    completedStep: null,

    // File info
    fileNameEl: null,
    fileSizeEl: null,
    pageCountEl: null,

    // Progress elements
    progressBar: null,
    progressPercent: null,
    progressStatus: null,

    // Completed elements
    statPagesEl: null,
    statLinesEl: null,
    statCharsEl: null,
    statSizeEl: null,
    downloadBtn: null,
    copyBtn: null,
    previewContainer: null,
    previewTextEl: null,
    previewToggleBtn: null,
    resetBtn: null,

    init() {
      this.modal = document.getElementById('pdf-to-hwpx-modal');
      this.dropZone = document.getElementById('hwpx-drop-zone');
      this.fileInput = document.getElementById('hwpx-file-input');

      this.uploadStep = document.getElementById('hwpx-upload-step');
      this.processingStep = document.getElementById('hwpx-processing-step');
      this.completedStep = document.getElementById('hwpx-completed-step');

      this.fileNameEl = document.getElementById('hwpx-file-name');
      this.fileSizeEl = document.getElementById('hwpx-file-size');
      this.pageCountEl = document.getElementById('hwpx-page-count');

      this.progressBar = document.getElementById('hwpx-progress-bar');
      this.progressPercent = document.getElementById('hwpx-progress-percent');
      this.progressStatus = document.getElementById('hwpx-progress-status');

      this.statPagesEl = document.getElementById('hwpx-stat-pages');
      this.statLinesEl = document.getElementById('hwpx-stat-lines');
      this.statCharsEl = document.getElementById('hwpx-stat-chars');
      this.statSizeEl = document.getElementById('hwpx-stat-size');

      this.downloadBtn = document.getElementById('hwpx-download-btn');
      this.copyBtn = document.getElementById('hwpx-copy-btn');
      this.previewContainer = document.getElementById('hwpx-preview-container');
      this.previewTextEl = document.getElementById('hwpx-preview-text');
      this.previewToggleBtn = document.getElementById('hwpx-preview-toggle-btn');
      this.resetBtn = document.getElementById('hwpx-reset-btn');

      this.bindEvents();
    },

    bindEvents() {
      // File input change
      if (this.fileInput) {
        this.fileInput.addEventListener('change', (e) => {
          const file = e.target.files && e.target.files[0];
          if (file) handleFileSelected(file);
        });
      }

      // Drag and drop events
      if (this.dropZone) {
        ['dragenter', 'dragover'].forEach((eventName) => {
          this.dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.dropZone.classList.add('border-emerald-500', 'bg-emerald-500/10');
            this.dropZone.classList.remove('border-slate-700');
          });
        });

        ['dragleave', 'drop'].forEach((eventName) => {
          this.dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.dropZone.classList.remove('border-emerald-500', 'bg-emerald-500/10');
            this.dropZone.classList.add('border-slate-700');
          });
        });

        this.dropZone.addEventListener('drop', (e) => {
          const files = e.dataTransfer && e.dataTransfer.files;
          if (files && files.length > 0) {
            handleFileSelected(files[0]);
          }
        });
      }

      // Download button
      if (this.downloadBtn) {
        this.downloadBtn.addEventListener('click', () => {
          if (state.convertedBlob) {
            triggerDownload(state.convertedBlob, state.convertedFilename);
          }
        });
      }

      // Copy text button
      if (this.copyBtn) {
        this.copyBtn.addEventListener('click', async () => {
          if (!state.extractedTextPreview) return;
          try {
            await navigator.clipboard.writeText(state.extractedTextPreview);
            const originalText = this.copyBtn.innerHTML;
            this.copyBtn.innerHTML = '<span>✅ 복사 완료!</span>';
            setTimeout(() => {
              this.copyBtn.innerHTML = originalText;
            }, 2000);
          } catch (_) {
            alert('클립보드 복사 권한이 거부되었습니다.');
          }
        });
      }

      // Preview toggle button
      if (this.previewToggleBtn) {
        this.previewToggleBtn.addEventListener('click', () => {
          if (!this.previewContainer) return;
          const isHidden = this.previewContainer.classList.contains('hidden');
          if (isHidden) {
            this.previewContainer.classList.remove('hidden');
            this.previewToggleBtn.textContent = '▲ 본문 텍스트 미리보기 접기';
          } else {
            this.previewContainer.classList.add('hidden');
            this.previewToggleBtn.textContent = '▼ 본문 텍스트 미리보기 펼치기';
          }
        });
      }

      // Reset button
      if (this.resetBtn) {
        this.resetBtn.addEventListener('click', () => {
          resetAll();
        });
      }
    },

    showUploadStep() {
      if (this.uploadStep) this.uploadStep.classList.remove('hidden');
      if (this.processingStep) this.processingStep.classList.add('hidden');
      if (this.completedStep) this.completedStep.classList.add('hidden');
    },

    showProcessingStep(fileName, fileSize) {
      if (this.uploadStep) this.uploadStep.classList.add('hidden');
      if (this.processingStep) this.processingStep.classList.remove('hidden');
      if (this.completedStep) this.completedStep.classList.add('hidden');

      if (this.fileNameEl) this.fileNameEl.textContent = fileName || '문서.pdf';
      if (this.fileSizeEl) this.fileSizeEl.textContent = formatBytes(fileSize);
      if (this.pageCountEl) this.pageCountEl.textContent = '분석 준비 중...';
      this.updateProgress(5, 'PDF 문서 로딩 및 구조 분석 중...');
    },

    showCompletedStep() {
      if (this.uploadStep) this.uploadStep.classList.add('hidden');
      if (this.processingStep) this.processingStep.classList.add('hidden');
      if (this.completedStep) this.completedStep.classList.remove('hidden');

      if (this.statPagesEl) this.statPagesEl.textContent = `${state.stats.totalPages} 페이지`;
      if (this.statLinesEl) this.statLinesEl.textContent = `${state.stats.totalLines.toLocaleString()} 행`;
      if (this.statCharsEl) this.statCharsEl.textContent = `${state.stats.totalChars.toLocaleString()} 자`;
      if (this.statSizeEl && state.convertedBlob) {
        this.statSizeEl.textContent = formatBytes(state.convertedBlob.size);
      }

      if (this.previewTextEl) {
        this.previewTextEl.textContent = state.extractedTextPreview || '(추출된 텍스트가 없습니다)';
      }
    },

    updateProgress(percent, statusText) {
      const p = Math.max(0, Math.min(100, percent));
      if (this.progressBar) {
        this.progressBar.style.width = p + '%';
      }
      if (this.progressPercent) {
        this.progressPercent.textContent = p + '%';
      }
      if (this.progressStatus && statusText) {
        this.progressStatus.textContent = statusText;
      }
    }
  };

  // ── Core Controller ─────────────────────────────────────────
  async function handleFileSelected(file) {
    if (!file) return;

    const lowerName = file.name.toLowerCase();
    if (!lowerName.endsWith('.pdf') && file.type !== 'application/pdf') {
      alert('PDF 파일(.pdf)만 변환할 수 있습니다.');
      return;
    }

    if (state.isProcessing) return;

    state.selectedFile = file;
    state.stats.fileSizeBytes = file.size;

    // Build target filename: [name].hwpx
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    state.convertedFilename = `${baseName}.hwpx`;

    UI.showProcessingStep(file.name, file.size);
    state.isProcessing = true;

    try {
      if (typeof window.pdfjsLib === 'undefined') {
        throw new Error('PDF.js 엔진이 로드되지 않았습니다.');
      }

      // 1. Read file as ArrayBuffer
      UI.updateProgress(10, '파일 데이터를 메모리에 적재 중...');
      const arrayBuffer = await file.arrayBuffer();

      // 2. Load PDF document
      UI.updateProgress(20, 'PDF 문서 구조 해석 및 폰트 맵 로딩...');
      const loadingTask = window.pdfjsLib.getDocument({
        data: arrayBuffer,
        cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
        cMapPacked: true
      });

      const pdfDoc = await loadingTask.promise;
      state.pdfDoc = pdfDoc;
      state.pageCount = pdfDoc.numPages;
      state.stats.totalPages = pdfDoc.numPages;

      if (UI.pageCountEl) {
        UI.pageCountEl.textContent = `총 ${pdfDoc.numPages} 페이지`;
      }

      // 3. Extract text lines and coordinates
      const parseResult = await parsePdfToPages(pdfDoc, (percent, status) => {
        UI.updateProgress(percent, status);
      });

      state.stats.totalLines = parseResult.totalLines;
      state.stats.totalChars = parseResult.totalChars;

      // Build text preview (all pages)
      const previewLines = [];
      for (const p of parseResult.pages) {
        if (p.lines.length > 0) {
          previewLines.push(`--- [페이지 ${p.pageNum}] ---`);
          previewLines.push(...p.lines);
        }
      }
      state.extractedTextPreview = previewLines.join('\n');

      // 4. Generate HWPX package using base template injection
      const hwpxBlob = await createHwpxBlob(parseResult.pages, baseName, (percent, status) => {
        UI.updateProgress(percent, status);
      });

      state.convertedBlob = hwpxBlob;

      // 5. Complete and show UI
      UI.updateProgress(100, '변환 완료!');
      setTimeout(() => {
        UI.showCompletedStep();
        state.isProcessing = false;
        // Automatically trigger download for best user experience
        triggerDownload(hwpxBlob, state.convertedFilename);
      }, 400);

    } catch (err) {
      console.error('PDF to HWPX conversion error:', err);
      state.isProcessing = false;
      alert(`변환 중 오류가 발생했습니다: ${err.message || err}\n암호가 걸린 PDF이거나 손상된 파일인지 확인해 주세요.`);
      resetAll();
    }
  }

  function resetAll() {
    state.selectedFile = null;
    state.pdfDoc = null;
    state.pageCount = 0;
    state.isProcessing = false;
    state.convertedBlob = null;
    state.convertedFilename = '';
    state.extractedTextPreview = '';
    state.stats = {
      totalPages: 0,
      totalLines: 0,
      totalChars: 0,
      fileSizeBytes: 0
    };

    if (UI.fileInput) {
      UI.fileInput.value = '';
    }
    if (UI.previewContainer) {
      UI.previewContainer.classList.add('hidden');
    }
    if (UI.previewToggleBtn) {
      UI.previewToggleBtn.textContent = '▼ 본문 텍스트 미리보기 펼치기';
    }

    UI.showUploadStep();
  }

  // ── Modal Lifecycle Hook ────────────────────────────────────
  function onOpen() {
    // If opened freshly without an active conversion, make sure upload step is displayed
    if (!state.convertedBlob && !state.isProcessing) {
      UI.showUploadStep();
    }
  }

  // ── Auto-initialize on DOM ready ────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => UI.init());
  } else {
    UI.init();
  }

  // Export to global scope
  window.pdfToHwpx = {
    handleFileSelected,
    resetAll,
    onOpen,
    getState: () => state
  };

})(window, document);
