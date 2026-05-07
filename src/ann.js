// FILE: src/ann.js

// COMMENT: Activation function - sigmoid: 1 / (1 + e^-x)
const sigmoid = (x) => 1 / (1 + Math.exp(-Math.max(-500, Math.min(500, x))));

// COMMENT: Derivative of sigmoid: sigmoid(x) * (1 - sigmoid(x))
const sigmoidDerivative = (sig) => sig * (1 - sig);

// COMMENT: Initialize weights with small random values (Xavier initialization)
const initializeWeights = (inputSize, outputSize) => {
  const limit = Math.sqrt(6 / (inputSize + outputSize));
  return Array.from({ length: inputSize }, () =>
    Array.from({ length: outputSize }, () => (Math.random() - 0.5) * 2 * limit),
  );
};

// COMMENT: Initialize biases to zero
const initializeBiases = (size) => Array(size).fill(0);

// COMMENT: Forward pass through the network
// Architecture: input -> hidden1(8) -> hidden2(4) -> output(1)
const forward = (x, weights1, bias1, weights2, bias2, weights3, bias3) => {
  // Hidden layer 1: input -> 8 neurons
  const hidden1Raw = vectorMatrixMultiply(x, weights1);
  addVector(hidden1Raw, bias1);
  const hidden1 = hidden1Raw.map(sigmoid);

  // Hidden layer 2: 8 -> 4 neurons
  const hidden2Raw = vectorMatrixMultiply(hidden1, weights2);
  addVector(hidden2Raw, bias2);
  const hidden2 = hidden2Raw.map(sigmoid);

  // Output layer: 4 -> 1 neuron
  const outputRaw = vectorMatrixMultiply(hidden2, weights3);
  addVector(outputRaw, bias3);
  const output = outputRaw.map(sigmoid);

  return { hidden1, hidden2, output, hidden1Raw, hidden2Raw, outputRaw };
};

// COMMENT: Matrix multiplication: vector x weights matrix
const vectorMatrixMultiply = (vector, matrix) => {
  return matrix[0].map((_, colIdx) =>
    vector.reduce((sum, val, rowIdx) => sum + val * matrix[rowIdx][colIdx], 0),
  );
};

// COMMENT: Element-wise vector addition
const addVector = (target, source) => {
  source.forEach((val, i) => {
    target[i] += val;
  });
};

// COMMENT: Compute binary cross-entropy loss
const computeLoss = (predictions, targets) => {
  let loss = 0;
  predictions.forEach((pred, i) => {
    const y = targets[i];
    const eps = 1e-7;
    loss -= y * Math.log(pred + eps) + (1 - y) * Math.log(1 - pred + eps);
  });
  return loss / predictions.length;
};

// COMMENT: Backpropagation algorithm
// Computes gradients for all weights and biases, then updates them
const backpropagate = (
  x,
  target,
  forward_result,
  weights1,
  bias1,
  weights2,
  bias2,
  weights3,
  bias3,
  learningRate,
) => {
  const { hidden1, hidden2, output, hidden1Raw, hidden2Raw, outputRaw } =
    forward_result;

  // Output layer gradients
  const outputError = output[0] - target;
  const outputDelta = outputError * sigmoidDerivative(output[0]);

  // Backprop to weights3 and bias3
  const dWeights3 = hidden2.map((h) => [outputDelta * h]);
  const dBias3 = [outputDelta];

  // Hidden layer 2 gradients
  const hidden2Error = hidden2.map((h, i) => outputDelta * weights3[i][0]);
  const hidden2Delta = hidden2.map(
    (h, i) => hidden2Error[i] * sigmoidDerivative(h),
  );

  // Backprop to weights2 and bias2
  const dWeights2 = hidden1.map((h, i) =>
    hidden2Delta.map((delta) => delta * h),
  );
  const dBias2 = hidden2Delta;

  // Hidden layer 1 gradients
  const hidden1Error = hidden1.map((h, i) =>
    hidden2Delta.reduce((sum, delta, j) => sum + delta * weights2[i][j], 0),
  );
  const hidden1Delta = hidden1.map(
    (h, i) => hidden1Error[i] * sigmoidDerivative(h),
  );

  // Backprop to weights1 and bias1
  const dWeights1 = x.map((val, i) => hidden1Delta.map((delta) => delta * val));
  const dBias1 = hidden1Delta;

  // Update weights and biases using gradient descent
  updateWeights(weights1, dWeights1, learningRate);
  updateBias(bias1, dBias1, learningRate);
  updateWeights(weights2, dWeights2, learningRate);
  updateBias(bias2, dBias2, learningRate);
  updateWeights(weights3, dWeights3, learningRate);
  updateBias(bias3, dBias3, learningRate);
};

