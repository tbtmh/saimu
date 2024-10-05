import re
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
import scipy.sparse

nlp = spacy.load("xx_ent_wiki_sm")

class TextVectorizer:
    def __init__(self, max_features=1000):
        self.vectorizer = TfidfVectorizer(max_features=max_features, ngram_range=(1, 2))
        self.important_keywords = {
            'ความรัก': ['รัก', 'ความรัก', 'แฟน', 'คู่รัก','คนรัก','สามี','เขา','โสด','คนคุย','เนื้อคู่','คู่','อกหัก','เลิก','สัมพันธ์','คนที่ชอบ','ขอพรความรัก','ชีวิตคู่','สมหวัง','รักแท้'],
            'การงาน': ['งาน', 'เลื่อนขั้น', 'ตำแหน่ง', 'อาชีพ','สำเร็จ','มั่นคง','ลูกค้า','บริษัท','เงินเดือน','ขาย','ความสามารถ'],
            'สุขภาพ': ['สุขภาพ', 'ป่วย', 'โรค','ร่างกาย', 'เจ็บ','ริดสีดวง','บรรเทาอาการ','แข็งแรง'],
            'การเงิน': ['เงิน', 'รายได้', 'หนี้', 'ทรัพย์', 'มั่งคั่ง', 'ยืม','หวย','ทอง','โชคลาภ'],
            'การเดินทาง': ['เดิน', 'เดินทาง', 'ท่องเที่ยว', 'ทริป', 'ไป', 'เที่ยว'],
            'การเรียน': ['เรียน', 'การศึกษา', 'สอบ','มหาลัย','ปัญญา','สติ','ครู','โรงเรียน'],
        }

    def preprocess(self, text):
        text = re.sub(r'[^ก-๙a-zA-Z0-9\s]', '', text)
        doc = nlp(text)
        tokens = [token.text for token in doc if not token.is_stop and not token.is_punct]
        return ' '.join(tokens)

    def keyword_features(self, text):
        return [int(any(keyword in text for keyword in keywords)) for keywords in self.important_keywords.values()]

    def fit_transform(self, x):
        x_clean = x.apply(self.preprocess)
        x_tfidf = self.vectorizer.fit_transform(x_clean)
        x_keyword = x_clean.map(self.keyword_features)
        x_keyword_sparse = scipy.sparse.csr_matrix(x_keyword.tolist())
        return scipy.sparse.hstack([x_tfidf, x_keyword_sparse])

    def transform(self, x):
        x_clean = x.apply(self.preprocess)
        x_tfidf = self.vectorizer.transform(x_clean)
        x_keyword = x_clean.map(self.keyword_features)
        x_keyword_sparse = scipy.sparse.csr_matrix(x_keyword.tolist())
        return scipy.sparse.hstack([x_tfidf, x_keyword_sparse])
