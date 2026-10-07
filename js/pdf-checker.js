/**
 * Daily Helper — PDF & Drawing Review / Marking Tool (PDF & JPG Checker)
 * Engine: Fabric.js v5.3.1, Mozilla pdf.js v3.11, pdf-lib v1.17.9
 * 100% Client-Side In-Memory Execution (Zero Server Transmission)
 */

(function () {
  'use strict';

  // Configure pdf.js worker
  if (typeof window !== 'undefined' && window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  // ── Global State ──────────────────────────────────────────
  const state = {
    pages: [], // [{ id, type: 'pdf'|'image', pdfDoc, pageNum, blob, blobUrl, width, height, widthPt, heightPt, fileName, thumbnail }]
    currentPageIndex: 0,
    annotations: {}, // { [pageId]: serializedFabricObjects }
    history: {}, // { [pageId]: { undo: [], redo: [] } }
    currentTool: 'select', // 'select' | 'pan' | 'text' | 'rect' | 'circle' | 'pen' | 'arrow'
    strokeColor: '#ef4444', // Default red for blueprint markups
    strokeWidth: 4,
    fillMode: 'transparent', // 'transparent' | 'semi' | 'solid'
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
    isInitialized: false
  };

  // ── Utilities ─────────────────────────────────────────────
  function uid() {
    return 'p_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
  }

  function formatBytes(bytes) {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  function getI18nText(key, fallback) {
    if (typeof window.t === 'function') {
      const val = window.t('webTools.pdfChecker.' + key);
      if (val && !val.startsWith('webTools.')) return val;
    }
    return fallback;
  }

  function showToast(message) {
    const toast = document.getElementById('pdf-checker-toast');
    const msgEl = document.getElementById('pdf-checker-toast-msg');
    if (!toast || !msgEl) {
      console.log('[PDF Checker]', message);
      return;
    }
    msgEl.textContent = message;
    toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-2');
    toast.classList.add('opacity-100', 'translate-y-0');

    if (toast._timer) clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
      toast.classList.remove('opacity-100', 'translate-y-0');
    }, 2800);
  }

  function setOverlayLoading(show, message) {
    const overlay = document.getElementById('pdf-checker-loading-overlay');
    const label = document.getElementById('pdf-checker-loading-msg');
    if (!overlay) return;
    state.isLoading = show;
    if (show) {
      if (label && message) label.textContent = message;
      overlay.classList.remove('hidden');
      overlay.classList.add('flex');
    } else {
      overlay.classList.remove('flex');
      overlay.classList.add('hidden');
    }
  }

  // ── Modal Open / Close / Deep Link ────────────────────────
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
      initPdfChecker();
      state.isInitialized = true;
    } else if (state.canvas) {
      setTimeout(() => {
        resizeCanvasViewport();
        if (state.pages.length > 0) {
          fitToScreen();
        }
      }, 50);
    }
  }

  function closePdfCheckerModal() {
    const modal = document.getElementById('pdf-checker');
    if (!modal) return;

    modal.classList.remove('flex');
    modal.classList.add('hidden');
    document.body.style.overflow = '';

    const aliases = ['#pdf-checker', '#pdf-marking', '#drawing-checker', '#pdf-jpg-checker', '#pdfchecker'];
    if (aliases.includes(window.location.hash)) {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  // ── Canvas Initialization ─────────────────────────────────
  function initPdfChecker() {
    const canvasEl = document.getElementById('pdf-checker-canvas');
    const container = document.getElementById('pdf-checker-canvas-container');
    if (!canvasEl || !container) return;

    // Initialize Fabric.js
    state.canvas = new fabric.Canvas('pdf-checker-canvas', {
      selection: true,
      preserveObjectStacking: true,
      fireRightClick: true,
      stopContextMenu: true,
      enableRetinaScaling: false // We control High-DPI scaling directly for maximum sharpness
    });

    resizeCanvasViewport();
    window.addEventListener('resize', () => {
      if (document.getElementById('pdf-checker') && !document.getElementById('pdf-checker').classList.contains('hidden')) {
        resizeCanvasViewport();
      }
    });

    bindCanvasEvents();
    bindToolbarEvents();
    bindKeyboardShortcuts();
    bindDragDropEvents();

    updateToolbarUI();
    updateZoomUI();
    renderEmptyState();
  }

  function resizeCanvasViewport() {
    const container = document.getElementById('pdf-checker-canvas-container');
    if (!container || !state.canvas) return;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;
    state.canvas.setWidth(width);
    state.canvas.setHeight(height);
    state.canvas.renderAll();
  }

  // ── Canvas Events (Zoom, Pan, Shapes) ─────────────────────
  function bindCanvasEvents() {
    const canvas = state.canvas;

    // ① Zoom: Strictly Ctrl + Wheel for Cursor-Centered Zoom; Normal Wheel scrolls
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
        updateZoomUI();
      } else {
        // Normal wheel: Pan viewport vertically / horizontally (Shift + Wheel)
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

      // Pan mode (or Space + Drag)
      if (state.isSpacePressed || state.currentTool === 'pan' || e.button === 1) {
        state.isPanning = true;
        canvas.selection = false;
        canvas.defaultCursor = 'grabbing';
        state.lastPanPoint = { x: e.clientX, y: e.clientY };
        return;
      }

      if (state.currentTool === 'select') {
        return;
      }

      // Shape / Text creation
      const pointer = canvas.getPointer(e);
      state.shapeStartPoint = { x: pointer.x, y: pointer.y };

      if (state.currentTool === 'text') {
        createTextAnnotation(pointer.x, pointer.y);
        setTool('select');
        return;
      }

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
      } else if (state.currentTool === 'arrow') {
        state.isDrawingShape = true;
        const line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
          stroke: state.strokeColor,
          strokeWidth: state.strokeWidth,
          strokeLineCap: 'round',
          selectable: true
        });
        state.activeShape = line;
        canvas.add(line);
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
      } else if (state.currentTool === 'arrow') {
        state.activeShape.set({ x2: pointer.x, y2: pointer.y });
        canvas.renderAll();
      }
    });

    // ④ Mouse Up
    canvas.on('mouse:up', function () {
      if (state.isPanning) {
        state.isPanning = false;
        canvas.setViewportTransform(canvas.viewportTransform); // Retain viewport stably
        canvas.defaultCursor = state.currentTool === 'pan' ? 'grab' : 'default';
        return;
      }

      if (state.isDrawingShape && state.activeShape) {
        state.isDrawingShape = false;

        // If shape is arrow, add arrowhead polygon to make a complete arrow group
        if (state.currentTool === 'arrow') {
          finalizeArrow(state.activeShape);
        }

        state.activeShape.setCoords();
        canvas.setActiveObject(state.activeShape);
        state.activeShape = null;
        pushUndo();
        setTool('select');
      }
    });

    // Object added via freehand drawing
    canvas.on('path:created', function () {
      pushUndo();
    });

    // Object modified / rotated / scaled
    canvas.on('object:modified', function () {
      pushUndo();
    });
  }

  function getFillColor(mode, strokeColor) {
    if (mode === 'solid') return strokeColor;
    if (mode === 'semi') {
      // 20% transparent highlight
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

  function finalizeArrow(line) {
    const x1 = line.x1;
    const y1 = line.y1;
    const x2 = line.x2;
    const y2 = line.y2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const angle = Math.atan2(dy, dx);
    const headLen = Math.max(14, state.strokeWidth * 3.5);

    state.canvas.remove(line);

    // Arrowhead points
    const arrowHead = new fabric.Triangle({
      left: x2,
      top: y2,
      pointType: 'arrow_head',
      originX: 'center',
      originY: 'center',
      angle: (angle * 180) / Math.PI + 90,
      width: headLen,
      height: headLen,
      fill: state.strokeColor
    });

    const stemLine = new fabric.Line([x1, y1, x2 - (Math.cos(angle) * headLen) / 2, y2 - (Math.sin(angle) * headLen) / 2], {
      stroke: state.strokeColor,
      strokeWidth: state.strokeWidth,
      strokeLineCap: 'round'
    });

    const arrowGroup = new fabric.Group([stemLine, arrowHead], {
      selectable: true,
      cornerColor: '#3b82f6',
      cornerSize: 8,
      transparentCorners: false
    });

    state.canvas.add(arrowGroup);
    state.activeShape = arrowGroup;
  }

  function createTextAnnotation(x, y) {
    const text = new fabric.IText('도면 검토 메모 입력', {
      left: x,
      top: y,
      fontFamily: 'Noto Sans KR, Inter, sans-serif',
      fontSize: state.fontSize,
      fill: state.strokeColor,
      backgroundColor: state.fillMode === 'semi' ? 'rgba(254, 240, 138, 0.85)' : 'transparent',
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

  // ── Tool Switching & Modes ────────────────────────────────
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

    updateToolbarUI();
  }

  function updateToolbarUI() {
    const tools = ['select', 'pan', 'text', 'rect', 'circle', 'pen', 'arrow'];
    tools.forEach((t) => {
      const btn = document.getElementById(`pdf-tool-${t}`);
      if (btn) {
        if (state.currentTool === t) {
          btn.classList.add('bg-indigo-600', 'text-white', 'shadow-md');
          btn.classList.remove('text-slate-400', 'hover:bg-slate-800');
        } else {
          btn.classList.remove('bg-indigo-600', 'text-white', 'shadow-md');
          btn.classList.add('text-slate-400', 'hover:bg-slate-800');
        }
      }
    });

    // Update active color indicator
    const colorPicker = document.getElementById('pdf-color-picker');
    if (colorPicker) colorPicker.value = state.strokeColor;

    // Update stroke width buttons/display
    const strokeIndicator = document.getElementById('pdf-stroke-indicator');
    if (strokeIndicator) strokeIndicator.textContent = state.strokeWidth + 'px';

    // Update fill mode indicator
    const fillBtn = document.getElementById('pdf-fill-toggle-btn');
    if (fillBtn) {
      if (state.fillMode === 'transparent') {
        fillBtn.setAttribute('title', '채우기: 투명 (선만 표시)');
        fillBtn.classList.remove('bg-slate-700', 'text-indigo-300');
      } else if (state.fillMode === 'semi') {
        fillBtn.setAttribute('title', '채우기: 20% 반투명 하이라이트');
        fillBtn.classList.add('bg-slate-700', 'text-indigo-300');
      } else {
        fillBtn.setAttribute('title', '채우기: 100% 완전 채움');
        fillBtn.classList.add('bg-indigo-900', 'text-white');
      }
    }
  }

  // ── Keyboard Shortcuts (With Text Box Isolation) ──────────
  function bindKeyboardShortcuts() {
    window.addEventListener('keydown', function (e) {
      const modal = document.getElementById('pdf-checker');
      if (!modal || modal.classList.contains('hidden')) return;

      // 텍스트 박스 타이핑 중에는 단축키 오작동 방지
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
        return;
      }
      const activeObj = state.canvas ? state.canvas.getActiveObject() : null;
      if (activeObj && activeObj.isEditing) {
        return;
      }

      // Space Pan key down
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

      // Delete active object
      if (e.key === 'Delete' || e.key === 'Del' || e.key === 'Backspace') {
        if (activeObj && !activeObj.isEditing) {
          e.preventDefault();
          deleteActiveObject();
          return;
        }
      }

      // Tool change keys: V, H, T, M, C, S, A
      if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        const k = e.key.toLowerCase();
        if (k === 'v') setTool('select');
        else if (k === 'h') setTool('pan');
        else if (k === 't') setTool('text');
        else if (k === 'm') setTool('rect');
        else if (k === 'c') setTool('circle');
        else if (k === 's') setTool('pen');
        else if (k === 'a') setTool('arrow');
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

  function deleteActiveObject() {
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

  // ── Undo / Redo History ───────────────────────────────────
  function getActivePageId() {
    const page = state.pages[state.currentPageIndex];
    return page ? page.id : null;
  }

  function pushUndo() {
    const pageId = getActivePageId();
    if (!pageId || !state.canvas) return;

    if (!state.history[pageId]) {
      state.history[pageId] = { undo: [], redo: [] };
    }

    const json = serializeCanvasAnnotations();
    state.history[pageId].undo.push(json);
    if (state.history[pageId].undo.length > 30) {
      state.history[pageId].undo.shift();
    }
    state.history[pageId].redo = []; // Clear redo stack on new action
  }

  function undo() {
    const pageId = getActivePageId();
    if (!pageId || !state.history[pageId] || state.history[pageId].undo.length === 0) return;

    const current = serializeCanvasAnnotations();
    state.history[pageId].redo.push(current);

    const prev = state.history[pageId].undo.pop();
    loadSerializedAnnotations(prev);
    showToast('실행 취소 (Undo)');
  }

  function redo() {
    const pageId = getActivePageId();
    if (!pageId || !state.history[pageId] || state.history[pageId].redo.length === 0) return;

    const current = serializeCanvasAnnotations();
    state.history[pageId].undo.push(current);

    const next = state.history[pageId].redo.pop();
    loadSerializedAnnotations(next);
    showToast('다시 실행 (Redo)');
  }

  function serializeCanvasAnnotations() {
    if (!state.canvas) return null;
    const objects = state.canvas.getObjects().filter((obj) => !obj.isBackgroundElement);
    return objects.map((obj) => obj.toObject(['id', 'pointType']));
  }

  function loadSerializedAnnotations(objectsData) {
    if (!state.canvas) return;
    // Clear only annotations (preserve background)
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

  // ── Zoom Controls ─────────────────────────────────────────
  function zoomIn() {
    if (!state.canvas) return;
    let zoom = state.canvas.getZoom() * 1.25;
    if (zoom > 25) zoom = 25;
    const center = { x: state.canvas.getWidth() / 2, y: state.canvas.getHeight() / 2 };
    state.canvas.zoomToPoint(center, zoom);
    state.zoom = zoom;
    updateZoomUI();
  }

  function zoomOut() {
    if (!state.canvas) return;
    let zoom = state.canvas.getZoom() / 1.25;
    if (zoom < 0.05) zoom = 0.05;
    const center = { x: state.canvas.getWidth() / 2, y: state.canvas.getHeight() / 2 };
    state.canvas.zoomToPoint(center, zoom);
    state.zoom = zoom;
    updateZoomUI();
  }

  function resetZoom() {
    if (!state.canvas) return;
    state.canvas.setZoom(1.0);
    state.canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
    state.canvas.renderAll();
    state.zoom = 1.0;
    updateZoomUI();
  }

  function fitToScreen() {
    if (!state.canvas || state.pages.length === 0) return;
    const page = state.pages[state.currentPageIndex];
    if (!page) return;

    const canvasWidth = state.canvas.getWidth();
    const canvasHeight = state.canvas.getHeight();
    const docWidth = page.renderWidth || page.width || 1200;
    const docHeight = page.renderHeight || page.height || 800;

    // Calculate scale with comfortable padding
    const padding = 40;
    const scaleX = (canvasWidth - padding) / docWidth;
    const scaleY = (canvasHeight - padding) / docHeight;
    const fitScale = Math.min(scaleX, scaleY, 2.0);

    const left = (canvasWidth - docWidth * fitScale) / 2;
    const top = (canvasHeight - docHeight * fitScale) / 2;

    state.canvas.setViewportTransform([fitScale, 0, 0, fitScale, left, top]);
    state.zoom = fitScale;
    updateZoomUI();
  }

  function updateZoomUI() {
    const label = document.getElementById('pdf-zoom-level-label');
    if (label) {
      label.textContent = Math.round(state.zoom * 100) + '%';
    }
  }

  // ── File Loading & Multi-Merge (Append) ───────────────────
  async function handleFiles(fileList, isAppend = false) {
    if (!fileList || fileList.length === 0) return;

    setOverlayLoading(true, '파일을 로드하고 고화질 도면을 렌더링하는 중입니다...');

    try {
      if (!isAppend) {
        // Clear previous state and revoke blob URLs to prevent memory leak
        clearCurrentSession();
      }

      const files = Array.from(fileList);
      let loadedCount = 0;

      for (const file of files) {
        const ext = file.name.split('.').pop().toLowerCase();

        if (ext === 'pdf') {
          await loadPdfFile(file);
          loadedCount++;
        } else if (['jpg', 'jpeg', 'png', 'webp', 'bmp'].includes(ext)) {
          await loadImageFile(file);
          loadedCount++;
        }
      }

      if (state.pages.length > 0) {
        renderSidebarThumbnails();
        await switchPage(isAppend ? state.pages.length - 1 : 0);
        showToast(`${loadedCount}개 파일이 성공적으로 로드되었습니다.`);
      } else {
        showToast('지원되는 PDF 또는 이미지 파일이 없습니다.');
      }
    } catch (err) {
      console.error('File load error:', err);
      showToast('파일을 불러오는 중 오류가 발생했습니다: ' + err.message);
    } finally {
      setOverlayLoading(false);
    }
  }

  function clearCurrentSession() {
    state.pages.forEach((p) => {
      if (p.blobUrl) URL.revokeObjectURL(p.blobUrl);
      if (p.thumbnail) URL.revokeObjectURL(p.thumbnail);
    });
    state.pages = [];
    state.annotations = {};
    state.history = {};
    state.currentPageIndex = 0;
    if (state.canvas) state.canvas.clear();
  }

  // Load PDF File via pdf.js
  async function loadPdfFile(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    // Check for re-editable annotations stored in metadata (/Subject)
    let reEditableMap = null;
    try {
      const meta = await pdfDoc.getMetadata();
      const subject = meta && meta.info ? meta.info.Subject : '';
      if (subject && subject.includes('DailyHelper-PDF-Checker')) {
        const pkg = JSON.parse(subject);
        if (pkg && pkg.pages) {
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
        title: `${file.name.replace(/\.pdf$/i, '')} - P.${pNum}`,
        arrayBuffer: arrayBuffer
      });

      // Restore annotation if available
      if (reEditableMap && reEditableMap[pNum - 1]) {
        state.annotations[pageId] = reEditableMap[pNum - 1];
      }
    }
  }

  // Load Image File (JPG, PNG, WebP)
  async function loadImageFile(file) {
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
      widthPt: (img.naturalWidth * 72) / 150, // Approx 150 DPI pt size
      heightPt: (img.naturalHeight * 72) / 150,
      fileName: file.name,
      title: file.name
    });
  }

  // ── High-DPI Rendering & Page Switch ──────────────────────
  async function switchPage(index) {
    if (index < 0 || index >= state.pages.length) return;

    // 1. Save current page annotations
    saveCurrentPageAnnotations();

    state.currentPageIndex = index;
    const page = state.pages[index];

    setOverlayLoading(true, `페이지 ${index + 1} / ${state.pages.length} 렌더링 중...`);

    try {
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

      // Fit to screen on initial page switch
      fitToScreen();
      updatePageInfoBar(page);
      highlightActiveThumbnail(index);
    } catch (err) {
      console.error('Page render error:', err);
      showToast('페이지 렌더링 오류: ' + err.message);
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

  // Render PDF page to canvas background with High-DPI 2.5~3.0x scale and 3840px 4K limit
  async function renderPdfPageBackground(pageData) {
    const pdfPage = await pageData.pdfDoc.getPage(pageData.pageNum);
    const unscaledVp = pdfPage.getViewport({ scale: 1.0 });

    // High-DPI Scale calculation: 2.5x ~ 3.0x, capped at 3840px on longest edge
    const maxDimension = Math.max(unscaledVp.width, unscaledVp.height);
    let scale = Math.min(3.0, 3840 / maxDimension);
    if (scale < 2.0) scale = 2.0;

    const viewport = pdfPage.getViewport({ scale: scale });
    pageData.renderWidth = Math.round(viewport.width);
    pageData.renderHeight = Math.round(viewport.height);

    // Render to offscreen canvas
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = pageData.renderWidth;
    offscreenCanvas.height = pageData.renderHeight;
    const ctx = offscreenCanvas.getContext('2d', { alpha: false });

    await pdfPage.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;

    // Convert to Image and set as background
    const bgImgUrl = offscreenCanvas.toDataURL('image/jpeg', 0.9);
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

    // Cleanup offscreen memory
    offscreenCanvas.width = 0;
    offscreenCanvas.height = 0;
  }

  // Render Image file to canvas background with 3840px cap
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

  function updatePageInfoBar(page) {
    const pageIndexEl = document.getElementById('pdf-current-page-indicator');
    const resEl = document.getElementById('pdf-current-resolution-indicator');
    if (pageIndexEl) {
      pageIndexEl.textContent = `${state.currentPageIndex + 1} / ${state.pages.length}`;
    }
    if (resEl) {
      resEl.textContent = `${page.renderWidth} × ${page.renderHeight} px (High-DPI)`;
    }
  }

  // ── Sidebar Thumbnails & Navigation ───────────────────────
  function renderSidebarThumbnails() {
    const listEl = document.getElementById('pdf-thumbnails-list');
    const emptyNotice = document.getElementById('pdf-empty-sidebar-notice');
    const countBadge = document.getElementById('pdf-pages-count-badge');
    if (!listEl) return;

    if (state.pages.length === 0) {
      listEl.innerHTML = '';
      if (emptyNotice) emptyNotice.classList.remove('hidden');
      if (countBadge) countBadge.textContent = '0';
      renderEmptyState();
      return;
    }

    if (emptyNotice) emptyNotice.classList.add('hidden');
    if (countBadge) countBadge.textContent = String(state.pages.length);

    hideEmptyState();

    let html = '';
    state.pages.forEach((page, i) => {
      const isActive = i === state.currentPageIndex;
      html += `
        <div class="pdf-thumb-card group relative p-2 rounded-xl transition-all cursor-pointer border ${
          isActive
            ? 'bg-indigo-950/60 border-indigo-500 shadow-lg shadow-indigo-500/20'
            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
        }" onclick="window.PdfChecker.switchPage(${i})">
          <div class="flex items-center justify-between gap-1 mb-1.5 text-xs">
            <span class="font-bold ${isActive ? 'text-indigo-400' : 'text-slate-300'}">P.${i + 1}</span>
            <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              ${
                i > 0
                  ? `<button type="button" class="p-1 hover:text-white text-slate-400" title="위로 이동" onclick="event.stopPropagation(); window.PdfChecker.movePage(${i}, -1)">▲</button>`
                  : ''
              }
              ${
                i < state.pages.length - 1
                  ? `<button type="button" class="p-1 hover:text-white text-slate-400" title="아래로 이동" onclick="event.stopPropagation(); window.PdfChecker.movePage(${i}, 1)">▼</button>`
                  : ''
              }
              <button type="button" class="p-1 hover:text-red-400 text-slate-400" title="페이지 삭제" onclick="event.stopPropagation(); window.PdfChecker.deletePage(${i})">🗑️</button>
            </div>
          </div>
          <div class="w-full h-28 bg-slate-950 rounded-lg overflow-hidden border border-slate-800/80 flex items-center justify-center relative">
            <div id="thumb-preview-${page.id}" class="w-full h-full flex items-center justify-center text-slate-600 text-xs">
              <span class="animate-pulse">Loading...</span>
            </div>
          </div>
          <div class="mt-1.5 text-[11px] text-slate-400 truncate" title="${page.title}">${page.title}</div>
        </div>`;
    });
    listEl.innerHTML = html;

    // Generate thumbnails asynchronously
    generateThumbnails();
  }

  async function generateThumbnails() {
    for (let i = 0; i < state.pages.length; i++) {
      const page = state.pages[i];
      const previewEl = document.getElementById(`thumb-preview-${page.id}`);
      if (!previewEl) continue;

      if (page.thumbnailUrl) {
        previewEl.innerHTML = `<img src="${page.thumbnailUrl}" class="w-full h-full object-contain" alt="P.${i + 1}">`;
        continue;
      }

      if (page.type === 'pdf') {
        try {
          const pdfPage = await page.pdfDoc.getPage(page.pageNum);
          const vp = pdfPage.getViewport({ scale: 0.22 });
          const offCanvas = document.createElement('canvas');
          offCanvas.width = vp.width;
          offCanvas.height = vp.height;
          const ctx = offCanvas.getContext('2d');
          await pdfPage.render({ canvasContext: ctx, viewport: vp }).promise;
          page.thumbnailUrl = offCanvas.toDataURL('image/jpeg', 0.7);
          previewEl.innerHTML = `<img src="${page.thumbnailUrl}" class="w-full h-full object-contain" alt="P.${i + 1}">`;
          offCanvas.width = 0;
          offCanvas.height = 0;
        } catch (_) {}
      } else if (page.type === 'image') {
        page.thumbnailUrl = page.blobUrl;
        previewEl.innerHTML = `<img src="${page.blobUrl}" class="w-full h-full object-contain" alt="P.${i + 1}">`;
      }
    }
  }

  function highlightActiveThumbnail(index) {
    const listEl = document.getElementById('pdf-thumbnails-list');
    if (!listEl) return;
    const cards = listEl.querySelectorAll('.pdf-thumb-card');
    cards.forEach((card, idx) => {
      if (idx === index) {
        card.className =
          'pdf-thumb-card group relative p-2 rounded-xl transition-all cursor-pointer border bg-indigo-950/60 border-indigo-500 shadow-lg shadow-indigo-500/20';
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        card.className =
          'pdf-thumb-card group relative p-2 rounded-xl transition-all cursor-pointer border bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850';
      }
    });
  }

  function movePage(index, dir) {
    const targetIdx = index + dir;
    if (targetIdx < 0 || targetIdx >= state.pages.length) return;

    saveCurrentPageAnnotations();
    const temp = state.pages[index];
    state.pages[index] = state.pages[targetIdx];
    state.pages[targetIdx] = temp;

    if (state.currentPageIndex === index) {
      state.currentPageIndex = targetIdx;
    } else if (state.currentPageIndex === targetIdx) {
      state.currentPageIndex = index;
    }

    renderSidebarThumbnails();
    switchPage(state.currentPageIndex);
    showToast('페이지 순서가 변경되었습니다.');
  }

  function deletePage(index) {
    if (state.pages.length <= 1) {
      if (confirm('마지막 페이지입니다. 모든 페이지를 지우고 초기화하시겠습니까?')) {
        clearCurrentSession();
        renderSidebarThumbnails();
        renderEmptyState();
        showToast('작업 캔버스가 초기화되었습니다.');
      }
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

    renderSidebarThumbnails();
    switchPage(state.currentPageIndex);
    showToast('페이지가 삭제되었습니다.');
  }

  // ── High-Quality Optimized PDF Export (50MB -> 5~7MB) ─────
  async function exportHighResPdf() {
    if (state.pages.length === 0) {
      showToast('내보낼 도면이나 문서가 없습니다. 먼저 파일을 불러와주세요.');
      return;
    }

    saveCurrentPageAnnotations();
    setOverlayLoading(true, '고화질 최적화 PDF를 생성하고 마킹 데이터를 합성 중입니다...');

    try {
      const { PDFDocument } = window.PDFLib;
      const outDoc = await PDFDocument.create();

      // Package re-editable annotations into PDF Subject metadata
      const reEditablePackage = {
        format: 'DailyHelper-PDF-Checker',
        version: 1,
        createdAt: new Date().toISOString(),
        pages: []
      };

      for (let i = 0; i < state.pages.length; i++) {
        const pageData = state.pages[i];
        setOverlayLoading(true, `고화질 합성 인코딩 중... (${i + 1} / ${state.pages.length})`);

        // 1. Prepare 1:1 offscreen composite canvas
        const offCanvas = document.createElement('canvas');
        let width = pageData.renderWidth || 2400;
        let height = pageData.renderHeight || 1600;

        // Longest side 4K cap
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
          // Render annotations via temporary fabric static canvas
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

          // Composite annotations over background
          ctx.drawImage(tempFabricCanvas.lowerCanvasEl, 0, 0);
          tempFabricCanvas.dispose();
        }

        // 2. High-quality JPEG compression encoding (Quality 86% -> 50MB reduced to 5~7MB)
        const jpgDataUrl = offCanvas.toDataURL('image/jpeg', 0.86);
        const jpgBytes = await fetch(jpgDataUrl).then((res) => res.arrayBuffer());

        // Embed in PDF document
        const embeddedImage = await outDoc.embedJpg(jpgBytes);

        // Determine PDF page point dimensions
        const ptWidth = pageData.widthPt || (width * 72) / 150;
        const ptHeight = pageData.heightPt || (height * 72) / 150;

        const newPdfPage = outDoc.addPage([ptWidth, ptHeight]);
        newPdfPage.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width: ptWidth,
          height: ptHeight
        });

        // Save annotation serialized data
        reEditablePackage.pages.push(pageAnnotations || []);

        // Free offscreen canvas memory
        offCanvas.width = 0;
        offCanvas.height = 0;
      }

      // Metadata serialization (Embeds re-editable annotations inside PDF)
      outDoc.setSubject(JSON.stringify(reEditablePackage));
      outDoc.setKeywords(['DH_ANNOTATIONS_V1', 'DAILYHELPER_PDF_CHECKER']);
      outDoc.setProducer('DailyHelper PDF & Drawing Checker v1.0');

      const finalPdfBytes = await outDoc.save();

      // Trigger download
      const blob = new Blob([finalPdfBytes], { type: 'application/pdf' });
      const downloadUrl = URL.createObjectURL(blob);
      const fileName = `도면검토_마킹완료_${new Date().toISOString().slice(0, 10)}.pdf`;

      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => URL.revokeObjectURL(downloadUrl), 10000); // Prevent memory leak

      showToast('고화질 최적화 PDF가 성공적으로 다운로드되었습니다!');
    } catch (err) {
      console.error('Export error:', err);
      showToast('PDF 내보내기 실패: ' + err.message);
    } finally {
      setOverlayLoading(false);
    }
  }

  // ── Sample Blueprint Generator (Instant Wow Experience) ───
  async function loadSampleBlueprint() {
    setOverlayLoading(true, '초고해상도 샘플 건축 도면을 생성 중입니다...');

    try {
      const width = 3508; // A3 High-DPI Landscape (300 DPI equivalent)
      const height = 2480;

      const offCanvas = document.createElement('canvas');
      offCanvas.width = width;
      offCanvas.height = height;
      const ctx = offCanvas.getContext('2d');

      // 1. Drawing paper background (Clean Blueprint Grid)
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 50) {
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
      ctx.fillRect(width - 700, height - 320, 620, 240);
      ctx.strokeRect(width - 700, height - 320, 620, 240);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Noto Sans KR", sans-serif';
      ctx.fillText('SAMPLE ARCHITECTURAL PLAN (SAMPLE-A3)', width - 680, height - 250);
      ctx.font = '24px "Noto Sans KR", sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('PROJECT: DAILY HELPER HEADQUARTERS 3F', width - 680, height - 200);
      ctx.fillText('SCALE: 1:100  |  DATE: 2026. 10  |  REV: 02', width - 680, height - 150);
      ctx.fillText('ENGINEER: WG DESIGN STUDIO (CLIENT REVIEW)', width - 680, height - 105);

      // 3. Walls & Partitions (외벽 & 내벽)
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 8;
      ctx.strokeRect(300, 300, 2400, 1600); // Main outline

      // Interior rooms
      ctx.lineWidth = 5;
      ctx.beginPath();
      // Room 1 (Executive Room)
      ctx.moveTo(300, 900);
      ctx.lineTo(1300, 900);
      ctx.moveTo(1300, 300);
      ctx.lineTo(1300, 900);

      // Room 2 (Conference Room)
      ctx.moveTo(1300, 750);
      ctx.lineTo(2100, 750);
      ctx.moveTo(2100, 300);
      ctx.lineTo(2100, 1100);

      // Room 3 (Lobby & Open Workspace)
      ctx.moveTo(1300, 1400);
      ctx.lineTo(2700, 1400);
      ctx.stroke();

      // Dimension Lines & Annotations (치수선)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 22px monospace';

      // Top dimension
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
      ctx.font = 'bold 32px "Noto Sans KR", sans-serif';
      ctx.fillText('대회의실 (MAIN CONFERENCE ROOM)', 1400, 520);
      ctx.fillText('임원 집무실 (EXECUTIVE SUITE)', 550, 600);
      ctx.fillText('오픈 스마트 오피스 (OPEN LAB)', 700, 1300);
      ctx.fillText('휴게 라운지 (PANTRY & LOUNGE)', 2200, 800);

      const blob = await new Promise((res) => offCanvas.toBlob(res, 'image/jpeg', 0.95));
      const blobUrl = URL.createObjectURL(blob);

      clearCurrentSession();
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
        fileName: 'Sample_FloorPlan_A3.jpg',
        title: '샘플 도면 (3F 건축 평면도)'
      });

      renderSidebarThumbnails();
      await switchPage(0);

      // Add pre-loaded sample markup to wow the user
      setTimeout(() => {
        addSampleDemoMarkups();
      }, 300);

      showToast('초고화질 샘플 도면이 로드되었습니다! 마킹 도구를 체험해보세요.');
    } catch (err) {
      console.error(err);
      showToast('샘플 도면 로드 오류');
    } finally {
      setOverlayLoading(false);
    }
  }

  function addSampleDemoMarkups() {
    if (!state.canvas) return;

    // 1. Red Review Rectangle on Conference Room
    const rect = new fabric.Rect({
      left: 1380,
      top: 450,
      width: 680,
      height: 250,
      stroke: '#ef4444',
      strokeWidth: 5,
      fill: 'rgba(239, 68, 68, 0.12)',
      cornerColor: '#3b82f6',
      cornerSize: 8,
      selectable: true
    });

    // 2. Text Box with review note
    const text = new fabric.IText('도면 검토 의견: 빔프로젝터 배선 위치 확인 요망 (REV 02)', {
      left: 1400,
      top: 400,
      fontFamily: 'Noto Sans KR, sans-serif',
      fontSize: 26,
      fill: '#ef4444',
      backgroundColor: 'rgba(254, 240, 138, 0.9)',
      padding: 6,
      selectable: true
    });

    // 3. Arrow pointing to Executive door
    const line = new fabric.Line([950, 850, 1150, 950], {
      stroke: '#3b82f6',
      strokeWidth: 4,
      strokeLineCap: 'round'
    });
    const head = new fabric.Triangle({
      left: 1150,
      top: 950,
      width: 18,
      height: 18,
      fill: '#3b82f6',
      angle: 65,
      originX: 'center',
      originY: 'center'
    });
    const arrow = new fabric.Group([line, head], { selectable: true });

    state.canvas.add(rect, text, arrow);
    state.canvas.renderAll();
    pushUndo();
  }

  // ── Drag & Drop Events ────────────────────────────────────
  function bindDragDropEvents() {
    const modal = document.getElementById('pdf-checker');
    const dropzone = document.getElementById('pdf-checker-dropzone-overlay');
    if (!modal) return;

    ['dragenter', 'dragover'].forEach((eventName) => {
      modal.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (dropzone) dropzone.classList.remove('hidden');
      });
    });

    ['dragleave', 'drop'].forEach((eventName) => {
      modal.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target === dropzone || eventName === 'drop') {
          if (dropzone) dropzone.classList.add('hidden');
        }
      });
    });

    modal.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (dropzone) dropzone.classList.add('hidden');

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        // If we already have pages, append new files to preserve existing markups!
        const isAppend = state.pages.length > 0;
        handleFiles(files, isAppend);
      }
    });
  }

  // ── Toolbar Event Bindings ────────────────────────────────
  function bindToolbarEvents() {
    // Tool buttons
    const tools = ['select', 'pan', 'text', 'rect', 'circle', 'pen', 'arrow'];
    tools.forEach((t) => {
      const btn = document.getElementById(`pdf-tool-${t}`);
      if (btn) btn.addEventListener('click', () => setTool(t));
    });

    // Color picker & Quick color presets
    const colorPicker = document.getElementById('pdf-color-picker');
    if (colorPicker) {
      colorPicker.addEventListener('input', (e) => {
        state.strokeColor = e.target.value;
        applyStyleToActiveObject();
        updateToolbarUI();
      });
    }

    document.querySelectorAll('.pdf-color-preset-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const color = btn.getAttribute('data-color');
        if (color) {
          state.strokeColor = color;
          applyStyleToActiveObject();
          updateToolbarUI();
        }
      });
    });

    // Stroke width buttons
    document.querySelectorAll('.pdf-stroke-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const width = parseInt(btn.getAttribute('data-width'), 10);
        if (width) {
          state.strokeWidth = width;
          applyStyleToActiveObject();
          updateToolbarUI();
        }
      });
    });

    // Fill mode toggle
    const fillBtn = document.getElementById('pdf-fill-toggle-btn');
    if (fillBtn) {
      fillBtn.addEventListener('click', () => {
        if (state.fillMode === 'transparent') state.fillMode = 'semi';
        else if (state.fillMode === 'semi') state.fillMode = 'solid';
        else state.fillMode = 'transparent';
        applyStyleToActiveObject();
        updateToolbarUI();
        showToast(
          state.fillMode === 'transparent'
            ? '채우기: 투명 (선만 표시)'
            : state.fillMode === 'semi'
            ? '채우기: 20% 반투명 하이라이트'
            : '채우기: 100% 완전 채움'
        );
      });
    }

    // Font size selector
    const fontSelect = document.getElementById('pdf-font-size-select');
    if (fontSelect) {
      fontSelect.addEventListener('change', (e) => {
        state.fontSize = parseInt(e.target.value, 10);
        const activeObj = state.canvas ? state.canvas.getActiveObject() : null;
        if (activeObj && activeObj.type === 'i-text') {
          activeObj.set('fontSize', state.fontSize);
          state.canvas.renderAll();
          pushUndo();
        }
      });
    }

    // Action buttons
    const undoBtn = document.getElementById('pdf-undo-btn');
    if (undoBtn) undoBtn.addEventListener('click', undo);

    const redoBtn = document.getElementById('pdf-redo-btn');
    if (redoBtn) redoBtn.addEventListener('click', redo);

    const delBtn = document.getElementById('pdf-delete-obj-btn');
    if (delBtn) delBtn.addEventListener('click', deleteActiveObject);

    const clearPageBtn = document.getElementById('pdf-clear-page-btn');
    if (clearPageBtn) {
      clearPageBtn.addEventListener('click', () => {
        if (confirm('현재 페이지의 모든 마킹을 지우시겠습니까?')) {
          loadSerializedAnnotations([]);
          pushUndo();
          showToast('현재 페이지의 마킹이 초기화되었습니다.');
        }
      });
    }

    // Zoom buttons
    const zoomInBtn = document.getElementById('pdf-zoom-in-btn');
    if (zoomInBtn) zoomInBtn.addEventListener('click', zoomIn);

    const zoomOutBtn = document.getElementById('pdf-zoom-out-btn');
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', zoomOut);

    const zoomFitBtn = document.getElementById('pdf-zoom-fit-btn');
    if (zoomFitBtn) zoomFitBtn.addEventListener('click', fitToScreen);

    const zoomResetBtn = document.getElementById('pdf-zoom-reset-btn');
    if (zoomResetBtn) zoomResetBtn.addEventListener('click', resetZoom);

    // Export PDF button
    const exportBtn = document.getElementById('pdf-export-btn');
    if (exportBtn) exportBtn.addEventListener('click', exportHighResPdf);

    // Close button
    const closeBtn = document.getElementById('pdf-modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closePdfCheckerModal);

    // File input trigger (New / Append)
    const fileInput = document.getElementById('pdf-checker-file-input');
    const openFileBtn = document.getElementById('pdf-open-file-btn');
    const addFileBtn = document.getElementById('pdf-add-files-btn');
    const sidebarAddBtn = document.getElementById('pdf-sidebar-add-btn');
    const emptySelectBtn = document.getElementById('pdf-empty-select-btn');

    let appendFlag = false;

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          handleFiles(e.target.files, appendFlag);
          e.target.value = '';
        }
      });
    }

    if (openFileBtn) {
      openFileBtn.addEventListener('click', () => {
        appendFlag = false;
        if (fileInput) fileInput.click();
      });
    }

    if (addFileBtn) {
      addFileBtn.addEventListener('click', () => {
        appendFlag = true;
        if (fileInput) fileInput.click();
      });
    }

    if (sidebarAddBtn) {
      sidebarAddBtn.addEventListener('click', () => {
        appendFlag = true;
        if (fileInput) fileInput.click();
      });
    }

    if (emptySelectBtn) {
      emptySelectBtn.addEventListener('click', () => {
        appendFlag = false;
        if (fileInput) fileInput.click();
      });
    }

    // Sample button
    const sampleBtn = document.getElementById('pdf-sample-load-btn');
    if (sampleBtn) sampleBtn.addEventListener('click', loadSampleBlueprint);

    // Sidebar toggle button
    const sidebarToggleBtn = document.getElementById('pdf-sidebar-toggle-btn');
    const sidebar = document.getElementById('pdf-checker-sidebar');
    if (sidebarToggleBtn && sidebar) {
      sidebarToggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
        setTimeout(() => resizeCanvasViewport(), 50);
      });
    }
  }

  function applyStyleToActiveObject() {
    if (!state.canvas) return;
    const activeObj = state.canvas.getActiveObject();
    if (!activeObj) return;

    if (activeObj.type === 'i-text') {
      activeObj.set({
        fill: state.strokeColor,
        backgroundColor: state.fillMode === 'semi' ? 'rgba(254, 240, 138, 0.9)' : 'transparent'
      });
    } else {
      activeObj.set({
        stroke: state.strokeColor,
        strokeWidth: state.strokeWidth,
        fill: getFillColor(state.fillMode, state.strokeColor)
      });
    }
    state.canvas.renderAll();
    pushUndo();
  }

  function renderEmptyState() {
    const emptyEl = document.getElementById('pdf-empty-workspace');
    if (emptyEl) emptyEl.classList.remove('hidden');
  }

  function hideEmptyState() {
    const emptyEl = document.getElementById('pdf-empty-workspace');
    if (emptyEl) emptyEl.classList.add('hidden');
  }

  // ── Public Global Bindings ────────────────────────────────
  window.openPdfCheckerModal = openPdfCheckerModal;
  window.closePdfCheckerModal = closePdfCheckerModal;

  window.PdfChecker = {
    open: openPdfCheckerModal,
    close: closePdfCheckerModal,
    switchPage: switchPage,
    movePage: movePage,
    deletePage: deletePage,
    exportPdf: exportHighResPdf,
    loadSample: loadSampleBlueprint,
    setTool: setTool,
    undo: undo,
    redo: redo,
    state: state
  };

  // Immediate deep link listener for #pdf-checker
  function checkHashOnLoad() {
    const aliases = ['#pdf-checker', '#pdf-marking', '#drawing-checker', '#pdf-jpg-checker', '#pdfchecker', '#도면검토', '#pdf검토'];
    if (aliases.includes(window.location.hash)) {
      setTimeout(openPdfCheckerModal, 60);
    }
  }

  window.addEventListener('hashchange', checkHashOnLoad);
  window.addEventListener('DOMContentLoaded', checkHashOnLoad);
})();
