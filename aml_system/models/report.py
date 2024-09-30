import joblib
import pandas as pd
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import numpy as np

# Define the generate_report function
def generate_report(y_true, y_pred, model, X, report_file_path):
    with open(report_file_path, 'w') as report_file:
        accuracy = np.mean(y_true == y_pred)
        report_file.write(f"Accuracy: {accuracy * 100:.2f}%\n")
        
        report_file.write("\nConfusion Matrix:\n")
        cm = confusion_matrix(y_true, y_pred)
        report_file.write(f"{cm}\n")
        
        report_file.write("\nClassification Report:\n")
        cr = classification_report(y_true, y_pred)
        report_file.write(f"{cr}\n")
        
        if hasattr(model, 'feature_importances_'):
            report_file.write("\nFeature Importances:\n")
            importances = model.feature_importances_
            for feature, importance in zip(X.columns, importances):
                report_file.write(f"{feature}: {importance:.4f}\n")
        
        report_file.write("\nFurther Investigation Required\n")
        report_file.write("These predictions suggest potential fraudulent activity, further investigation is advised.\n")
    
    print(f"Report successfully generated at: {report_file_path}")

# Load the saved LabelEncoder objects
le_action = joblib.load(r'C:\Users\manas\Downloads\Codeissance_HackOverflow\aml_system\le_action.pkl')
le_fraud = joblib.load(r'C:\Users\manas\Downloads\Codeissance_HackOverflow\aml_system\le_fraud.pkl')

# Load test data
test_data = pd.read_csv(r'C:\Users\manas\Downloads\moneylaundering_test.csv')

# Preprocess the test dataset
test_data['typeofaction'] = le_action.transform(test_data['typeofaction'])
test_data['typeoffraud'] = le_fraud.transform(test_data['typeoffraud'])
test_data = test_data.drop('date', axis=1)

# Define features (X_test) and target (y_test)
X_test = test_data.drop('isfraud', axis=1)
y_test = test_data['isfraud']

# Make predictions using the best model
best_rf = joblib.load(r'C:\Users\manas\Downloads\Codeissance_HackOverflow\aml_system\anomaly_detection_model.pkl')
y_test_pred = best_rf.predict(X_test)

# Generate the report
generate_report(y_test, y_test_pred, best_rf, X_test, r'C:\Users\manas\Downloads\Codeissance_HackOverflow\aml_system\fraud_report.txt')
