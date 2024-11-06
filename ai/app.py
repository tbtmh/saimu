from flask import Flask, request, jsonify
import joblib
import pandas as pd


app = Flask(__name__)

model = joblib.load('./save_model/model.pkl')
vectorizer = joblib.load('./save_model/vectorizer.pkl')
label_encoder = joblib.load('./save_model/label_encoder.pkl')

def get_prediction(text, model, threshold=0.59):
    question_clean = vectorizer.preprocess(text)
    question_vectorized = vectorizer.transform(pd.Series([question_clean]))

    try:
        probabilities = model.predict_proba(question_vectorized)
        confidence = max(probabilities[0])
    except AttributeError:
        confidence = 1 

    predicted_label = model.predict(question_vectorized)[0]

    if confidence < threshold:
        return "ไม่ระบุหมวดหมู่"
    else:
        return label_encoder.inverse_transform([predicted_label])[0]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    question = data.get('question')

    if not question:
        return jsonify({'error': 'No input provided'}), 400

    predicted_category = get_prediction(question, model)

    return jsonify({'predicted_category': predicted_category})

if __name__ == '__main__':
    app.run(debug=True)