// COMMENT: Update weight matrix using gradients
const updateWeights = (weights, gradients, learningRate) => {
  weights.forEach((row, i) => {
    row.forEach((_, j) => {
      weights[i][j] -= learningRate * gradients[i][j];
    });
  });
};

// COMMENT: Update bias vector using gradients
const updateBias = (biases, gradients, learningRate) => {
  biases.forEach((_, i) => {
    biases[i] -= learningRate * gradients[i];
  });
};

// COMMENT: Main training function
// Implements feedforward neural network with backpropagation
// Architecture: input_size -> 8 -> 4 -> 1 (sigmoid activations)
const trainANN = (
  trainX,
  trainY,
  testX,
  testY,
  epochs = 100,
  learningRate = 0.1,
) => {
  try {
    if (!trainX || trainX.length === 0) {
      throw new Error("No training data provided");
    }

    const inputSize = trainX[0].length;
    const hidden1Size = 8;
    const hidden2Size = 4;
    const outputSize = 1;

    // Initialize network weights and biases
    const weights1 = initializeWeights(inputSize, hidden1Size);
    const bias1 = initializeBiases(hidden1Size);
    const weights2 = initializeWeights(hidden1Size, hidden2Size);
    const bias2 = initializeBiases(hidden2Size);
    const weights3 = initializeWeights(hidden2Size, outputSize);
    const bias3 = initializeBiases(outputSize);

    const lossHistory = [];

    // Training loop
    for (let epoch = 0; epoch < epochs; epoch++) {
      let epochLoss = 0;

      // Train on each sample
      trainX.forEach((x, idx) => {
        const target = trainY[idx];
        const result = forward(
          x,
          weights1,
          bias1,
          weights2,
          bias2,
          weights3,
          bias3,
        );
        epochLoss += computeLoss(result.output, [target]);
        backpropagate(
          x,
          target,
          result,
          weights1,
          bias1,
          weights2,
          bias2,
          weights3,
          bias3,
          learningRate,
        );
      });

      epochLoss /= trainX.length;
      lossHistory.push(epochLoss);

      // Log progress every 10 epochs
      if ((epoch + 1) % 10 === 0) {
        console.log(
          `Epoch ${epoch + 1}/${epochs}, Loss: ${epochLoss.toFixed(4)}`,
        );
      }
    }

    // Make predictions on test set
    const predictions = testX.map((x) => {
      const result = forward(
        x,
        weights1,
        bias1,
        weights2,
        bias2,
        weights3,
        bias3,
      );
      return result.output[0] > 0.5 ? 1 : 0;
    });

    // Calculate metrics
    const metrics = calculateMetrics(predictions, testY);

    return {
      predictions,
      accuracy: metrics.accuracy,
      precision: metrics.precision,
      recall: metrics.recall,
      f1Score: metrics.f1Score,
      confusionMatrix: metrics.confusionMatrix,
      lossHistory,
      weights: { weights1, bias1, weights2, bias2, weights3, bias3 },
    };
  } catch (error) {
    console.error("Error training ANN:", error);
    throw error;
  }
};

// COMMENT: Predict single sample (used by main.js)
const predictSingle = (model, inputs) => {
  try {
    const { weights } = model;
    const result = forward(
      inputs,
      weights.weights1,
      weights.bias1,
      weights.weights2,
      weights.bias2,
      weights.weights3,
      weights.bias3,
    );
    return {
      prediction: result.output[0] > 0.5 ? 1 : 0,
      confidence: result.output[0],
    };
  } catch (error) {
    console.error("Error making prediction:", error);
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
    if (pred === 1 && actual[i] === 1) tp++;
    else if (pred === 0 && actual[i] === 0) tn++;
    else if (pred === 1 && actual[i] === 0) fp++;
    else if (pred === 0 && actual[i] === 1) fn++;
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
  trainANN,
  predictSingle,
};
