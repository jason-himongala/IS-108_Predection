const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const extract = require("extract-zip");

const projectRoot = path.resolve(__dirname, "..");
const electronPackageDir = path.join(projectRoot, "node_modules", "electron");
const electronDistDir = path.join(electronPackageDir, "dist");
const electronExe = path.join(electronDistDir, "electron.exe");
const bundledRuntimeZip = path.join(projectRoot, "electron-runtime.zip");

async function ensureElectronRuntime() {
  if (fs.existsSync(electronExe)) {
    return electronExe;
  }

  if (!fs.existsSync(bundledRuntimeZip)) {
    throw new Error(
      `Electron runtime not found at ${electronExe} and bundled fallback zip is missing at ${bundledRuntimeZip}`,
    );
  }

  fs.mkdirSync(electronDistDir, { recursive: true });
  await extract(bundledRuntimeZip, { dir: electronDistDir });

  if (!fs.existsSync(electronExe)) {
    throw new Error(
      `Electron runtime extraction completed, but ${electronExe} was not created`,
    );
  }

  return electronExe;
}

async function main() {
  try {
    const electronRuntime = await ensureElectronRuntime();
    const child = spawn(electronRuntime, [projectRoot], {
      stdio: "inherit",
      windowsHide: false,
    });

    child.on("error", (error) => {
      console.error("Failed to start Electron:", error);
      process.exitCode = 1;
    });

    child.on("exit", (code) => {
      process.exitCode = code ?? 0;
    });
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}

main();
