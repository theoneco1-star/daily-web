@echo off
chcp 65001 > nul
echo ===============================================================
echo   [일상의도움] PDF to HWPX 정밀 레이아웃 복원 API 서버 실행기
echo   FastAPI + pdf2docx + OWPML HWPX 변환 파이프라인
echo ===============================================================
echo.
echo [1/2] 필수 패키지 설치 확인 중...
python -m pip install -q -r backend\requirements.txt
echo [2/2] 변환 API 서버 구동 중...
echo.
echo   * 웹 접속 주소 : http://localhost:8000/pdf-to-hwpx.html
echo   * API 엔드포인트: http://localhost:8000/api/convert-pdf-hwpx
echo   * API 스웨거 문서: http://localhost:8000/docs
echo.
echo 서버를 종료하려면 이 창에서 Ctrl+C를 누르세요.
echo ===============================================================
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
pause

