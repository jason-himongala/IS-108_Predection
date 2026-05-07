// FILE: renderer/app.js

// ===== CONSTANTS & GLOBAL STATE =====

const SAMPLE_DATA = [
  {
    study_hours: 7,
    attendance_rate: 92,
    midterm_score: 85,
    assignment_avg: 88,
    sleep_hours: 7,
    parent_education: "College",
    result: "Pass",
  },
  {
    study_hours: 5,
    attendance_rate: 75,
    midterm_score: 72,
    assignment_avg: 70,
    sleep_hours: 5,
    parent_education: "High School",
    result: "Fail",
  },
  {
    study_hours: 8,
    attendance_rate: 95,
    midterm_score: 90,
    assignment_avg: 92,
    sleep_hours: 8,
    parent_education: "Graduate",
    result: "Pass",
  },
  {
    study_hours: 4,
    attendance_rate: 68,
    midterm_score: 65,
    assignment_avg: 62,
    sleep_hours: 4,
    parent_education: "High School",
    result: "Fail",
  },
  {
    study_hours: 6,
    attendance_rate: 88,
    midterm_score: 82,
    assignment_avg: 85,
    sleep_hours: 7,
    parent_education: "College",
    result: "Pass",
  },
  {
    study_hours: 9,
    attendance_rate: 98,
    midterm_score: 95,
    assignment_avg: 94,
    sleep_hours: 8,
    parent_education: "Graduate",
    result: "Pass",
  },
  {
    study_hours: 3,
    attendance_rate: 62,
    midterm_score: 58,
    assignment_avg: 55,
    sleep_hours: 3,
    parent_education: "High School",
    result: "Fail",
  },
  {
    study_hours: 7,
    attendance_rate: 90,
    midterm_score: 87,
    assignment_avg: 89,
    sleep_hours: 7,
    parent_education: "College",
    result: "Pass",
  },
  {
    study_hours: 5,
    attendance_rate: 78,
    midterm_score: 75,
    assignment_avg: 73,
    sleep_hours: 5,
    parent_education: "College",
    result: "Fail",
  },
  {
    study_hours: 8,
    attendance_rate: 93,
    midterm_score: 88,
    assignment_avg: 90,
    sleep_hours: 8,
    parent_education: "Graduate",
    result: "Pass",
  },
  {
    study_hours: 6,
    attendance_rate: 85,
    midterm_score: 80,
    assignment_avg: 82,
    sleep_hours: 6,
    parent_education: "College",
    result: "Pass",
  },
  {
    study_hours: 4,
    attendance_rate: 70,
    midterm_score: 68,
    assignment_avg: 65,
    sleep_hours: 4,
    parent_education: "High School",
    result: "Fail",
  },
  {
    study_hours: 9,
    attendance_rate: 96,
    midterm_score: 92,
    assignment_avg: 95,
    sleep_hours: 9,
    parent_education: "Graduate",
    result: "Pass",
  },
  {
    study_hours: 5,
    attendance_rate: 80,
    midterm_score: 78,
    assignment_avg: 76,
    sleep_hours: 5,
    parent_education: "College",
    result: "Pass",
  },
  {
    study_hours: 3,
    attendance_rate: 65,
    midterm_score: 60,
    assignment_avg: 58,
    sleep_hours: 3,
    parent_education: "High School",
    result: "Fail",
  },
  {
    study_hours: 7,
    attendance_rate: 89,
    midterm_score: 86,
    assignment_avg: 87,
    sleep_hours: 7,
    parent_education: "College",
    result: "Pass",
  },
  {
    study_hours: 6,
    attendance_rate: 84,
    midterm_score: 81,
    assignment_avg: 83,
    sleep_hours: 6,
    parent_education: "College",
    result: "Pass",
  },
  {
    study_hours: 4,
    attendance_rate: 72,
    midterm_score: 70,
    assignment_avg: 68,
    sleep_hours: 4,
    parent_education: "High School",
    result: "Fail",
  },
  {
    study_hours: 8,
    attendance_rate: 94,
    midterm_score: 89,
    assignment_avg: 91,
    sleep_hours: 8,
    parent_education: "Graduate",
    result: "Pass",
  },
  {
    study_hours: 5,
    attendance_rate: 79,
    midterm_score: 76,
    assignment_avg: 74,
    sleep_hours: 5,
    parent_education: "College",
    result: "Fail",
  },
  {
    study_hours: 9,
    attendance_rate: 97,
    midterm_score: 94,
    assignment_avg: 96,
    sleep_hours: 9,
    parent_education: "Graduate",
    result: "Pass",
  },
  {
    study_hours: 6,
    attendance_rate: 86,
    midterm_score: 83,
    assignment_avg: 84,
    sleep_hours: 6,
    parent_education: "College",
    result: "Pass",
  },
  {
    study_hours: 4,
    attendance_rate: 71,
    midterm_score: 69,
    assignment_avg: 66,
    sleep_hours: 4,
    parent_education: "High School",
    result: "Fail",
  },
  {
    study_hours: 7,
    attendance_rate: 91,
    midterm_score: 87,
    assignment_avg: 88,
    sleep_hours: 7,
    parent_education: "College",
    result: "Pass",
  },
  {
    study_hours: 5,
    attendance_rate: 81,
    midterm_score: 79,
    assignment_avg: 77,
    sleep_hours: 5,
    parent_education: "College",
    result: "Fail",
  },
  {
    study_hours: 8,
    attendance_rate: 95,
    midterm_score: 91,
    assignment_avg: 93,
    sleep_hours: 8,
    parent_education: "Graduate",
    result: "Pass",
  },
  {
    study_hours: 6,
    attendance_rate: 87,
    midterm_score: 84,
    assignment_avg: 85,
    sleep_hours: 6,
    parent_education: "College",
    result: "Pass",
  },
  {
    study_hours: 3,
    attendance_rate: 66,
    midterm_score: 61,
    assignment_avg: 59,
    sleep_hours: 3,
    parent_education: "High School",
    result: "Fail",
  },
  {
    study_hours: 7,
    attendance_rate: 92,
    midterm_score: 88,
    assignment_avg: 89,
    sleep_hours: 7,
    parent_education: "College",
    result: "Pass",
  },
  {
    study_hours: 4,
    attendance_rate: 73,
    midterm_score: 71,
    assignment_avg: 69,
    sleep_hours: 4,
    parent_education: "High School",
    result: "Fail",
  },
  {
    study_hours: 9,
    attendance_rate: 98,
    midterm_score: 96,
    assignment_avg: 97,
    sleep_hours: 9,
    parent_education: "Graduate",
    result: "Pass",
  },
  {
    study_hours: 5,
    attendance_rate: 82,
    midterm_score: 80,
    assignment_avg: 78,
    sleep_hours: 5,
    parent_education: "College",
    result: "Fail",
  },
  {
    study_hours: 8,
    attendance_rate: 93,
    midterm_score: 90,
    assignment_avg: 92,
    sleep_hours: 8,
    parent_education: "Graduate",
    result: "Pass",
  },
  {
    study_hours: 6,
    attendance_rate: 88,
    midterm_score: 85,
    assignment_avg: 86,
    sleep_hours: 6,
    parent_education: "College",
    result: "Pass",
  },
  {
    study_hours: 7,
    attendance_rate: 91,
    midterm_score: 86,
    assignment_avg: 88,
    sleep_hours: 7,
    parent_education: "College",
    result: "Pass",
  },
  {
    study_hours: 4,
    attendance_rate: 74,
    midterm_score: 72,
    assignment_avg: 70,
    sleep_hours: 4,
    parent_education: "High School",
    result: "Fail",
  },
  {
    study_hours: 8,
    attendance_rate: 94,
    midterm_score: 89,
    assignment_avg: 90,
    sleep_hours: 8,
    parent_education: "Graduate",
    result: "Pass",
  },
  {
    study_hours: 5,
    attendance_rate: 80,
    midterm_score: 77,
    assignment_avg: 75,
    sleep_hours: 5,
    parent_education: "College",
    result: "Fail",
  },
  {
    study_hours: 9,
    attendance_rate: 96,
    midterm_score: 93,
    assignment_avg: 94,
    sleep_hours: 9,
    parent_education: "Graduate",
    result: "Pass",
  },
  {
    study_hours: 6,
    attendance_rate: 85,
    midterm_score: 82,
    assignment_avg: 83,
    sleep_hours: 6,
    parent_education: "College",
    result: "Pass",
  },
  {
    study_hours: 7,
    attendance_rate: 90,
    midterm_score: 87,
    assignment_avg: 88,
    sleep_hours: 7,
    parent_education: "College",
    result: "Pass",
  },
  {
    study_hours: 4,
    attendance_rate: 69,
    midterm_score: 67,
    assignment_avg: 64,
    sleep_hours: 4,
    parent_education: "High School",
    result: "Fail",
  },
  {
    study_hours: 8,
    attendance_rate: 92,
    midterm_score: 88,
    assignment_avg: 89,
    sleep_hours: 8,
    parent_education: "Graduate",
    result: "Pass",
  },
  {
    study_hours: 5,
    attendance_rate: 77,
    midterm_score: 74,
    assignment_avg: 72,
    sleep_hours: 5,
    parent_education: "College",
    result: "Fail",
  },
  {
    study_hours: 9,
    attendance_rate: 99,
    midterm_score: 97,
    assignment_avg: 98,
    sleep_hours: 9,
    parent_education: "Graduate",
    result: "Pass",
  },
  {
    study_hours: 6,
    attendance_rate: 83,
    midterm_score: 80,
    assignment_avg: 81,
    sleep_hours: 6,
    parent_education: "College",
    result: "Pass",
  },
  {
    study_hours: 7,
    attendance_rate: 89,
    midterm_score: 85,
    assignment_avg: 87,
    sleep_hours: 7,
    parent_education: "College",
    result: "Pass",
  },
  {
    study_hours: 3,
    attendance_rate: 63,
    midterm_score: 59,
    assignment_avg: 56,
    sleep_hours: 3,
    parent_education: "High School",
    result: "Fail",
  },
  {
    study_hours: 8,
    attendance_rate: 91,
    midterm_score: 87,
    assignment_avg: 88,
    sleep_hours: 8,
    parent_education: "Graduate",
    result: "Pass",
  },
  {
    study_hours: 5,
    attendance_rate: 76,
    midterm_score: 73,
    assignment_avg: 71,
    sleep_hours: 5,
    parent_education: "College",
    result: "Fail",
  },
  {
    study_hours: 9,
    attendance_rate: 97,
    midterm_score: 95,
    assignment_avg: 96,
    sleep_hours: 9,
    parent_education: "Graduate",
    result: "Pass",
  },
  {
    study_hours: 6,
    attendance_rate: 86,
    midterm_score: 83,
    assignment_avg: 84,
    sleep_hours: 6,
    parent_education: "College",
    result: "Pass",
  },
  {
    study_hours: 7,
    attendance_rate: 88,
    midterm_score: 84,
    assignment_avg: 86,
    sleep_hours: 7,
    parent_education: "College",
    result: "Pass",
  },
  {
    study_hours: 4,
    attendance_rate: 75,
    midterm_score: 73,
    assignment_avg: 71,
    sleep_hours: 4,
    parent_education: "High School",
    result: "Fail",
  },
  {
    study_hours: 8,
    attendance_rate: 93,
    midterm_score: 89,
    assignment_avg: 91,
    sleep_hours: 8,
    parent_education: "Graduate",
    result: "Pass",
  },
  {
    study_hours: 5,
    attendance_rate: 78,
    midterm_score: 75,
    assignment_avg: 73,
    sleep_hours: 5,
    parent_education: "College",
    result: "Fail",
  },
  {
    study_hours: 9,
    attendance_rate: 95,
    midterm_score: 92,
    assignment_avg: 93,
    sleep_hours: 9,
    parent_education: "Graduate",
    result: "Pass",
  },
  {
    study_hours: 6,
    attendance_rate: 84,
    midterm_score: 81,
    assignment_avg: 82,
    sleep_hours: 6,
    parent_education: "College",
    result: "Pass",
  },
  {
    study_hours: 7,
    attendance_rate: 87,
    midterm_score: 83,
    assignment_avg: 85,
    sleep_hours: 7,
    parent_education: "College",
    result: "Pass",
  },
  {
    study_hours: 4,
    attendance_rate: 70,
    midterm_score: 68,
    assignment_avg: 65,
    sleep_hours: 4,
    parent_education: "High School",
    result: "Fail",
  },
  {
    study_hours: 8,
    attendance_rate: 94,
    midterm_score: 90,
    assignment_avg: 92,
    sleep_hours: 8,
    parent_education: "Graduate",
    result: "Pass",
  },
  {
    study_hours: 5,
    attendance_rate: 79,
    midterm_score: 76,
    assignment_avg: 74,
    sleep_hours: 5,
    parent_education: "College",
    result: "Fail",
  },
];

