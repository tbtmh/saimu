from joblib import load
import pandas as pd

# Load the saved model and vectorizer
model = load('./save_model/model.pkl')
vectorizer = load('./save_model/vectorizer.pkl')
label_encoder = load('./save_model/label_encoder.pkl')

def predict_category(question):
   
    question_clean = vectorizer.preprocess(question)  
    question_vectorized = vectorizer.transform(pd.Series([question_clean]))

    prediction = model.predict(question_vectorized)

    predicted_label = label_encoder.inverse_transform(prediction)
    
    return predicted_label[0]


if __name__ == "__main__":
    sample_input = "จะสอบติดมหาลัยมั้ย" 
    predicted_category = predict_category(sample_input)
    print(f"Predicted category: {predicted_category}")
