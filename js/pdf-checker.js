/**
 * Daily Helper — PDF & Drawing Review / Marking Tool (PDF & JPG Checker)
 * Full-screen Modal Component Engine
 * Core Engines: Fabric.js v5.3.1, Mozilla pdf.js v3.11, pdf-lib v1.17.9
 * 100% Client-Side In-Memory Execution (Zero Server Transmission)
 */

(function () {
  'use strict';

  // ── Configure Mozilla pdf.js Worker ────────────────────────
  if (typeof window !== 'undefined' && window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  // ── State Container ─────────────────────────────────────────
  const state = {
    pages: [], // Array of { id, type: 'pdf'|'image', pdfDoc, pageNum, blob, blobUrl, width, height, widthPt, heightPt, fileName, title, thumbnailUrl }
    currentPageIndex: 0,
    annotations: {}, // { [pageId]: Array of serialized Fabric objects }
    history: {}, // { [pageId]: { past: [], future: [] } }
    currentTool: 'select', // 'select' | 'pan' | 'text' | 'rect' | 'circle' | 'pen' | 'arrow'
    strokeColor: '#ef4444',
    strokeWidth: 3,
    fillMode: 'transparent', // 'transparent' | 'semitransparent' | 'solid'
    fontSize: 24,
    zoom: 1.0,
    isSpacePressed: false,
    isPanning: false,
    lastPanPoint: { x: 0, y: 0 },
    activeShape: null,
    isDrawingShape: false,
    shapeStartPoint: { x: 0, y: 0 },
    canvas: null,
    isLoading: false,
    isInitialized: false,
    bgImageInstance: null
  };

  // ── Helper Utilities ────────────────────────────────────────
  function uid() {
    return 'p_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
  }

  function showToast(message) {
    const toast = document.getElementById('pdf-checker-toast');
    const msgEl = document.getElementById('pdf-checker-toast-msg');
    if (!toast || !msgEl) return;
    msgEl.textContent = message;
    toast.classList.remove('hidden', 'opacity-0', 'translate-y-2');
    toast.classList.add('opacity-100', 'translate-y-0');

    if (toast._timer) clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      toast.classList.remove('opacity-100');
      setTimeout(() => toast.classList.add('hidden'), 300);
    }, 2800);
  }

  function setOverlayLoading(show, message) {
    const overlay = document.getElementById('pdf-checker-loading-overlay');
    const msgEl = document.getElementById('pdf-checker-loading-msg');
    if (!overlay) return;
    state.isLoading = show;
    if (show) {
      if (msgEl && message) msgEl.textContent = message;
      overlay.classList.remove('hidden');
      overlay.classList.add('flex');
    } else {
      overlay.classList.remove('flex');
      overlay.classList.add('hidden');
    }
  }

  function getFillColor(mode, strokeColor) {
    if (mode === 'solid') return strokeColor;
    if (mode === 'semitransparent') {
      const rgb = hexToRgb(strokeColor);
      return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.22)` : 'rgba(239, 68, 68, 0.22)';
    }
    return 'transparent';
  }

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }

  // ── Fullscreen Modal Open / Close ───────────────────────────
  function openPdfCheckerModal() {
    const modal = document.getElementById('pdf-checker');
    if (!modal) return;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    if (window.location.hash !== '#pdf-checker') {
      history.replaceState(null, document.title, window.location.pathname + window.location.search + '#pdf-checker');
    }

    if (!state.isInitialized) {
      initEngine();
      state.isInitialized = true;
    } else {
      setTimeout(() => {
        resizeCanvasToWrapper();
        if (state.pages.length > 0) {
          fitToScreen();
        }
      }, 60);
    }
  }

  function closePdfCheckerModal() {
    const modal = document.getElementById('pdf-checker');
    if (!modal) return;

    modal.classList.remove('flex');
    modal.classList.add('hidden');
    document.body.style.overflow = '';

    const aliases = ['#pdf-checker', '#pdf-marking', '#drawing-checker', '#pdf-jpg-checker', '#pdfchecker', '#도면검토', '#pdf검토'];
    if (aliases.includes(window.location.hash)) {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  // ── Engine Initialization ───────────────────────────────────
  function initEngine() {
    const canvasEl = document.getElementById('pdf-checker-canvas');
    const wrapper = document.getElementById('pdf-checker-canvas-wrapper');
    const container = document.getElementById('pdf-checker-canvas-container');
    if (!canvasEl || !wrapper) return;

    // Set initial canvas dimension to viewport wrapper
    const initialW = wrapper.clientWidth || 1000;
    const initialH = wrapper.clientHeight || 700;

    state.canvas = new fabric.Canvas('pdf-checker-canvas', {
      width: initialW,
      height: initialH,
      selection: true,
      preserveObjectStacking: true,
      stopContextMenu: true,
      fireRightClick: true,
      enableRetinaScaling: false
    });

    // Make canvas container visible once initialized
    if (container) {
      container.classList.remove('hidden');
      container.style.width = '100%';
      container.style.height = '100%';
    }

    // Auto-resize on window resize
    window.addEventListener('resize', () => {
      const modal = document.getElementById('pdf-checker');
      if (modal && !modal.classList.contains('hidden')) {
        resizeCanvasToWrapper();
      }
    });

    bindCanvasInteractionEvents();
    bindKeyboardShortcuts();
    updateToolButtonsUI();
    updateUndoRedoUI();
  }

  function resizeCanvasToWrapper() {
    const wrapper = document.getElementById('pdf-checker-canvas-wrapper');
    if (!wrapper || !state.canvas) return;
    const w = wrapper.clientWidth;
    const h = wrapper.clientHeight;
    if (w > 50 && h > 50) {
      state.canvas.setWidth(w);
      state.canvas.setHeight(h);
      state.canvas.renderAll();
    }
  }

  // ── Canvas Interaction Events (Zoom, Pan, Shapes) ───────────
  function bindCanvasInteractionEvents() {
    const canvas = state.canvas;

    // ① Zoom & Pan via Mouse Wheel
    // Strictly: Ctrl + Mouse Wheel = Cursor-Centered Zoom
    // Normal Mouse Wheel = Pan viewport vertically (Shift + Wheel = horizontally)
    canvas.on('mouse:wheel', function (opt) {
      const e = opt.e;
      if (e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();

        const delta = e.deltaY;
        let zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 25) zoom = 25;
        if (zoom < 0.05) zoom = 0.05;

        const point = { x: opt.e.offsetX, y: opt.e.offsetY };
        canvas.zoomToPoint(point, zoom);
        state.zoom = zoom;
        updateZoomLabel();
      } else {
        // Normal wheel scrolls viewport
        e.preventDefault();
        const vpt = canvas.viewportTransform;
        if (e.shiftKey) {
          vpt[4] -= e.deltaY;
        } else {
          vpt[5] -= e.deltaY;
        }
        canvas.requestRenderAll();
      }
    });

    // ② Mouse Down
    canvas.on('mouse:down', function (opt) {
      const e = opt.e;

      // Pan mode (or Space key pressed or middle mouse button)
      if (state.isSpacePressed || state.currentTool === 'pan' || e.button === 1) {
        state.isPanning = true;
        canvas.selection = false;
        canvas.defaultCursor = 'grabbing';
        state.lastPanPoint = { x: e.clientX, y: e.clientY };
        return;
      }

      if (state.currentTool === 'select') return;

      const pointer = canvas.getPointer(e);
      state.shapeStartPoint = { x: pointer.x, y: pointer.y };

      // Text Tool
      if (state.currentTool === 'text') {
        insertTextObject(pointer.x, pointer.y);
        setTool('select');
        return;
      }

      // Shape Tool
      if (state.currentTool === 'rect') {
        state.isDrawingShape = true;
        const rect = new fabric.Rect({
          left: pointer.x,
          top: pointer.y,
          width: 0,
          height: 0,
          stroke: state.strokeColor,
          strokeWidth: state.strokeWidth,
          fill: getFillColor(state.fillMode, state.strokeColor),
          transparentCorners: false,
          cornerColor: '#3b82f6',
          cornerSize: 8,
          selectable: true
        });
        state.activeShape = rect;
        canvas.add(rect);
      } else if (state.currentTool === 'circle') {
        state.isDrawingShape = true;
        const ellipse = new fabric.Ellipse({
          left: pointer.x,
          top: pointer.y,
          rx: 0,
          ry: 0,
          stroke: state.strokeColor,
          strokeWidth: state.strokeWidth,
          fill: getFillColor(state.fillMode, state.strokeColor),
          transparentCorners: false,
          cornerColor: '#3b82f6',
          cornerSize: 8,
          selectable: true
        });
        state.activeShape = ellipse;
        canvas.add(ellipse);
      }
    });

    // ③ Mouse Move
    canvas.on('mouse:move', function (opt) {
      const e = opt.e;

      if (state.isPanning) {
        const vpt = canvas.viewportTransform;
        vpt[4] += e.clientX - state.lastPanPoint.x;
        vpt[5] += e.clientY - state.lastPanPoint.y;
        canvas.requestRenderAll();
        state.lastPanPoint = { x: e.clientX, y: e.clientY };
        return;
      }

      if (!state.isDrawingShape || !state.activeShape) return;

      const pointer = canvas.getPointer(e);
      const startX = state.shapeStartPoint.x;
      const startY = state.shapeStartPoint.y;

      if (state.currentTool === 'rect') {
        const left = Math.min(startX, pointer.x);
        const top = Math.min(startY, pointer.y);
        const width = Math.abs(startX - pointer.x);
        const height = Math.abs(startY - pointer.y);
        state.activeShape.set({ left, top, width, height });
        canvas.renderAll();
      } else if (state.currentTool === 'circle') {
        const left = Math.min(startX, pointer.x);
        const top = Math.min(startY, pointer.y);
        const rx = Math.abs(startX - pointer.x) / 2;
        const ry = Math.abs(startY - pointer.y) / 2;
        state.activeShape.set({ left, top, rx, ry });
        canvas.renderAll();
      }
    });

    // ④ Mouse Up
    canvas.on('mouse:up', function () {
      if (state.isPanning) {
        state.isPanning = false;
        canvas.setViewportTransform(canvas.viewportTransform); // Retain viewport stably (prevents snapping)
        canvas.defaultCursor = state.currentTool === 'pan' ? 'grab' : 'default';
        return;
      }

      if (state.isDrawingShape && state.activeShape) {
        state.isDrawingShape = false;
        state.activeShape.setCoords();
        canvas.setActiveObject(state.activeShape);
        state.activeShape = null;
        pushUndo();
        setTool('select');
      }
    });

    // Path created (Freehand Pen)
    canvas.on('path:created', function () {
      pushUndo();
    });

    // Object modified / transformed
    canvas.on('object:modified', function () {
      pushUndo();
    });
  }

  function insertTextObject(x, y) {
    const text = new fabric.IText('검토 메모 입력', {
      left: x,
      top: y,
      fontFamily: 'Noto Sans KR, Inter, sans-serif',
      fontSize: state.fontSize,
      fill: state.strokeColor,
      backgroundColor: state.fillMode === 'semitransparent' ? 'rgba(254, 240, 138, 0.9)' : 'transparent',
      cornerColor: '#3b82f6',
      cornerSize: 8,
      transparentCorners: false,
      padding: 4
    });
    state.canvas.add(text);
    state.canvas.setActiveObject(text);
    text.enterEditing();
    text.selectAll();
    pushUndo();
  }

  // ── Keyboard Shortcuts (With Text Box Isolation) ────────────
  function bindKeyboardShortcuts() {
    window.addEventListener('keydown', function (e) {
      const modal = document.getElementById('pdf-checker');
      if (!modal || modal.classList.contains('hidden')) return;

      // 텍스트 박스 입력 중에는 단축키 오작동 방지
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
        return;
      }
      const activeObj = state.canvas ? state.canvas.getActiveObject() : null;
      if (activeObj && activeObj.isEditing) {
        return;
      }

      // Space Pan Key Down
      if (e.code === 'Space' && !state.isSpacePressed) {
        e.preventDefault();
        state.isSpacePressed = true;
        if (state.canvas) state.canvas.defaultCursor = 'grab';
        return;
      }

      // Undo / Redo
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
        return;
      }

      // Delete Active Object
      if (e.key === 'Delete' || e.key === 'Del' || e.key === 'Backspace') {
        if (activeObj && !activeObj.isEditing) {
          e.preventDefault();
          deleteSelected();
          return;
        }
      }

      // Tool Switching Shortcuts (V, H, T, M, C, S)
      if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        const k = e.key.toLowerCase();
        if (k === 'v') setTool('select');
        else if (k === 'h') setTool('pan');
        else if (k === 't') setTool('text');
        else if (k === 'm') setTool('rect');
        else if (k === 'c') setTool('circle');
        else if (k === 's') setTool('pen');
      }
    });

    window.addEventListener('keyup', function (e) {
      if (e.code === 'Space') {
        state.isSpacePressed = false;
        if (state.canvas && state.currentTool !== 'pan') {
          state.canvas.defaultCursor = state.currentTool === 'select' ? 'default' : 'crosshair';
        }
      }
    });
  }

  // ── Tool & Property Actions ─────────────────────────────────
  function setTool(toolName) {
    state.currentTool = toolName;
    const canvas = state.canvas;
    if (!canvas) return;

    canvas.isDrawingMode = false;
    canvas.selection = toolName === 'select';

    if (toolName === 'pan') {
      canvas.defaultCursor = 'grab';
    } else if (toolName === 'select') {
      canvas.defaultCursor = 'default';
    } else if (toolName === 'pen') {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = state.strokeColor;
      canvas.freeDrawingBrush.width = state.strokeWidth;
      canvas.defaultCursor = 'crosshair';
    } else {
      canvas.defaultCursor = 'crosshair';
    }

    updateToolButtonsUI();
  }

  function updateToolButtonsUI() {
    const buttons = document.querySelectorAll('[data-pdf-tool]');
    buttons.forEach((btn) => {
      const t = btn.getAttribute('data-pdf-tool');
      if (t === state.currentTool) {
        btn.classList.add('active', 'bg-blue-600', 'text-white');
        btn.classList.remove('text-slate-300');
      } else {
        btn.classList.remove('active', 'bg-blue-600', 'text-white');
        btn.classList.add('text-slate-300');
      }
    });
  }

  function setStrokeColor(color) {
    state.strokeColor = color;
    if (state.canvas && state.canvas.isDrawingMode) {
      state.canvas.freeDrawingBrush.color = color;
    }
    const activeObj = state.canvas ? state.canvas.getActiveObject() : null;
    if (activeObj) {
      if (activeObj.type === 'i-text') {
        activeObj.set('fill', color);
      } else {
        activeObj.set({
          stroke: color,
          fill: getFillColor(state.fillMode, color)
        });
      }
      state.canvas.renderAll();
      pushUndo();
    }

    // Highlight active color dot
    document.querySelectorAll('.pdf-color-btn').forEach((btn) => {
      if (btn.getAttribute('data-color') === color) {
        btn.classList.add('ring-2', 'ring-white', 'scale-110');
      } else {
        btn.classList.remove('ring-2', 'ring-white', 'scale-110');
      }
    });
  }

  function setStrokeWidth(width) {
    state.strokeWidth = parseInt(width, 10) || 3;
    if (state.canvas && state.canvas.isDrawingMode) {
      state.canvas.freeDrawingBrush.width = state.strokeWidth;
    }
    const activeObj = state.canvas ? state.canvas.getActiveObject() : null;
    if (activeObj && activeObj.type !== 'i-text') {
      activeObj.set('strokeWidth', state.strokeWidth);
      state.canvas.renderAll();
      pushUndo();
    }
  }

  function setFillColor(mode) {
    state.fillMode = mode;
    const activeObj = state.canvas ? state.canvas.getActiveObject() : null;
    if (activeObj) {
      if (activeObj.type === 'i-text') {
        activeObj.set('backgroundColor', mode === 'semitransparent' ? 'rgba(254, 240, 138, 0.9)' : 'transparent');
      } else {
        activeObj.set('fill', getFillColor(mode, state.strokeColor));
      }
      state.canvas.renderAll();
      pushUndo();
    }
  }

  function deleteSelected() {
    if (!state.canvas) return;
    const activeObjects = state.canvas.getActiveObjects();
    if (activeObjects && activeObjects.length > 0) {
      activeObjects.forEach((obj) => state.canvas.remove(obj));
      state.canvas.discardActiveGroup ? state.canvas.discardActiveGroup() : state.canvas.discardActiveObject();
      state.canvas.requestRenderAll();
      pushUndo();
      showToast('선택한 마킹이 삭제되었습니다.');
    }
  }

  // ── Undo / Redo History ─────────────────────────────────────
  function getActivePageId() {
    const page = state.pages[state.currentPageIndex];
    return page ? page.id : null;
  }

  function pushUndo() {
    const pageId = getActivePageId();
    if (!pageId || !state.canvas) return;

    if (!state.history[pageId]) {
      state.history[pageId] = { past: [], future: [] };
    }

    const currentObjects = serializeCanvasAnnotations();
    state.history[pageId].past.push(currentObjects);
    if (state.history[pageId].past.length > 30) {
      state.history[pageId].past.shift();
    }
    state.history[pageId].future = []; // Clear redo
    updateUndoRedoUI();
  }

  function undo() {
    const pageId = getActivePageId();
    if (!pageId || !state.history[pageId] || state.history[pageId].past.length === 0) return;

    const current = serializeCanvasAnnotations();
    state.history[pageId].future.push(current);

    const prev = state.history[pageId].past.pop();
    loadSerializedAnnotations(prev);
    updateUndoRedoUI();
    showToast('실행 취소 (Undo)');
  }

  function redo() {
    const pageId = getActivePageId();
    if (!pageId || !state.history[pageId] || state.history[pageId].future.length === 0) return;

    const current = serializeCanvasAnnotations();
    state.history[pageId].past.push(current);

    const next = state.history[pageId].future.pop();
    loadSerializedAnnotations(next);
    updateUndoRedoUI();
    showToast('다시 실행 (Redo)');
  }

  function updateUndoRedoUI() {
    const undoBtn = document.getElementById('pdf-btn-undo');
    const redoBtn = document.getElementById('pdf-btn-redo');
    const pageId = getActivePageId();
    const hist = pageId ? state.history[pageId] : null;

    if (undoBtn) undoBtn.disabled = !hist || hist.past.length === 0;
    if (redoBtn) redoBtn.disabled = !hist || hist.future.length === 0;
  }

  function serializeCanvasAnnotations() {
    if (!state.canvas) return [];
    const objects = state.canvas.getObjects().filter((obj) => !obj.isBackgroundElement);
    return objects.map((obj) => obj.toObject(['id', 'pointType']));
  }

  function loadSerializedAnnotations(objectsData) {
    if (!state.canvas) return;
    const objects = state.canvas.getObjects().slice();
    objects.forEach((obj) => {
      if (!obj.isBackgroundElement) {
        state.canvas.remove(obj);
      }
    });

    if (Array.isArray(objectsData) && objectsData.length > 0) {
      fabric.util.enlivenObjects(objectsData, function (enlivenedObjects) {
        enlivenedObjects.forEach((obj) => {
          state.canvas.add(obj);
        });
        state.canvas.renderAll();
      });
    } else {
      state.canvas.renderAll();
    }
  }

  // ── Zoom & Fit to Screen ────────────────────────────────────
  function changeZoom(factor) {
    if (!state.canvas) return;
    let newZoom = state.canvas.getZoom() * factor;
    if (newZoom > 25) newZoom = 25;
    if (newZoom < 0.05) newZoom = 0.05;

    const center = { x: state.canvas.getWidth() / 2, y: state.canvas.getHeight() / 2 };
    state.canvas.zoomToPoint(center, newZoom);
    state.zoom = newZoom;
    updateZoomLabel();
  }

  function resetZoom100() {
    if (!state.canvas) return;
    state.canvas.setZoom(1.0);
    state.canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
    state.canvas.renderAll();
    state.zoom = 1.0;
    updateZoomLabel();
  }

  function fitToScreen() {
    if (!state.canvas || state.pages.length === 0) return;
    const page = state.pages[state.currentPageIndex];
    if (!page) return;

    const canvasW = state.canvas.getWidth();
    const canvasH = state.canvas.getHeight();
    const docW = page.renderWidth || page.width || 1200;
    const docH = page.renderHeight || page.height || 800;

    const padding = 36;
    const scaleX = (canvasW - padding) / docW;
    const scaleY = (canvasH - padding) / docH;
    const fitScale = Math.min(scaleX, scaleY, 2.0);

    const left = (canvasW - docW * fitScale) / 2;
    const top = (canvasH - docH * fitScale) / 2;

    state.canvas.setViewportTransform([fitScale, 0, 0, fitScale, left, top]);
    state.zoom = fitScale;
    updateZoomLabel();
  }

  function updateZoomLabel() {
    const label = document.getElementById('pdf-checker-zoom-label');
    if (label) {
      label.textContent = Math.round(state.zoom * 100) + '%';
    }
  }

  // ── File Loading & Multi-Merge (Append) ─────────────────────
  async function handleFileSelect(event) {
    const files = event.target.files;
    if (files && files.length > 0) {
      // If we already have loaded pages, append new ones!
      const isAppend = state.pages.length > 0;
      await processFiles(files, isAppend);
      event.target.value = '';
    }
  }

  async function handleDropFiles(event) {
    event.preventDefault();
    hideDropOverlay();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const isAppend = state.pages.length > 0;
      await processFiles(files, isAppend);
    }
  }

  function showDropOverlay() {
    const overlay = document.getElementById('pdf-checker-drop-overlay');
    if (overlay) overlay.classList.remove('hidden');
  }

  function hideDropOverlay() {
    const overlay = document.getElementById('pdf-checker-drop-overlay');
    if (overlay) overlay.classList.add('hidden');
  }

  async function processFiles(fileList, isAppend = false) {
    setOverlayLoading(true, '파일을 로컬 메모리로 로드하고 초고화질 도면을 렌더링 중입니다...');

    try {
      if (!isAppend) {
        clearAllPages(false);
      }

      const files = Array.from(fileList);
      let count = 0;

      for (const file of files) {
        const ext = file.name.split('.').pop().toLowerCase();
        if (ext === 'pdf') {
          await loadPdf(file);
          count++;
        } else if (['jpg', 'jpeg', 'png', 'webp', 'bmp'].includes(ext)) {
          await loadImage(file);
          count++;
        }
      }

      if (state.pages.length > 0) {
        renderThumbnailsSidebar();
        await switchPage(isAppend ? state.pages.length - 1 : 0);
        showToast(`${count}개 파일이 성공적으로 병합·로드되었습니다.`);
      } else {
        showToast('지원되는 형식(PDF, JPG, PNG, WebP)의 파일이 없습니다.');
      }
    } catch (err) {
      console.error('File load error:', err);
      showToast('파일 로드 실패: ' + err.message);
    } finally {
      setOverlayLoading(false);
    }
  }

  async function loadPdf(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    // Check for re-editable annotations in PDF Subject metadata
    let reEditableMap = null;
    try {
      const meta = await pdfDoc.getMetadata();
      const subject = meta && meta.info ? meta.info.Subject : '';
      if (subject && subject.includes('DailyHelper-PDF-Checker')) {
        const pkg = JSON.parse(subject);
        if (pkg && Array.isArray(pkg.pages)) {
          reEditableMap = pkg.pages;
        }
      }
    } catch (_) {}

    const startIndex = state.pages.length;
    for (let pNum = 1; pNum <= pdfDoc.numPages; pNum++) {
      const page = await pdfDoc.getPage(pNum);
      const vp = page.getViewport({ scale: 1.0 });

      const pageId = uid();
      state.pages.push({
        id: pageId,
        type: 'pdf',
        pdfDoc: pdfDoc,
        pageNum: pNum,
        widthPt: vp.width,
        heightPt: vp.height,
        fileName: file.name,
        title: `${file.name.replace(/\.pdf$/i, '')} (P.${pNum})`,
        arrayBuffer: arrayBuffer
      });

      // Restore serialized annotations if present
      if (reEditableMap && reEditableMap[pNum - 1]) {
        state.annotations[pageId] = reEditableMap[pNum - 1];
      }
    }

    if (reEditableMap) {
      showToast('이전에 저장된 마킹 데이터를 100% 편집 가능한 상태로 복원했습니다!');
    }
  }

  async function loadImage(file) {
    const blobUrl = URL.createObjectURL(file);
    const img = await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = blobUrl;
    });

    const pageId = uid();
    state.pages.push({
      id: pageId,
      type: 'image',
      blob: file,
      blobUrl: blobUrl,
      width: img.naturalWidth,
      height: img.naturalHeight,
      widthPt: (img.naturalWidth * 72) / 150,
      heightPt: (img.naturalHeight * 72) / 150,
      fileName: file.name,
      title: file.name
    });
  }

  function clearAllPages(confirmPrompt = true) {
    if (confirmPrompt && state.pages.length > 0) {
      if (!confirm('모든 페이지와 마킹 데이터를 지우고 초기화하시겠습니까?')) return;
    }

    // Revoke previous blob URLs to prevent memory leaks
    state.pages.forEach((p) => {
      if (p.blobUrl) URL.revokeObjectURL(p.blobUrl);
    });
    state.pages = [];
    state.annotations = {};
    state.history = {};
    state.currentPageIndex = 0;

    if (state.canvas) state.canvas.clear();
    renderThumbnailsSidebar();
    updatePageCounter();
    showEmptyState(true);
    showToast('작업 캔버스가 초기화되었습니다.');
  }

  // ── High-DPI Rendering & Page Switching ─────────────────────
  async function switchPage(index) {
    if (index < 0 || index >= state.pages.length) return;

    // 1. Save current page annotations
    saveCurrentPageAnnotations();

    state.currentPageIndex = index;
    const page = state.pages[index];

    setOverlayLoading(true, `페이지 ${index + 1} / ${state.pages.length} 고화질 렌더링 중...`);

    try {
      showEmptyState(false);
      state.canvas.clear();

      if (page.type === 'pdf') {
        await renderPdfPageBackground(page);
      } else {
        await renderImagePageBackground(page);
      }

      // Restore saved annotations for this page
      if (state.annotations[page.id]) {
        loadSerializedAnnotations(state.annotations[page.id]);
      }

      fitToScreen();
      updatePageCounter();
      highlightActiveThumbnail(index);
      updateUndoRedoUI();
    } catch (err) {
      console.error('Page render error:', err);
      showToast('페이지 렌더링 실패: ' + err.message);
    } finally {
      setOverlayLoading(false);
    }
  }

  function saveCurrentPageAnnotations() {
    const curPage = state.pages[state.currentPageIndex];
    if (curPage && state.canvas) {
      state.annotations[curPage.id] = serializeCanvasAnnotations();
    }
  }

  // Render PDF page to canvas background with High-DPI (2.5~3.0x scale) capped at 3840px (4K)
  async function renderPdfPageBackground(pageData) {
    const pdfPage = await pageData.pdfDoc.getPage(pageData.pageNum);
    const unscaledVp = pdfPage.getViewport({ scale: 1.0 });

    // High-DPI Scale calculation: 2.5x ~ 3.0x, intelligent 4K cap (max 3840px)
    const maxDimension = Math.max(unscaledVp.width, unscaledVp.height);
    let scale = Math.min(3.0, 3840 / maxDimension);
    if (scale < 2.0) scale = 2.0;

    const viewport = pdfPage.getViewport({ scale: scale });
    pageData.renderWidth = Math.round(viewport.width);
    pageData.renderHeight = Math.round(viewport.height);

    // Offscreen High-DPI canvas
    const offCanvas = document.createElement('canvas');
    offCanvas.width = pageData.renderWidth;
    offCanvas.height = pageData.renderHeight;
    const ctx = offCanvas.getContext('2d', { alpha: false });

    await pdfPage.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;

    const bgImgUrl = offCanvas.toDataURL('image/jpeg', 0.9);
    await new Promise((resolve) => {
      fabric.Image.fromURL(bgImgUrl, (fImg) => {
        fImg.set({
          left: 0,
          top: 0,
          selectable: false,
          evented: false,
          isBackgroundElement: true
        });
        state.canvas.setBackgroundImage(fImg, () => {
          state.canvas.renderAll();
          resolve();
        });
      });
    });

    // Clean up offscreen canvas
    offCanvas.width = 0;
    offCanvas.height = 0;
  }

  // Render Image page background with intelligent 4K cap (max 3840px)
  async function renderImagePageBackground(pageData) {
    let targetW = pageData.width;
    let targetH = pageData.height;
    const maxDim = Math.max(targetW, targetH);
    if (maxDim > 3840) {
      const ratio = 3840 / maxDim;
      targetW = Math.round(targetW * ratio);
      targetH = Math.round(targetH * ratio);
    }
    pageData.renderWidth = targetW;
    pageData.renderHeight = targetH;

    await new Promise((resolve) => {
      fabric.Image.fromURL(pageData.blobUrl, (fImg) => {
        fImg.set({
          left: 0,
          top: 0,
          scaleX: targetW / pageData.width,
          scaleY: targetH / pageData.height,
          selectable: false,
          evented: false,
          isBackgroundElement: true
        });
        state.canvas.setBackgroundImage(fImg, () => {
          state.canvas.renderAll();
          resolve();
        });
      });
    });
  }

  function updatePageCounter() {
    const counter = document.getElementById('pdf-checker-page-counter');
    const badge = document.getElementById('pdf-checker-page-total-badge');
    const total = state.pages.length;
    const current = total > 0 ? state.currentPageIndex + 1 : 0;

    if (counter) counter.textContent = `${current} / ${total}`;
    if (badge) badge.textContent = `${total} 페이지`;
  }

  function showEmptyState(show) {
    const emptyState = document.getElementById('pdf-checker-empty-state');
    if (emptyState) {
      if (show) emptyState.classList.remove('hidden');
      else emptyState.classList.add('hidden');
    }
  }

  // ── Thumbnails Sidebar ──────────────────────────────────────
  function renderThumbnailsSidebar() {
    const listEl = document.getElementById('pdf-checker-thumb-list');
    if (!listEl) return;

    if (state.pages.length === 0) {
      listEl.innerHTML = `
        <div class="p-4 text-center text-xs text-slate-500">
          불러온 페이지가 없습니다.
        </div>`;
      return;
    }

    let html = '';
    state.pages.forEach((page, i) => {
      const isActive = i === state.currentPageIndex;
      html += `
        <div class="pdf-thumb-card group relative p-2 rounded-xl transition-all cursor-pointer border ${
          isActive
            ? 'bg-blue-950/70 border-blue-500 shadow-lg shadow-blue-500/20'
            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
        }" onclick="window.pdfChecker.switchPage(${i})">
          <div class="flex items-center justify-between gap-1 mb-1.5 text-xs">
            <span class="font-bold ${isActive ? 'text-blue-400' : 'text-slate-300'} font-mono">P.${i + 1}</span>
            <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              ${
                i > 0
                  ? `<button type="button" class="p-0.5 hover:text-white text-slate-400" title="위로 이동" onclick="event.stopPropagation(); window.pdfChecker.movePage(${i}, -1)">▲</button>`
                  : ''
              }
              ${
                i < state.pages.length - 1
                  ? `<button type="button" class="p-0.5 hover:text-white text-slate-400" title="아래로 이동" onclick="event.stopPropagation(); window.pdfChecker.movePage(${i}, 1)">▼</button>`
                  : ''
              }
              <button type="button" class="p-0.5 hover:text-red-400 text-slate-400" title="페이지 삭제" onclick="event.stopPropagation(); window.pdfChecker.deletePage(${i})">🗑️</button>
            </div>
          </div>
          <div class="w-full h-24 bg-slate-950 rounded-lg overflow-hidden border border-slate-800/80 flex items-center justify-center relative">
            <div id="thumb-img-wrap-${page.id}" class="w-full h-full flex items-center justify-center text-slate-600 text-[10px]">
              <span class="animate-pulse">Loading...</span>
            </div>
          </div>
          <div class="mt-1 text-[11px] text-slate-400 truncate" title="${page.title}">${page.title}</div>
        </div>`;
    });

    listEl.innerHTML = html;
    generateThumbnailsAsync();
  }

  async function generateThumbnailsAsync() {
    for (let i = 0; i < state.pages.length; i++) {
      const page = state.pages[i];
      const wrap = document.getElementById(`thumb-img-wrap-${page.id}`);
      if (!wrap) continue;

      if (page.thumbnailUrl) {
        wrap.innerHTML = `<img src="${page.thumbnailUrl}" class="w-full h-full object-contain" alt="P.${i + 1}">`;
        continue;
      }

      if (page.type === 'pdf') {
        try {
          const pdfPage = await page.pdfDoc.getPage(page.pageNum);
          const vp = pdfPage.getViewport({ scale: 0.2 });
          const offCanvas = document.createElement('canvas');
          offCanvas.width = vp.width;
          offCanvas.height = vp.height;
          const ctx = offCanvas.getContext('2d');
          await pdfPage.render({ canvasContext: ctx, viewport: vp }).promise;
          page.thumbnailUrl = offCanvas.toDataURL('image/jpeg', 0.7);
          wrap.innerHTML = `<img src="${page.thumbnailUrl}" class="w-full h-full object-contain" alt="P.${i + 1}">`;
          offCanvas.width = 0;
          offCanvas.height = 0;
        } catch (_) {}
      } else if (page.type === 'image') {
        page.thumbnailUrl = page.blobUrl;
        wrap.innerHTML = `<img src="${page.blobUrl}" class="w-full h-full object-contain" alt="P.${i + 1}">`;
      }
    }
  }

  function highlightActiveThumbnail(index) {
    const listEl = document.getElementById('pdf-checker-thumb-list');
    if (!listEl) return;
    const cards = listEl.querySelectorAll('.pdf-thumb-card');
    cards.forEach((card, idx) => {
      if (idx === index) {
        card.className =
          'pdf-thumb-card group relative p-2 rounded-xl transition-all cursor-pointer border bg-blue-950/70 border-blue-500 shadow-lg shadow-blue-500/20';
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        card.className =
          'pdf-thumb-card group relative p-2 rounded-xl transition-all cursor-pointer border bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850';
      }
    });
  }

  function movePage(index, dir) {
    const target = index + dir;
    if (target < 0 || target >= state.pages.length) return;

    saveCurrentPageAnnotations();
    const temp = state.pages[index];
    state.pages[index] = state.pages[target];
    state.pages[target] = temp;

    if (state.currentPageIndex === index) {
      state.currentPageIndex = target;
    } else if (state.currentPageIndex === target) {
      state.currentPageIndex = index;
    }

    renderThumbnailsSidebar();
    switchPage(state.currentPageIndex);
    showToast('페이지 순서가 변경되었습니다.');
  }

  function deletePage(index) {
    if (state.pages.length <= 1) {
      clearAllPages(true);
      return;
    }

    if (!confirm(`페이지 ${index + 1}을(를) 정말 삭제하시겠습니까?`)) return;

    saveCurrentPageAnnotations();
    const removed = state.pages.splice(index, 1)[0];
    if (removed && removed.blobUrl) URL.revokeObjectURL(removed.blobUrl);
    delete state.annotations[removed.id];

    if (state.currentPageIndex >= state.pages.length) {
      state.currentPageIndex = state.pages.length - 1;
    }

    renderThumbnailsSidebar();
    switchPage(state.currentPageIndex);
    showToast('페이지가 삭제되었습니다.');
  }

  function toggleSidebar() {
    const sidebar = document.getElementById('pdf-checker-sidebar');
    const toggleBtn = document.getElementById('pdf-btn-sidebar-toggle');
    if (!sidebar) return;

    if (sidebar.classList.contains('hidden')) {
      sidebar.classList.remove('hidden');
      if (toggleBtn) toggleBtn.textContent = '◀';
    } else {
      sidebar.classList.add('hidden');
      if (toggleBtn) toggleBtn.textContent = '▶';
    }
    setTimeout(resizeCanvasToWrapper, 50);
  }

  // ── High-Quality Optimized PDF Export (50MB -> 5~7MB) ───────
  async function exportOptimizedPdf() {
    if (state.pages.length === 0) {
      showToast('내보낼 도면이나 문서가 없습니다. 먼저 파일을 불러와주세요.');
      return;
    }

    saveCurrentPageAnnotations();
    setOverlayLoading(true, '고화질 최적화 PDF를 합성하고 생성하는 중입니다...');

    try {
      const { PDFDocument } = window.PDFLib;
      const outDoc = await PDFDocument.create();

      // Serialization package for re-editable annotations
      const reEditablePackage = {
        format: 'DailyHelper-PDF-Checker',
        version: 1,
        exportedAt: new Date().toISOString(),
        pages: []
      };

      for (let i = 0; i < state.pages.length; i++) {
        const pageData = state.pages[i];
        setOverlayLoading(true, `고화질 합성 인코딩 중... (${i + 1} / ${state.pages.length})`);

        // 1. Prepare 1:1 offscreen composite canvas
        const offCanvas = document.createElement('canvas');
        let width = pageData.renderWidth || 2400;
        let height = pageData.renderHeight || 1600;

        // Longest side 4K intelligent cap
        const maxDim = Math.max(width, height);
        if (maxDim > 3840) {
          const ratio = 3840 / maxDim;
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        offCanvas.width = width;
        offCanvas.height = height;
        const ctx = offCanvas.getContext('2d', { alpha: false });

        // Draw base document / image
        if (pageData.type === 'pdf') {
          const pdfPage = await pageData.pdfDoc.getPage(pageData.pageNum);
          const unscaledVp = pdfPage.getViewport({ scale: 1.0 });
          const scale = width / unscaledVp.width;
          const vp = pdfPage.getViewport({ scale });
          await pdfPage.render({ canvasContext: ctx, viewport: vp }).promise;
        } else {
          const img = await new Promise((res) => {
            const im = new Image();
            im.onload = () => res(im);
            im.src = pageData.blobUrl;
          });
          ctx.drawImage(img, 0, 0, width, height);
        }

        // Draw overlay annotations if present
        const pageAnnotations = state.annotations[pageData.id];
        if (Array.isArray(pageAnnotations) && pageAnnotations.length > 0) {
          const tempFabricCanvas = new fabric.StaticCanvas(null, {
            width: width,
            height: height,
            enableRetinaScaling: false
          });

          await new Promise((resolve) => {
            fabric.util.enlivenObjects(pageAnnotations, function (objects) {
              objects.forEach((obj) => tempFabricCanvas.add(obj));
              tempFabricCanvas.renderAll();
              resolve();
            });
          });

          ctx.drawImage(tempFabricCanvas.lowerCanvasEl, 0, 0);
          tempFabricCanvas.dispose();
        }

        // 2. High-quality JPEG compression encoding (86% quality -> 50MB down to 5~7MB)
        const jpgDataUrl = offCanvas.toDataURL('image/jpeg', 0.86);
        const jpgBytes = await fetch(jpgDataUrl).then((res) => res.arrayBuffer());

        // Embed in pdf-lib document
        const embeddedImage = await outDoc.embedJpg(jpgBytes);

        // Calculate PDF point dimensions (pt)
        const ptWidth = pageData.widthPt || (width * 72) / 150;
        const ptHeight = pageData.heightPt || (height * 72) / 150;

        const newPdfPage = outDoc.addPage([ptWidth, ptHeight]);
        newPdfPage.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width: ptWidth,
          height: ptHeight
        });

        // Store serialized annotation for this page
        reEditablePackage.pages.push(pageAnnotations || []);

        // Free offscreen canvas memory
        offCanvas.width = 0;
        offCanvas.height = 0;
      }

      // Re-editable annotation metadata stored in PDF Subject
      outDoc.setSubject(JSON.stringify(reEditablePackage));
      outDoc.setKeywords(['DH_ANNOTATIONS_V1', 'DAILYHELPER_PDF_CHECKER']);
      outDoc.setProducer('DailyHelper PDF & Drawing Checker v1.0');

      const finalPdfBytes = await outDoc.save();

      // Trigger download
      const blob = new Blob([finalPdfBytes], { type: 'application/pdf' });
      const downloadUrl = URL.createObjectURL(blob);
      const fileName = `도면마킹검토_${new Date().toISOString().slice(0, 10)}.pdf`;

      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => URL.revokeObjectURL(downloadUrl), 10000); // Prevent file lock/leak

      showToast('고화질 최적화 PDF가 성공적으로 다운로드되었습니다!');
    } catch (err) {
      console.error('Export PDF error:', err);
      showToast('PDF 내보내기 실패: ' + err.message);
    } finally {
      setOverlayLoading(false);
    }
  }

  // ── Sample Blueprint Generator (Instant Wow Demo) ───────────
  async function loadSampleBlueprint() {
    setOverlayLoading(true, '초고해상도 샘플 건축 도면을 생성 중입니다...');

    try {
      const width = 3508; // A3 High-DPI Landscape
      const height = 2480;

      const offCanvas = document.createElement('canvas');
      offCanvas.width = width;
      offCanvas.height = height;
      const ctx = offCanvas.getContext('2d');

      // 1. Drawing paper background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Title Block (도면 표제란)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.strokeRect(60, 60, width - 120, height - 120);

      ctx.fillStyle = '#1e293b';
      ctx.fillRect(width - 750, height - 320, 670, 240);
      ctx.strokeRect(width - 750, height - 320, 670, 240);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 34px "Noto Sans KR", sans-serif';
      ctx.fillText('SAMPLE ARCHITECTURAL PLAN (A3)', width - 720, height - 250);
      ctx.font = '22px "Noto Sans KR", sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('PROJECT: DAILY HELPER HEADQUARTERS 3F', width - 720, height - 200);
      ctx.fillText('SCALE: 1:100  |  DATE: 2026. 10  |  REV: 02', width - 720, height - 150);
      ctx.fillText('STATUS: CLIENT REVIEW (BLUEPRINT CHECKER)', width - 720, height - 105);

      // 3. Walls & Partitions (외벽 & 내벽)
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 8;
      ctx.strokeRect(300, 300, 2400, 1600); // Main boundary

      ctx.lineWidth = 5;
      ctx.beginPath();
      // Partition 1
      ctx.moveTo(300, 900);
      ctx.lineTo(1300, 900);
      ctx.moveTo(1300, 300);
      ctx.lineTo(1300, 900);

      // Partition 2
      ctx.moveTo(1300, 750);
      ctx.lineTo(2100, 750);
      ctx.moveTo(2100, 300);
      ctx.lineTo(2100, 1100);

      // Partition 3
      ctx.moveTo(1300, 1400);
      ctx.lineTo(2700, 1400);
      ctx.stroke();

      // Dimension Lines & Annotations (치수선)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 22px monospace';

      ctx.beginPath();
      ctx.moveTo(300, 220);
      ctx.lineTo(2700, 220);
      ctx.moveTo(300, 200);
      ctx.lineTo(300, 240);
      ctx.moveTo(2700, 200);
      ctx.lineTo(2700, 240);
      ctx.stroke();
      ctx.fillText('DIM: 12,000 mm (12.0M)', 1350, 205);

      // Room Text Labels
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 30px "Noto Sans KR", sans-serif';
      ctx.fillText('대회의실 (MAIN CONFERENCE)', 1420, 520);
      ctx.fillText('임원 집무실 (EXECUTIVE SUITE)', 550, 600);
      ctx.fillText('오픈 스마트 오피스 (OPEN LAB)', 700, 1300);
      ctx.fillText('휴게 라운지 (PANTRY & LOUNGE)', 2200, 800);

      const blob = await new Promise((res) => offCanvas.toBlob(res, 'image/jpeg', 0.95));
      const blobUrl = URL.createObjectURL(blob);

      clearAllPages(false);
      const pageId = uid();
      state.pages.push({
        id: pageId,
        type: 'image',
        blob: blob,
        blobUrl: blobUrl,
        width: width,
        height: height,
        widthPt: (width * 72) / 150,
        heightPt: (height * 72) / 150,
        fileName: 'Sample_Blueprint_FloorPlan_A3.jpg',
        title: '샘플 도면 (3F 건축 평면도)'
      });

      renderThumbnailsSidebar();
      await switchPage(0);

      // Add pre-loaded demo markups
      setTimeout(() => {
        addDemoMarkups();
      }, 350);

      showToast('초고화질 샘플 도면이 로드되었습니다! 마킹을 시작해보세요.');
    } catch (err) {
      console.error('Sample load error:', err);
      showToast('샘플 로드 실패');
    } finally {
      setOverlayLoading(false);
    }
  }

  function addDemoMarkups() {
    if (!state.canvas) return;

    // 1. Red Review Box on Conference Room
    const rect = new fabric.Rect({
      left: 1390,
      top: 440,
      width: 660,
      height: 260,
      stroke: '#ef4444',
      strokeWidth: 4,
      fill: 'rgba(239, 68, 68, 0.15)',
      cornerColor: '#3b82f6',
      cornerSize: 8,
      selectable: true
    });

    // 2. Yellow highlighted text memo
    const text = new fabric.IText('검토 의견: 대회의실 빔프로젝터 및 전열 배선 위치 재확인 요망 (REV 02)', {
      left: 1410,
      top: 390,
      fontFamily: 'Noto Sans KR, sans-serif',
      fontSize: 24,
      fill: '#ef4444',
      backgroundColor: 'rgba(254, 240, 138, 0.92)',
      padding: 6,
      selectable: true
    });

    state.canvas.add(rect, text);
    state.canvas.renderAll();
    pushUndo();
  }

  // ── Public Global API Bindings ──────────────────────────────
  const publicApi = {
    open: openPdfCheckerModal,
    close: closePdfCheckerModal,
    handleFileSelect: handleFileSelect,
    handleDropFiles: handleDropFiles,
    showDropOverlay: showDropOverlay,
    hideDropOverlay: hideDropOverlay,
    setTool: setTool,
    setStrokeColor: setStrokeColor,
    setStrokeWidth: setStrokeWidth,
    setFillColor: setFillColor,
    undo: undo,
    redo: redo,
    deleteSelected: deleteSelected,
    changeZoom: changeZoom,
    resetZoom100: resetZoom100,
    fitToScreen: fitToScreen,
    exportOptimizedPdf: exportOptimizedPdf,
    switchPage: switchPage,
    deletePage: deletePage,
    movePage: movePage,
    clearAllPages: clearAllPages,
    toggleSidebar: toggleSidebar,
    loadSampleBlueprint: loadSampleBlueprint,
    state: state
  };

  window.pdfChecker = publicApi;
  window.PdfChecker = publicApi;
  window.openPdfCheckerModal = openPdfCheckerModal;
  window.closePdfCheckerModal = closePdfCheckerModal;

  // Hash-based deep link handler
  function checkHashOnLoad() {
    const raw = (window.location.hash || '').trim().toLowerCase();
    let h = '';
    try {
      h = decodeURIComponent(raw).replace(/^#/, '');
    } catch (_) {
      h = raw.replace(/^#/, '');
    }

    const aliases = [
      'pdf-checker',
      'pdf-marking',
      'drawing-checker',
      'pdf-jpg-checker',
      'blueprint-checker',
      'pdfchecker',
      'pdf검토',
      '도면검토',
      '도면마킹',
      '도면검토툴',
      'pdf마킹',
      '도면'
    ];

    if (aliases.includes(h)) {
      setTimeout(openPdfCheckerModal, 60);
    }
  }

  window.addEventListener('hashchange', checkHashOnLoad);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkHashOnLoad);
  } else {
    checkHashOnLoad();
  }
})();
