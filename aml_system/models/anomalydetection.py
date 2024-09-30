# Import necessary libraries
import pandas as pd
from sklearn.preprocessing import LabelEncoder

# Load your data
data = pd.read_csv(r'C:\Users\manas\Downloads\synthetic_data.csv')

# Instantiate LabelEncoder
le = LabelEncoder()

# Apply label encoding to the 'typeofaction' column
data['typeofaction'] = le.fit_transform(data['typeofaction'])

# Continue with the rest of your code...

data['typeoffraud'] = le.fit_transform(data['typeoffraud'])
data = data.drop('date', axis=1)

# Initialize the Isolation Forest model
iso_forest = IsolationForest(n_estimators=100, contamination=0.01, random_state=42)

# Fit the model to the training data
iso_forest.fit(data)

# Predict anomalies (returns -1 for anomalies, 1 for normal transactions)
anomaly_predictions = iso_forest.predict(data)

# Convert the results to a more interpretable form (1: normal, 0: anomaly)
data['is_suspicious'] = [1 if x == -1 else 0 for x in anomaly_predictions]

# Display flagged anomalies
anomalies = data[data['is_suspicious'] == 1]
print(f"Anomalies Detected: {len(anomalies)}")
print(anomalies)
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from keras.models import Model
from keras.layers import Input, Dense

# Load and preprocess the data
data = pd.read_csv('synthetic_transactions.csv')
data['typeofaction'] = le.fit_transform(data['typeofaction'])
data['typeoffraud'] = le.fit_transform(data['typeoffraud'])
data = data.drop('date', axis=1)

# Normalize the data
scaler = MinMaxScaler()
data_scaled = scaler.fit_transform(data)

# Define the autoencoder model
input_dim = data_scaled.shape[1]
input_layer = Input(shape=(input_dim,))
encoder = Dense(14, activation="relu")(input_layer)
encoder = Dense(7, activation="relu")(encoder)
decoder = Dense(14, activation="relu")(encoder)
decoder = Dense(input_dim, activation="sigmoid")(decoder)

autoencoder = Model(inputs=input_layer, outputs=decoder)
autoencoder.compile(optimizer='adam', loss='mse')

# Train the autoencoder
autoencoder.fit(data_scaled, data_scaled, epochs=50, batch_size=32, shuffle=True)

# Use the autoencoder to detect anomalies
reconstructed_data = autoencoder.predict(data_scaled)
reconstruction_error = np.mean(np.power(data_scaled - reconstructed_data, 2), axis=1)

# Flag data points with high reconstruction errors as anomalies
threshold = np.percentile(reconstruction_error, 99)  # Adjust threshold for sensitivity
data['reconstruction_error'] = reconstruction_error
data['is_suspicious'] = [1 if e > threshold else 0 for e in reconstruction_error]

anomalies = data[data['is_suspicious'] == 1]
print(f"Anomalies Detected: {len(anomalies)}")
print(anomalies)
from sklearn.cluster import DBSCAN

# Initialize the DBSCAN model
dbscan = DBSCAN(eps=0.5, min_samples=5)

# Fit the model
dbscan.fit(data_scaled)

# Label transactions that do not fit into any cluster (-1 indicates an anomaly)
data['dbscan_cluster'] = dbscan.labels_
data['is_suspicious'] = [1 if x == -1 else 0 for x in dbscan.labels_]

# Display anomalies
anomalies = data[data['is_suspicious'] == 1]
print(f"Anomalies Detected: {len(anomalies)}")
print(anomalies)
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

# Load and preprocess the data
X = data.drop('isfraud', axis=1)  # Features
y = data['isfraud']  # Target label

# Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Train an XGBoost model
xgb_model = xgb.XGBClassifier(n_estimators=100, max_depth=5, learning_rate=0.1)
xgb_model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = xgb_model.predict(X_test)

# Evaluate the model
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Classification Report:")
print(classification_report(y_test, y_pred))
# Combine Isolation Forest and XGBoost results
data['final_suspicious_flag'] = (data['is_suspicious_iso'] | data['is_suspicious_xgb']).astype(int)

# If either Isolation Forest or XGBoost flag the transaction, it is considered suspicious
final_anomalies = data[data['final_suspicious_flag'] == 1]
print(f"Final Anomalies Detected: {len(final_anomalies)}")
# Example: Adding transaction amount deviation feature
data['amount_deviation'] = abs(data['transaction_amount'] - data['transaction_amount'].mean()) / data['transaction_amount'].std()

# Flagging transactions with large deviations as suspicious
data['is_suspicious_amount'] = data['amount_deviation'] > 3
