from joblib import load
import pandas as pd

# Load the saved model and vectorizer
model = load('./save_model/model.pkl')
vectorizer = load('./save_model/vectorizer.pkl')
label_encoder = load('./save_model/label_encoder.pkl')

def predict_category(question):
    # Preprocess and vectorize input
    question_clean = vectorizer.preprocess(question)  # Preprocess the input
    question_vectorized = vectorizer.transform(pd.Series([question_clean]))

    # Predict the category
    prediction = model.predict(question_vectorized)

    # Convert prediction back to the original label
    predicted_label = label_encoder.inverse_transform(prediction)
    
    return predicted_label[0]

# Test with a sample input
if __name__ == "__main__":
    sample_input = "จะสอบติดมหาลัยมั้ย"  # Example question
    predicted_category = predict_category(sample_input)
    print(f"Predicted category: {predicted_category}")