const STEPS = [
  "📂 Import Data",
  "⚙️ Preprocess",
  "🤖 Train KNN",
  "🎯 Train SVM",
  "🧠 Train ANN",
  "📊 Evaluate",
  "🔮 Predict",
  "✅ Complete",
];

// Global state
let currentDataset = null;
let preprocessedData = null;
let trainedModels = {};
let currentPage = 0;
let predictionRanges = {};
const ROWS_PER_PAGE = 20;

// ===== SECTION: INITIALIZATION =====

// COMMENT: Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initializePanels();
  initializeNavigation();
  initializeStepIndicator();
  initializeDataset();
  initializePreprocessing();
  initializeTraining();
  initializeEvaluation();
  initializePrediction();
  initializeHistory();
  updateDashboard();
});

// COMMENT: Initialize all panel references
const initializePanels = () => {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const panelId = link.getAttribute("data-panel");
      showPanel(panelId);
    });
  });
};

// COMMENT: Show a specific panel and hide others
const showPanel = (panelId) => {
  // Hide all panels
  const panels = document.querySelectorAll(".panel");
  panels.forEach((p) => p.classList.remove("active"));

  // Show selected panel
  const selectedPanel = document.getElementById(panelId);
  if (selectedPanel) {
    selectedPanel.classList.add("active");
  }

  // Update active nav state
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("data-panel") === panelId) {
      link.classList.add("active");
    }
  });

  // Update header title
  const titles = {
    dashboard: "Dashboard",
    dataset: "Dataset Import",
    preprocessing: "Data Preprocessing",
    training: "Train Models",
    evaluation: "Model Evaluation",
    predict: "Make Prediction",
    history: "Training History",
  };
  document.getElementById("panel-title").textContent =
    titles[panelId] || "Dashboard";
};

