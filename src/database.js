// FILE: src/database.js

const fs = require("fs");
const path = require("path");

// COMMENT: Initialize in-memory database with file persistence
const dbPath = path.join(__dirname, "..", "data.json");

// In-memory database structure
let db = {
  dataset: [],
  model_results: [],
};

// Load database from file if exists
const loadDatabase = () => {
  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, "utf8");
      db = JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading database:", error);
    db = { dataset: [], model_results: [] };
  }
};

// Save database to file
const saveDatabase = () => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf8");
  } catch (error) {
    console.error("Error saving database:", error);
  }
};

// Load on startup
loadDatabase();

// COMMENT: Save dataset rows to the database
const saveDataset = (sessionId, rows) => {
  try {
    // Clear previous data for this session
    db.dataset = db.dataset.filter((r) => r.session_id !== sessionId);

    // Insert new data
    rows.forEach((row, index) => {
      db.dataset.push({
        id: db.dataset.length + 1,
        session_id: sessionId,
        row_index: index,
        row_data: JSON.stringify(row),
        created_at: new Date().toISOString(),
      });
    });

    saveDatabase();
    return { success: true, rowCount: rows.length };
  } catch (error) {
    console.error("Error saving dataset:", error);
    throw error;
  }
};

// COMMENT: Retrieve dataset rows from the database
const getDataset = (sessionId) => {
  try {
    const rows = db.dataset
      .filter((r) => r.session_id === sessionId)
      .sort((a, b) => a.row_index - b.row_index);

    return rows.map((r) => JSON.parse(r.row_data));
  } catch (error) {
    console.error("Error retrieving dataset:", error);
    throw error;
  }
};

// COMMENT: Save model evaluation results to the database
const saveResult = (sessionId, modelName, metrics) => {
  try {
    db.model_results.push({
      id: db.model_results.length + 1,
      session_id: sessionId,
      model_name: modelName,
      accuracy: metrics.accuracy,
      precision_score: metrics.precision_score,
      recall: metrics.recall,
      f1_score: metrics.f1_score,
      confusion_matrix: metrics.confusion_matrix,
      trained_at: new Date().toISOString(),
    });

    saveDatabase();
    return { success: true };
  } catch (error) {
    console.error("Error saving result:", error);
    throw error;
  }
};

// COMMENT: Retrieve all model results from the database
const getResults = () => {
  try {
    return db.model_results.map((r) => ({
      ...r,
      confusion_matrix:
        typeof r.confusion_matrix === "string"
          ? JSON.parse(r.confusion_matrix)
          : r.confusion_matrix,
    }));
  } catch (error) {
    console.error("Error retrieving results:", error);
    throw error;
  }
};

module.exports = {
  saveDataset,
  getDataset,
  saveResult,
  getResults,
};
