from data_loader import DataLoader
from data_preprocessor import DataPreprocessor
from feature_engineering import FeatureEngineer
from aml_model import AMLModel, train_and_evaluate_model, detect_suspicious_transactions
from datetime import datetime, timedelta

def main():
    # Initialize components
    loader = DataLoader('path/to/your/firebase_credentials.json')
    preprocessor = DataPreprocessor()
    feature_engineer = FeatureEngineer()

    # Load and process data
    end_date = datetime.now()
    start_date = end_date - timedelta(days=30)
    transactions = loader.load_transactions(start_date, end_date)
    customer_ids = transactions['sourceid'].unique().tolist()
    customer_profiles = loader.load_customer_profiles(customer_ids)
    historical_data = loader.load_historical_data(customer_ids)

    preprocessed_data = preprocessor.preprocess(transactions, customer_profiles, historical_data)
    final_data = feature_engineer.create_features(preprocessed_data)
    selected_features = feature_engineer.select_features(final_data)

    # Train and evaluate the model
    model = train_and_evaluate_model(selected_features)

    # Detect suspicious transactions
    suspicious_transactions = detect_suspicious_transactions(model, selected_features)

    # Save results
    loader.save_processed_data(suspicious_transactions, 'suspicious_transactions')

    print("AML analysis completed. Suspicious transactions saved to Firebase.")

if __name__ == "__main__":
    main()