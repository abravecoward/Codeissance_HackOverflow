import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import RandomizedSearchCV
from sklearn.ensemble import RandomForestClassifier

# Load the dataset
data = pd.read_csv(r'C:\Users\manas\Downloads\Codeissance_HackOverflow\aml_system\data\moneylaundering_cleaned.csv')


# Separate features and target label
X = data.drop('isfraud', axis=1)  # Features (we exclude the 'isfraud' column)
y = data['isfraud']  # Target column

# Convert 'typeofaction' and 'typeoffraud' into numeric format using LabelEncoder
le = LabelEncoder()
X['typeofaction'] = le.fit_transform(X['typeofaction'])
X['typeoffraud'] = le.fit_transform(X['typeoffraud'])

# Drop 'date' column as it may not be relevant without further feature engineering
X = X.drop('date', axis=1)

# Step 2: Split the dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Step 3: Create the RandomForestClassifier instance
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

# Step 4: Make predictions
y_pred = rf_model.predict(X_test)

# Step 5: Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy * 100:.2f}%")

print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

print("Classification Report:")
print(classification_report(y_test, y_pred))

# Hyperparameter tuning using GridSearchCV
from sklearn.model_selection import GridSearchCV

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

param_grid = {
    'n_estimators': [100, 200, 300, 500],  # Number of trees
    'max_depth': [10, 20, 30, None],  # Maximum depth of the tree
    'min_samples_split': [2, 5, 10],  # Minimum number of samples to split a node
    'min_samples_leaf': [1, 2, 4],  # Minimum number of samples at a leaf node
    'bootstrap': [True, False]  # Whether to use bootstrap sampling
}

# Create the Random Forest model
rf = RandomForestClassifier()

# Perform RandomizedSearchCV
random_search = RandomizedSearchCV(
    estimator=rf, 
    param_distributions=param_grid,
    n_iter=100,  # Number of random combinations to try
    cv=3,  # 3-fold cross-validation
    verbose=2, 
    n_jobs=-1  # Use all cores for computation
)

# Fit the model
random_search.fit(X_train, y_train)

# Print the best hyperparameters
print("Best Hyperparameters:", random_search.best_params_)

# Use the best hyperparameters to fit a final model
best_rf = random_search.best_estimator_

# Train the model on the training data
best_rf.fit(X_train, y_train)

# Evaluate the model
y_pred = best_rf.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))

