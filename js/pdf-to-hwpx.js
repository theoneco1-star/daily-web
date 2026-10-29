/**
 * Daily Helper (일상의도움) — PDF to HWPX Converter Engine
 * 100% Client-Side In-Memory Execution (Zero Server Transmission)
 * Converts PDF text into Hancom Office HWPX (OWPML / KS X 6101) document format.
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
      // Strip XML 1.0 illegal control characters (\t, \n, \r are valid)
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
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

  // ── XML Templates for HWPX (KS X 6101 Standard) ─────────────
  function generateContainerXml() {
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
      '<ocf:container xmlns:ocf="urn:oasis:names:tc:opendocument:xmlns:container">\n' +
      '  <ocf:rootfiles>\n' +
      '    <ocf:rootfile full-path="Contents/content.hpf" media-type="application/hwp+zip"/>\n' +
      '  </ocf:rootfiles>\n' +
      '</ocf:container>';
  }

  function generateContentHpfXml(docTitle) {
    const safeTitle = escapeXml(docTitle || 'PDF to HWPX Converted Document');
    const nowIso = new Date().toISOString();
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
      '<opf:package xmlns:opf="http://www.idpf.org/2007/opf" version="2.0" unique-identifier="uid">\n' +
      '  <opf:metadata xmlns:dc="http://purl.org/dc/elements/1.1/">\n' +
      `    <dc:title>${safeTitle}</dc:title>\n` +
      '    <dc:language>ko</dc:language>\n' +
      '    <dc:creator>Daily Helper (dailyhelperhub.com)</dc:creator>\n' +
      `    <dc:date>${nowIso}</dc:date>\n` +
      '  </opf:metadata>\n' +
      '  <opf:manifest>\n' +
      '    <opf:item id="header" href="header.xml" media-type="application/xml"/>\n' +
      '    <opf:item id="section0" href="section0.xml" media-type="application/xml"/>\n' +
      '  </opf:manifest>\n' +
      '  <opf:spine>\n' +
      '    <opf:itemref idref="header"/>\n' +
      '    <opf:itemref idref="section0"/>\n' +
      '  </opf:spine>\n' +
      '</opf:package>';
  }

  function generateHeaderXml() {
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
      '<hh:head xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head"\n' +
      '         xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph"\n' +
      '         xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core"\n' +
      '         version="1.0">\n' +
      '  <hh:beginNum page="1" footnote="1" endnote="1" pic="1" tbl="1" equation="1"/>\n' +
      '  <hh:refList>\n' +
      '    <hh:fontfaces itemCnt="7">\n' +
      '      <hh:fontface lang="hangul" fontCnt="1">\n' +
      '        <hh:font id="0" face="맑은 고딕" type="ttf" isEmbedded="0"/>\n' +
      '      </hh:fontface>\n' +
      '      <hh:fontface lang="latin" fontCnt="1">\n' +
      '        <hh:font id="0" face="맑은 고딕" type="ttf" isEmbedded="0"/>\n' +
      '      </hh:fontface>\n' +
      '      <hh:fontface lang="hanja" fontCnt="1">\n' +
      '        <hh:font id="0" face="맑은 고딕" type="ttf" isEmbedded="0"/>\n' +
      '      </hh:fontface>\n' +
      '      <hh:fontface lang="japanese" fontCnt="1">\n' +
      '        <hh:font id="0" face="맑은 고딕" type="ttf" isEmbedded="0"/>\n' +
      '      </hh:fontface>\n' +
      '      <hh:fontface lang="other" fontCnt="1">\n' +
      '        <hh:font id="0" face="맑은 고딕" type="ttf" isEmbedded="0"/>\n' +
      '      </hh:fontface>\n' +
      '      <hh:fontface lang="symbol" fontCnt="1">\n' +
      '        <hh:font id="0" face="맑은 고딕" type="ttf" isEmbedded="0"/>\n' +
      '      </hh:fontface>\n' +
      '      <hh:fontface lang="user" fontCnt="1">\n' +
      '        <hh:font id="0" face="맑은 고딕" type="ttf" isEmbedded="0"/>\n' +
      '      </hh:fontface>\n' +
      '    </hh:fontfaces>\n' +
      '    <hh:borderFills itemCnt="1">\n' +
      '      <hh:borderFill id="1" backSlash="none" slash="none">\n' +
      '        <hh:leftBorder type="none" width="0.1mm" color="#000000"/>\n' +
      '        <hh:rightBorder type="none" width="0.1mm" color="#000000"/>\n' +
      '        <hh:topBorder type="none" width="0.1mm" color="#000000"/>\n' +
      '        <hh:bottomBorder type="none" width="0.1mm" color="#000000"/>\n' +
      '      </hh:borderFill>\n' +
      '    </hh:borderFills>\n' +
      '    <hh:charProperties itemCnt="1">\n' +
      '      <hh:charPr id="0" height="1000" textColor="#000000" shadeColor="none" useFontSpace="0" symMark="none" borderFillIDRef="1">\n' +
      '        <hh:fontRef hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/>\n' +
      '      </hh:charPr>\n' +
      '    </hh:charProperties>\n' +
      '    <hh:tabProperties itemCnt="1">\n' +
      '      <hh:tabPr id="0" autoTabLeft="0" autoTabRight="0"/>\n' +
      '    </hh:tabProperties>\n' +
      '    <hh:paraProperties itemCnt="1">\n' +
      '      <hh:paraPr id="0" tabPrIDRef="0" align="left" headingType="none" headingIDRef="0">\n' +
      '        <hh:lineSpacing type="percent" value="160"/>\n' +
      '      </hh:paraPr>\n' +
      '    </hh:paraProperties>\n' +
      '    <hh:styles itemCnt="1">\n' +
      '      <hh:style id="0" type="para" name="바탕글" engName="Normal" paraPrIDRef="0" charPrIDRef="0" nextStyleIDRef="0"/>\n' +
      '    </hh:styles>\n' +
      '  </hh:refList>\n' +
      '</hh:head>';
  }

  function generateSection0Xml(pagesData) {
    // A4 width: 59528 HwpUnit (210mm), height: 84188 HwpUnit (297mm)
    // Left/Right: 8504 (30mm), Top/Bottom: 5668 (20mm), Header/Footer: 4252 (15mm)
    let xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n' +
      '<hs:sec xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section"\n' +
      '        xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph"\n' +
      '        xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core"\n' +
      '        xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head">\n';

    let paraId = 0;
    let isFirstPara = true;

    if (!pagesData || pagesData.length === 0) {
      // Empty document fallback
      xml += '  <hp:p id="0" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0">\n' +
        '    <hp:run charPrIDRef="0">\n' +
        '      <hp:secPr id="0" textDirection="horizontal" spaceBetweenColumns="1134" tabStop="8000" outlineShapeIDRef="0" memoShapeIDRef="0" textVerticalWidthHead="0">\n' +
        '        <hp:grid char="0" line="0"/>\n' +
        '        <hp:pagePr width="59528" height="84188" gutterType="left" autoSpace="1">\n' +
        '          <hp:margin left="8504" right="8504" top="5668" bottom="5668" header="4252" footer="4252" gutter="0"/>\n' +
        '        </hp:pagePr>\n' +
        '      </hp:secPr>\n' +
        '      <hp:t/>\n' +
        '    </hp:run>\n' +
        '  </hp:p>\n';
    } else {
      for (let pIdx = 0; pIdx < pagesData.length; pIdx++) {
        const page = pagesData[pIdx];
        const lines = page.lines || [];

        // If page has no lines, add at least one empty line
        const linesToProcess = lines.length > 0 ? lines : [''];

        for (let lIdx = 0; lIdx < linesToProcess.length; lIdx++) {
          const rawText = linesToProcess[lIdx];
          const safeText = escapeXml(rawText);
          const isPageBreak = (pIdx > 0 && lIdx === 0);

          if (isFirstPara) {
            // First paragraph must contain <hp:secPr> in its first <hp:run>
            xml += `  <hp:p id="${paraId}" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0">\n` +
              '    <hp:run charPrIDRef="0">\n' +
              '      <hp:secPr id="0" textDirection="horizontal" spaceBetweenColumns="1134" tabStop="8000" outlineShapeIDRef="0" memoShapeIDRef="0" textVerticalWidthHead="0">\n' +
              '        <hp:grid char="0" line="0"/>\n' +
              '        <hp:pagePr width="59528" height="84188" gutterType="left" autoSpace="1">\n' +
              '          <hp:margin left="8504" right="8504" top="5668" bottom="5668" header="4252" footer="4252" gutter="0"/>\n' +
              '        </hp:pagePr>\n' +
              '      </hp:secPr>\n' +
              (safeText ? `      <hp:t>${safeText}</hp:t>\n` : '      <hp:t/>\n') +
              '    </hp:run>\n' +
              '  </hp:p>\n';
            isFirstPara = false;
          } else {
            const pageBreakAttr = isPageBreak ? ' pageBreak="1"' : '';
            xml += `  <hp:p id="${paraId}" paraPrIDRef="0" styleIDRef="0"${pageBreakAttr}>\n` +
              '    <hp:run charPrIDRef="0">\n' +
              (safeText ? `      <hp:t>${safeText}</hp:t>\n` : '      <hp:t/>\n') +
              '    </hp:run>\n' +
              '  </hp:p>\n';
          }
          paraId++;
        }
      }
    }

    xml += '</hs:sec>';
    return xml;
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

  // ── HWPX Packaging with JSZip ───────────────────────────────
  async function createHwpxBlob(pagesData, docTitle, onProgress) {
    if (typeof JSZip === 'undefined') {
      throw new Error('JSZip 라이브러리가 로드되지 않았습니다. 브라우저 캐시를 새로고침해 주세요.');
    }

    if (onProgress) {
      onProgress(80, 'HWPX 표준 XML 생성 중...');
    }

    const containerXml = generateContainerXml();
    const contentHpfXml = generateContentHpfXml(docTitle);
    const headerXml = generateHeaderXml();
    const section0Xml = generateSection0Xml(pagesData);

    if (onProgress) {
      onProgress(90, 'ZIP 압축 패키징 및 OCF 규격 적용 중...');
    }

    const zip = new JSZip();

    // 1. mimetype: MUST be stored uncompressed (STORE) as first entry
    zip.file('mimetype', 'application/hwp+zip', { compression: 'STORE' });

    // 2. META-INF/container.xml
    zip.folder('META-INF').file('container.xml', containerXml);

    // 3. Contents folder
    const contentsFolder = zip.folder('Contents');
    contentsFolder.file('content.hpf', contentHpfXml);
    contentsFolder.file('header.xml', headerXml);
    contentsFolder.file('section0.xml', section0Xml);

    // 4. Generate HWPX Blob with application/haansofthwpx
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

      // Build text preview (first 100 lines)
      const previewLines = [];
      for (const p of parseResult.pages) {
        if (p.lines.length > 0) {
          previewLines.push(`--- [페이지 ${p.pageNum}] ---`);
          previewLines.push(...p.lines);
        }
      }
      state.extractedTextPreview = previewLines.join('\n');

      // 4. Generate HWPX package
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

