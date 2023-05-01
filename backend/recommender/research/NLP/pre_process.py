import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
import re

nltk.download('stopwords')
nltk.download('punkt')

# Define a list of stopwords
stop_words = set(stopwords.words('english'))

# Define a stemmer
stemmer = PorterStemmer()

# Preprocess a text string
def preprocess_text(text):
    # Remove HTML tags and special characters
    text = re.sub('<[^<]+?>', '', text)
    text = re.sub('[^a-zA-Z0-9\s]', '', text)
    
    # Tokenize the text into words
    words = word_tokenize(text)
    
    # Remove stop words and stem the words
    stemmed_words = [stemmer.stem(w.lower()) for w in words if w.lower() not in stop_words]
    
    # Join the stemmed words back into a single string
    preprocessed_text = ' '.join(stemmed_words)
    
    return preprocessed_text
