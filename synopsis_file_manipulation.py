import pandas as pd 
from csv import writer
import math
from logic import *
import re




emotion_words = pd.read_csv('./data/emotions-data/tables/emotion_words.csv')
def get_emotions(syn):
    regex = re.compile('[^a-zA-Z]')
    emotions_dic = {'admiration' : 0,'amusement':0,'anger':0,'annoyance':0,'approval':0,'caring':0,'confusion':0,'curiosity':0,'desire':0,'disappointment':0,'disapproval':0,'disgust':0,'embarrassment':0,
        'excitement':0,'fear':0,'gratitude':0,'grief':0,'joy':0,'love':0,'nervousness':0,'optimism':0,'pride':0, 'realization':0,'relief':0,'remorse':0,'sadness':0,'surprise':0,'neutral':0}
    if syn != None: 
        for i in syn.split():
            emotions_words_list = emotion_words['word'].tolist()
            word = regex.sub('', i.lower(),)
            if word in emotions_words_list:
                word_index = emotions_words_list.index(word)
                word_emotion = emotion_words.iloc[word_index]['emotion']
                emotions_dic[word_emotion] += math.log10(emotion_words.iloc[word_index]['odds'])
    
    return emotions_dic
    

def write_data(list_data, path):
    with open(path, 'a', newline='',encoding="utf-8") as f_object:  
        # Pass the CSV  file object to the writer() function
        writer_object = writer(f_object)
        # Result - a writer object
        # Pass the data in the list as an argument into the writerow() function
        writer_object.writerow(list_data)  
        # Close the file object
        f_object.close()

animes = openAnimes()
def run():
    counter = 0
    for i in animes:
        counter+=1
        print(counter)
        title = animes[i]['attributes']['canonicalTitle']
        synopsis = animes[i]['attributes']['synopsis']
        emotions_dic = get_emotions(synopsis)
        list_data = [title, synopsis]
        for j in emotions_dic:
            list_data.append(emotions_dic[j])
        write_data(list_data, './data/anime_synopses_with_emotion_data.csv')

train_df = pd.read_csv('./data/emotions-data/data/train.tsv', '\t')
def improve_train_file():
    for index, row in train_df.iterrows():
        print(index)
        quote = row['quote']
        emotions = row['emotions']
        row_id = row['id']
        emotions_dic = get_emotions(quote)
        list_data = [quote, emotions, row_id]
        for i in emotions_dic:
            list_data.append(emotions_dic[i])
        write_data(list_data, './data/emotions-data/data/new_train.csv')


