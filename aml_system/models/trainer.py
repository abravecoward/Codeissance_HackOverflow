import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV, RandomizedSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.preprocessing import LabelEncoder

# Load the dataset
data = pd.read_csv(r'C:\Users\manas\Downloads\moneylaundering_train.csv')

# Separate features and target label
X = data.drop('isfraud', axis=1)  # Features (excluding 'isfraud' column)
y = data['isfraud']  # Target column

# Fit LabelEncoder on the entire training data
le_action = LabelEncoder()
le_fraud = LabelEncoder()

# Fit the LabelEncoders to the training data
X['typeofaction'] = le_action.fit_transform(X['typeofaction'])
X['typeoffraud'] = le_fraud.fit_transform(X['typeoffraud'])

# Drop 'date' column as it may not be relevant without further feature engineering
X = X.drop('date', axis=1)

# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Create the RandomForestClassifier instance
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

# Make predictions
y_pred = rf_model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy * 100:.2f}%")
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print("Classification Report:")
print(classification_report(y_test, y_pred))

# Hyperparameter tuning using GridSearchCV
param_grid = {  
    'n_estimators': [100, 200, 300],
    'max_depth': [10, 20, None],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4],
    'bootstrap': [True, False]
}

grid_search = GridSearchCV(estimator=rf_model, param_grid=param_grid, cv=3, n_jobs=-1, verbose=2)
grid_search.fit(X_train, y_train)

print("Best Hyperparameters:", grid_search.best_params_)

# Feature importance
importances = rf_model.feature_importances_
feature_importance_df = pd.DataFrame({'Feature': X.columns, 'Importance': importances})
feature_importance_df = feature_importance_df.sort_values('Importance', ascending=False)
print(feature_importance_df)

# Randomized Search for hyperparameter optimization
param_grid = {
    'n_estimators': [100, 200, 300, 500],
    'max_depth': [10, 20, 30, None],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4],
    'bootstrap': [True, False]
}

# Perform RandomizedSearchCV
random_search = RandomizedSearchCV(
    estimator=rf_model, 
    param_distributions=param_grid,
    n_iter=100,
    cv=3,
    verbose=2, 
    n_jobs=-1
)

# Fit the model
random_search.fit(X_train, y_train)

# Print the best hyperparameters
print("Best Hyperparameters:", random_search.best_params_)

# Use the best hyperparameters to fit a final model
best_rf = random_search.best_estimator_
best_rf.fit(X_train, y_train)

# Evaluate the model on test data
y_pred = best_rf.predict(X_test)
print("Accuracy on test data:", accuracy_score(y_test, y_pred))

# Validation and Testing
# Load the validation and test datasets
validation_data = pd.read_csv(r'C:\Users\manas\Downloads\moneylaundering_val.csv')
test_data = pd.read_csv(r'C:\Users\manas\Downloads\moneylaundering_test.csv')

# Preprocess the validation dataset
# Convert 'typeofaction' and 'typeoffraud' using the fitted LabelEncoders
validation_data['typeofaction'] = le_action.transform(validation_data['typeofaction'])
validation_data['typeoffraud'] = le_fraud.transform(validation_data['typeoffraud'])
validation_data = validation_data.drop('date', axis=1)

# Separate features and target label
X_validation = validation_data.drop('isfraud', axis=1)
y_validation = validation_data['isfraud']

# Make predictions on the validation data
y_validation_pred = best_rf.predict(X_validation)

# Evaluate the validation model
validation_accuracy = accuracy_score(y_validation, y_validation_pred)
print(f"Validation Accuracy: {validation_accuracy * 100:.2f}%")
print("Validation Confusion Matrix:")
print(confusion_matrix(y_validation, y_validation_pred))
print("Validation Classification Report:")
print(classification_report(y_validation, y_validation_pred))

# Preprocess the test dataset
test_data['typeofaction'] = le_action.transform(test_data['typeofaction'])
test_data['typeoffraud'] = le_fraud.transform(test_data['typeoffraud'])
test_data = test_data.drop('date', axis=1)

# Separate features and target label
X_test = test_data.drop('isfraud', axis=1)
y_test = test_data['isfraud']

# Make predictions on the test data
y_test_pred = best_rf.predict(X_test)

# Evaluate the test model
test_accuracy = accuracy_score(y_test, y_test_pred)
print(f"Test Accuracy: {test_accuracy * 100:.2f}%")
print("Test Confusion Matrix:")
print(confusion_matrix(y_test, y_test_pred))
print("Test Classification Report:")
print(classification_report(y_test, y_test_pred))
import joblib

# Save the trained model
joblib.dump(best_rf, r'C:\Users\manas\Downloads\Codeissance_HackOverflow\aml_system\anomaly_detection_model.pkl')

joblib.dump(le_action, 'le_action.pkl')
joblib.dump(le_fraud, 'le_fraud.pkl')
