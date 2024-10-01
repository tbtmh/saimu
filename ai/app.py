from flask import Flask, request, jsonify
import joblib
import pandas as pd
from pymongo import MongoClient
from bson.json_util import dumps

app = Flask(__name__)

model = joblib.load('./save_model/model.pkl')
vectorizer = joblib.load('./save_model/vectorizer.pkl')
label_encoder = joblib.load('./save_model/label_encoder.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    question = data.get('question')

    if not question:
        return jsonify({'error': 'No input provided'}), 400

    question_clean = vectorizer.preprocess(question)  
    question_vectorized = vectorizer.transform(pd.Series([question_clean]))

    prediction = model.predict(question_vectorized)

    category = label_encoder.inverse_transform(prediction)

    return jsonify({'predicted_category': category[0]})

if __name__ == '__main__':
    app.run(debug=True)