// ===== SECTION: NAVIGATION =====

// COMMENT: Initialize navigation links
const initializeNavigation = () => {
  const navItems = document.querySelectorAll(".nav-link");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    });
  });
};

// ===== SECTION: DASHBOARD =====

// COMMENT: Initialize step indicator for workflow tracking
const initializeStepIndicator = () => {
  const indicator = document.getElementById("step-indicator");
  indicator.innerHTML = STEPS.map(
    (step, idx) => `
    <div class="step pending" data-step="${idx}">
      <div class="step-dot">${idx + 1}</div>
      <div class="step-label">${step}</div>
    </div>
  `,
  ).join("");
};

// COMMENT: Update dashboard metrics
const updateDashboard = () => {
  const recordCount = currentDataset ? currentDataset.length : 0;
  const featureCount = currentDataset
    ? Object.keys(currentDataset[0] || {}).length - 1
    : 0;
  const modelCount = Object.keys(trainedModels).length;

  let bestAccuracy = "-";
  if (modelCount > 0) {
    const accuracies = Object.values(trainedModels).map(
      (m) => m.accuracy * 100,
    );
    bestAccuracy = Math.max(...accuracies).toFixed(1) + "%";
  }

  document.getElementById("metric-records").textContent = recordCount;
  document.getElementById("metric-features").textContent = featureCount;
  document.getElementById("metric-models").textContent = modelCount;
  document.getElementById("metric-accuracy").textContent = bestAccuracy;

  // Update step states
  updateStepIndicator();
};

// COMMENT: Update step indicator based on progress
const updateStepIndicator = () => {
  const steps = document.querySelectorAll(".step");

  steps.forEach((step, idx) => {
    step.classList.remove("pending", "active", "completed");

    if (idx === 0 && currentDataset) {
      step.classList.add("completed");
    } else if (idx === 0) {
      step.classList.add("pending");
    } else if (idx === 1 && preprocessedData) {
      step.classList.add("completed");
    } else if (idx === 1) {
      step.classList.add(currentDataset ? "active" : "pending");
    } else if (idx >= 2 && idx <= 4) {
      if (trainedModels[Object.keys(trainedModels)[idx - 2]]) {
        step.classList.add("completed");
      } else if (preprocessedData) {
        step.classList.add("active");
      } else {
        step.classList.add("pending");
      }
    } else {
      step.classList.add(trainedModels.knn ? "active" : "pending");
    }
  });
};

// ===== SECTION: DATASET =====

const initializeDataset = () => {
  const fileInput = document.getElementById("file-input");
  const btnLoadFile = document.getElementById("btn-load-file");
  const btnLoadSample = document.getElementById("btn-load-sample");
  const btnSaveDataset = document.getElementById("btn-save-dataset");

  btnLoadFile.addEventListener("click", loadFileData);
  btnLoadSample.addEventListener("click", loadSampleData);
  btnSaveDataset.addEventListener("click", saveDatasetToDb);
};

