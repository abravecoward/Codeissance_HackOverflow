from data_loader import DataLoader
from data_preprocessor import DataPreprocessor
from feature_engineering import FeatureEngineer
import pandas as pd
from datetime import datetime, timedelta

# Initialize Firebase DataLoader
loader = DataLoader('path/to/your/firebase_credentials.json')

# Test DataLoader
end_date = datetime.now()
start_date = end_date - timedelta(days=30)
transactions = loader.load_transactions(start_date, end_date)
print("Transactions loaded:", len(transactions))

customer_ids = transactions['sourceid'].unique().tolist()[:100] 
customer_profiles = loader.load_customer_profiles(customer_ids)
print("Customer profiles loaded:", len(customer_profiles))

historical_data = loader.load_historical_data(customer_ids)
print("Historical data loaded:", len(historical_data))

# Test DataPreprocessor
preprocessor = DataPreprocessor()
preprocessed_data = preprocessor.preprocess(transactions, customer_profiles, historical_data)
print("Preprocessed data shape:", preprocessed_data.shape)

# Test FeatureEngineer
feature_engineer = FeatureEngineer()
final_data = feature_engineer.create_features(preprocessed_data)
print("Final data shape:", final_data.shape)

selected_features = feature_engineer.select_features(final_data)
print("Selected features shape:", selected_features.shape)

# Save processed data back to Firebase
loader.save_processed_data(selected_features, 'processed_transactions')
print("Processed data saved to Firebase")

print("Data processing test completed successfully.")