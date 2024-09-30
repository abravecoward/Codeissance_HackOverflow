from flask import Flask, request, jsonify
import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder

# Initialize Flask app
app = Flask(__name__)

# Load the trained model
model = joblib.load(r'C:\Users\manas\Downloads\Codeissance_HackOverflow\aml_system\anomaly_detection_model.pkl')

# Load the LabelEncoders (you need to save these after training)
le_action = joblib.load(r'C:\Users\manas\Downloads\Codeissance_HackOverflow\aml_system\le_action.pkl')
le_fraud = joblib.load(r'C:\Users\manas\Downloads\Codeissance_HackOverflow\aml_system\le_fraud.pkl')

# Define the prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    # Get data from the request
    data = request.get_json()

    # Create a DataFrame from the input data
    input_df = pd.DataFrame(data)

    # Preprocess input (same as during training)
    input_df['typeofaction'] = le_action.transform(input_df['typeofaction'])
    input_df['typeoffraud'] = le_fraud.transform(input_df['typeoffraud'])
    
    # Drop any columns that were dropped during training
    input_df = input_df.drop('date', axis=1)

    # Make predictions
    predictions = model.predict(input_df)

    # Return the predictions as JSON
    return jsonify({'predictions': predictions.tolist()})

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