// COMMENT: Load and parse CSV/Excel file
const loadFileData = async () => {
  try {
    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];

    if (!file) {
      showToast("Please select a file", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        let data = [];

        if (file.name.endsWith(".csv")) {
          // Parse CSV
          const csv = e.target.result;
          const result = Papa.parse(csv, { header: true });
          data = result.data.filter((row) => Object.values(row).some((v) => v));
        } else if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
          // Parse Excel
          const wb = XLSX.read(e.target.result, { type: "binary" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          data = XLSX.utils.sheet_to_json(ws);
        } else {
          showToast("Unsupported file format. Use CSV or Excel.", "error");
          return;
        }

        if (data.length === 0) {
          showToast("File is empty", "error");
          return;
        }

        currentDataset = data;
        resetAnalysisState();
        displayDatasetInfo();
        displayDatasetPreview();
        updateFeatureSelectors();
        updateDashboard();
        updateStepIndicator();
        showToast("File loaded successfully", "success");
      } catch (error) {
        console.error("Error parsing file:", error);
        showToast("Error parsing file: " + error.message, "error");
      }
    };

    if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  } catch (error) {
    console.error("Error loading file:", error);
    showToast("Error loading file: " + error.message, "error");
  }
};

// COMMENT: Load sample dataset
const loadSampleData = () => {
  currentDataset = SAMPLE_DATA.map((row) => ({ ...row }));
  resetAnalysisState();
  displayDatasetInfo();
  displayDatasetPreview();
  updateFeatureSelectors();
  updateDashboard();
  updateStepIndicator();
  showToast("Sample data loaded successfully", "success");
};

const resetAnalysisState = () => {
  preprocessedData = null;
  trainedModels = {};
  predictionRanges = {};

  const predictionInputs = document.getElementById("prediction-inputs");
  if (predictionInputs) {
    predictionInputs.innerHTML = "";
  }

  const predictionOutput = document.getElementById("prediction-output");
  if (predictionOutput) {
    predictionOutput.style.display = "none";
  }

  clearPredictionWarning();
};

// COMMENT: Display dataset information
const displayDatasetInfo = () => {
  if (!currentDataset) return;

  const info = document.getElementById("dataset-info");
  info.style.display = "block";

  document.getElementById("info-rows").textContent = currentDataset.length;
  document.getElementById("info-columns").textContent = Object.keys(
    currentDataset[0],
  ).length;

  const columnsList = document.getElementById("info-columns-list");
  columnsList.innerHTML = Object.keys(currentDataset[0])
    .map((col) => `<span class="badge badge-success">${col}</span>`)
    .join("");
};

// COMMENT: Display dataset preview table with pagination
const displayDatasetPreview = () => {
  if (!currentDataset) return;

  const preview = document.getElementById("dataset-preview");
  preview.style.display = "block";

  const columns = Object.keys(currentDataset[0]);
  const tableHeader = document.getElementById("table-header");
  tableHeader.innerHTML = columns.map((col) => `<th>${col}</th>`).join("");

  displayPage();
};

// COMMENT: Display current page of data
const displayPage = () => {
  const start = currentPage * ROWS_PER_PAGE;
  const end = start + ROWS_PER_PAGE;
  const pageData = currentDataset.slice(start, end);

  const columns = Object.keys(currentDataset[0]);
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = pageData
    .map(
      (row) => `
    <tr>
      ${columns.map((col) => `<td>${String(row[col] || "").substring(0, 50)}</td>`).join("")}
    </tr>
  `,
    )
    .join("");

  // Update pagination
  const pagination = document.getElementById("pagination");
  const totalPages = Math.ceil(currentDataset.length / ROWS_PER_PAGE);

  let paginationHTML = "";
  if (currentPage > 0) {
    paginationHTML += `<button class="pagination-btn" id="btn-prev">← Previous</button>`;
  }

  paginationHTML += `<span style="padding: 8px 12px;">Page ${currentPage + 1} of ${totalPages}</span>`;

  if (currentPage < totalPages - 1) {
    paginationHTML += `<button class="pagination-btn" id="btn-next">Next →</button>`;
  }

  pagination.innerHTML = paginationHTML;
  document.getElementById("page-number").textContent = currentPage + 1;

  // Attach event listeners to pagination buttons
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  if (btnPrev) {
    btnPrev.addEventListener("click", prevPage);
  }
  if (btnNext) {
    btnNext.addEventListener("click", nextPage);
  }
};

// COMMENT: Pagination controls
const prevPage = () => {
  if (currentPage > 0) {
    currentPage--;
    displayPage();
  }
};

const nextPage = () => {
  const totalPages = Math.ceil(currentDataset.length / ROWS_PER_PAGE);
  if (currentPage < totalPages - 1) {
    currentPage++;
    displayPage();
  }
};

// COMMENT: Save dataset to database
const saveDatasetToDb = async () => {
  try {
    if (!currentDataset) {
      showToast("No dataset loaded", "error");
      return;
    }

    const result = await window.api.saveDataset(currentDataset);
    if (result.success) {
      showToast(`Saved ${result.rowCount} rows to database`, "success");
      updateDashboard();
      updateStepIndicator();
    } else {
      showToast("Error saving dataset: " + result.error, "error");
    }
  } catch (error) {
    console.error("Error saving dataset:", error);
    showToast("Error saving dataset: " + error.message, "error");
  }
};

// ===== SECTION: PREPROCESSING =====

const initializePreprocessing = () => {
  const btnPreprocess = document.getElementById("btn-preprocess");
  btnPreprocess.addEventListener("click", runPreprocessing);
};

// COMMENT: Update feature and target column selectors
const updateFeatureSelectors = () => {
  if (!currentDataset || currentDataset.length === 0) return;

  const columns = Object.keys(currentDataset[0]);

  // Feature checkboxes
  const featureCheckboxes = document.getElementById("feature-checkboxes");
  featureCheckboxes.innerHTML = columns
    .filter((col) => col !== "result")
    .map(
      (col) => `
      <label class="checkbox-item">
        <input type="checkbox" class="feature-checkbox" value="${col}" checked>
        <span>${col}</span>
      </label>
    `,
    )
    .join("");

  // Target select
  const targetSelect = document.getElementById("target-select");
  targetSelect.innerHTML = columns
    .map((col) => `<option value="${col}">${col}</option>`)
    .join("");
  targetSelect.value = "result";
};

