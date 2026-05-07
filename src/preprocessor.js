// FILE: src/preprocessor.js

// COMMENT: Main preprocessing function that handles missing values, encoding, scaling, and train/test split
const preprocess = (rows, selectedFeatures, targetColumn) => {
  try {
    if (!rows || rows.length === 0) {
      throw new Error("No data to preprocess");
    }

    // Detect column types
    const columnTypes = detectColumnTypes(rows, selectedFeatures, targetColumn);

    // Handle missing values
    const cleanedRows = handleMissingValues(
      rows,
      selectedFeatures,
      targetColumn,
      columnTypes,
    );

    // Encode categorical variables
    const { encodedRows, labelMaps } = encodeCategoricals(
      cleanedRows,
      selectedFeatures,
      targetColumn,
      columnTypes,
    );

    // Extract target and features
    const { X, Y } = extractFeatures(
      encodedRows,
      selectedFeatures,
      targetColumn,
    );

    // Scale features
    const { scaledX, scaleParams } = scaleFeatures(X);

    // Train/test split (80/20)
    const { trainX, trainY, testX, testY } = trainTestSplit(scaledX, Y, 0.8);

    return {
      trainX,
      trainY,
      testX,
      testY,
      featureNames: selectedFeatures,
      labelMap: labelMaps,
      scaleParams,
      originalColumns: Object.keys(rows[0]),
      missingValueCounts: countMissingValues(
        rows,
        selectedFeatures,
        targetColumn,
      ),
    };
  } catch (error) {
    console.error("Preprocessing error:", error);
    throw error;
  }
};

// COMMENT: Detect if a column contains numeric or categorical data
const detectColumnTypes = (rows, selectedFeatures, targetColumn) => {
  const types = {};
  const allColumns = [...selectedFeatures, targetColumn];

  allColumns.forEach((column) => {
    const sample = rows.slice(0, 10);
    const isNumeric = sample.every((row) => {
      const val = row[column];
      return val === null || val === undefined || !isNaN(parseFloat(val));
    });

    types[column] = isNumeric ? "numeric" : "categorical";
  });

  return types;
};

// COMMENT: Count missing values in the dataset
const countMissingValues = (rows, selectedFeatures, targetColumn) => {
  const counts = {};
  const allColumns = [...selectedFeatures, targetColumn];

  allColumns.forEach((column) => {
    counts[column] = rows.filter(
      (row) =>
        row[column] === null || row[column] === undefined || row[column] === "",
    ).length;
  });

  return counts;
};

// COMMENT: Fill missing values with mean (numeric) or mode (categorical)
const handleMissingValues = (
  rows,
  selectedFeatures,
  targetColumn,
  columnTypes,
) => {
  const allColumns = [...selectedFeatures, targetColumn];

  // Calculate fill values
  const fillValues = {};
  allColumns.forEach((column) => {
    if (columnTypes[column] === "numeric") {
      // Calculate mean
      const values = rows
        .map((r) => parseFloat(r[column]))
        .filter((v) => !isNaN(v));
      fillValues[column] =
        values.length > 0 ? values.reduce((a, b) => a + b) / values.length : 0;
    } else {
      // Calculate mode (most frequent value)
      const values = rows
        .map((r) => r[column])
        .filter((v) => v !== null && v !== undefined && v !== "");
      const frequency = {};
      values.forEach((v) => {
        frequency[v] = (frequency[v] || 0) + 1;
      });
      fillValues[column] =
        Object.keys(frequency).length > 0
          ? Object.keys(frequency).reduce((a, b) =>
              frequency[a] > frequency[b] ? a : b,
            )
          : "Unknown";
    }
  });

  // Fill missing values
  return rows.map((row) => {
    const newRow = { ...row };
    allColumns.forEach((column) => {
      if (
        newRow[column] === null ||
        newRow[column] === undefined ||
        newRow[column] === ""
      ) {
        newRow[column] = fillValues[column];
      }
    });
    return newRow;
  });
};

// COMMENT: Encode categorical variables to integers using label encoding
const encodeCategoricals = (
  rows,
  selectedFeatures,
  targetColumn,
  columnTypes,
) => {
  const labelMaps = {};

  // Build encoding maps for categorical columns
  [...selectedFeatures, targetColumn].forEach((column) => {
    if (columnTypes[column] === "categorical") {
      const uniqueValues = [...new Set(rows.map((r) => r[column]))];
      labelMaps[column] = {};
      uniqueValues.forEach((val, index) => {
        labelMaps[column][val] = index;
      });
    }
  });

  // Encode rows
  const encodedRows = rows.map((row) => {
    const newRow = { ...row };
    Object.keys(labelMaps).forEach((column) => {
      newRow[column] = labelMaps[column][row[column]];
    });
    return newRow;
  });

  return { encodedRows, labelMaps };
};

// COMMENT: Extract feature matrix X and target vector Y
const extractFeatures = (rows, selectedFeatures, targetColumn) => {
  const X = [];
  const Y = [];

  rows.forEach((row) => {
    const features = selectedFeatures.map((col) => parseFloat(row[col]));
    X.push(features);
    Y.push(parseFloat(row[targetColumn]));
  });

  return { X, Y };
};

// COMMENT: Apply Min-Max normalization to features
const scaleFeatures = (X) => {
  const numFeatures = X[0].length;
  const scaleParams = [];

  // Calculate min and max for each feature
  for (let i = 0; i < numFeatures; i++) {
    const values = X.map((row) => row[i]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    scaleParams.push({ min, max, range: max - min });
  }

  // Normalize using Min-Max scaling: (x - min) / (max - min)
  const scaledX = X.map((row) => {
    return row.map((val, i) => {
      const { min, range } = scaleParams[i];
      return range === 0 ? 0 : (val - min) / range;
    });
  });

  return { scaledX, scaleParams };
};

// COMMENT: Split data into training (80%) and testing (20%) sets with shuffling
const trainTestSplit = (X, Y, trainRatio = 0.8) => {
  const n = X.length;
  const trainSize = Math.floor(n * trainRatio);

  // Create indices and shuffle
  const indices = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Split using shuffled indices
  const trainIndices = indices.slice(0, trainSize);
  const testIndices = indices.slice(trainSize);

  const trainX = trainIndices.map((i) => X[i]);
  const trainY = trainIndices.map((i) => Y[i]);
  const testX = testIndices.map((i) => X[i]);
  const testY = testIndices.map((i) => Y[i]);

  return { trainX, trainY, testX, testY };
};

module.exports = {
  preprocess,
};
