"""
FastAPI Server for PDF to HWPX Layout Restoration & Conversion API
Provides:
  - POST /api/convert-pdf-hwpx : High-precision PDF to HWPX conversion
  - GET  /api/health            : Server health check
  - Static hosting for Daily Helper Web App
"""

import os
import urllib.parse
import tempfile
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import Response, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from backend.converter import PdfToHwpxPipeline

app = FastAPI(
    title="Daily Helper PDF to HWPX API",
    description="High-precision PDF to Hancom Office HWPX Converter with layout restoration",
    version="2.0.0"
)

# Enable CORS for all origins so frontend on any port/domain can access API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=[
        "Content-Disposition",
        "X-Total-Pages",
        "X-Total-Paragraphs",
        "X-Total-Tables",
        "X-Total-Chars",
        "X-File-Name"
    ]
)

pipeline = PdfToHwpxPipeline()


@app.get("/api/health")
async def health_check():
    """Health check endpoint to verify backend status."""
    return {
        "status": "ok",
        "service": "PDF to HWPX Converter API",
        "engine": "FastAPI + pdf2docx + OWPML Builder",
        "version": "2.0.0"
    }


@app.post("/api/convert-pdf-hwpx")
async def convert_pdf_to_hwpx(file: UploadFile = File(...)):
    """
    Receives PDF via multipart FormData, reconstructs layout with pdf2docx,
    and returns a valid Hancom Office (.hwpx) package as a streaming file response.
    """
    original_filename = file.filename or "document.pdf"
    if not original_filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files (.pdf) are supported.")

    base_name = os.path.splitext(original_filename)[0]
    output_filename = f"{base_name}.hwpx"

    # Save uploaded bytes to a temporary PDF file
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_pdf:
            tmp_pdf_path = tmp_pdf.name
            content = await file.read()
            if not content:
                raise HTTPException(status_code=400, detail="Uploaded file is empty.")
            tmp_pdf.write(content)

        # Execute conversion pipeline
        hwpx_bytes, stats = pipeline.convert_pdf_to_hwpx(tmp_pdf_path)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Conversion error occurred: {str(e)}"
        )
    finally:
        # Cleanup temp file
        if 'tmp_pdf_path' in locals() and os.path.exists(tmp_pdf_path):
            try:
                os.remove(tmp_pdf_path)
            except OSError:
                pass

    # Encode filename for Content-Disposition (RFC 5987 / UTF-8)
    quoted_filename = urllib.parse.quote(output_filename)
    ascii_filename = "document.hwpx"

    headers = {
        "Content-Disposition": f'attachment; filename="{ascii_filename}"; filename*=UTF-8\'\'{quoted_filename}',
        "X-Total-Pages": str(stats.get("totalPages", 1)),
        "X-Total-Paragraphs": str(stats.get("totalParagraphs", 0)),
        "X-Total-Tables": str(stats.get("totalTables", 0)),
        "X-Total-Chars": str(stats.get("totalChars", 0)),
        "X-File-Name": quoted_filename,
        "Access-Control-Expose-Headers": "Content-Disposition, X-Total-Pages, X-Total-Paragraphs, X-Total-Tables, X-Total-Chars, X-File-Name"
    }

    return Response(
        content=hwpx_bytes,
        media_type="application/hwp+zip",
        headers=headers
    )


# Mount static root to serve frontend if running from backend server
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if os.path.exists(project_root):
    app.mount("/", StaticFiles(directory=project_root, html=True), name="static")


if __name__ == "__main__":
    import uvicorn
    print("=" * 60)
    print(" Daily Helper PDF to HWPX Converter API Server")
    print(" Server URL: http://localhost:8000")
    print(" Web Page  : http://localhost:8000/pdf-to-hwpx.html")
    print(" API Doc   : http://localhost:8000/docs")
    print("=" * 60)
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)