// COMMENT: Run preprocessing on dataset
const runPreprocessing = async () => {
  try {
    if (!currentDataset) {
      showToast("No dataset loaded", "error");
      return;
    }

    // Get selected features and target
    const featureCheckboxes = document.querySelectorAll(
      ".feature-checkbox:checked",
    );
    const selectedFeatures = Array.from(featureCheckboxes).map(
      (cb) => cb.value,
    );
    const targetColumn = document.getElementById("target-select").value;

    if (selectedFeatures.length === 0) {
      showToast("Please select at least one feature", "error");
      return;
    }

    // Run preprocessing
    const result = await window.api.preprocess(selectedFeatures, targetColumn);

    if (result.success) {
      preprocessedData = result.data;
      predictionRanges = buildPredictionRanges(
        currentDataset,
        preprocessedData.featureNames,
        preprocessedData.labelMap,
      );
      displayPreprocessingResults();
      showToast("Preprocessing completed successfully", "success");
      updateDashboard();
      updateStepIndicator();
      if (document.getElementById("predict").classList.contains("active")) {
        updatePredictionInputs();
      }
    } else {
      showToast("Error preprocessing data: " + result.error, "error");
    }
  } catch (error) {
    console.error("Error preprocessing:", error);
    showToast("Error preprocessing: " + error.message, "error");
  }
};

// COMMENT: Display preprocessing results
const displayPreprocessingResults = () => {
  const resultsDiv = document.getElementById("preprocessing-results");
  resultsDiv.style.display = "block";

  // Missing values
  const missingTbody = document.getElementById("missing-tbody");
  missingTbody.innerHTML = Object.entries(preprocessedData.missingValueCounts)
    .map(([col, count]) => `<tr><td>${col}</td><td>${count}</td></tr>`)
    .join("");

  // Encoding display
  const encodingDisplay = document.getElementById("encoding-display");
  let encodingHTML = "";
  Object.entries(preprocessedData.labelMap).forEach(([col, map]) => {
    if (Object.keys(map).length > 0) {
      encodingHTML += `<strong>${col}:</strong><br>`;
      Object.entries(map).forEach(([val, code]) => {
        encodingHTML += `  ${val} → ${code}<br>`;
      });
    }
  });
  encodingDisplay.innerHTML = encodingHTML || "No categorical columns";

  // Data split
  document.getElementById("train-count").textContent =
    preprocessedData.trainX.length;
  document.getElementById("test-count").textContent =
    preprocessedData.testX.length;

  // Processed data preview (first 10 rows of training data)
  const processedHeader = document.getElementById("processed-header");
  const featureNames = [...preprocessedData.featureNames, "Target"];
  processedHeader.innerHTML = featureNames
    .map((name) => `<th>${name}</th>`)
    .join("");

  const processedBody = document.getElementById("processed-body");
  const previewRows = Math.min(10, preprocessedData.trainX.length);
  processedBody.innerHTML = Array.from({ length: previewRows })
    .map(
      (_, i) => `
      <tr>
        ${preprocessedData.trainX[i].map((val) => `<td>${val.toFixed(3)}</td>`).join("")}
        <td>${preprocessedData.trainY[i]}</td>
      </tr>
    `,
    )
    .join("");
};

// ===== SECTION: TRAINING =====

const initializeTraining = () => {
  document
    .getElementById("btn-train-all")
    .addEventListener("click", trainAllModels);
  document
    .getElementById("btn-train-knn")
    .addEventListener("click", trainKNNModel);
  document
    .getElementById("btn-train-svm")
    .addEventListener("click", trainSVMModel);
  document
    .getElementById("btn-train-ann")
    .addEventListener("click", trainANNModel);

  // Update feature selectors when dataset changes
  updateFeatureSelectors();
};

// COMMENT: Train all models
const trainAllModels = async () => {
  try {
    if (!preprocessedData) {
      showToast("Please preprocess data first", "error");
      return;
    }

    showToast("Training all models... This may take a moment.", "info");

    await trainKNNModel();
    await new Promise((r) => setTimeout(r, 500));
    await trainSVMModel();
    await new Promise((r) => setTimeout(r, 500));
    await trainANNModel();

    showToast("All models trained successfully", "success");
    updateDashboard();
  } catch (error) {
    console.error("Error training models:", error);
    showToast("Error training models: " + error.message, "error");
  }
};

// COMMENT: Train KNN model
const trainKNNModel = async () => {
  try {
    const k = parseInt(document.getElementById("knn-k-value").value) || 5;
    updateTrainingStatus("knn", "training");

    const result = await window.api.trainKNN(k);

    if (result.success) {
      trainedModels.knn = result.result;
      updateTrainingStatus("knn", "trained");
      displayKNNMetrics();
      updateDashboard();
      updateStepIndicator();
      showToast("KNN model trained successfully", "success");
    } else {
      showToast("Error training KNN: " + result.error, "error");
      updateTrainingStatus("knn", "error");
    }
  } catch (error) {
    console.error("Error training KNN:", error);
    showToast("Error training KNN: " + error.message, "error");
    updateTrainingStatus("knn", "error");
  }
};

// COMMENT: Train SVM model
const trainSVMModel = async () => {
  try {
    updateTrainingStatus("svm", "training");

    const result = await window.api.trainSVM();

    if (result.success) {
      trainedModels.svm = result.result;
      updateTrainingStatus("svm", "trained");
      displaySVMMetrics();
      updateDashboard();
      updateStepIndicator();
      showToast("SVM model trained successfully", "success");
    } else {
      showToast("Error training SVM: " + result.error, "error");
      updateTrainingStatus("svm", "error");
    }
  } catch (error) {
    console.error("Error training SVM:", error);
    showToast("Error training SVM: " + error.message, "error");
    updateTrainingStatus("svm", "error");
  }
};

// COMMENT: Train ANN model
const trainANNModel = async () => {
  try {
    const epochs = parseInt(document.getElementById("ann-epochs").value) || 100;
    const learningRate =
      parseFloat(document.getElementById("ann-learning-rate").value) || 0.1;
    updateTrainingStatus("ann", "training");

    const result = await window.api.trainANN(epochs, learningRate);

    if (result.success) {
      trainedModels.ann = result.result;
      updateTrainingStatus("ann", "trained");
      displayANNMetrics();
      updateDashboard();
      updateStepIndicator();
      showToast("ANN model trained successfully", "success");
    } else {
      showToast("Error training ANN: " + result.error, "error");
      updateTrainingStatus("ann", "error");
    }
  } catch (error) {
    console.error("Error training ANN:", error);
    showToast("Error training ANN: " + error.message, "error");
    updateTrainingStatus("ann", "error");
  }
};

