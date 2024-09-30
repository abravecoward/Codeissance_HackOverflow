import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import joblib

class AMLModel:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)

    def train(self, X: pd.DataFrame, y: pd.Series):
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        self.model.fit(X_train, y_train)
        
        y_pred = self.model.predict(X_test)
        print("Model Performance:")
        print(classification_report(y_test, y_pred))
        print("Confusion Matrix:")
        print(confusion_matrix(y_test, y_pred))

    def predict(self, X: pd.DataFrame) -> pd.Series:
        return self.model.predict(X)

    def predict_proba(self, X: pd.DataFrame) -> pd.DataFrame:
        return self.model.predict_proba(X)

    def save_model(self, filename: str):
        joblib.dump(self.model, filename)

    def load_model(self, filename: str):
        self.model = joblib.load(filename)

def train_and_evaluate_model(data: pd.DataFrame):
    X = data.drop('isfraud', axis=1)
    y = data['isfraud']

    model = AMLModel()
    model.train(X, y)

    # Save the trained model
    model.save_model('aml_model.joblib')

    return model

def detect_suspicious_transactions(model: AMLModel, data: pd.DataFrame, threshold: float = 0.7) -> pd.DataFrame:
    probabilities = model.predict_proba(data.drop('isfraud', axis=1))
    data['fraud_probability'] = probabilities[:, 1]
    data['is_suspicious'] = (data['fraud_probability'] >= threshold).astype(int)
    return data.sort_values('fraud_probability', ascending=False)

# Usage example:
# processed_data = ... # Load your processed data
# model = train_and_evaluate_model(processed_data)
# suspicious_transactions = detect_suspicious_transactions(model, processed_data)
# print(suspicious_transactions[['sourceid', 'destinationid', 'amountofmoney', 'fraud_probability', 'is_suspicious']])