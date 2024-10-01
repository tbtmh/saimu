import pandas as pd
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import StackingClassifier, RandomForestClassifier
from sklearn.svm import LinearSVC
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, precision_score
from joblib import dump
import scipy.stats as stats
from vectorizer import TextVectorizer

# Load the data
df1 = pd.read_csv('../data/dataset01.csv')
df2 = pd.read_csv('../data/dataset02.csv')
df4 = pd.read_csv('../data/dataset04.csv')
df5 = pd.read_csv('../data/dataset05.csv')
df6 = pd.read_csv('../data/dataset06.csv')

# Prepare target variables
y1 = df1['หมวดหมู่']
y2 = df2['หมวดหมู่']
y4 = df4['หมวดหมู่']
y5 = df5['หมวดหมู่']
y6 = df6['หมวดหมู่']

y = pd.concat([y1, y2, y4, y5, y6], axis=0)

x1 = df1['จุดเด่น'].fillna('')
x2 = df2['ความเชื่อ'].fillna('')
x4 = df4['คำถาม'].fillna('')
x5 = df5['คำถาม'].fillna('')
x6 = df6['คำถาม'].fillna('')

x = pd.concat([x1, x2, x4, x5, x6], axis=0)

vectorizer = TextVectorizer(max_features=1000)

x_combined = vectorizer.fit_transform(x)

label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

x_train, x_test, y_train, y_test = train_test_split(x_combined, y_encoded, test_size=0.3, random_state=42)

estimators = [
    ('rf', RandomForestClassifier(random_state=42)),
    ('svc', LinearSVC(random_state=42)),
    ('knn', KNeighborsClassifier()),
]

clf = StackingClassifier(
    estimators=estimators,
    final_estimator=LogisticRegression(random_state=42, max_iter=1000),
    n_jobs=-1,
    verbose=2,
    cv=5
)


param_rf = {'rf__n_estimators': [50, 100, 500], 'rf__max_depth': [10, 20, 30, None]}
param_svc = {'svc__C': stats.uniform(0.1, 20), 'svc__max_iter': [500, 1000, 5000]}
param_knn = {'knn__n_neighbors': stats.randint(5, 50), 'knn__weights': ['uniform', 'distance']}
param_final = {'final_estimator__C': stats.uniform(0.01, 10)}
param_dist = {**param_rf, **param_svc, **param_knn, **param_final}

random_search = RandomizedSearchCV(
    estimator=clf,
    param_distributions=param_dist,
    n_iter=20,
    scoring='accuracy',
    cv=5,
    n_jobs=-1,
    verbose=2,
    random_state=42
)

random_search.fit(x_train, y_train)


dump(random_search, './save_model/model.pkl')
dump(vectorizer, './save_model/vectorizer.pkl')
dump(label_encoder, './save_model/label_encoder.pkl')

print("Model training complete.")
