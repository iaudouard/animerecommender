
from typing import final
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import sigmoid_kernel
from sklearn.metrics.pairwise import linear_kernel
import time
import pickle



animes_csv_ml = pd.read_csv("data/anime_used.csv")



animes_csv_ml["Overview"] = animes_csv_ml['Overview'].fillna("")
indices = pd.Series(animes_csv_ml.index, index = animes_csv_ml["title"]).drop_duplicates()
with open('cosine_sim', 'rb') as f:
    cosine_sim = pickle.load(f)


def not_same(s1, s2):
    return s1.lower() in s2.lower()
    
def give_recommendations(title, cosine_sim = cosine_sim):
    
    start_time = time.time()
    idx = indices[title]
    sig_scores = list(enumerate(cosine_sim[idx]))
    print("--- %s seconds ---" % (time.time() - start_time))
    start_time = time.time()
    sig_scores = sorted(sig_scores, key=lambda x:x[1], reverse=True)
    print("--- %s seconds ---" % (time.time() - start_time))
    anime_recs = [i[0] for i in sig_scores]
    tits = animes_csv_ml["title"].iloc[anime_recs]
    
    return {tits[x]:sig_scores[x] for x in range(len(tits))}
