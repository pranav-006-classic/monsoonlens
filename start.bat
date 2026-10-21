@echo off
echo ==========================================================
echo Starting MonsoonLens - Operational Meteorological Console
echo ==========================================================

start "MonsoonLens Backend (FastAPI)" cmd /k "cd /d %~dp0backend && .\venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"
timeout /t 3 /nobreak >nul
start "MonsoonLens Frontend (Vite + React)" cmd /k "cd /d %~dp0frontend && npm.cmd run dev -- --host"

echo Services launched:
echo Backend:  http://127.0.0.1:8000  (API docs: http://127.0.0.1:8000/docs)
echo Frontend: http://localhost:5173
echo ==========================================================
