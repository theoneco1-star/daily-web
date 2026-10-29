"""
DOCX to HWPX Converter Engine
OWPML / KS X 6101 Standard Compliance
Transforms WordprocessingML (DOCX) elements (w:p, w:r, w:tbl, w:tr, w:tc)
into valid Hancom Office HWPX package structures with full layout preservation.
"""

import os
import io
import re
import copy
import zipfile
from typing import Dict, Any, List, Tuple, Optional
from lxml import etree
import docx

# Hancom HWPX Namespaces
NS_HWPX = {
    'ha': 'http://www.hancom.co.kr/hwpml/2011/app',
    'hp': 'http://www.hancom.co.kr/hwpml/2011/paragraph',
    'hp10': 'http://www.hancom.co.kr/hwpml/2016/paragraph',
    'hs': 'http://www.hancom.co.kr/hwpml/2011/section',
    'hc': 'http://www.hancom.co.kr/hwpml/2011/core',
    'hh': 'http://www.hancom.co.kr/hwpml/2011/head',
    'hhs': 'http://www.hancom.co.kr/hwpml/2011/history',
    'hm': 'http://www.hancom.co.kr/hwpml/2011/master-page',
    'hpf': 'http://www.hancom.co.kr/schema/2011/hpf',
    'dc': 'http://purl.org/dc/elements/1.1/',
    'opf': 'http://www.idpf.org/2007/opf/',
    'ooxmlchart': 'http://www.hancom.co.kr/hwpml/2016/ooxmlchart',
    'hwpunitchar': 'http://www.hancom.co.kr/hwpml/2016/HwpUnitChar',
    'epub': 'http://www.idpf.org/2007/ops',
    'config': 'urn:oasis:names:tc:opendocument:xmlns:config:1.0'
}

# WordprocessingML Namespace
NS_WORD = {
    'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
    'm': 'http://schemas.openxmlformats.org/officeDocument/2006/math',
    'v': 'urn:schemas-microsoft-com:vml',
    'wp': 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing',
    'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
    'pic': 'http://schemas.openxmlformats.org/drawingml/2006/picture'
}

