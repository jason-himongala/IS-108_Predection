# IS 108 - Business Intelligence Predictive Modeling Application

## Project Overview

A full-stack **Electron desktop application** for predictive modeling using machine learning algorithms. This application enables users to import datasets, preprocess data, train and compare three ML algorithms (KNN, SVM, ANN), and make predictions on new data.

**Business Problem**: Student Performance Prediction — predicting whether a student will Pass or Fail based on academic and behavioral data.

## Team Members

[Your Names Here]

## Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **Windows**, **macOS**, or **Linux**

## Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd IS108-BI-App
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Start the Electron application:

```bash
npm start
```

The desktop application will launch with the main window displaying the dashboard.

## Project Structure

```
IS108-BI-App/
├── package.json              # Project dependencies and scripts
├── main.js                   # Electron main process (IPC handlers)
├── preload.js                # Context bridge for secure IPC
├── src/
│   ├── database.js          # SQLite database operations
│   ├── preprocessor.js      # Data preprocessing (normalization, encoding)
│   ├── ann.js               # Artificial Neural Network implementation
│   ├── knn.js               # K-Nearest Neighbors algorithm
│   └── svm.js               # Support Vector Machine algorithm
├── renderer/
│   ├── index.html           # Main UI structure
│   ├── style.css            # Dark industrial dashboard styling
│   └── app.js               # Frontend application logic
├── README.md                # This file
└── data.db                  # SQLite database (created on first run)
```

## Technology Stack

- **Electron** — Desktop application framework
- **HTML5 + CSS3 + Vanilla JavaScript** — Frontend UI (no frameworks)
- **SQLite** (via `better-sqlite3`) — Local persistent storage
- **ml-knn** — K-Nearest Neighbors implementation
- **libsvm-js** — Support Vector Machine implementation
- **Custom ANN** — Feedforward neural network with backpropagation (no ML library)
- **Chart.js** — Data visualization
- **PapaParse** — CSV parsing
- **SheetJS** — Excel parsing

## Features

### 1. **Dataset Import** 📂

- Upload CSV or Excel files
- Load sample student performance data
- Display data preview with pagination
- Show column information and statistics

### 2. **Data Preprocessing** ⚙️

- Automatic detection of numeric and categorical columns
- Missing value handling (mean for numeric, mode for categorical)
- Categorical encoding (label encoding)
- Min-Max feature normalization
- Train/test split (80/20 with shuffling)
- Detailed preprocessing report

### 3. **Machine Learning Models** 🤖

#### K-Nearest Neighbors (KNN)

- Configurable K value (default: 5)
- Euclidean distance metric
- Fast training and prediction

#### Support Vector Machine (SVM)

- RBF kernel
- C=1, Gamma=0.5 parameters
- Simplified SMO-inspired algorithm

#### Artificial Neural Network (ANN)

- Architecture: Input → 8 neurons → 4 neurons → 1 output
- Sigmoid activation functions
- Backpropagation training algorithm
- Configurable epochs and learning rate
- Training loss visualization

### 4. **Model Evaluation** 📊

- Accuracy, Precision, Recall, F1-Score metrics
- Confusion matrix visualization
- Loss curve for ANN training
- Model comparison charts and tables
- Performance recommendations

### 5. **Prediction** 🔮

- Make predictions on new data
- Select trained model for inference
- Display prediction result with confidence score
- Input summary table

### 6. **Training History** 🗄️

- Persistent storage of all training sessions
- View past model performance
- Session tracking with timestamps

## Algorithm Descriptions

### K-Nearest Neighbors (KNN)

KNN is a simple, instance-based learning algorithm that classifies new instances based on the majority class of their K nearest neighbors in the feature space.

- **Time Complexity**: O(n\*d) per prediction (n = training samples, d = features)
- **Best for**: Small to medium datasets with non-linear decision boundaries

### Support Vector Machine (SVM)

SVM finds the optimal hyperplane that maximizes the margin between two classes. The RBF kernel allows for non-linear classification.

- **Kernel**: Radial Basis Function (RBF)
- **Best for**: Binary classification with complex decision boundaries

### Artificial Neural Network (ANN)

A feedforward neural network with two hidden layers trained using backpropagation. Learns complex non-linear relationships in data.

- **Architecture**: Input → Hidden(8) → Hidden(4) → Output(1)
- **Activation**: Sigmoid (range: 0-1)
- **Best for**: Complex patterns, large datasets

## Workflow

1. **Import Data** — Load CSV/Excel or use sample data
2. **Preprocess** — Normalize features and prepare for training
3. **Train Models** — Train KNN, SVM, and ANN in parallel
4. **Evaluate** — Compare model performance with metrics and charts
5. **Predict** — Make predictions on new student data
6. **Review History** — Track training sessions

## Database

The application uses **SQLite** with two main tables:

### dataset

Stores imported and preprocessed datasets with row-level data.

### model_results

Stores training results including:

- Model name
- Performance metrics (accuracy, precision, recall, F1)
- Confusion matrix
- Training timestamp

## UI Features

- **Dark Industrial Dashboard** — Professional data science aesthetic
- **Left Sidebar Navigation** — Quick access to all features
- **Responsive Design** — Adapts to different screen sizes
- **Real-time Updates** — Instant feedback on all operations
- **Toast Notifications** — User-friendly error and success messages
- **Step Indicator** — Visual progress through the workflow
- **Data Tables** — Paginated views with syntax highlighting
- **Charts** — Interactive visualizations using Chart.js

## Development

### Running in Development Mode

```bash
npm start
```

DevTools are enabled by default. Press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (macOS) to open.

### Building for Distribution

```bash
npm run build
```

(Requires electron-builder configuration)

## Security

- **Context Isolation**: Enabled to prevent XSS attacks
- **Preload Script**: All IPC communication goes through a secure bridge
- **No Node Integration**: Renderer process cannot directly access Node.js APIs
- **Process Validation**: All user inputs are validated before processing

## Performance Considerations

- **KNN**: Fastest training, but slower prediction with large datasets
- **SVM**: Medium training time, good generalization
- **ANN**: Slower training due to backpropagation, but excellent for complex patterns

Typical training times on sample dataset (150 rows):

- KNN: < 100ms
- SVM: 1-5 seconds
- ANN: 2-10 seconds (depending on epochs)

## Troubleshooting

### Application won't start

- Ensure Node.js v18+ is installed
- Run `npm install` to install dependencies
- Check console for error messages (DevTools: Ctrl+Shift+I)

### Models training very slowly

- Reduce number of epochs for ANN (e.g., 50 instead of 100)
- Check CPU usage — other applications may be consuming resources
- For large datasets, consider downsampling data

### Data not saving to database

- Ensure write permissions in application directory
- Check if `data.db` file exists and is writable

## Future Enhancements

- Export trained models for deployment
- Cross-validation for more robust evaluation
- Feature importance analysis
- Multiple dataset management
- Hyperparameter tuning interface
- Additional algorithms (Random Forest, Gradient Boosting)
- Model explainability (LIME, SHAP)

## Screenshots

[Screenshots to be added]

## License

MIT License — Free to use and modify for educational purposes.

## Contact & Support

For questions or issues, please contact your course instructor.

---

**Created for IS 108: Business Intelligence**  
_Semester: Spring 2026_
