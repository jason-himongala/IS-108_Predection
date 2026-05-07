# IS 108 - Business Intelligence Predictive Modeling Application

## Project Overview

This project is an Electron desktop application for predictive modeling.
It allows users to import data, preprocess features, train machine learning models, evaluate model performance, and make predictions.

### Business Problem

The application addresses student performance prediction.
Given academic and behavioral inputs, the system predicts whether a student is likely to pass or fail.


## Installation

1. Clone this repository.
2. Open a terminal in the project folder.
3. Install dependencies:

```bash
npm install
```

## Run the Application

```bash
npm start
```

The Electron window will open and display the application dashboard.

## Project Structure

```text
is_108/
|- package.json
|- package-lock.json
|- main.js
|- preload.js
|- data.json
|- src/
|  |- database.js
|  |- preprocessor.js
|  |- knn.js
|  |- svm.js
|  |- ann.js
|- renderer/
|  |- index.html
|  |- style.css
|  |- app.js
|- README.md
```

## Technology Stack

- Electron for desktop application development
- HTML, CSS, and JavaScript for the user interface
- SQLite (`better-sqlite3`) for local storage
- `ml-knn` for K-Nearest Neighbors
- `libsvm-js` for Support Vector Machine
- Custom ANN implementation for neural network training
- Chart.js for charts and visual reporting
- PapaParse for CSV parsing
- SheetJS for Excel parsing


### 1. Dataset Import

- Import CSV and Excel files
- Load built-in sample data
- View dataset preview with pagination

### 2. Data Preprocessing

- Handle missing values
- Encode categorical data
- Normalize numerical features
- Split data into training and testing sets

### 3. Model Training

- Train KNN model
- Train SVM model
- Train ANN model
- Train all models in one workflow

### 4. Model Evaluation

- Accuracy, precision, recall, and F1-score
- Confusion matrix
- ANN loss chart
- Side-by-side model comparison

### 5. Prediction

- Select a trained model
- Enter feature values
- Get pass/fail prediction and confidence

### 6. Training History

- Store model training results in SQLite
- Review previous model performance

## Workflow

1. Import a dataset.
2. Run preprocessing.
3. Train one or more models.
4. Evaluate model performance.
5. Run predictions on new inputs.
6. Review training history.

## Database

The application uses SQLite with the following main tables:

- `dataset`: stores imported and processed records
- `model_results`: stores model metrics and training timestamps

## Development

### Start in Development Mode

```bash
npm start
```

### Build for Distribution

```bash
npm run build
```

## Security Notes

- Context isolation is enabled.
- Renderer does not have direct Node.js access.
- IPC communication is exposed through `preload.js`.
- User input is validated before processing.

## Troubleshooting

### Application does not start

- Confirm Node.js version is 18 or higher.
- Run `npm install`.
- Check console output for startup errors.

### Model training is slow

- Reduce ANN epochs.
- Close other high-CPU applications.
- Use a smaller dataset for testing.

### Database issues

- Check write permission in the project folder.
- Confirm database file creation on first run.

## Future Improvements

- Export trained models
- Add cross-validation
- Add feature importance tools
- Add hyperparameter tuning
- Add more algorithms


## Course Information

Created for IS 108: Business Intelligence
Semester: Spring 2026
