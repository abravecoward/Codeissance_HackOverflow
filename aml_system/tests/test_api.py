import requests
import json

# The URL of your API endpoint
url = 'http://localhost:5000/predict'

# Test data
test_data = {
    "typeofaction": "some_action",
    "typeoffraud": "some_fraud_type",
    # Add other features as needed
}

# Send POST request
response = requests.post(url, json=test_data)

# Check the response
if response.status_code == 200:
    print("Request successful!")
    print("Prediction:", response.json())
else:
    print("Request failed with status code:", response.status_code)
    print("Response:", response.text)

# Test with multiple inputs
test_data_list = [
    {"typeofaction": "action1", "typeoffraud": "fraud1"},
    {"typeofaction": "action2", "typeoffraud": "fraud2"},
    # Add more test cases as needed
]

for data in test_data_list:
    response = requests.post(url, json=data)
    print(f"Input: {data}")
    print(f"Prediction: {response.json()}\n")