from flask import Flask, request, jsonify
import joblib
import pandas as pd

# Initialize the Flask app
app = Flask(__name__)

# Load the trained model and label encoders
model = joblib.load(r'anomaly_detection_model.pkl')
le_action = joblib.load(r'le_action.pkl')
le_fraud = joblib.load(r'le_fraud.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the JSON request data
        data = request.json
        print("Received data for prediction:", data)

        # Convert the data into a DataFrame
        df = pd.DataFrame([data])

        # Preprocess the input data
        df['typeofaction'] = le_action.transform(df['typeofaction'])
        df['typeoffraud'] = le_fraud.transform(df['typeoffraud'])

        # Ensure the DataFrame has the same feature order
        feature_order = ['typeofaction', 'sourceid', 'destinationid', 'amountofmoney', 'typeoffraud']
        df = df[feature_order]

        print("Transformed DataFrame for prediction:", df)

        # Make prediction
        prediction = model.predict(df)

        # Convert prediction to a readable format
        result = "Fraudulent" if prediction[0] == 1 else "Non-Fraudulent"

        # Return the result as a JSON response
        return jsonify({'prediction': result})
    
    except Exception as e:
        return jsonify({'error': str(e)})



# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
