import numpy as np
import json
import utils
import scipy
import threading



def read_data() -> np.array:
    with open("../../data/json/data_as_list.json", 'r') as fout:
        data = json.load(fout)
        dt = np.dtype([("id", np.int32), ("year",  np.int32), ("type", np.unicode_, 16), ("format", np.unicode_, 16),("averageScore", np.int8), ("tag_vec" , np.int16, (323,)), ("genre_vec", np.int16, (19, )), ("genre_val",  np.int32), ("score",  np.int8)])
        result = np.ndarray(shape = (len(data),), dtype = dt)  #size x 8
        for i in range(len(data)):
            for j in range(8):
                if(data[i][j] != None):
                    result[i][j] = data[i][j]
            result[i][8] = -100000
        return result


def main(choice : int):
    data = read_data()
    choiceArray = utils.get_anime_from_id(choice, data)
    ranking = rank(choiceArray, data)
    for i in range(10):
        print(ranking[i][0], ranking[i][-1])

def remove_no_match_genre(choiceArray:np.array, data:np.array) -> np.array:
    
    count = 0
    for i in range(data.size):
        if(data[i][7] & choiceArray[7] != 0 and np.linalg.norm(data[i][5]) != 0 and data[i][2] == choiceArray[2] and data[i][3] == choiceArray[3]):
            count+=1;
    dt = np.dtype([("id", np.int32), ("year",  np.int32), ("type", np.unicode_, 16), ("format", np.unicode_, 16),("averageScore", np.int8), ("tag_vec" , np.int8, (323,)), ("genre_vec", np.int8, (19, )), ("genre_val",  np.int32), ("score",  np.float64)])
    result = np.ndarray(shape = (count,), dtype = dt)
    count = 0
    for i in range(data.size):
        if(data[i][7] & choiceArray[7] != 0 and np.linalg.norm(data[i][5]) != 0 and data[i][2] == choiceArray[2] and data[i][3] == choiceArray[3]): #perform and & (AND) operation to see if they have any matching genres
            result[count] = data[i]
            count += 1
    return result

def rank(choiceArray:np.array, data:np.array):
    
    #remove all anime with no matching genre with and AND operation
    #this should reduce intermidiate value already
    ranking = remove_no_match_genre(choiceArray, data)
    ranking = cosine_similarity_numpy(choiceArray, ranking)
    return ranking

def dot_prod(a, b):
    c = 0
    for i in range(323):
        c += a[i] * b[i]
    return c

def cosine_similarity_scipy(choiceArray:np.array, data:np.array):
    pass

def cosine_similarity_numpy(choiceArray:np.array, data:np.array):
    
    for anime in data:
        dot = dot_prod(anime[5], choiceArray[5])
        norm = np.linalg.norm(choiceArray[5]) * np.linalg.norm(anime[5])
        cosine_simi = dot / norm
        anime[8] = cosine_simi;
    #sort the values
    data = np.sort(data, order = "score")
    return data[::-1]

main(1)