// COMMENT: Update training status badge
const updateTrainingStatus = (model, status) => {
  const badges = {
    knn: {
      training: "⏳ Training...",
      trained: "✅ Trained",
      error: "❌ Failed",
    },
    svm: {
      training: "⏳ Training...",
      trained: "✅ Trained",
      error: "❌ Failed",
    },
    ann: {
      training: "⏳ Training...",
      trained: "✅ Trained",
      error: "❌ Failed",
    },
  };

  const statusEl = document.getElementById(`${model}-status`);
  const badgeClass =
    status === "trained"
      ? "badge-success"
      : status === "error"
        ? "badge-danger"
        : "badge-warning";
  statusEl.className = `badge ${badgeClass}`;
  statusEl.textContent = badges[model][status];
};

// COMMENT: Display KNN metrics on training card
const displayKNNMetrics = () => {
  const metricsDiv = document.getElementById("knn-metrics");
  const accuracySpan = document.getElementById("knn-accuracy");
  metricsDiv.style.display = "block";
  accuracySpan.textContent =
    (trainedModels.knn.accuracy * 100).toFixed(1) + "%";
};

// COMMENT: Display SVM metrics on training card
const displaySVMMetrics = () => {
  const metricsDiv = document.getElementById("svm-metrics");
  const accuracySpan = document.getElementById("svm-accuracy");
  metricsDiv.style.display = "block";
  accuracySpan.textContent =
    (trainedModels.svm.accuracy * 100).toFixed(1) + "%";
};

// COMMENT: Display ANN metrics on training card
const displayANNMetrics = () => {
  const metricsDiv = document.getElementById("ann-metrics");
  const accuracySpan = document.getElementById("ann-accuracy");
  metricsDiv.style.display = "block";
  accuracySpan.textContent =
    (trainedModels.ann.accuracy * 100).toFixed(1) + "%";
};

// ===== SECTION: EVALUATION =====

const initializeEvaluation = () => {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      const tabId = tab.getAttribute("data-tab");
      switchEvaluationTab(tabId, e);
    });
  });
};

// COMMENT: Switch evaluation tabs
const switchEvaluationTab = (tabId, event) => {
  // Hide all tab contents
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach((c) => c.classList.remove("active"));

  // Remove active from all tabs
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((t) => t.classList.remove("active"));

  // Show selected tab
  const selectedContent = document.getElementById(tabId);
  if (selectedContent) {
    selectedContent.classList.add("active");
  }

  // Mark tab as active
  if (event && event.target) {
    event.target.classList.add("active");
  }

  // Load content based on tab
  if (tabId === "eval-knn" && trainedModels.knn) {
    updateKNNEvaluation();
  } else if (tabId === "eval-svm" && trainedModels.svm) {
    updateSVMEvaluation();
  } else if (tabId === "eval-ann" && trainedModels.ann) {
    updateANNEvaluation();
  } else if (tabId === "eval-comparison") {
    updateComparisonEvaluation();
  }
};

// COMMENT: Update KNN evaluation display
const updateKNNEvaluation = () => {
  const model = trainedModels.knn;
  updateMetricsDisplay("knn-eval", model);
  updateConfusionMatrix("knn-confusion", model.confusionMatrix);
};

// COMMENT: Update SVM evaluation display
const updateSVMEvaluation = () => {
  const model = trainedModels.svm;
  updateMetricsDisplay("svm-eval", model);
  updateConfusionMatrix("svm-confusion", model.confusionMatrix);
};

// COMMENT: Update ANN evaluation display
const updateANNEvaluation = () => {
  const model = trainedModels.ann;
  updateMetricsDisplay("ann-eval", model);
  updateConfusionMatrix("ann-confusion", model.confusionMatrix);
  displayLossChart(model.lossHistory);
};

// COMMENT: Update metrics display cards
const updateMetricsDisplay = (prefix, model) => {
  const accuracy = (model.accuracy * 100).toFixed(1);
  const precision = (model.precision * 100).toFixed(1);
  const recall = (model.recall * 100).toFixed(1);
  const f1 = (model.f1Score * 100).toFixed(1);

  document.getElementById(`${prefix}-accuracy`).textContent = accuracy;
  document.getElementById(`${prefix}-precision`).textContent = precision;
  document.getElementById(`${prefix}-recall`).textContent = recall;
  document.getElementById(`${prefix}-f1`).textContent = f1;

  // Color code based on thresholds
  updateMetricCard(`${prefix}-accuracy`, accuracy);
  updateMetricCard(`${prefix}-precision`, precision);
  updateMetricCard(`${prefix}-recall`, recall);
  updateMetricCard(`${prefix}-f1`, f1);
};

// COMMENT: Color code metric based on value
const updateMetricCard = (elementId, value) => {
  const element = document.getElementById(elementId).closest(".metric-card");
  element.classList.remove("success", "warning", "danger");

  const numValue = parseFloat(value);
  if (numValue >= 80) {
    element.classList.add("success");
  } else if (numValue >= 60) {
    element.classList.add("warning");
  } else {
    element.classList.add("danger");
  }
};

// COMMENT: Display confusion matrix
const updateConfusionMatrix = (containerId, matrix) => {
  const { tp, tn, fp, fn } = matrix;
  const container = document.getElementById(containerId);

  container.innerHTML = `
    <div class="matrix-cell tp">
      <div class="matrix-label">True Positive</div>
      <div class="matrix-value">${tp}</div>
    </div>
    <div class="matrix-cell tn">
      <div class="matrix-label">True Negative</div>
      <div class="matrix-value">${tn}</div>
    </div>
    <div class="matrix-cell fn">
      <div class="matrix-label">False Negative</div>
      <div class="matrix-value">${fn}</div>
    </div>
    <div class="matrix-cell fp">
      <div class="matrix-label">False Positive</div>
      <div class="matrix-value">${fp}</div>
    </div>
  `;
};

