@echo off
setlocal

echo ========================================
echo IS108 BI App - Run Script
echo ========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js is not installed or not in PATH.
  echo Please install Node.js 18+ from https://nodejs.org/
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm is not installed or not in PATH.
  pause
  exit /b 1
)

echo [1/2] Installing dependencies...
call npm install
if errorlevel 1 (
  echo.
  echo [ERROR] npm install failed.
  pause
  exit /b 1
)

echo.
echo [2/2] Starting application...
call npm start
if errorlevel 1 (
  echo.
  echo [ERROR] App failed to start.
)

echo.
pause
endlocal