class HwpxStyleRegistry:
    """Manages charProperties, paraProperties, borderFills dynamically inside header.xml"""

    def __init__(self, header_root: etree._Element):
        self.header_root = header_root
        self.ref_list = header_root.find('{http://www.hancom.co.kr/hwpml/2011/head}refList')
        if self.ref_list is None:
            raise ValueError("Invalid HWPX header.xml: <hh:refList> missing.")

        self.char_properties_el = self.ref_list.find('{http://www.hancom.co.kr/hwpml/2011/head}charProperties')
        self.para_properties_el = self.ref_list.find('{http://www.hancom.co.kr/hwpml/2011/head}paraProperties')
        self.border_fills_el = self.ref_list.find('{http://www.hancom.co.kr/hwpml/2011/head}borderFills')

        # Caches
        self.char_cache: Dict[Tuple, int] = {}
        self.para_cache: Dict[Tuple, int] = {}
        self.border_fill_cache: Dict[Tuple, int] = {}

        # Scan existing char properties
        self.next_char_id = 0
        if self.char_properties_el is not None:
            for cp in self.char_properties_el:
                cid = int(cp.get('id', '0'))
                if cid >= self.next_char_id:
                    self.next_char_id = cid + 1

        # Scan existing para properties
        self.next_para_id = 0
        if self.para_properties_el is not None:
            for pp in self.para_properties_el:
                pid = int(pp.get('id', '0'))
                if pid >= self.next_para_id:
                    self.next_para_id = pid + 1

        # Scan existing border fill properties
        self.next_bf_id = 1
        if self.border_fills_el is not None:
            for bf in self.border_fills_el:
                bfid = int(bf.get('id', '1'))
                if bfid >= self.next_bf_id:
                    self.next_bf_id = bfid + 1

        # Map default base styles
        self.char_cache[(10.0, False, False, False, '#000000')] = 0
        self.para_cache[('JUSTIFY', 0, 0, 0)] = 0
        self.border_fill_cache[('NONE', '#000000', 'none')] = 2

    def get_or_create_char_pr(self, size_pt: float, is_bold: bool, is_italic: bool,
                              is_underline: bool, color_hex: str) -> int:
        """Returns or creates a hh:charPr ID for given font styling."""
        # Normalize
        size_pt = round(size_pt, 1)
        if size_pt < 4.0:
            size_pt = 10.0
        color_hex = (color_hex or '#000000').upper()
        if not color_hex.startswith('#'):
            color_hex = '#' + color_hex

        key = (size_pt, bool(is_bold), bool(is_italic), bool(is_underline), color_hex)
        if key in self.char_cache:
            return self.char_cache[key]

        new_id = self.next_char_id
        self.next_char_id += 1

        height_val = str(int(size_pt * 100))  # 1pt = 100 HWPUNIT
        hh_ns = '{http://www.hancom.co.kr/hwpml/2011/head}'

        # Clone from base charPr[0] if available
        base_cp = self.char_properties_el[0] if len(self.char_properties_el) > 0 else None
        if base_cp is not None:
            new_cp = copy.deepcopy(base_cp)
            new_cp.set('id', str(new_id))
            new_cp.set('height', height_val)
            new_cp.set('textColor', color_hex)
        else:
            new_cp = etree.Element(f'{hh_ns}charPr', attrib={
                'id': str(new_id),
                'height': height_val,
                'textColor': color_hex,
                'shadeColor': 'none',
                'useFontSpace': '0',
                'useKerning': '0',
                'symMark': 'NONE',
                'borderFillIDRef': '2'
            })
            for sub_tag in ['fontRef', 'ratio', 'spacing', 'relSz', 'offset']:
                sub_el = etree.SubElement(new_cp, f'{hh_ns}{sub_tag}')
                for k in ['hangul', 'latin', 'hanja', 'japanese', 'other', 'symbol', 'user']:
                    sub_el.set(k, '100' if sub_tag in ['ratio', 'relSz'] else ('1' if sub_tag == 'fontRef' else '0'))

        # Bold
        bold_el = new_cp.find(f'{hh_ns}bold')
        if is_bold and bold_el is None:
            new_cp.insert(5, etree.Element(f'{hh_ns}bold'))
        elif not is_bold and bold_el is not None:
            new_cp.remove(bold_el)

        # Italic
        italic_el = new_cp.find(f'{hh_ns}italic')
        if is_italic and italic_el is None:
            new_cp.insert(5, etree.Element(f'{hh_ns}italic'))
        elif not is_italic and italic_el is not None:
            new_cp.remove(italic_el)

        # Underline
        underline_el = new_cp.find(f'{hh_ns}underline')
        if underline_el is not None:
            underline_el.set('type', 'BOTTOM' if is_underline else 'NONE')
            underline_el.set('shape', 'SOLID')
            underline_el.set('color', color_hex)

        self.char_properties_el.append(new_cp)
        self.char_properties_el.set('itemCnt', str(len(self.char_properties_el)))
        self.char_cache[key] = new_id
        return new_id

    def get_or_create_para_pr(self, align: str, margin_left: int = 0,
                              margin_right: int = 0, indent: int = 0) -> int:
        """Returns or creates a hh:paraPr ID for given alignment and margins."""
        align = align.upper()
        if align not in ['JUSTIFY', 'LEFT', 'CENTER', 'RIGHT']:
            align = 'JUSTIFY'

        key = (align, margin_left, margin_right, indent)
        if key in self.para_cache:
            return self.para_cache[key]

        new_id = self.next_para_id
        self.next_para_id += 1

        hh_ns = '{http://www.hancom.co.kr/hwpml/2011/head}'
        base_pp = self.para_properties_el[0] if len(self.para_properties_el) > 0 else None
        if base_pp is not None:
            new_pp = copy.deepcopy(base_pp)
            new_pp.set('id', str(new_id))
        else:
            new_pp = etree.Element(f'{hh_ns}paraPr', attrib={
                'id': str(new_id),
                'tabPrIDRef': '0',
                'condense': '0',
                'fontLineHeight': '0',
                'snapToGrid': '1',
                'suppressLineNumbers': '0',
                'checked': '0',
                'textDir': 'LTR'
            })

        # Set align
        align_el = new_pp.find(f'{hh_ns}align')
        if align_el is None:
            align_el = etree.SubElement(new_pp, f'{hh_ns}align')
        align_el.set('horizontal', align)
        align_el.set('vertical', 'BASELINE')

        self.para_properties_el.append(new_pp)
        self.para_properties_el.set('itemCnt', str(len(self.para_properties_el)))
        self.para_cache[key] = new_id
        return new_id

    def get_or_create_border_fill(self, border_type: str = 'SOLID',
                                  border_color: str = '#000000',
                                  fill_color: str = 'none') -> int:
        """Returns or creates a hh:borderFill ID for table/cell borders and background."""
        border_type = border_type.upper()
        border_color = (border_color or '#000000').upper()
        fill_color = (fill_color or 'none').upper()

        key = (border_type, border_color, fill_color)
        if key in self.border_fill_cache:
            return self.border_fill_cache[key]

        new_id = self.next_bf_id
        self.next_bf_id += 1

        hh_ns = '{http://www.hancom.co.kr/hwpml/2011/head}'
        hc_ns = '{http://www.hancom.co.kr/hwpml/2011/core}'

        new_bf = etree.Element(f'{hh_ns}borderFill', attrib={
            'id': str(new_id),
            'threeD': '0',
            'shadow': '0',
            'centerLine': 'NONE',
            'breakCellSeparateLine': '0'
        })
        etree.SubElement(new_bf, f'{hh_ns}slash', attrib={'type': 'NONE', 'Crooked': '0', 'isCounter': '0'})
        etree.SubElement(new_bf, f'{hh_ns}backSlash', attrib={'type': 'NONE', 'Crooked': '0', 'isCounter': '0'})

        b_type = border_type if border_type in ['SOLID', 'DASH', 'DOT'] else 'SOLID'
        b_width = '0.12 mm' if b_type != 'NONE' else '0.1 mm'

        for side in ['leftBorder', 'rightBorder', 'topBorder', 'bottomBorder']:
            etree.SubElement(new_bf, f'{hh_ns}{side}', attrib={
                'type': b_type,
                'width': b_width,
                'color': border_color if b_type != 'NONE' else '#000000'
            })
        etree.SubElement(new_bf, f'{hh_ns}diagonal', attrib={'type': 'SOLID', 'width': '0.1 mm', 'color': '#000000'})

        fill_brush = etree.SubElement(new_bf, f'{hc_ns}fillBrush')
        etree.SubElement(fill_brush, f'{hc_ns}winBrush', attrib={
            'faceColor': fill_color,
            'hatchColor': '#999999',
            'alpha': '0'
        })

        self.border_fills_el.append(new_bf)
        self.border_fills_el.set('itemCnt', str(len(self.border_fills_el)))
        self.border_fill_cache[key] = new_id
        return new_id


