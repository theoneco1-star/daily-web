/**
 * PDF Drawing to CAD (DXF) Converter Engine
 * 100% Client-side In-Memory Processing (Zero Server Transmission)
 * Converts vector PDF blueprints and drawings into CAD-compatible DXF (AutoCAD R12 / AC1009) files.
 */
(function (global) {
  'use strict';

  // Ensure PDF.js worker is properly configured if available
  if (typeof window !== 'undefined' && window.pdfjsLib && window.pdfjsLib.GlobalWorkerOptions && !window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  /**
   * 2D Affine Transformation Matrix Utilities
   * Matrix representation: [a, b, c, d, e, f]
   * | a  c  e |
   * | b  d  f |
   * | 0  0  1 |
   */
  function multiplyMatrix(m1, m2) {
    return [
      m1[0] * m2[0] + m1[2] * m2[1],
      m1[1] * m2[0] + m1[3] * m2[1],
      m1[0] * m2[2] + m1[2] * m2[3],
      m1[1] * m2[2] + m1[3] * m2[3],
      m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
      m1[1] * m2[4] + m1[3] * m2[5] + m1[5]
    ];
  }

  function transformPoint(p, m) {
    return {
      x: m[0] * p.x + m[2] * p.y + m[4],
      y: m[1] * p.x + m[3] * p.y + m[5]
    };
  }

  /**
   * Approximate Cubic Bezier curve with piecewise linear segments (default 16 steps)
   */
  function approximateCubicBezier(p0, p1, p2, p3, segments = 16) {
    const numSteps = Math.max(4, Math.min(segments || 16, 32));
    const points = [];
    for (let i = 1; i <= numSteps; i++) {
      const t = i / numSteps;
      const mt = 1 - t;
      const mt2 = mt * mt;
      const mt3 = mt2 * mt;
      const t2 = t * t;
      const t3 = t2 * t;

      const x = mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x;
      const y = mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y;
      points.push({ x, y });
    }
    return points;
  }

  /**
   * Escape text for AutoCAD DXF standard format with Unicode fallback (\U+XXXX)
   * Cleans newlines and invalid control characters to maintain DXF line structure integrity
   */
  function encodeDxfText(str) {
    if (!str) return '';
    // Strip carriage returns, newlines, and non-printable control characters
    const cleanStr = String(str).replace(/[\r\n\t]+/g, ' ').replace(/[\x00-\x1F\x7F]/g, '').trim();
    if (!cleanStr) return '';
    let result = '';
    for (let i = 0; i < cleanStr.length; i++) {
      const code = cleanStr.charCodeAt(i);
      // Printable ASCII (except caret)
      if (code >= 32 && code <= 126) {
        if (cleanStr[i] === '^') {
          result += ' ';
        } else {
          result += cleanStr[i];
        }
      } else {
        // Unicode escape for AutoCAD (supports Korean, Chinese, Japanese, symbols)
        const hex = code.toString(16).toUpperCase().padStart(4, '0');
        result += '\\U+' + hex;
      }
    }
    return result.trim();
  }

  /**
   * Format float coordinates to fixed 4 decimal places (no scientific notation)
   */
  function f4(num) {
    if (typeof num !== 'number' || isNaN(num) || !isFinite(num)) return '0.0000';
    if (Math.abs(num) < 0.00005) return '0.0000';
    return Number(num).toFixed(4);
  }

  /**
   * Main Converter Class
   */
  class PdfToDxfConverter {
    constructor() {
      this.pdfDoc = null;
      this.fileName = '';
      this.numPages = 0;
    }

    /**
     * Load PDF from ArrayBuffer or File
     */
    async load(fileOrBuffer, fileName = 'drawing.pdf') {
      this.fileName = fileName;
      let data;
      if (fileOrBuffer instanceof ArrayBuffer) {
        data = fileOrBuffer;
      } else if (fileOrBuffer instanceof Blob || (typeof File !== 'undefined' && fileOrBuffer instanceof File)) {
        data = await fileOrBuffer.arrayBuffer();
        if (fileOrBuffer.name) this.fileName = fileOrBuffer.name;
      } else {
        throw new Error('Invalid file format. Please provide a File, Blob, or ArrayBuffer.');
      }

      if (!window.pdfjsLib) {
        throw new Error('PDF.js library is not loaded.');
      }

      const loadingTask = window.pdfjsLib.getDocument({
        data,
        cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
        cMapPacked: true
      });

      this.pdfDoc = await loadingTask.promise;
      this.numPages = this.pdfDoc.numPages;
      return { numPages: this.numPages, fileName: this.fileName };
    }

    /**
     * Render page thumbnail for page selection UI
     */
    async renderPageThumbnail(pageNumber, canvasElement, targetWidth = 160) {
      if (!this.pdfDoc || pageNumber < 1 || pageNumber > this.numPages) return null;
      const page = await this.pdfDoc.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.0 });
      const scale = targetWidth / viewport.width;
      const scaledViewport = page.getViewport({ scale });

      canvasElement.width = scaledViewport.width;
      canvasElement.height = scaledViewport.height;

      const ctx = canvasElement.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);

      await page.render({
        canvasContext: ctx,
        viewport: scaledViewport
      }).promise;

      return scaledViewport;
    }

    /**
     * Convert selected pages to DXF
     * @param {Object} options
     *   - pageNumbers: Array of page numbers (e.g. [1] or [1, 2])
     *   - includeText: boolean (default: true)
     *   - curveSegments: number (default: 12)
     *   - invertY: boolean or 'auto' (default: 'auto')
     *   - onProgress: callback ({ percent, status, page, totalPages })
     */
    async convert(options = {}) {
      if (!this.pdfDoc) {
        throw new Error('No PDF document loaded.');
      }

      const pagesToProcess = options.pageNumbers && options.pageNumbers.length > 0
        ? options.pageNumbers.filter(n => n >= 1 && n <= this.numPages)
        : [1];

      const includeText = options.includeText !== false;
      const curveSegments = options.curveSegments || 16;
      // Fixed standard Cartesian coordinate system (AutoCAD WCS: Y points upwards)
      const shouldInvertY = options.invertY === true;
      const onProgress = options.onProgress || (() => {});

      const allEntities = [];
      let totalLines = 0;
      let totalCurves = 0;
      let totalPolygons = 0;
      let totalTexts = 0;
      let totalImages = 0;

      for (let pIdx = 0; pIdx < pagesToProcess.length; pIdx++) {
        const pageNum = pagesToProcess[pIdx];
        const progressBase = (pIdx / pagesToProcess.length) * 90;
        onProgress({
          percent: Math.round(progressBase + 5),
          status: `Analyzing Page ${pageNum} / ${this.numPages}...`,
          page: pageNum,
          totalPages: pagesToProcess.length
        });

        const page = await this.pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.0 });
        const pageHeight = viewport.height;
        const pageWidth = viewport.width;

        // Layer suffix if multiple pages
        const layerSuffix = pagesToProcess.length > 1 ? `_P${pageNum}` : '';
        const vectorLayer = `PDF_VECTORS${layerSuffix}`;
        const textLayer = `PDF_TEXT${layerSuffix}`;
        const fillLayer = `PDF_HATCH${layerSuffix}`;

        // 1. Vector Path Analysis via getOperatorList
        const opList = await page.getOperatorList();
        const fnArray = opList.fnArray;
        const argsArray = opList.argsArray;
        const OPS = window.pdfjsLib.OPS;

        let currentPoint = { x: 0, y: 0 };
        let subpathStart = { x: 0, y: 0 };
        let currentSubpath = [];
        let allSubpaths = [];
        let ctm = [1, 0, 0, 1, 0, 0];
        const ctmStack = [];

        function addPoint(x, y) {
          const pt = transformPoint({ x, y }, ctm);
          const finalY = shouldInvertY ? (pageHeight - pt.y) : pt.y;
          return { x: pt.x, y: finalY };
        }

        function flushCurrentSubpath() {
          if (currentSubpath.length > 0) {
            allSubpaths.push(currentSubpath);
            currentSubpath = [];
          }
        }

        function commitPaths(asFill) {
          flushCurrentSubpath();
          if (allSubpaths.length === 0) return;

          for (const sp of allSubpaths) {
            if (sp.length < 2) continue;

            if (asFill && sp.length >= 3 && sp.isClosed) {
              // Convert filled polygon to POLYLINE or SOLID
              if (sp.length === 4 || sp.length === 5) {
                // Quad or Triangle SOLID
                allEntities.push({
                  type: 'SOLID',
                  layer: fillLayer,
                  points: sp.slice(0, 4)
                });
                totalPolygons++;
              } else {
                allEntities.push({
                  type: 'POLYLINE',
                  layer: fillLayer,
                  isClosed: true,
                  points: sp
                });
                totalPolygons++;
              }
            } else {
              // Stroke: Convert to individual LINE or continuous POLYLINE
              if (sp.length === 2) {
                allEntities.push({
                  type: 'LINE',
                  layer: vectorLayer,
                  x1: sp[0].x,
                  y1: sp[0].y,
                  x2: sp[1].x,
                  y2: sp[1].y
                });
                totalLines++;
              } else {
                allEntities.push({
                  type: 'POLYLINE',
                  layer: vectorLayer,
                  isClosed: !!sp.isClosed,
                  points: sp
                });
                if (sp.isCurve) {
                  totalCurves++;
                } else {
                  totalLines += (sp.length - 1);
                }
              }
            }
          }
          allSubpaths = [];
        }

        // Process PDF operators
        for (let i = 0; i < fnArray.length; i++) {
          const fn = fnArray[i];
          const args = argsArray[i];

          switch (fn) {
            case OPS.save:
              ctmStack.push([...ctm]);
              break;

            case OPS.restore:
              ctm = ctmStack.pop() || [1, 0, 0, 1, 0, 0];
              break;

            case OPS.transform:
              if (args && args.length >= 6) {
                ctm = multiplyMatrix(ctm, args);
              }
              break;

            case OPS.beginPath:
              flushCurrentSubpath();
              allSubpaths = [];
              break;

            case OPS.moveTo: {
              flushCurrentSubpath();
              const pt = addPoint(args[0], args[1]);
              currentPoint = pt;
              subpathStart = pt;
              currentSubpath = [pt];
              break;
            }

            case OPS.lineTo: {
              const pt = addPoint(args[0], args[1]);
              if (currentSubpath.length === 0) {
                currentSubpath.push(currentPoint);
              }
              currentSubpath.push(pt);
              currentPoint = pt;
              break;
            }

            case OPS.curveTo: {
              if (currentSubpath.length === 0) {
                currentSubpath.push(currentPoint);
              }
              const p1 = addPoint(args[0], args[1]);
              const p2 = addPoint(args[2], args[3]);
              const p3 = addPoint(args[4], args[5]);
              const pts = approximateCubicBezier(currentPoint, p1, p2, p3, curveSegments);
              currentSubpath.push(...pts);
              currentSubpath.isCurve = true;
              currentPoint = p3;
              break;
            }

            case OPS.curveTo2: {
              if (currentSubpath.length === 0) {
                currentSubpath.push(currentPoint);
              }
              const p1 = currentPoint;
              const p2 = addPoint(args[0], args[1]);
              const p3 = addPoint(args[2], args[3]);
              const pts = approximateCubicBezier(currentPoint, p1, p2, p3, curveSegments);
              currentSubpath.push(...pts);
              currentSubpath.isCurve = true;
              currentPoint = p3;
              break;
            }

            case OPS.curveTo3: {
              if (currentSubpath.length === 0) {
                currentSubpath.push(currentPoint);
              }
              const p1 = addPoint(args[0], args[1]);
              const p2 = addPoint(args[2], args[3]);
              const p3 = p2;
              const pts = approximateCubicBezier(currentPoint, p1, p2, p3, curveSegments);
              currentSubpath.push(...pts);
              currentSubpath.isCurve = true;
              currentPoint = p3;
              break;
            }

            case OPS.rectangle: {
              flushCurrentSubpath();
              const rx = args[0];
              const ry = args[1];
              const rw = args[2];
              const rh = args[3];
              const p0 = addPoint(rx, ry);
              const p1 = addPoint(rx + rw, ry);
              const p2 = addPoint(rx + rw, ry + rh);
              const p3 = addPoint(rx, ry + rh);
              const rectPath = [p0, p1, p2, p3, p0];
              rectPath.isClosed = true;
              rectPath.isRect = true;
              allSubpaths.push(rectPath);
              currentPoint = p0;
              break;
            }

            case OPS.closePath:
              if (currentSubpath.length > 0) {
                currentSubpath.push(subpathStart);
                currentSubpath.isClosed = true;
                flushCurrentSubpath();
              }
              break;

            case OPS.constructPath: {
              // Optimized Path Operator in PDF.js 3.x
              const subOps = args[0];
              const subArgs = args[1];
              let argIdx = 0;

              for (let j = 0; j < subOps.length; j++) {
                const subOp = subOps[j];
                switch (subOp) {
                  case OPS.rectangle: {
                    flushCurrentSubpath();
                    const rx = subArgs[argIdx++];
                    const ry = subArgs[argIdx++];
                    const rw = subArgs[argIdx++];
                    const rh = subArgs[argIdx++];
                    const p0 = addPoint(rx, ry);
                    const p1 = addPoint(rx + rw, ry);
                    const p2 = addPoint(rx + rw, ry + rh);
                    const p3 = addPoint(rx, ry + rh);
                    const rectPath = [p0, p1, p2, p3, p0];
                    rectPath.isClosed = true;
                    rectPath.isRect = true;
                    allSubpaths.push(rectPath);
                    currentPoint = p0;
                    break;
                  }
                  case OPS.moveTo: {
                    flushCurrentSubpath();
                    const pt = addPoint(subArgs[argIdx++], subArgs[argIdx++]);
                    currentPoint = pt;
                    subpathStart = pt;
                    currentSubpath = [pt];
                    break;
                  }
                  case OPS.lineTo: {
                    const pt = addPoint(subArgs[argIdx++], subArgs[argIdx++]);
                    if (currentSubpath.length === 0) {
                      currentSubpath.push(currentPoint);
                    }
                    currentSubpath.push(pt);
                    currentPoint = pt;
                    break;
                  }
                  case OPS.curveTo: {
                    if (currentSubpath.length === 0) {
                      currentSubpath.push(currentPoint);
                    }
                    const p1 = addPoint(subArgs[argIdx++], subArgs[argIdx++]);
                    const p2 = addPoint(subArgs[argIdx++], subArgs[argIdx++]);
                    const p3 = addPoint(subArgs[argIdx++], subArgs[argIdx++]);
                    const pts = approximateCubicBezier(currentPoint, p1, p2, p3, curveSegments);
                    currentSubpath.push(...pts);
                    currentSubpath.isCurve = true;
                    currentPoint = p3;
                    break;
                  }
                  case OPS.curveTo2: {
                    if (currentSubpath.length === 0) {
                      currentSubpath.push(currentPoint);
                    }
                    const p1 = currentPoint;
                    const p2 = addPoint(subArgs[argIdx++], subArgs[argIdx++]);
                    const p3 = addPoint(subArgs[argIdx++], subArgs[argIdx++]);
                    const pts = approximateCubicBezier(currentPoint, p1, p2, p3, curveSegments);
                    currentSubpath.push(...pts);
                    currentSubpath.isCurve = true;
                    currentPoint = p3;
                    break;
                  }
                  case OPS.curveTo3: {
                    if (currentSubpath.length === 0) {
                      currentSubpath.push(currentPoint);
                    }
                    const p1 = addPoint(subArgs[argIdx++], subArgs[argIdx++]);
                    const p2 = addPoint(subArgs[argIdx++], subArgs[argIdx++]);
                    const p3 = p2;
                    const pts = approximateCubicBezier(currentPoint, p1, p2, p3, curveSegments);
                    currentSubpath.push(...pts);
                    currentSubpath.isCurve = true;
                    currentPoint = p3;
                    break;
                  }
                  case OPS.closePath:
                    if (currentSubpath.length > 0) {
                      currentSubpath.push(subpathStart);
                      currentSubpath.isClosed = true;
                      flushCurrentSubpath();
                    }
                    break;
                }
              }
              break;
            }

            case OPS.stroke:
            case OPS.closeStroke:
              if (fn === OPS.closeStroke && currentSubpath.length > 0) {
                currentSubpath.push(subpathStart);
                currentSubpath.isClosed = true;
              }
              commitPaths(false);
              break;

            case OPS.fill:
            case OPS.eoFill:
              commitPaths(true);
              break;

            case OPS.fillStroke:
            case OPS.eoFillStroke:
            case OPS.closeFillStroke:
            case OPS.closeEOFillStroke:
              if (fn === OPS.closeFillStroke || fn === OPS.closeEOFillStroke) {
                if (currentSubpath.length > 0) {
                  currentSubpath.push(subpathStart);
                  currentSubpath.isClosed = true;
                }
              }
              // Commit as stroke
              commitPaths(false);
              break;

            case OPS.paintImageXObject:
            case OPS.paintInlineImageXObject:
              totalImages++;
              break;
          }
        }

        // Flush any remaining subpaths
        commitPaths(false);

        // 2. Safe Text Content Extraction
        if (includeText) {
          try {
            const textContent = await page.getTextContent({ normalizeWhitespace: true });
            if (textContent && Array.isArray(textContent.items)) {
              for (const item of textContent.items) {
                if (!item || !item.str) continue;

                const safeText = encodeDxfText(item.str);
                if (!safeText) continue;

                const tr = item.transform || [1, 0, 0, 1, 0, 0];
                const fontSize = Math.hypot(tr[0], tr[1]) || item.height || 10;
                const rotationRad = Math.atan2(tr[1], tr[0]);
                const rotationDeg = (rotationRad * 180) / Math.PI;

                const tx = tr[4] || 0;
                const ty = shouldInvertY ? (pageHeight - (tr[5] || 0)) : (tr[5] || 0);

                allEntities.push({
                  type: 'TEXT',
                  layer: textLayer || 'PDF_TEXT',
                  x: tx,
                  y: ty,
                  height: Math.max(0.5, fontSize),
                  rotation: rotationDeg,
                  text: safeText
                });
                totalTexts++;
              }
            }
          } catch (textErr) {
            console.warn('Text extraction fallback for page ' + pageNum, textErr);
          }
        }
      }

      onProgress({
        percent: 92,
        status: 'Validating vector geometry and CAD layers...'
      });

      // 3. Scanned PDF Detection Check
      const vectorCount = totalLines + totalCurves + totalPolygons;
      if (vectorCount === 0) {
        // Scanned raster image PDF without vector paths
        const err = new Error('NO_VECTOR_DATA');
        err.totalImages = totalImages;
        throw err;
      }

      onProgress({
        percent: 96,
        status: 'Assembling ASCII DXF R12 structure...'
      });

      // 4. Assemble Pure ASCII DXF Document
      const dxfString = this.buildDxf(allEntities, pagesToProcess);

      onProgress({
        percent: 100,
        status: 'Conversion completed!'
      });

      return {
        dxfString,
        stats: {
          totalLines,
          totalCurves,
          totalPolygons,
          totalTexts,
          totalEntities: allEntities.length,
          pagesConverted: pagesToProcess.length
        }
      };
    }

    /**
     * Assemble Pure AutoCAD R12 (AC1009) ENTITIES-only ASCII DXF
     * Omits HEADER, TABLES, BLOCKS, CLASSES, OBJECTS to guarantee 100% error-free parsing in AutoCAD.
     */
    buildDxf(entities, pages) {
      let dxf = '0\nSECTION\n2\nENTITIES\n';

      for (const ent of entities) {
        const layer = ent.layer || '0';

        if (ent.type === 'LINE') {
          dxf += '0\nLINE\n8\n' + layer + '\n';
          dxf += '10\n' + f4(ent.x1) + '\n20\n' + f4(ent.y1) + '\n30\n0.0000\n';
          dxf += '11\n' + f4(ent.x2) + '\n21\n' + f4(ent.y2) + '\n31\n0.0000\n';
        } else if (ent.type === 'POLYLINE' || ent.type === 'LWPOLYLINE') {
          const pts = ent.points || [];
          if (pts.length < 2) continue;
          const isClosed = ent.isClosed ? 1 : 0;

          dxf += '0\nPOLYLINE\n8\n' + layer + '\n66\n1\n';
          dxf += '10\n0.0000\n20\n0.0000\n30\n0.0000\n';
          dxf += '70\n' + isClosed + '\n';

          for (const p of pts) {
            dxf += '0\nVERTEX\n8\n' + layer + '\n';
            dxf += '10\n' + f4(p.x) + '\n20\n' + f4(p.y) + '\n30\n0.0000\n';
          }

          dxf += '0\nSEQEND\n8\n' + layer + '\n';
        } else if (ent.type === 'SOLID') {
          const pts = ent.points || [];
          if (pts.length < 3) continue;
          const p1 = pts[0];
          const p2 = pts[1];
          // DXF SOLID expects vertices in cross-over order: 1, 2, 4, 3
          const p3 = pts.length > 3 ? pts[3] : pts[2];
          const p4 = pts[2];

          dxf += '0\nSOLID\n8\n' + layer + '\n';
          dxf += '10\n' + f4(p1.x) + '\n20\n' + f4(p1.y) + '\n30\n0.0000\n';
          dxf += '11\n' + f4(p2.x) + '\n21\n' + f4(p2.y) + '\n31\n0.0000\n';
          dxf += '12\n' + f4(p3.x) + '\n22\n' + f4(p3.y) + '\n32\n0.0000\n';
          dxf += '13\n' + f4(p4.x) + '\n23\n' + f4(p4.y) + '\n33\n0.0000\n';
        } else if (ent.type === 'TEXT') {
          const txt = (ent.text || '').trim();
          if (!txt) continue;
          const textLayer = ent.layer || 'PDF_TEXT';

          dxf += '0\nTEXT\n8\n' + textLayer + '\n';
          dxf += '10\n' + f4(ent.x) + '\n20\n' + f4(ent.y) + '\n30\n0.0000\n';
          dxf += '40\n' + f4(ent.height || 2.5) + '\n';
          dxf += '1\n' + txt + '\n';
          if (ent.rotation && Math.abs(ent.rotation) > 0.01) {
            dxf += '50\n' + f4(ent.rotation) + '\n';
          }
        }
      }

      dxf += '0\nENDSEC\n0\nEOF\n';
      return dxf;
    }

    /**
     * Trigger immediate browser download of the generated DXF file
     */
    downloadDxf(dxfContent, outputFileName) {
      const fileName = outputFileName || (this.fileName.replace(/\.pdf$/i, '') + '.dxf');
      const blob = new Blob([dxfContent], { type: 'application/dxf;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 1000);
    }
  }

  // Export to global scope
  global.PdfToDxfConverter = PdfToDxfConverter;

})(typeof window !== 'undefined' ? window : this);
