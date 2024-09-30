from sklearn.metrics import classification_report, confusion_matrix
import numpy as np

def generate_report(y_true, y_pred, model, X, report_file_path):
    # Open file to write the report
    with open(report_file_path, 'w') as report_file:
        # Write overall accuracy
        accuracy = np.mean(y_true == y_pred)
        report_file.write(f"Accuracy: {accuracy * 100:.2f}%\n")
        
        # Write confusion matrix
        report_file.write("\nConfusion Matrix:\n")
        cm = confusion_matrix(y_true, y_pred)
        report_file.write(f"{cm}\n")
        
        # Write classification report
        report_file.write("\nClassification Report:\n")
        cr = classification_report(y_true, y_pred)
        report_file.write(f"{cr}\n")
        
        # Write feature importances (if available)
        if hasattr(model, 'feature_importances_'):
            report_file.write("\nFeature Importances:\n")
            importances = model.feature_importances_
            for feature, importance in zip(X.columns, importances):
                report_file.write(f"{feature}: {importance:.4f}\n")
        
        # Write any other additional information if needed
        report_file.write("\nFurther Investigation Required\n")
        report_file.write("These predictions suggest potential fraudulent activity, further investigation is advised.\n")
    
    print(f"Report successfully generated at: {report_file_path}")
