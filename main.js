// FILE: main.js

const fs = require("fs");
const path = require("path");
const startupLogPath = path.join(__dirname, "startup.log");

const logStartupError = (label, error) => {
  const message = `[${new Date().toISOString()}] ${label}: ${error && error.stack ? error.stack : error}\n`;
  fs.appendFileSync(startupLogPath, message, "utf8");
  console.error(message);
};

process.on("uncaughtException", (error) => {
  logStartupError("uncaughtException", error);
});

process.on("unhandledRejection", (error) => {
  logStartupError("unhandledRejection", error);
});

let app;
let BrowserWindow;
let Menu;
let ipcMain;
let db;
let preprocessor;
let knn;
let svm;
let ann;

try {
  ({ app, BrowserWindow, Menu, ipcMain } = require("electron"));
  db = require("./src/database");
  preprocessor = require("./src/preprocessor");
  knn = require("./src/knn");
  svm = require("./src/svm");
  ann = require("./src/ann");
} catch (error) {
  logStartupError("module-load", error);
  throw error;
}

// Try to disable GPU features early to avoid GPU process crashes on restricted systems
try {
  app.commandLine.appendSwitch("disable-gpu");
  app.commandLine.appendSwitch("disable-software-rasterizer");
  if (typeof app.disableHardwareAcceleration === "function") {
    app.disableHardwareAcceleration();
  }
} catch (err) {
  logStartupError("gpu-disable", err);
}

let mainWindow;
let currentSessionId = `session_${Date.now()}`;
let currentDataset = null;
let preprocessedData = null;
let trainedModels = {};

// COMMENT: Create the main application window
function createWindow() {
  try {
    logStartupError("createWindow", "starting window creation");
    if (Menu && typeof Menu.setApplicationMenu === "function") {
      Menu.setApplicationMenu(null);
    }

    mainWindow = new BrowserWindow({
      width: 1280,
      height: 800,
      resizable: true,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js"),
      },
    });

    mainWindow.on("closed", () => {
      logStartupError("window-closed", "main window closed");
      mainWindow = null;
    });

    mainWindow.webContents.on(
      "did-fail-load",
      (_event, errorCode, errorDescription, validatedURL) => {
        logStartupError(
          "did-fail-load",
          `${errorCode} ${errorDescription} ${validatedURL}`,
        );
      },
    );

    mainWindow.webContents.on("render-process-gone", (_event, details) => {
      logStartupError("render-process-gone", JSON.stringify(details));
    });

    mainWindow.loadFile(path.join(__dirname, "renderer", "index.html"));
    logStartupError("createWindow", "loadFile called");
  } catch (error) {
    logStartupError("createWindow", error);
    throw error;
  }
}

// COMMENT: App lifecycle handlers
app.whenReady().then(() => {
  logStartupError("app-ready", "app.whenReady resolved");
  createWindow();
});

app.on("window-all-closed", () => {
  logStartupError("window-all-closed", process.platform);
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  logStartupError("activate", "app activate event");
  if (mainWindow === null) {
    createWindow();
  }
});

// ===== IPC HANDLERS =====

// COMMENT: Save dataset to database
ipcMain.handle("db:save-dataset", async (event, rows) => {
  try {
    currentDataset = rows;
    currentSessionId = `session_${Date.now()}`;
    db.saveDataset(currentSessionId, rows);
    return {
      success: true,
      sessionId: currentSessionId,
      rowCount: rows.length,
    };
  } catch (error) {
    console.error("Error saving dataset:", error);
    return { success: false, error: error.message };
  }
});

// COMMENT: Retrieve dataset from database
ipcMain.handle("db:get-dataset", async (event, sessionId) => {
  try {
    const rows = db.getDataset(sessionId);
    return { success: true, rows };
  } catch (error) {
    console.error("Error retrieving dataset:", error);
    return { success: false, error: error.message };
  }
});

// COMMENT: Save model evaluation results to database
ipcMain.handle(
  "db:save-result",
  async (event, sessionId, modelName, metrics) => {
    try {
      db.saveResult(sessionId, modelName, metrics);
      return { success: true };
    } catch (error) {
      console.error("Error saving result:", error);
      return { success: false, error: error.message };
    }
  },
);