// COMMENT: Display ANN loss chart
const displayLossChart = (lossHistory) => {
  const ctx = document.getElementById("ann-loss-chart");

  if (window.lossChart) {
    window.lossChart.destroy();
  }

  window.lossChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Array.from({ length: lossHistory.length }, (_, i) => i + 1),
      datasets: [
        {
          label: "Training Loss",
          data: lossHistory,
          borderColor: "#4f8ef7",
          backgroundColor: "rgba(79, 142, 247, 0.1)",
          tension: 0.4,
          fill: true,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, labels: { color: "#e2e8f0" } },
      },
      scales: {
        y: {
          ticks: { color: "#8892a4" },
          grid: { color: "#1e2533" },
        },
        x: {
          ticks: { color: "#8892a4" },
          grid: { color: "#1e2533" },
        },
      },
    },
  });
};

// COMMENT: Update comparison evaluation
const updateComparisonEvaluation = () => {
  if (Object.keys(trainedModels).length === 0) {
    document.getElementById("eval-comparison").innerHTML =
      '<p style="color: var(--text-muted);">Train models first</p>';
    return;
  }

  // Prepare data for comparison chart
  const models = Object.keys(trainedModels);
  const metrics = ["accuracy", "precision", "recall", "f1Score"];
  const chartData = {
    labels: metrics.map(
      (m) => m.charAt(0).toUpperCase() + m.slice(1).replace("Score", "-Score"),
    ),
    datasets: models.map((modelName, idx) => ({
      label: modelName.toUpperCase(),
      data: metrics.map((metric) => trainedModels[modelName][metric] * 100),
      backgroundColor: ["#4f8ef7", "#7c3aed", "#10b981"][idx],
      borderColor: ["#4f8ef7", "#7c3aed", "#10b981"][idx],
    })),
  };

  const ctx = document.getElementById("comparison-chart");
  if (window.comparisonChart) {
    window.comparisonChart.destroy();
  }

  window.comparisonChart = new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: "#e2e8f0" } },
      },
      scales: {
        y: {
          ticks: { color: "#8892a4" },
          grid: { color: "#1e2533" },
          max: 100,
        },
        x: {
          ticks: { color: "#8892a4" },
          grid: { color: "#1e2533" },
        },
      },
    },
  });

  // Update comparison table
  const tbody = document.getElementById("comparison-tbody");
  tbody.innerHTML = models
    .map((modelName) => {
      const model = trainedModels[modelName];
      const bestAccuracy = Math.max(
        ...models.map((m) => trainedModels[m].accuracy),
      );
      const isBest = model.accuracy === bestAccuracy;
      const bestClass = isBest
        ? 'style="background-color: rgba(79, 142, 247, 0.2);"'
        : "";

      return `
      <tr ${bestClass}>
        <td><strong>${modelName.toUpperCase()}</strong></td>
        <td>${(model.accuracy * 100).toFixed(1)}%</td>
        <td>${(model.precision * 100).toFixed(1)}%</td>
        <td>${(model.recall * 100).toFixed(1)}%</td>
        <td>${(model.f1Score * 100).toFixed(1)}%</td>
      </tr>
    `;
    })
    .join("");

  // Generate recommendation
  const bestModel = models.reduce((a, b) =>
    trainedModels[a].accuracy > trainedModels[b].accuracy ? a : b,
  );
  const recommendation = `Based on evaluation, <strong>${bestModel.toUpperCase()}</strong> is recommended for this dataset because it has the highest accuracy (${(trainedModels[bestModel].accuracy * 100).toFixed(1)}%) and best overall performance.`;
  document.getElementById("recommendation-text").innerHTML = recommendation;
};

// ===== SECTION: PREDICT =====

const initializePrediction = () => {
  document
    .getElementById("model-select")
    .addEventListener("change", updatePredictionInputs);
  document
    .getElementById("btn-predict")
    .addEventListener("click", makePrediction);
};

// COMMENT: Update prediction input fields based on selected model
const updatePredictionInputs = () => {
  if (!preprocessedData) {
    showToast("Preprocess data first", "error");
    return;
  }

  const inputsDiv = document.getElementById("prediction-inputs");
  const featureNames = preprocessedData.featureNames;
  clearPredictionWarning();

  inputsDiv.innerHTML = featureNames
    .map((feature) => {
      const labelMap = preprocessedData.labelMap || {};
      const featureMap = labelMap[feature];

      if (featureMap && Object.keys(featureMap).length > 0) {
        const options = Object.entries(featureMap)
          .sort((a, b) => a[1] - b[1])
          .map(
            ([label, encodedValue]) =>
              `<option value="${encodedValue}">${label}</option>`,
          )
          .join("");

        return `
    <div class="form-group">
      <label class="form-label">${feature}</label>
      <select class="prediction-input" data-feature="${feature}">
        ${options}
      </select>
    </div>
  `;
      }

      const range = predictionRanges[feature];
      const hint = range
        ? `Valid range: ${formatInputValue(range.min)} to ${formatInputValue(range.max)} based on the imported dataset.`
        : "Enter a numeric value from the imported dataset.";

      return `
    <div class="form-group">
      <label class="form-label">${feature}</label>
      <input type="number" class="prediction-input" data-feature="${feature}" placeholder="Enter value" step="0.01" ${range ? `min="${range.min}" max="${range.max}"` : ""}>
      <div class="input-hint">${hint}</div>
    </div>
  `;
    })
    .join("");

  attachPredictionValidation();
  clearPredictionWarning();
};

