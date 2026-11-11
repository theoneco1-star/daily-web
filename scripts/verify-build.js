/**
 * Build & Compatibility Verification Suite for PDF to DXF Engine
 * Runs as part of `npm run build`
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

let errors = 0;
function assert(condition, message) {
  if (!condition) {
    console.error('❌ FAIL:', message);
    errors++;
  } else {
    console.log('✅ PASS:', message);
  }
}

console.log('=== Step 1: Checking JavaScript Syntax ===');
const jsFiles = [
  'js/pdf-to-dxf.js',
  'js/i18n.js',
  'js/main.js',
  'js/web-tools.js'
];

for (const relPath of jsFiles) {
  const fullPath = path.resolve(__dirname, '..', relPath);
  try {
    const code = fs.readFileSync(fullPath, 'utf8');
    new vm.Script(code);
    assert(true, `${relPath} syntax is valid`);
  } catch (err) {
    assert(false, `${relPath} syntax error: ${err.message}`);
  }
}

console.log('\n=== Step 2: Checking HTML & Multi-Language (i18n) Completeness ===');
const htmlPath = path.resolve(__dirname, '..', 'pdf-to-dxf.html');
const html = fs.readFileSync(htmlPath, 'utf8');

// Match data-i18n attributes
const dataI18nRegex = /data-i18n=["']([^"']+)["']/g;
const matchedKeys = new Set();
let match;
while ((match = dataI18nRegex.exec(html)) !== null) {
  matchedKeys.add(match[1]);
}
console.log(`Found ${matchedKeys.size} distinct data-i18n attributes in pdf-to-dxf.html.`);

// Extract i18n object from script
const i18nMatch = html.match(/const\s+i18n\s*=\s*\{([\s\S]*?)\n\s*let\s+currentLang/);
assert(!!i18nMatch, 'Extracted i18n dictionary from pdf-to-dxf.html');

let i18nObj = null;
if (i18nMatch) {
  try {
    const fn = new Function('const i18n = {' + i18nMatch[1] + '; return i18n;');
    i18nObj = fn();
  } catch (e) {
    assert(false, 'Evaluating i18n dictionary: ' + e.message);
  }
}

if (i18nObj) {
  const ko = i18nObj.ko || {};
  const en = i18nObj.en || {};

  // Check every key in HTML exists in both dictionaries
  for (const key of matchedKeys) {
    assert(ko.hasOwnProperty(key), `KO dictionary has key '${key}'`);
    assert(en.hasOwnProperty(key), `EN dictionary has key '${key}'`);
  }

  // Check requirement 3 specifics:
  // 1. Hashtags
  assert(en.tagPdf === '#PDFtoCAD', 'EN hashtag #PDFtoCAD matches requirement');
  assert(en.tagCad === '#CADConverter', 'EN hashtag #CADConverter matches requirement');
  assert(en.tagDxf === '#DXFExport', 'EN hashtag #DXFExport matches requirement');
  assert(en.tagDrawing === '#DrawingToCAD', 'EN hashtag #DrawingToCAD matches requirement');
  assert(en.tagNoInstall === '#NoInstall', 'EN hashtag #NoInstall matches requirement');

  // 2. CAD Software names without transliteration in EN
  assert(en.cadAutoCAD === 'AutoCAD', 'EN CAD name AutoCAD without Korean');
  assert(en.cadZWCAD === 'ZWCAD', 'EN CAD name ZWCAD without Korean');
  assert(en.cadGstarCAD === 'GstarCAD', 'EN CAD name GstarCAD without Korean');
  assert(en.cadLibreCAD === 'LibreCAD (Open Source)', 'EN LibreCAD is (Open Source)');

  // 3. File details & buttons in EN
  assert(en.selectPage === 'Select Pages to Convert', 'EN selectPage is "Select Pages to Convert"');
  assert(en.selectAll === 'Select All', 'EN selectAll is "Select All"');
  assert(en.selectFirst === 'Select Page 1', 'EN selectFirst is "Select Page 1"');
  assert(en.reselectBtn === 'Change File', 'EN reselectBtn is "Change File"');
  assert(en.convertBtn === 'Convert to DXF', 'EN convertBtn is "Convert to DXF"');
  assert(en.optTextTitle === 'Extract Text & Dimensions', 'EN optTextTitle is "Extract Text & Dimensions"');

  // Check no removed UI elements are referenced
  assert(!html.includes('id="opt-curve-segments"'), 'Old curve segments dropdown removed from HTML');
  assert(!html.includes('id="opt-y-alignment"'), 'Old Y-alignment dropdown removed from HTML');
}

console.log('\n=== Step 3: Verifying AutoCAD R12 (AC1009) DXF Engine Structure ===');
const dxfEngineCode = fs.readFileSync(path.resolve(__dirname, '..', 'js/pdf-to-dxf.js'), 'utf8');
const sandbox = {
  window: {},
  document: {},
  console: console
};
vm.createContext(sandbox);
vm.runInContext(dxfEngineCode, sandbox);

const Converter = sandbox.PdfToDxfConverter || sandbox.window.PdfToDxfConverter;
assert(typeof Converter === 'function', 'PdfToDxfConverter is exported to global scope');

const converter = new Converter();

// Test DXF output with various entities
const testEntities = [
  { type: 'LINE', layer: 'PDF_VECTORS', x1: 12.34567, y1: 89.10111, x2: 98.76543, y2: 43.21098 },
  { type: 'POLYLINE', layer: 'PDF_VECTORS', isClosed: true, points: [{x: 0, y: 0}, {x: 10, y: 0}, {x: 10, y: 10}] },
  { type: 'SOLID', layer: 'PDF_HATCH', points: [{x: 0, y: 0}, {x: 5, y: 0}, {x: 5, y: 5}, {x: 0, y: 5}] },
  { type: 'TEXT', layer: 'PDF_TEXT', x: 25.5, y: 50.25, height: 3.5, text: '\\U+B3C4\\U+BA74 PLAN', rotation: 30.0 }
];

const generatedDxf = converter.buildDxf(testEntities, [1]);

// 1. Verify Header
assert(generatedDxf.startsWith('  0\nSECTION\n  2\nHEADER\n'), 'DXF starts with SECTION: HEADER');
assert(generatedDxf.includes('  9\n$ACADVER\n  1\nAC1009\n'), 'DXF declares $ACADVER = AC1009 (AutoCAD R12)');
assert(generatedDxf.includes('  9\n$INSUNITS\n 70\n4\n'), 'DXF sets metric unit millimeters');
assert(generatedDxf.includes('  9\n$MEASUREMENT\n 70\n1\n'), 'DXF sets measurement standard to metric');

// 2. Verify Tables
assert(generatedDxf.includes('  0\nSECTION\n  2\nTABLES\n'), 'DXF contains SECTION: TABLES');
assert(generatedDxf.includes('  2\nVPORT\n'), 'TABLES defines VPORT table');
assert(generatedDxf.includes('  2\nLTYPE\n'), 'TABLES defines LTYPE table');
assert(generatedDxf.includes('  2\nLAYER\n'), 'TABLES defines LAYER table');
assert(generatedDxf.includes('  2\nSTYLE\n'), 'TABLES defines STYLE table');
assert(generatedDxf.includes('  2\nSTANDARD\n'), 'STYLE defines STANDARD text style');

// 3. Verify Blocks
assert(generatedDxf.includes('  0\nSECTION\n  2\nBLOCKS\n  0\nENDSEC\n'), 'DXF contains valid BLOCKS section');

// 4. Verify Entities
assert(generatedDxf.includes('  0\nSECTION\n  2\nENTITIES\n'), 'DXF contains SECTION: ENTITIES');
assert(generatedDxf.includes('  0\nLINE\n'), 'ENTITIES contains LINE entity');
assert(generatedDxf.includes('  0\nPOLYLINE\n'), 'ENTITIES contains POLYLINE entity');
assert(generatedDxf.includes('  0\nVERTEX\n'), 'ENTITIES contains VERTEX entity');
assert(generatedDxf.includes('  0\nSEQEND\n'), 'ENTITIES contains SEQEND terminator');
assert(generatedDxf.includes('  0\nSOLID\n'), 'ENTITIES contains SOLID entity');
assert(generatedDxf.includes('  0\nTEXT\n'), 'ENTITIES contains TEXT entity');

// 5. Verify R12 Strict Rules
assert(!generatedDxf.includes('LWPOLYLINE'), 'DXF contains NO illegal LWPOLYLINE entities for R12');
assert(!generatedDxf.includes('AcDb'), 'DXF contains NO modern subclass markers (AcDb)');
assert(!generatedDxf.includes('CLASSES'), 'DXF contains NO CLASSES section');
assert(!generatedDxf.includes('OBJECTS'), 'DXF contains NO OBJECTS section');
assert(!generatedDxf.match(/\n\s*5\n[0-9A-F]+/i), 'DXF contains NO entity handles (group 5) in R12');

// 6. Verify Coordinate Formatting (No Scientific Notation)
assert(!generatedDxf.match(/\d+\.\d+e[+-]?\d+/i), 'All coordinates use fixed-point notation (no scientific notation)');

// 7. Verify EOF
assert(generatedDxf.trim().endsWith('0\nEOF'), 'DXF terminates strictly with 0 \\n EOF');

console.log('\n=== Summary ===');
if (errors === 0) {
  console.log('🎉 ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!\n');
  process.exit(0);
} else {
  console.error(`💥 BUILD FAILED with ${errors} error(s)!\n`);
  process.exit(1);
}