// COMMENT: Retrieve all saved model results
ipcMain.handle("db:get-results", async (event) => {
  try {
    const results = db.getResults();
    return { success: true, results };
  } catch (error) {
    console.error("Error retrieving results:", error);
    return { success: false, error: error.message };
  }
});

// COMMENT: Preprocess dataset
ipcMain.handle(
  "ml:preprocess",
  async (event, selectedFeatures, targetColumn) => {
    try {
      if (!currentDataset) {
        return { success: false, error: "No dataset loaded" };
      }

      preprocessedData = preprocessor.preprocess(
        currentDataset,
        selectedFeatures,
        targetColumn,
      );
      return { success: true, data: preprocessedData };
    } catch (error) {
      console.error("Error preprocessing data:", error);
      return { success: false, error: error.message };
    }
  },
);

// COMMENT: Train KNN model
ipcMain.handle("ml:train-knn", async (event, k) => {
  try {
    if (!preprocessedData) {
      return { success: false, error: "Data not preprocessed" };
    }

    const { trainX, trainY, testX, testY } = preprocessedData;
    const result = knn.trainKNN(trainX, trainY, testX, testY, k);

    trainedModels.knn = result;

    // Save to database
    db.saveResult(currentSessionId, "KNN", {
      accuracy: result.accuracy,
      precision_score: result.precision,
      recall: result.recall,
      f1_score: result.f1Score,
      confusion_matrix: JSON.stringify(result.confusionMatrix),
    });

    return { success: true, result };
  } catch (error) {
    console.error("Error training KNN:", error);
    return { success: false, error: error.message };
  }
});

// COMMENT: Train SVM model
ipcMain.handle("ml:train-svm", async (event) => {
  try {
    if (!preprocessedData) {
      return { success: false, error: "Data not preprocessed" };
    }

    const { trainX, trainY, testX, testY } = preprocessedData;
    const result = await svm.trainSVM(trainX, trainY, testX, testY);

    trainedModels.svm = result;

    // Save to database
    db.saveResult(currentSessionId, "SVM", {
      accuracy: result.accuracy,
      precision_score: result.precision,
      recall: result.recall,
      f1_score: result.f1Score,
      confusion_matrix: JSON.stringify(result.confusionMatrix),
    });

    return { success: true, result };
  } catch (error) {
    console.error("Error training SVM:", error);
    return { success: false, error: error.message };
  }
});

// COMMENT: Train ANN model
ipcMain.handle("ml:train-ann", async (event, epochs, learningRate) => {
  try {
    if (!preprocessedData) {
      return { success: false, error: "Data not preprocessed" };
    }

    const { trainX, trainY, testX, testY } = preprocessedData;
    const result = ann.trainANN(
      trainX,
      trainY,
      testX,
      testY,
      epochs,
      learningRate,
    );

    trainedModels.ann = result;

    // Save to database
    db.saveResult(currentSessionId, "ANN", {
      accuracy: result.accuracy,
      precision_score: result.precision,
      recall: result.recall,
      f1_score: result.f1Score,
      confusion_matrix: JSON.stringify(result.confusionMatrix),
    });

    return { success: true, result };
  } catch (error) {
    console.error("Error training ANN:", error);
    return { success: false, error: error.message };
  }
});

// COMMENT: Make prediction using trained model
ipcMain.handle("ml:predict", async (event, inputs, modelName) => {
  try {
    if (!trainedModels[modelName.toLowerCase()]) {
      return { success: false, error: `Model ${modelName} not trained yet` };
    }

    const model = trainedModels[modelName.toLowerCase()];
    let prediction;

    if (modelName === "KNN") {
      prediction = knn.predictSingle(model, inputs);
    } else if (modelName === "SVM") {
      prediction = svm.predictSingle(model, inputs);
    } else if (modelName === "ANN") {
      prediction = ann.predictSingle(model, inputs);
    }

    return { success: true, prediction };
  } catch (error) {
    console.error("Error making prediction:", error);
    return { success: false, error: error.message };
  }
});
