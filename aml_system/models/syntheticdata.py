from faker import Faker
import pandas as pd

fake = Faker()

def generate_transaction():
    return {
        'transaction_id': fake.uuid4(),
        'transaction_amount': fake.random_number(digits=5),
        'transaction_type': fake.random_element(elements=('deposit', 'withdrawal')),
        'account_id': fake.random_number(digits=8),
        'timestamp': fake.date_time_this_year(),
        'location': fake.country(),
        'is_suspicious': fake.random_element(elements=(0, 1))
    }

# Generate 1000 synthetic transactions
transactions = [generate_transaction() for _ in range(1000)]

# Convert to DataFrame
df = pd.DataFrame(transactions)
df.to_csv('synthetic_transactions.csv', index=False)
print(df.head())
