import pandas as pd
import numpy as np
from typing import List
from sklearn.preprocessing import StandardScaler

class FeatureEngineer:
    def __init__(self):
        self.scaler = StandardScaler()

    def create_features(self, data: pd.DataFrame) -> pd.DataFrame:
        data = self._add_amount_features(data)
        data = self._add_frequency_features(data)
        data = self._add_network_features(data)
        data = self._add_temporal_features(data)
        data = self._add_risk_features(data)
        return data

    def _add_amount_features(self, data: pd.DataFrame) -> pd.DataFrame:
        data['amount_to_avg_ratio'] = data['amountofmoney'] / data['avg_amount']
        data['amount_diff_from_avg'] = data['amountofmoney'] - data['avg_amount']
        data['amount_to_max_ratio'] = data['amountofmoney'] / data['max_amount']
        data['amount_percentile'] = data.groupby('sourceid')['amountofmoney'].rank(pct=True)
        return data

    def _add_frequency_features(self, data: pd.DataFrame) -> pd.DataFrame:
        data['transaction_frequency'] = data['transaction_count'] / 30  # Assuming 30 days of historical data
        data['is_high_frequency'] = (data['transaction_frequency'] > data['transaction_frequency'].quantile(0.95)).astype(int)
        data['days_since_last_transaction'] = (pd.Timestamp.now() - data['last_transaction']).dt.days
        return data

    def _add_network_features(self, data: pd.DataFrame) -> pd.DataFrame:
        recipient_counts = data.groupby('sourceid')['destinationid'].nunique().reset_index()
        recipient_counts.columns = ['sourceid', 'unique_recipients']
        data = data.merge(recipient_counts, on='sourceid', how='left')
        data['unique_recipient_ratio'] = data['unique_recipients'] / data['transaction_count']
        return data

    def _add_temporal_features(self, data: pd.DataFrame) -> pd.DataFrame:
        data['hour'] = data['date'].dt.hour
        data['day_of_week'] = data['date'].dt.dayofweek
        data['is_weekend'] = data['day_of_week'].isin([5, 6]).astype(int)
        data['time_since_first_transaction'] = (data['date'] - data['first_transaction']).dt.total_seconds() / 86400  # in days
        return data

    def _add_risk_features(self, data: pd.DataFrame) -> pd.DataFrame:
        data['amount_velocity'] = data['amountofmoney'] / (data['time_since_first_transaction'] + 1)
        data['transaction_velocity'] = data['transaction_count'] / (data['time_since_first_transaction'] + 1)
        data['is_round_amount'] = (data['amountofmoney'] % 100 == 0).astype(int)
        data['amount_digit_ratio'] = data['amountofmoney'].astype(str).str.count(r'[1-9]') / data['amountofmoney'].astype(str).str.len()
        return data

    def select_features(self, data: pd.DataFrame, target: str = 'isfraud') -> pd.DataFrame:
        exclude_features = ['sourceid', 'destinationid', 'date', 'isfraud', 'typeoffraud', 'first_transaction', 'last_transaction']
        
        numerical_features = data.select_dtypes(include=[np.number]).columns.tolist()
        numerical_features = [f for f in numerical_features if f not in exclude_features]
        
        categorical_features = [col for col in data.columns if col.startswith(('typeofaction_', 'customer_type_'))]
        
        selected_features = numerical_features + categorical_features
        
        # Normalize numerical features
        data[numerical_features] = self.scaler.fit_transform(data[numerical_features])
        
        return data[selected_features + [target]]