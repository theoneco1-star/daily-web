/**
 * Daily Helper (일상의도움) — PDF to HWPX Converter Engine v3.0
 * Backend Pipeline Integration (FastAPI + pdf2docx + OWPML HWPX Builder)
 * High-precision Layout, Table borders, Cell spans, Tabs, and Font styling restoration.
 */

(function (window, document) {
  'use strict';

  // ── Configuration ──────────────────────────────────────────
  // Primary endpoint on same host, fallback to local FastAPI server
  const API_ENDPOINTS = [
    '/api/convert-pdf-hwpx',
    'http://localhost:8000/api/convert-pdf-hwpx',
    'http://127.0.0.1:8000/api/convert-pdf-hwpx'
  ];

  // Configure pdf.js worker for client-side text preview extraction
  if (typeof window !== 'undefined' && window.pdfjsLib) {
    if (!window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
  }

  // ── State ──────────────────────────────────────────────────
  const state = {
    selectedFile: null,
    isProcessing: false,
    convertedBlob: null,
    convertedFilename: '',
    extractedTextPreview: '',
    stats: {
      totalPages: 0,
      totalLines: 0,
      totalChars: 0,
      totalTables: 0,
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

  function parseFilenameFromHeader(disposition, fallbackName) {
    if (!disposition) return fallbackName;
    // Try filename*=UTF-8''... (RFC 5987)
    const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/i);
    if (utf8Match && utf8Match[1]) {
      try {
        return decodeURIComponent(utf8Match[1]);
      } catch (e) {
        return utf8Match[1];
      }
    }
    // Try standard filename="..."
    const standardMatch = disposition.match(/filename="?([^";]+)"?/i);
    if (standardMatch && standardMatch[1]) {
      return standardMatch[1];
    }
    return fallbackName;
  }

  // ── Quick Preview Text Extractor (pdf.js) ───────────────────
  async function extractPreviewText(file) {
    if (typeof window.pdfjsLib === 'undefined') return '';
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = window.pdfjsLib.getDocument({
        data: arrayBuffer,
        cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
        cMapPacked: true
      });
      const pdfDoc = await loadingTask.promise;
      const maxPages = Math.min(pdfDoc.numPages, 5);
      const previewLines = [];

      for (let p = 1; p <= maxPages; p++) {
        const page = await pdfDoc.getPage(p);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(it => it.str).join(' ').trim();
        if (pageText) {
          previewLines.push(`--- [페이지 ${p}] ---`);
          previewLines.push(pageText);
        }
      }
      return previewLines.join('\n\n');
    } catch (e) {
      console.warn('Text preview extraction skipped:', e);
      return '';
    }
  }

  // ── UI Controller ──────────────────────────────────────────
  const UI = {
    dropZone: null,
    fileInput: null,
    uploadStep: null,
    processingStep: null,
    completedStep: null,
    fileNameEl: null,
    fileSizeEl: null,
    pageCountEl: null,
    progressBar: null,
    progressPercent: null,
    progressStatus: null,
    statPagesEl: null,
    statLinesEl: null,
    statCharsEl: null,
    statSizeEl: null,
    downloadBtn: null,
    copyBtn: null,
    resetBtn: null,
    previewToggleBtn: null,
    previewContainer: null,
    previewTextEl: null,

    init() {
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
      this.resetBtn = document.getElementById('hwpx-reset-btn');
      this.previewToggleBtn = document.getElementById('hwpx-preview-toggle-btn');
      this.previewContainer = document.getElementById('hwpx-preview-container');
      this.previewTextEl = document.getElementById('hwpx-preview-text');

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

      // Drag and drop
      if (this.dropZone) {
        ['dragenter', 'dragover'].forEach(name => {
          this.dropZone.addEventListener(name, (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.dropZone.classList.add('border-teal-400', 'bg-slate-950/90', 'scale-[1.01]');
          });
        });

        ['dragleave', 'drop'].forEach(name => {
          this.dropZone.addEventListener(name, (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.dropZone.classList.remove('border-teal-400', 'bg-slate-950/90', 'scale-[1.01]');
          });
        });

        this.dropZone.addEventListener('drop', (e) => {
          const dt = e.dataTransfer;
          const files = dt && dt.files;
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
          if (!state.extractedTextPreview) {
            alert('복사할 본문 텍스트가 없습니다.');
            return;
          }
          try {
            await navigator.clipboard.writeText(state.extractedTextPreview);
            const origText = this.copyBtn.innerHTML;
            this.copyBtn.innerHTML = '<span>✓ 복사 완료!</span>';
            setTimeout(() => {
              this.copyBtn.innerHTML = origText;
            }, 1800);
          } catch (err) {
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
      this.updateProgress(5, 'PDF 파일 업로드 준비 중...');
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
      const p = Math.max(0, Math.min(100, Math.round(percent)));
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

  // ── Backend API Caller with Progress Pipeline ──────────────
  async function callBackendApi(file, endpoint) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', endpoint, true);
      xhr.responseType = 'blob';

      // 1. Upload progress: 0% -> 40%
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const uploadPercent = Math.round((e.loaded / e.total) * 40);
          UI.updateProgress(uploadPercent, `PDF 파일 업로드 중 (${Math.round((e.loaded / e.total) * 100)}%)...`);
        }
      };

      // 2. Simulated processing steps after upload finishes
      let progressTimer = null;
      xhr.upload.onload = () => {
        let currentP = 42;
        UI.updateProgress(currentP, '1단계: PDF 레이아웃 & 표(Table) 정밀 분석 중 (pdf2docx)...');

        progressTimer = setInterval(() => {
          if (currentP < 65) {
            currentP += 4;
            UI.updateProgress(currentP, '1단계: 표 테두리, 셀 병합 및 탭 간격 복원 중...');
          } else if (currentP < 88) {
            currentP += 3;
            UI.updateProgress(currentP, '2단계: 한컴오피스 HWPX (OWPML) 표준 규격 패키징 중...');
          } else if (currentP < 96) {
            currentP += 1;
            UI.updateProgress(currentP, '완성된 HWPX 패키지 압축 및 응답 준비 중...');
          }
        }, 300);
      };

      xhr.onload = () => {
        if (progressTimer) clearInterval(progressTimer);

        if (xhr.status >= 200 && xhr.status < 300) {
          const blob = xhr.response;

          // Parse headers
          const disposition = xhr.getResponseHeader('Content-Disposition');
          const pages = parseInt(xhr.getResponseHeader('X-Total-Pages') || '1', 10);
          const paras = parseInt(xhr.getResponseHeader('X-Total-Paragraphs') || '0', 10);
          const tables = parseInt(xhr.getResponseHeader('X-Total-Tables') || '0', 10);
          const chars = parseInt(xhr.getResponseHeader('X-Total-Chars') || '0', 10);

          const baseName = file.name.replace(/\.[^/.]+$/, '');
          const filename = parseFilenameFromHeader(disposition, `${baseName}.hwpx`);

          resolve({
            blob,
            filename,
            stats: {
              totalPages: pages,
              totalLines: paras,
              totalChars: chars,
              totalTables: tables,
              fileSizeBytes: blob.size
            }
          });
        } else {
          // Read error message from blob if JSON
          if (xhr.response && xhr.response.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = () => {
              try {
                const errJson = JSON.parse(reader.result);
                reject(new Error(errJson.detail || `서버 오류 (${xhr.status})`));
              } catch (_) {
                reject(new Error(`서버 오류 (${xhr.status})`));
              }
            };
            reader.readAsText(xhr.response);
          } else {
            reject(new Error(`서버 요청 실패 (HTTP ${xhr.status})`));
          }
        }
      };

      xhr.onerror = () => {
        if (progressTimer) clearInterval(progressTimer);
        reject(new Error('NETWORK_ERROR'));
      };

      xhr.ontimeout = () => {
        if (progressTimer) clearInterval(progressTimer);
        reject(new Error('TIMEOUT_ERROR'));
      };

      const formData = new FormData();
      formData.append('file', file);
      xhr.send(formData);
    });
  }

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

    const baseName = file.name.replace(/\.[^/.]+$/, '');
    state.convertedFilename = `${baseName}.hwpx`;

    UI.showProcessingStep(file.name, file.size);
    state.isProcessing = true;

    // Asynchronously generate quick text preview for the UI
    extractPreviewText(file).then(txt => {
      state.extractedTextPreview = txt;
    });

    let convertResult = null;
    let lastError = null;

    // Try available API endpoints
    for (const endpoint of API_ENDPOINTS) {
      try {
        convertResult = await callBackendApi(file, endpoint);
        if (convertResult) break;
      } catch (err) {
        lastError = err;
        console.warn(`Endpoint ${endpoint} failed:`, err.message);
        // If not a network connection error, do not retry other hosts
        if (err.message !== 'NETWORK_ERROR' && !err.message.includes('404')) {
          break;
        }
      }
    }

    if (convertResult) {
      // Success from Backend
      state.convertedBlob = convertResult.blob;
      state.convertedFilename = convertResult.filename;
      state.stats.totalPages = convertResult.stats.totalPages;
      state.stats.totalLines = convertResult.stats.totalLines;
      state.stats.totalChars = convertResult.stats.totalChars;
      state.stats.totalTables = convertResult.stats.totalTables;

      if (UI.pageCountEl) {
        UI.pageCountEl.textContent = `총 ${state.stats.totalPages} 페이지 (표 ${state.stats.totalTables}개 복원)`;
      }

      UI.updateProgress(100, '정밀 변환 완료!');
      setTimeout(() => {
        UI.showCompletedStep();
        state.isProcessing = false;
        triggerDownload(state.convertedBlob, state.convertedFilename);
      }, 400);

    } else {
      console.error('All backend conversion attempts failed:', lastError);
      state.isProcessing = false;

      const isNetworkErr = (lastError && (lastError.message === 'NETWORK_ERROR' || lastError.message.includes('HTTP 404')));
      if (isNetworkErr) {
        const userChoice = confirm(
          'Python FastAPI 변환 백엔드 서버(http://localhost:8000)가 아직 구동되지 않았습니다.\n\n' +
          '1. 표와 서식의 정밀 복원을 위해 프로젝트 루트의 "run_backend.bat"를 실행해 주세요.\n' +
          '2. 지금 바로 브라우저 간이 모드로 변환을 시도하시겠습니까?'
        );
        if (userChoice) {
          // Fallback to client-side quick extraction if user agrees
          runClientFallbackConversion(file);
          return;
        }
      } else {
        alert(`변환 중 오류가 발생했습니다: ${lastError.message || lastError}\n파일 암호화 여부 또는 손상 여부를 확인해 주세요.`);
      }
      resetAll();
    }
  }

  // ── Fallback Client-side Basic Mode ─────────────────────────
  async function runClientFallbackConversion(file) {
    try {
      UI.showProcessingStep(file.name, file.size);
      state.isProcessing = true;
      UI.updateProgress(20, '브라우저 간이 텍스트 추출 중...');

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = window.pdfjsLib.getDocument({
        data: arrayBuffer,
        cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
        cMapPacked: true
      });
      const pdfDoc = await loadingTask.promise;
      state.stats.totalPages = pdfDoc.numPages;

      let extractedAll = '';
      let lineCount = 0;
      let charCount = 0;

      for (let p = 1; p <= pdfDoc.numPages; p++) {
        UI.updateProgress(20 + Math.round((p / pdfDoc.numPages) * 60), `${p} / ${pdfDoc.numPages} 페이지 파싱 중...`);
        const page = await pdfDoc.getPage(p);
        const textContent = await page.getTextContent();
        const pageLines = textContent.items.map(it => it.str).filter(s => s.trim().length > 0);
        lineCount += pageLines.length;
        pageLines.forEach(l => charCount += l.length);
        extractedAll += `--- [페이지 ${p}] ---\n` + pageLines.join('\n') + '\n\n';
      }

      state.stats.totalLines = lineCount;
      state.stats.totalChars = charCount;
      state.extractedTextPreview = extractedAll;

      // Wrap into simple text blob as temporary emergency download
      const textBlob = new Blob([extractedAll], { type: 'text/plain;charset=utf-8' });
      state.convertedBlob = textBlob;
      state.convertedFilename = `${file.name.replace(/\.[^/.]+$/, '')}_추출.txt`;

      UI.updateProgress(100, '간이 추출 완료!');
      setTimeout(() => {
        UI.showCompletedStep();
        state.isProcessing = false;
        triggerDownload(textBlob, state.convertedFilename);
      }, 400);

    } catch (e) {
      alert('간이 추출 중 오류가 발생했습니다: ' + e.message);
      resetAll();
    }
  }

  function resetAll() {
    state.selectedFile = null;
    state.isProcessing = false;
    state.convertedBlob = null;
    state.convertedFilename = '';
    state.extractedTextPreview = '';
    state.stats = {
      totalPages: 0,
      totalLines: 0,
      totalChars: 0,
      totalTables: 0,
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

  function onOpen() {
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

  window.pdfToHwpx = {
    handleFileSelected,
    resetAll,
    onOpen,
    getState: () => state
  };

})(window, document);
