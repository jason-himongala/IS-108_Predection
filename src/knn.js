// FILE: src/knn.js

// COMMENT: Calculate Euclidean distance between two points
const euclideanDistance = (point1, point2) => {
  let sum = 0;
  for (let i = 0; i < point1.length; i++) {
    sum += Math.pow(point1[i] - point2[i], 2);
  }
  return Math.sqrt(sum);
};

// COMMENT: Find K nearest neighbors and return their labels
const findKNearest = (trainX, trainY, testPoint, k) => {
  const distances = trainX.map((trainPoint, idx) => ({
    distance: euclideanDistance(testPoint, trainPoint),
    label: trainY[idx],
  }));

  // Sort by distance and take K nearest
  distances.sort((a, b) => a.distance - b.distance);
  return distances.slice(0, k).map((d) => d.label);
};

// COMMENT: Predict using KNN algorithm (majority vote among K nearest neighbors)
const predictKNN = (trainX, trainY, testPoint, k) => {
  const neighbors = findKNearest(trainX, trainY, testPoint, k);

  // Majority vote: count votes for each class
  const votes = { 0: 0, 1: 0 };
  neighbors.forEach((label) => {
    votes[label] = (votes[label] || 0) + 1;
  });

  const prediction = votes[1] > votes[0] ? 1 : 0;
  const confidence = Math.max(votes[0], votes[1]) / k;

  return { prediction, confidence };
};

// COMMENT: Predict single sample using KNN
const predictSingle = (model, inputs) => {
  try {
    const { trainX, trainY, k } = model;
    return predictKNN(trainX, trainY, inputs, k);
  } catch (error) {
    console.error("Error making KNN prediction:", error);
    throw error;
  }
};

// COMMENT: Train KNN model and evaluate on test set using pure JavaScript implementation
const trainKNN = (trainX, trainY, testX, testY, k = 5) => {
  try {
    if (!trainX || trainX.length === 0) {
      throw new Error("No training data provided");
    }

    // Convert to arrays if needed
    const X_train = trainX.map((row) =>
      Array.isArray(row) ? row : Object.values(row),
    );
    const Y_train = trainY.map((y) =>
      y === 1 || y === "1" || y === "Pass" ? 1 : 0,
    );
    const X_test = testX.map((row) =>
      Array.isArray(row) ? row : Object.values(row),
    );
    const Y_test = testY.map((y) =>
      y === 1 || y === "1" || y === "Pass" ? 1 : 0,
    );

    // Make predictions using pure JavaScript KNN implementation
    const predictions = X_test.map(
      (point) => predictKNN(X_train, Y_train, point, k).prediction,
    );

    // Calculate metrics
    const metrics = calculateMetrics(predictions, Y_test);

    return {
      predictions,
      accuracy: metrics.accuracy,
      precision: metrics.precision,
      recall: metrics.recall,
      f1Score: metrics.f1Score,
      confusionMatrix: metrics.confusionMatrix,
      trainX: X_train,
      trainY: Y_train,
      k,
    };
  } catch (error) {
    console.error("Error training KNN:", error);
    throw error;
  }
};

// COMMENT: Calculate evaluation metrics (accuracy, precision, recall, F1-score)
const calculateMetrics = (predictions, actual) => {
  let tp = 0,
    tn = 0,
    fp = 0,
    fn = 0;

  predictions.forEach((pred, i) => {
    const p = pred === 1 || pred === "1" ? 1 : 0;
    const a = actual[i] === 1 || actual[i] === "1" ? 1 : 0;

    if (p === 1 && a === 1) tp++;
    else if (p === 0 && a === 0) tn++;
    else if (p === 1 && a === 0) fp++;
    else if (p === 0 && a === 1) fn++;
  });

  const accuracy = (tp + tn) / (tp + tn + fp + fn);
  const precision = tp / (tp + fp) || 0;
  const recall = tp / (tp + fn) || 0;
  const f1Score = (2 * (precision * recall)) / (precision + recall) || 0;

  return {
    accuracy,
    precision,
    recall,
    f1Score,
    confusionMatrix: { tp, tn, fp, fn },
  };
};

module.exports = {
  trainKNN,
  predictSingle,
};