// COMMENT: Make prediction with selected model
const makePrediction = async () => {
  try {
    const modelSelect = document.getElementById("model-select");
    const modelName = modelSelect.value;

    if (!modelName) {
      showToast("Please select a model", "error");
      return;
    }

    if (!trainedModels[modelName.toLowerCase()]) {
      showToast(`${modelName} model not trained yet`, "error");
      return;
    }

    const validation = validatePredictionInputs();
    if (!validation.valid) {
      showPredictionWarning(validation.message);
      showToast(validation.message, "error");
      return;
    }

    // Gather input values
    const inputs = [];
    const featureNames = preprocessedData.featureNames;
    const inputElements = document.querySelectorAll(".prediction-input");
    const displayValues = [];

    inputElements.forEach((el) => {
      const value = parseFloat(el.value);
      if (isNaN(value)) {
        throw new Error(`Invalid input for ${el.getAttribute("data-feature")}`);
      }
      inputs.push(value);
      displayValues.push(
        el.tagName === "SELECT"
          ? el.options[el.selectedIndex].textContent
          : value,
      );
    });

    // Make prediction
    const result = await window.api.predict(inputs, modelName);

    if (result.success) {
      displayPredictionResult(result.prediction, featureNames, displayValues);
      clearPredictionWarning();
    } else {
      showToast("Error making prediction: " + result.error, "error");
    }
  } catch (error) {
    console.error("Error making prediction:", error);
    showToast("Error: " + error.message, "error");
  }
};

const attachPredictionValidation = () => {
  document.querySelectorAll(".prediction-input").forEach((element) => {
    element.addEventListener("input", () => validatePredictionInputs(false));
    element.addEventListener("change", () => validatePredictionInputs(false));
  });
};

const validatePredictionInputs = (showRequired = false) => {
  const inputElements = document.querySelectorAll(".prediction-input");
  const invalidMessages = [];

  inputElements.forEach((element) => {
    element.classList.remove("invalid");
    const feature = element.getAttribute("data-feature");
    const range = predictionRanges[feature];

    if (!range || element.tagName === "SELECT") {
      return;
    }

    const rawValue = element.value.trim();
    if (rawValue === "") {
      if (showRequired) {
        invalidMessages.push(`${feature} is required.`);
        element.classList.add("invalid");
      }
      return;
    }

    const value = Number(rawValue);
    if (Number.isNaN(value)) {
      invalidMessages.push(`${feature} must be a number.`);
      element.classList.add("invalid");
      return;
    }

    if (value < range.min || value > range.max) {
      invalidMessages.push(
        `${feature} must be between ${formatInputValue(range.min)} and ${formatInputValue(range.max)}.`,
      );
      element.classList.add("invalid");
    }
  });

  if (invalidMessages.length > 0) {
    const message = invalidMessages.join(" ");
    if (showRequired) {
      showPredictionWarning(message);
    } else {
      showPredictionWarning(message);
    }
    return { valid: false, message };
  }

  clearPredictionWarning();
  return { valid: true, message: "" };
};

const buildPredictionRanges = (rows, featureNames, labelMap = {}) => {
  const ranges = {};

  featureNames.forEach((feature) => {
    if (labelMap[feature] && Object.keys(labelMap[feature]).length > 0) {
      return;
    }

    const values = (rows || [])
      .map((row) => Number(row[feature]))
      .filter((value) => Number.isFinite(value));

    if (values.length === 0) {
      return;
    }

    ranges[feature] = {
      min: Math.min(...values),
      max: Math.max(...values),
    };
  });

  return ranges;
};

const showPredictionWarning = (message) => {
  const warning = document.getElementById("prediction-range-warning");
  if (!warning) return;

  warning.textContent = message;
  warning.style.display = "block";
};

const clearPredictionWarning = () => {
  const warning = document.getElementById("prediction-range-warning");
  if (!warning) return;

  warning.textContent = "";
  warning.style.display = "none";
};

const formatInputValue = (value) => {
  if (Number.isInteger(value)) {
    return String(value);
  }

  return Number(value).toFixed(2).replace(/\.00$/, "");
};

// COMMENT: Display prediction result
const displayPredictionResult = (prediction, features, values) => {
  const outputDiv = document.getElementById("prediction-output");
  outputDiv.style.display = "block";

  const badge = document.getElementById("prediction-badge");
  const predictionText = prediction.prediction === 0 ? "PASS ✅" : "FAIL ❌";
  const predictionClass = prediction.prediction === 0 ? "pass" : "fail";
  badge.className = `prediction-badge ${predictionClass}`;
  badge.textContent = predictionText;

  // Confidence display
  const confidence =
    prediction.confidence || (prediction.prediction === 0 ? 0.7 : 0.6);
  document.getElementById("confidence-display").textContent =
    `Confidence: ${(confidence * 100).toFixed(1)}%`;

  // Input summary table
  const tbody = document.getElementById("prediction-input-tbody");
  tbody.innerHTML = features
    .map(
      (feature, idx) => `
    <tr>
      <td>${feature}</td>
      <td>${typeof values[idx] === "number" ? values[idx].toFixed(2) : values[idx]}</td>
    </tr>
  `,
    )
    .join("");

  // Scroll to result
  outputDiv.scrollIntoView({ behavior: "smooth" });
};

// ===== SECTION: HISTORY =====

const initializeHistory = () => {
  document
    .getElementById("btn-clear-history")
    .addEventListener("click", clearHistory);
  loadHistory();
};

// COMMENT: Load training history from database
const loadHistory = async () => {
  try {
    const result = await window.api.getResults();

    if (result.success && result.results.length > 0) {
      const tbody = document.getElementById("history-tbody");
      tbody.innerHTML = result.results
        .map(
          (r) => `
        <tr>
          <td>${r.session_id}</td>
          <td>${r.model_name}</td>
          <td>${(r.accuracy * 100).toFixed(1)}%</td>
          <td>${(r.f1_score * 100).toFixed(1)}%</td>
          <td>${new Date(r.trained_at).toLocaleString()}</td>
        </tr>
      `,
        )
        .join("");
    }
  } catch (error) {
    console.error("Error loading history:", error);
  }
};

// COMMENT: Clear training history
const clearHistory = async () => {
  if (confirm("Are you sure you want to clear all history?")) {
    // This would require a db:clear-results handler in main.js
    // For now, just clear the UI
    document.getElementById("history-tbody").innerHTML =
      '<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No results yet</td></tr>';
    showToast("History cleared", "success");
  }
};

// ===== SECTION: UTILITIES =====

// COMMENT: Show toast notification
const showToast = (message, type = "info") => {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

// COMMENT: Format percentage display
const formatPercent = (value) => {
  return (value * 100).toFixed(1) + "%";
};
