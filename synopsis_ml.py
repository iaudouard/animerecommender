import pandas as pd 
from sklearn.tree import DecisionTreeClassifier


df = pd.read_csv('./data/emotions-data/data/new_train.csv')

X = df.drop(columns=['quote', 'id', 'emotions'])
print(df)