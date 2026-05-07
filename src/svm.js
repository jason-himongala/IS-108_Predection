// FILE: src/svm.js

// COMMENT: RBF Kernel: K(x, y) = exp(-gamma * ||x - y||^2)
const rbfKernel = (x1, x2, gamma = 0.5) => {
  let sum = 0;
  for (let i = 0; i < x1.length; i++) {
    sum += Math.pow(x1[i] - x2[i], 2);
  }
  return Math.exp(-gamma * sum);
};

// COMMENT: Simple SVM implementation using SMO algorithm approximation
// For production, libsvm-js could be used, but this is a simplified version
class SimpleSVM {
  constructor(C = 1, gamma = 0.5, maxIterations = 1000, tolerance = 1e-3) {
    this.C = C;
    this.gamma = gamma;
    this.maxIterations = maxIterations;
    this.tolerance = tolerance;
    this.alphas = [];
    this.bias = 0;
    this.supportVectors = [];
    this.supportVectorLabels = [];
    this.trainX = [];
    this.trainY = [];
  }

  fit(X, Y) {
    this.trainX = X;
    this.trainY = Y.map((y) => (y === 1 || y === "1" || y === "Pass" ? 1 : -1));

    const n = X.length;
    this.alphas = Array(n).fill(0);
    this.bias = 0;

    // Simplified training: use a basic gradient descent approach
    for (let iteration = 0; iteration < this.maxIterations; iteration++) {
      let alphasChanged = 0;

      for (let i = 0; i < n; i++) {
        const E_i = this.calculateError(i);
        const r_i = this.trainY[i] * E_i;

        if (
          (r_i < -this.tolerance && this.alphas[i] < this.C) ||
          (r_i > this.tolerance && this.alphas[i] > 0)
        ) {
          // Find a second alpha to optimize
          let j = i;
          while (j === i) {
            j = Math.floor(Math.random() * n);
          }

          const alpha_i_old = this.alphas[i];
          const alpha_j_old = this.alphas[j];

          // Calculate bounds
          const L =
            this.trainY[i] === this.trainY[j]
              ? Math.max(0, alpha_j_old + alpha_i_old - this.C)
              : Math.max(0, alpha_j_old - alpha_i_old);
          const H =
            this.trainY[i] === this.trainY[j]
              ? Math.min(this.C, alpha_j_old + alpha_i_old)
              : Math.min(this.C, this.C + alpha_j_old - alpha_i_old);

          if (L >= H) continue;

          // Calculate eta
          const K_ii = rbfKernel(this.trainX[i], this.trainX[i], this.gamma);
          const K_jj = rbfKernel(this.trainX[j], this.trainX[j], this.gamma);
          const K_ij = rbfKernel(this.trainX[i], this.trainX[j], this.gamma);
          const eta = K_ii + K_jj - 2 * K_ij;

          if (eta <= 0) continue;

          const E_j = this.calculateError(j);
          this.alphas[j] -= (this.trainY[j] * (E_i - E_j)) / eta;
          this.alphas[j] = Math.min(H, Math.max(L, this.alphas[j]));

          if (Math.abs(this.alphas[j] - alpha_j_old) < 1e-5) continue;

          this.alphas[i] +=
            this.trainY[i] * this.trainY[j] * (alpha_j_old - this.alphas[j]);

          // Update bias
          const b1 =
            this.bias -
            E_i -
            this.trainY[i] * (this.alphas[i] - alpha_i_old) * K_ii -
            this.trainY[j] * (this.alphas[j] - alpha_j_old) * K_ij;
          const b2 =
            this.bias -
            E_j -
            this.trainY[i] * (this.alphas[i] - alpha_i_old) * K_ij -
            this.trainY[j] * (this.alphas[j] - alpha_j_old) * K_jj;

          if (this.alphas[i] > 0 && this.alphas[i] < this.C) {
            this.bias = b1;
          } else if (this.alphas[j] > 0 && this.alphas[j] < this.C) {
            this.bias = b2;
          } else {
            this.bias = (b1 + b2) / 2;
          }

          alphasChanged++;
        }
      }

      if (alphasChanged === 0) break;
    }

    // Store support vectors
    this.supportVectors = [];
    this.supportVectorLabels = [];
    for (let i = 0; i < n; i++) {
      if (this.alphas[i] > 0) {
        this.supportVectors.push(this.trainX[i]);
        this.supportVectorLabels.push(this.trainY[i]);
      }
    }
  }

  calculateError(i) {
    let prediction = this.bias;
    for (let j = 0; j < this.trainX.length; j++) {
      prediction +=
        this.alphas[j] *
        this.trainY[j] *
        rbfKernel(this.trainX[i], this.trainX[j], this.gamma);
    }
    return prediction - this.trainY[i];
  }

  predict(x) {
    let prediction = this.bias;
    for (let j = 0; j < this.trainX.length; j++) {
      if (this.alphas[j] > 0) {
        prediction +=
          this.alphas[j] *
          this.trainY[j] *
          rbfKernel(x, this.trainX[j], this.gamma);
      }
    }
    return prediction > 0 ? 1 : 0;
  }
}

// COMMENT: Train SVM model and evaluate on test set
const trainSVM = async (trainX, trainY, testX, testY) => {
  try {
    if (!trainX || trainX.length === 0) {
      throw new Error("No training data provided");
    }

    // Convert to arrays
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

    // Train SVM
    const svm = new SimpleSVM(1, 0.5);
    svm.fit(X_train, Y_train);

    // Make predictions
    const predictions = X_test.map((point) => svm.predict(point));

    // Calculate metrics
    const metrics = calculateMetrics(predictions, Y_test);

    return {
      predictions,
      accuracy: metrics.accuracy,
      precision: metrics.precision,
      recall: metrics.recall,
      f1Score: metrics.f1Score,
      confusionMatrix: metrics.confusionMatrix,
      model: svm,
    };
  } catch (error) {
    console.error("Error training SVM:", error);
    throw error;
  }
};

// COMMENT: Predict single sample using SVM
const predictSingle = (model, inputs) => {
  try {
    const { model: svm } = model;
    const prediction = svm.predict(inputs);

    return {
      prediction,
      confidence: 0.5, // Simplified confidence for SVM
    };
  } catch (error) {
    console.error("Error making SVM prediction:", error);
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
  trainSVM,
  predictSingle,
};