class DocxToHwpxConverter:
    """Orchestrates DOCX to HWPX conversion maintaining full XML structure."""

    def __init__(self, template_path: Optional[str] = None):
        if template_path is None:
            # Locate base_template.hwpx in same dir
            curr_dir = os.path.dirname(os.path.abspath(__file__))
            template_path = os.path.join(curr_dir, 'base_template.hwpx')
        self.template_path = template_path

        if not os.path.exists(self.template_path):
            raise FileNotFoundError(f"HWPX base template not found at {self.template_path}")

        # ID generators
        self.para_id_counter = 1
        self.tbl_id_counter = 1000

    def convert(self, docx_path_or_bytes, output_path_or_buffer=None) -> bytes:
        """Converts DOCX into a fully compliant HWPX package."""
        # 1. Load DOCX document
        if isinstance(docx_path_or_bytes, bytes):
            docx_doc = docx.Document(io.BytesIO(docx_path_or_bytes))
        else:
            docx_doc = docx.Document(docx_path_or_bytes)

        # 2. Open base template HWPX zip
        with open(self.template_path, 'rb') as f:
            template_bytes = f.read()
        tpl_zip = zipfile.ZipFile(io.BytesIO(template_bytes))

        # 3. Read and parse header.xml
        header_xml_bytes = tpl_zip.read('Contents/header.xml')
        header_root = etree.fromstring(header_xml_bytes)
        style_registry = HwpxStyleRegistry(header_root)

        # 4. Read base section0.xml to preserve secPr and namespaces
        sec_xml_bytes = tpl_zip.read('Contents/section0.xml')
        sec_root = etree.fromstring(sec_xml_bytes)

        # Extract authentic secPr and colPr
        hp_ns = '{http://www.hancom.co.kr/hwpml/2011/paragraph}'
        first_sec_pr = sec_root.find(f'.//{hp_ns}secPr')
        first_col_pr = sec_root.find(f'.//{hp_ns}colPr')

        sec_pr_node = copy.deepcopy(first_sec_pr) if first_sec_pr is not None else None
        col_pr_node = copy.deepcopy(first_col_pr) if first_col_pr is not None else None

        # Clear existing children from section0
        for child in list(sec_root):
            sec_root.remove(child)

        # 5. Iterate through Word body children preserving exact document order
        is_first_para = True
        body_elements = docx_doc.element.body

        for elem in body_elements:
            tag_name = etree.QName(elem.tag).localname
            if tag_name == 'p':
                # Word Paragraph
                hp_p = self._convert_paragraph(elem, style_registry, is_first_para, sec_pr_node, col_pr_node)
                sec_root.append(hp_p)
                is_first_para = False

            elif tag_name == 'tbl':
                # Word Table
                hp_p_tbl = self._convert_table(elem, style_registry, is_first_para, sec_pr_node, col_pr_node)
                sec_root.append(hp_p_tbl)
                is_first_para = False

        # Fallback if document had no paragraphs
        if is_first_para:
            empty_p = self._create_empty_paragraph(style_registry, sec_pr_node, col_pr_node)
            sec_root.append(empty_p)

        # 6. Package final HWPX container
        out_buf = io.BytesIO()
        with zipfile.ZipFile(out_buf, 'w', compression=zipfile.ZIP_DEFLATED) as out_zip:
            # First entry MUST be mimetype stored uncompressed
            mimetype_bytes = tpl_zip.read('mimetype')
            out_zip.writestr('mimetype', mimetype_bytes, compress_type=zipfile.ZIP_STORED)

            # Updated header.xml
            new_header_bytes = etree.tostring(header_root, encoding='utf-8', xml_declaration=True)
            out_zip.writestr('Contents/header.xml', new_header_bytes)

            # Updated section0.xml
            new_sec_bytes = etree.tostring(sec_root, encoding='utf-8', xml_declaration=True)
            out_zip.writestr('Contents/section0.xml', new_sec_bytes)

            # Copy all remaining entries
            for item in tpl_zip.infolist():
                if item.filename in ['mimetype', 'Contents/header.xml', 'Contents/section0.xml']:
                    continue
                out_zip.writestr(item.filename, tpl_zip.read(item.filename))

        final_hwpx_bytes = out_buf.getvalue()

        # Save to file if output path provided
        if output_path_or_buffer is not None:
            if isinstance(output_path_or_buffer, str):
                with open(output_path_or_buffer, 'wb') as f:
                    f.write(final_hwpx_bytes)
            elif hasattr(output_path_or_buffer, 'write'):
                output_path_or_buffer.write(final_hwpx_bytes)

        return final_hwpx_bytes

    def _convert_paragraph(self, w_p: etree._Element, styles: HwpxStyleRegistry,
                           is_first_para: bool, sec_pr_node: Optional[etree._Element],
                           col_pr_node: Optional[etree._Element]) -> etree._Element:
        """Converts Word <w:p> to HWPX <hp:p>."""
        hp_ns = '{http://www.hancom.co.kr/hwpml/2011/paragraph}'
        w_ns = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'

        p_id = str(self.para_id_counter)
        self.para_id_counter += 1

        # Check alignment
        align = 'JUSTIFY'
        jc_el = w_p.find(f'{w_ns}pPr/{w_ns}jc')
        if jc_el is not None:
            jc_val = jc_el.get(f'{w_ns}val', '').lower()
            if jc_val in ['center']:
                align = 'CENTER'
            elif jc_val in ['right', 'end']:
                align = 'RIGHT'
            elif jc_val in ['left', 'start']:
                align = 'LEFT'

        # PageBreak
        is_page_break = False
        pb_el = w_p.find(f'{w_ns}pPr/{w_ns}pageBreakBefore')
        if pb_el is not None:
            is_page_break = True

        para_pr_id = styles.get_or_create_para_pr(align)

        hp_p = etree.Element(f'{hp_ns}p', attrib={
            'id': p_id,
            'paraPrIDRef': str(para_pr_id),
            'styleIDRef': '0',
            'pageBreak': '1' if is_page_break else '0',
            'columnBreak': '0',
            'merged': '0'
        })

        # Process Runs
        runs_data = []
        for child in w_p:
            c_tag = etree.QName(child.tag).localname
            if c_tag == 'r':
                # Run text and styles
                r_text, r_tabs, r_style = self._parse_run(child)
                runs_data.append((r_text, r_tabs, r_style))

        if not runs_data:
            runs_data = [('', [], (10.0, False, False, False, '#000000'))]

        for idx, (text, tabs, style) in enumerate(runs_data):
            size_pt, is_bold, is_italic, is_underline, color_hex = style
            char_pr_id = styles.get_or_create_char_pr(size_pt, is_bold, is_italic, is_underline, color_hex)

            hp_run = etree.SubElement(hp_p, f'{hp_ns}run', attrib={'charPrIDRef': str(char_pr_id)})

            # Inject secPr and colPr into the first run of the very first paragraph
            if is_first_para and idx == 0:
                if sec_pr_node is not None:
                    hp_run.append(copy.deepcopy(sec_pr_node))
                if col_pr_node is not None:
                    ctrl_el = etree.SubElement(hp_run, f'{hp_ns}ctrl')
                    ctrl_el.append(copy.deepcopy(col_pr_node))

            # Tabs
            for _ in tabs:
                etree.SubElement(hp_run, f'{hp_ns}tab')

            # Text
            hp_t = etree.SubElement(hp_run, f'{hp_ns}t')
            hp_t.text = text or ''

        # Line seg array for valid rendering
        linesegarray = etree.SubElement(hp_p, f'{hp_ns}linesegarray')
        etree.SubElement(linesegarray, f'{hp_ns}lineseg', attrib={
            'textpos': '0',
            'vertpos': '0',
            'vertsize': '1000',
            'textheight': '1000',
            'baseline': '850',
            'spacing': '600',
            'horzpos': '0',
            'horzsize': '42520',
            'flags': '393216'
        })

        return hp_p

    def _parse_run(self, w_r: etree._Element) -> Tuple[str, List[str], Tuple]:
        """Extracts text, tabs, line breaks, and styling from <w:r>."""
        w_ns = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'

        texts = []
        tabs = []
        for child in w_r:
            tag = etree.QName(child.tag).localname
            if tag == 't':
                texts.append(child.text or '')
            elif tag == 'tab':
                tabs.append('\t')
            elif tag == 'br':
                texts.append('\n')

        full_text = "".join(texts)

        # Style analysis
        r_pr = w_r.find(f'{w_ns}rPr')
        size_pt = 10.0
        is_bold = False
        is_italic = False
        is_underline = False
        color_hex = '#000000'

        if r_pr is not None:
            # Bold
            b_el = r_pr.find(f'{w_ns}b')
            if b_el is not None:
                val = b_el.get(f'{w_ns}val')
                is_bold = (val is None or val.lower() not in ['0', 'false', 'none'])

            # Italic
            i_el = r_pr.find(f'{w_ns}i')
            if i_el is not None:
                val = i_el.get(f'{w_ns}val')
                is_italic = (val is None or val.lower() not in ['0', 'false', 'none'])

            # Underline
            u_el = r_pr.find(f'{w_ns}u')
            if u_el is not None:
                val = u_el.get(f'{w_ns}val')
                is_underline = (val is not None and val.lower() not in ['none', '0'])

            # Size
            sz_el = r_pr.find(f'{w_ns}sz')
            if sz_el is not None:
                sz_val = sz_el.get(f'{w_ns}val')
                if sz_val and sz_val.isdigit():
                    size_pt = int(sz_val) / 2.0  # half-point to pt

            # Color
            col_el = r_pr.find(f'{w_ns}color')
            if col_el is not None:
                col_val = col_el.get(f'{w_ns}val')
                if col_val and col_val.lower() != 'auto':
                    color_hex = '#' + col_val

        return full_text, tabs, (size_pt, is_bold, is_italic, is_underline, color_hex)

    def _convert_table(self, w_tbl: etree._Element, styles: HwpxStyleRegistry,
                       is_first_para: bool, sec_pr_node: Optional[etree._Element],
                       col_pr_node: Optional[etree._Element]) -> etree._Element:
        """Converts Word <w:tbl> to HWPX table wrapped in paragraph <hp:p>."""
        hp_ns = '{http://www.hancom.co.kr/hwpml/2011/paragraph}'
        w_ns = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'

        tbl_id = str(self.tbl_id_counter)
        self.tbl_id_counter += 1

        wrapper_p_id = str(self.para_id_counter)
        self.para_id_counter += 1

        # Extract rows and cols
        w_rows = w_tbl.findall(f'{w_ns}tr')
        num_rows = len(w_rows)

        # Calculate max columns
        num_cols = 0
        for r in w_rows:
            cols_in_r = 0
            for c in r.findall(f'{w_ns}tc'):
                span_el = c.find(f'{w_ns}tcPr/{w_ns}gridSpan')
                cols_in_r += int(span_el.get(f'{w_ns}val', '1')) if span_el is not None else 1
            if cols_in_r > num_cols:
                num_cols = cols_in_r
        num_cols = max(1, num_cols)

        # Default table width: 42520 HWPUNIT (standard A4 text width)
        total_tbl_width = 42520
        total_tbl_height = max(5000, num_rows * 2000)

        # Table border style
        tbl_bf_id = styles.get_or_create_border_fill('SOLID', '#000000', 'none')

        # Wrapper paragraph
        hp_p = etree.Element(f'{hp_ns}p', attrib={
            'id': wrapper_p_id,
            'paraPrIDRef': '0',
            'styleIDRef': '0',
            'pageBreak': '0',
            'columnBreak': '0',
            'merged': '0'
        })

        hp_run = etree.SubElement(hp_p, f'{hp_ns}run', attrib={'charPrIDRef': '0'})

        if is_first_para:
            if sec_pr_node is not None:
                hp_run.append(copy.deepcopy(sec_pr_node))
            if col_pr_node is not None:
                ctrl_el = etree.SubElement(hp_run, f'{hp_ns}ctrl')
                ctrl_el.append(copy.deepcopy(col_pr_node))

        ctrl_tbl = etree.SubElement(hp_run, f'{hp_ns}ctrl')
        hp_tbl = etree.SubElement(ctrl_tbl, f'{hp_ns}tbl', attrib={
            'id': tbl_id,
            'zOrder': '0',
            'numberingType': 'TABLE',
            'textWrap': 'TOP_AND_BOTTOM',
            'textFlow': 'BOTH_SIDES',
            'lock': '0',
            'dropcapstyle': 'None',
            'pageBreak': 'CELL',
            'repeatHeader': '1',
            'rowCnt': str(num_rows),
            'colCnt': str(num_cols),
            'cellSpacing': '0',
            'borderFillIDRef': str(tbl_bf_id),
            'noProtect': '0',
            'editableAtFormMode': '0'
        })

        etree.SubElement(hp_tbl, f'{hp_ns}sz', attrib={
            'width': str(total_tbl_width),
            'widthRelTo': 'ABSOLUTE',
            'height': str(total_tbl_height),
            'heightRelTo': 'ABSOLUTE',
            'protect': '0'
        })
        etree.SubElement(hp_tbl, f'{hp_ns}pos', attrib={
            'treatAsChar': '1',
            'affectLSpacing': '0',
            'flowWithText': '1',
            'allowOverlap': '0',
            'holdAnchorAndSO': '0',
            'vertRelTo': 'PARA',
            'horzRelTo': 'PARA',
            'vertAlign': 'TOP',
            'horzAlign': 'LEFT',
            'vertOffset': '0',
            'horzOffset': '0'
        })
        etree.SubElement(hp_tbl, f'{hp_ns}outMargin', attrib={'left': '0', 'right': '0', 'top': '0', 'bottom': '0'})
        etree.SubElement(hp_tbl, f'{hp_ns}inMargin', attrib={'left': '510', 'right': '510', 'top': '141', 'bottom': '141'})

        # Render rows and cells
        col_width_avg = total_tbl_width // num_cols
        row_height_avg = max(1500, total_tbl_height // max(1, num_rows))

        for r_idx, w_tr in enumerate(w_rows):
            hp_tr = etree.SubElement(hp_tbl, f'{hp_ns}tr')
            w_cells = w_tr.findall(f'{w_ns}tc')

            c_cursor = 0
            for w_tc in w_cells:
                # Spans
                grid_span_el = w_tc.find(f'{w_ns}tcPr/{w_ns}gridSpan')
                col_span = int(grid_span_el.get(f'{w_ns}val', '1')) if grid_span_el is not None else 1

                # Cell width: 1 dxa = 5 HWPUNIT
                w_tc_w = w_tc.find(f'{w_ns}tcPr/{w_ns}tcW')
                if w_tc_w is not None and w_tc_w.get(f'{w_ns}w', '').isdigit():
                    cell_w = int(w_tc_w.get(f'{w_ns}w')) * 5
                else:
                    cell_w = col_width_avg * col_span

                # Background fill color
                shd_el = w_tc.find(f'{w_ns}tcPr/{w_ns}shd')
                cell_fill = 'none'
                if shd_el is not None:
                    fill_val = shd_el.get(f'{w_ns}fill')
                    if fill_val and fill_val.lower() not in ['auto', 'none', 'ffffff']:
                        cell_fill = '#' + fill_val

                cell_bf_id = styles.get_or_create_border_fill('SOLID', '#000000', cell_fill)

                hp_tc = etree.SubElement(hp_tr, f'{hp_ns}tc', attrib={
                    'name': '',
                    'header': '1' if r_idx == 0 else '0',
                    'hasMargin': '0',
                    'protect': '0',
                    'editableAtFormMode': '0',
                    'dirty': '0',
                    'borderFillIDRef': str(cell_bf_id)
                })

                etree.SubElement(hp_tc, f'{hp_ns}cellAddr', attrib={'colAddr': str(c_cursor), 'rowAddr': str(r_idx)})
                etree.SubElement(hp_tc, f'{hp_ns}cellSpan', attrib={'colSpan': str(col_span), 'rowSpan': '1'})
                etree.SubElement(hp_tc, f'{hp_ns}sz', attrib={'width': str(cell_w), 'height': str(row_height_avg)})
                etree.SubElement(hp_tc, f'{hp_ns}cellMargin', attrib={'left': '510', 'right': '510', 'top': '141', 'bottom': '141'})

                # SubList for cell contents
                sub_list = etree.SubElement(hp_tc, f'{hp_ns}subList', attrib={
                    'id': str(self.para_id_counter),
                    'textDirection': 'HORIZONTAL',
                    'lineWrap': 'BREAK',
                    'vertAlign': 'CENTER',
                    'linkListIDRef': '0',
                    'linkListNextIDRef': '0',
                    'textVerticalWidthHead': '0'
                })
                self.para_id_counter += 1

                # Cell paragraphs
                cell_paras = w_tc.findall(f'{w_ns}p')
                if not cell_paras:
                    empty_cell_p = self._create_empty_paragraph(styles, None, None)
                    sub_list.append(empty_cell_p)
                else:
                    for cp in cell_paras:
                        hp_cell_p = self._convert_paragraph(cp, styles, False, None, None)
                        sub_list.append(hp_cell_p)

                c_cursor += col_span

        # Line seg array for table wrapper
        linesegarray = etree.SubElement(hp_p, f'{hp_ns}linesegarray')
        etree.SubElement(linesegarray, f'{hp_ns}lineseg', attrib={
            'textpos': '0',
            'vertpos': '0',
            'vertsize': '1000',
            'textheight': '1000',
            'baseline': '850',
            'spacing': '600',
            'horzpos': '0',
            'horzsize': '42520',
            'flags': '393216'
        })

        return hp_p

    def _create_empty_paragraph(self, styles: HwpxStyleRegistry,
                                sec_pr_node: Optional[etree._Element],
                                col_pr_node: Optional[etree._Element]) -> etree._Element:
        """Creates an empty paragraph."""
        hp_ns = '{http://www.hancom.co.kr/hwpml/2011/paragraph}'
        p_id = str(self.para_id_counter)
        self.para_id_counter += 1

        hp_p = etree.Element(f'{hp_ns}p', attrib={
            'id': p_id,
            'paraPrIDRef': '0',
            'styleIDRef': '0',
            'pageBreak': '0',
            'columnBreak': '0',
            'merged': '0'
        })
        hp_run = etree.SubElement(hp_p, f'{hp_ns}run', attrib={'charPrIDRef': '0'})

        if sec_pr_node is not None:
            hp_run.append(copy.deepcopy(sec_pr_node))
        if col_pr_node is not None:
            ctrl_el = etree.SubElement(hp_run, f'{hp_ns}ctrl')
            ctrl_el.append(copy.deepcopy(col_pr_node))

        etree.SubElement(hp_run, f'{hp_ns}t')

        linesegarray = etree.SubElement(hp_p, f'{hp_ns}linesegarray')
        etree.SubElement(linesegarray, f'{hp_ns}lineseg', attrib={
            'textpos': '0',
            'vertpos': '0',
            'vertsize': '1000',
            'textheight': '1000',
            'baseline': '850',
            'spacing': '600',
            'horzpos': '0',
            'horzsize': '42520',
            'flags': '393216'
        })

        return hp_p


def convert_docx_to_hwpx(docx_input, hwpx_output=None) -> bytes:
    """Convenience helper to convert a DOCX file or bytes into HWPX."""
    converter = DocxToHwpxConverter()
    return converter.convert(docx_input, hwpx_output)

