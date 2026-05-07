@echo off
setlocal

echo ========================================
echo IS108 BI App - Run Script
echo ========================================
echo.

set "APP_DIR=%~dp0"
set "RUNTIME_ZIP=%APP_DIR%electron-runtime.zip"
set "RUNTIME_DIR=%TEMP%\is108-electron-runtime"
set "RUNTIME_EXE=%RUNTIME_DIR%\electron.exe"

if not exist "%RUNTIME_ZIP%" (
  echo [ERROR] Bundled Electron runtime was not found.
  echo Expected file: %RUNTIME_ZIP%
  pause
  exit /b 1
)

if not exist "%RUNTIME_EXE%" (
  echo [1/2] Preparing local Electron runtime...
  if not exist "%RUNTIME_DIR%" mkdir "%RUNTIME_DIR%"
  %SystemRoot%\System32\tar.exe -xf "%RUNTIME_ZIP%" -C "%RUNTIME_DIR%"
  if errorlevel 1 (
    echo.
    echo [ERROR] Failed to extract the bundled Electron runtime.
    pause
    exit /b 1
  )
)

echo.
echo [2/2] Starting application...
pushd "%APP_DIR%"
"%RUNTIME_EXE%" .
set "APP_EXIT_CODE=%ERRORLEVEL%"
popd

if not "%APP_EXIT_CODE%"=="0" (
  echo.
  echo [ERROR] App failed to start.
  echo Exit code: %APP_EXIT_CODE%
)

echo.
pause
endlocal
