@echo off
title BhashaSetu AI Launcher
echo ========================================================
echo           Starting BhashaSetu AI Servers
echo ========================================================
echo.
echo Launching Backend Server (FastAPI on http://localhost:8000)...
start "BhashaSetu Backend" cmd /k "python app/main.py"

echo Launching Frontend Web UI (React on http://localhost:3000)...
start "BhashaSetu Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo SUCCESS! Both servers are starting up.
echo Access the App at: http://localhost:3000
echo.
pause
