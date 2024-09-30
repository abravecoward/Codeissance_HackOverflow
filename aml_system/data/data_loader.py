import firebase_admin
from firebase_admin import credentials, firestore
import pandas as pd
from datetime import datetime, timedelta
from typing import List

class DataLoader:
    def __init__(self, credentials_path: str):
        cred = credentials.Certificate(credentials_path)
        firebase_admin.initialize_app(cred)
        self.db = firestore.client()

    def load_transactions(self, start_date: datetime, end_date: datetime) -> pd.DataFrame:
        transactions_ref = self.db.collection('transactions')
        query = transactions_ref.where('date', '>=', start_date).where('date', '<=', end_date)
        docs = query.stream()
        
        transactions = []
        for doc in docs:
            transaction = doc.to_dict()
            transaction['id'] = doc.id
            transactions.append(transaction)
        
        df = pd.DataFrame(transactions)
        df['date'] = pd.to_datetime(df['date'])
        return df

    def load_customer_profiles(self, customer_ids: List[str]) -> pd.DataFrame:
        profiles_ref = self.db.collection('customer_profiles')
        docs = profiles_ref.where('customerid', 'in', customer_ids).stream()
        
        profiles = []
        for doc in docs:
            profile = doc.to_dict()
            profile['id'] = doc.id
            profiles.append(profile)
        
        return pd.DataFrame(profiles)

    def load_historical_data(self, customer_ids: List[str], lookback_days: int = 30) -> pd.DataFrame:
        end_date = datetime.now()
        start_date = end_date - timedelta(days=lookback_days)
        
        transactions_ref = self.db.collection('transactions')
        query = transactions_ref.where('sourceid', 'in', customer_ids).where('date', '>=', start_date).where('date', '<=', end_date)
        docs = query.stream()
        
        transactions = []
        for doc in docs:
            transaction = doc.to_dict()
            transaction['id'] = doc.id
            transactions.append(transaction)
        
        df = pd.DataFrame(transactions)
        
        # Perform aggregations
        historical_data = df.groupby('sourceid').agg({
            'amountofmoney': ['count', 'mean', 'std', 'min', 'max'],
            'date': ['min', 'max']
        }).reset_index()
        
        historical_data.columns = ['sourceid', 'transaction_count', 'avg_amount', 'std_amount', 'min_amount', 'max_amount', 'first_transaction', 'last_transaction']
        return historical_data

    def save_processed_data(self, data: pd.DataFrame, collection_name: str):
        collection_ref = self.db.collection(collection_name)
        
        for _, row in data.iterrows():
            doc_ref = collection_ref.document()
            doc_ref.set(row.to_dict())