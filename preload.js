// FILE: preload.js

const { contextBridge, ipcRenderer } = require("electron");

// COMMENT: Expose safe API to the renderer process using context bridge
contextBridge.exposeInMainWorld("api", {
  // Database operations
  saveDataset: (rows) => ipcRenderer.invoke("db:save-dataset", rows),
  getDataset: (sessionId) => ipcRenderer.invoke("db:get-dataset", sessionId),
  saveResult: (sessionId, modelName, metrics) =>
    ipcRenderer.invoke("db:save-result", sessionId, modelName, metrics),
  getResults: () => ipcRenderer.invoke("db:get-results"),

  // Machine learning operations
  preprocess: (selectedFeatures, targetColumn) =>
    ipcRenderer.invoke("ml:preprocess", selectedFeatures, targetColumn),
  trainKNN: (k) => ipcRenderer.invoke("ml:train-knn", k),
  trainSVM: () => ipcRenderer.invoke("ml:train-svm"),
  trainANN: (epochs, learningRate) =>
    ipcRenderer.invoke("ml:train-ann", epochs, learningRate),
  predict: (inputs, modelName) =>
    ipcRenderer.invoke("ml:predict", inputs, modelName),
});
