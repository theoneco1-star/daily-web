/**
 * Local PDF to DXF Converter Script
 * Converts local PDF blueprint directly to pure AutoCAD R12 LINE-only DXF.
 */
const fs = require('fs');
const path = require('path');
const pdfjs = require('pdfjs-dist/legacy/build/pdf.js');

// Mock browser globals for pdf-to-dxf.js
pdfjs.GlobalWorkerOptions.workerSrc = require.resolve('pdfjs-dist/legacy/build/pdf.worker.js');
global.window = { pdfjsLib: pdfjs };
global.pdfjsLib = pdfjs;

require('../js/pdf-to-dxf.js');
const PdfToDxfConverter = global.window.PdfToDxfConverter;

async function run() {
  const inputPdfPath = 'C:\\Users\\유원근\\Desktop\\L-644 풀웨이트+체어웨이트 상세도.pdf';
  const outputDxfPath = 'C:\\Users\\유원근\\Desktop\\L-644_TEST_FIXED.dxf';
  const outputDxfTextPath = 'C:\\Users\\유원근\\Desktop\\L-644_TEST_WITH_TEXT.dxf';

  console.log('1. Checking input file:', inputPdfPath);
  if (!fs.existsSync(inputPdfPath)) {
    throw new Error('Input PDF not found: ' + inputPdfPath);
  }
  const fileBytes = fs.readFileSync(inputPdfPath);
  console.log(`   File size: ${(fileBytes.length / 1024).toFixed(1)} KB`);

  const arrayBuffer = fileBytes.buffer.slice(fileBytes.byteOffset, fileBytes.byteOffset + fileBytes.byteLength);

  // --- Run 1: Pure LINE entities only (Strict user specification) ---
  console.log('\n2. Converting to PURE LINE-ONLY DXF...');
  const converter1 = new PdfToDxfConverter();
  await converter1.load(arrayBuffer, path.basename(inputPdfPath));
  console.log(`   Pages in PDF: ${converter1.numPages}`);

  const result1 = await converter1.convert({
    pageNumbers: [1],
    includeText: false,
    curveSegments: 16,
    onProgress: (p) => {
      if (p.percent % 20 === 0 || p.percent === 100) {
        console.log(`   [Progress] ${p.percent}% - ${p.status}`);
      }
    }
  });

  const dxf1 = result1.dxfString;
  fs.writeFileSync(outputDxfPath, dxf1, 'utf8');
  console.log(`   Saved Pure LINE DXF to: ${outputDxfPath}`);
  console.log(`   DXF File size: ${(Buffer.byteLength(dxf1, 'utf8') / 1024).toFixed(1)} KB`);
  console.log(`   Stats: ${JSON.stringify(result1.stats)}`);

  // --- Run 2: LINE + TEXT entities (Additional convenience) ---
  console.log('\n3. Converting to LINE + TEXT DXF (Bonus)...');
  const converter2 = new PdfToDxfConverter();
  await converter2.load(arrayBuffer, path.basename(inputPdfPath));

  const result2 = await converter2.convert({
    pageNumbers: [1],
    includeText: true,
    curveSegments: 16,
    onProgress: () => {}
  });

  const dxf2 = result2.dxfString;
  fs.writeFileSync(outputDxfTextPath, dxf2, 'utf8');
  console.log(`   Saved LINE + TEXT DXF to: ${outputDxfTextPath}`);
  console.log(`   DXF File size: ${(Buffer.byteLength(dxf2, 'utf8') / 1024).toFixed(1)} KB`);
  console.log(`   Stats: ${JSON.stringify(result2.stats)}`);

  // --- Verification of outputDxfPath ---
  console.log('\n4. Verifying generated DXF structure:');
  const lines = dxf1.split(/\r?\n/);
  console.log('   Total lines:', lines.length);
  console.log('   Lines 1-8:');
  for (let i = 0; i < Math.min(8, lines.length); i++) {
    console.log(`     Line ${i + 1}: ${JSON.stringify(lines[i])}`);
  }
  console.log('   Last 6 lines:');
  for (let i = Math.max(0, lines.length - 6); i < lines.length; i++) {
    console.log(`     Line ${i + 1}: ${JSON.stringify(lines[i])}`);
  }

  // Strict checks
  const startsProperly = dxf1.startsWith('0\nSECTION\n2\nENTITIES\n0\nLINE\n');
  const endsProperly = dxf1.trim().endsWith('0\nENDSEC\n0\nEOF');
  const hasNoHeader = !dxf1.includes('HEADER');
  const hasNoTables = !dxf1.includes('TABLES');
  const hasNoBlocks = !dxf1.includes('BLOCKS');
  const hasNoLwPoly = !dxf1.includes('LWPOLYLINE');
  const hasNoPolyline = !dxf1.includes('POLYLINE');
  const hasNoHandle = !dxf1.match(/\n\s*5\n/);

  console.log('\n=== DXF Compliance Verification ===');
  console.log('   Starts with 0\\nSECTION\\n2\\nENTITIES\\n0\\nLINE:', startsProperly ? '✅ PASS' : '❌ FAIL');
  console.log('   Ends with 0\\nENDSEC\\n0\\nEOF:', endsProperly ? '✅ PASS' : '❌ FAIL');
  console.log('   No HEADER section:', hasNoHeader ? '✅ PASS' : '❌ FAIL');
  console.log('   No TABLES section:', hasNoTables ? '✅ PASS' : '❌ FAIL');
  console.log('   No BLOCKS section:', hasNoBlocks ? '✅ PASS' : '❌ FAIL');
  console.log('   No LWPOLYLINE:', hasNoLwPoly ? '✅ PASS' : '❌ FAIL');
  console.log('   No POLYLINE:', hasNoPolyline ? '✅ PASS' : '❌ FAIL');
  console.log('   No group code 5 (handle):', hasNoHandle ? '✅ PASS' : '❌ FAIL');

  if (startsProperly && endsProperly && hasNoHeader && hasNoTables && hasNoBlocks && hasNoLwPoly && hasNoPolyline && hasNoHandle) {
    console.log('\n🎉 ALL CHECKS PASSED! The DXF is 100% compliant with AutoCAD R12 pure LINE specification.');
  } else {
    console.error('\n❌ Warning: Some checks did not pass.');
  }
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
