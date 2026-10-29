"""
Automated Pipeline Verification Test for PDF -> DOCX -> HWPX
"""

import os
import fitz
from fastapi.testclient import TestClient
from backend.main import app

def run_test():
    client = TestClient(app)

    # 1. Health check
    res = client.get("/api/health")
    assert res.status_code == 200, f"Health check failed: {res.text}"
    print("[PASS] Health check OK:", res.json())

    # 2. Create small test PDF
    doc = fitz.open()
    page = doc.new_page()
    page.insert_text((50, 72), 'Automated Pipeline Test Document', fontsize=16)
    page.insert_text((50, 110), 'Chapter 1. Section Title', fontsize=12)

    # Simple 2x2 table
    rect = fitz.Rect(50, 140, 400, 220)
    page.draw_rect(rect, color=(0,0,0), width=1)
    page.draw_line((50, 180), (400, 180), color=(0,0,0), width=1)
    page.draw_line((225, 140), (225, 220), color=(0,0,0), width=1)
    page.insert_text((60, 165), 'Col 1 Header', fontsize=10)
    page.insert_text((235, 165), 'Col 2 Header', fontsize=10)
    page.insert_text((60, 205), 'Val A', fontsize=10)
    page.insert_text((235, 205), 'Val B', fontsize=10)

    pdf_bytes = doc.tobytes()
    doc.close()

    # 3. Call API
    files = {"file": ("test_verify.pdf", pdf_bytes, "application/pdf")}
    res2 = client.post("/api/convert-pdf-hwpx", files=files)
    assert res2.status_code == 200, f"API convert failed: {res2.text}"
    assert len(res2.content) > 1000, "HWPX size too small"
    assert res2.headers.get("content-type") == "application/hwp+zip", "MIME type mismatch"

    print("[PASS] PDF to HWPX conversion OK:")
    print(f"  Pages: {res2.headers.get('x-total-pages')}")
    print(f"  Tables: {res2.headers.get('x-total-tables')}")
    print(f"  Paragraphs: {res2.headers.get('x-total-paragraphs')}")
    print(f"  HWPX Size: {len(res2.content)} bytes")
    print("\nAll pipeline verification checks completed successfully!")

if __name__ == "__main__":
    run_test()

