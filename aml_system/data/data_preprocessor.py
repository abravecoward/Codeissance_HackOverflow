import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from typing import Tuple, List

class DataPreprocessor:
    def __init__(self):
        self.scaler = StandardScaler()
        self.encoder = OneHotEncoder(sparse=False, handle_unknown='ignore')

    def preprocess(self, transactions: pd.DataFrame, customer_profiles: pd.DataFrame, historical_data: pd.DataFrame) -> pd.DataFrame:
        # Merge dataframes
        merged_data = self._merge_data(transactions, customer_profiles, historical_data)
        
        # Handle missing values
        merged_data = self._handle_missing_values(merged_data)
        
        # Extract time-based features
        merged_data = self._extract_time_features(merged_data)
        
        # Normalize numerical features
        merged_data = self._normalize_numerical_features(merged_data)
        
        # Encode categorical features
        merged_data = self._encode_categorical_features(merged_data)
        
        return merged_data

    def _merge_data(self, transactions: pd.DataFrame, customer_profiles: pd.DataFrame, historical_data: pd.DataFrame) -> pd.DataFrame:
        merged = transactions.merge(customer_profiles, left_on='sourceid', right_on='customerid', how='left')
        merged = merged.merge(historical_data, left_on='sourceid', right_on='sourceid', how='left')
        return merged

    def _handle_missing_values(self, data: pd.DataFrame) -> pd.DataFrame:
        # Fill missing values in customer profiles and historical data
        data['customer_type'].fillna('Unknown', inplace=True)
        data['account_age'].fillna(data['account_age'].median(), inplace=True)
        data['average_transaction_amount'].fillna(data['average_transaction_amount'].median(), inplace=True)
        data['transaction_count'].fillna(0, inplace=True)
        data['avg_amount'].fillna(0, inplace=True)
        return data

    def _extract_time_features(self, data: pd.DataFrame) -> pd.DataFrame:
        data['hour'] = data['date'].dt.hour
        data['day_of_week'] = data['date'].dt.dayofweek
        data['is_weekend'] = data['day_of_week'].isin([5, 6]).astype(int)
        return data

    def _normalize_numerical_features(self, data: pd.DataFrame) -> pd.DataFrame:
        numerical_features = ['amountofmoney', 'account_age', 'average_transaction_amount', 'transaction_count', 'avg_amount']
        data[numerical_features] = self.scaler.fit_transform(data[numerical_features])
        return data

    def _encode_categorical_features(self, data: pd.DataFrame) -> pd.DataFrame:
        categorical_features = ['typeofaction', 'customer_type']
        encoded_features = self.encoder.fit_transform(data[categorical_features])
        encoded_df = pd.DataFrame(encoded_features, columns=self.encoder.get_feature_names(categorical_features))
        return pd.concat([data.drop(columns=categorical_features), encoded_df], axis=1)