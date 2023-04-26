import numpy as np
import json
import utils
from scipy.spatial import distance
import threading



@utils.time_it
def read_data() -> np.array:
    with open("../../data/json/data_as_list.json", 'r') as fout:
        data = json.load(fout)
        dt = np.dtype([("id", np.int32), ("year",  np.int32), ("type", np.unicode_, 16), ("format", np.unicode_, 16),("averageScore", np.int8), ("tag_vec" , np.int16, (325,)), ("genre_vec", np.int16, (19, )), ("genre_val",  np.int32), ("score",  np.int8)])
        result = np.ndarray(shape = (len(data),), dtype = dt)  #size x 8
        for i in range(len(data)):
            for j in range(8):
                if(data[i][j] != None):
                    if(j == 5):
                        array = np.zeros((325,))
                        for k in range(323):
                            array[k] = data[i][j][k]
                        result[i][j] = array
                    else:
                        result[i][j] = data[i][j]
            result[i][8] = 0
    
    for anime in result:
        anime[5][323] = anime[1]
        anime[5][324] = anime[4]
    np.save("../../data/csv/data.npy", result)
    return result


def main(choice : int):
    data = read_data()
    choiceArray = utils.get_anime_from_id(choice, data)
    ranking = rank(choiceArray, data)
    print(ranking[0]["id"], ranking[0]["score"])
    print(ranking[1]["id"], ranking[1]["score"])
    print(ranking[2]["id"], ranking[2]["score"])
    print(ranking[3]["id"], ranking[3]["score"])

    
def remove_no_match_genre(choiceArray:np.array, data:np.array) -> np.array:
    
    count = 0
    for i in range(data.size):
        if(data[i][7] & choiceArray[7] != 0 and np.linalg.norm(data[i][5]) != 0 and data[i][2] == choiceArray[2] and data[i][3] == choiceArray[3]):
            count+=1;
    dt = np.dtype([("id", np.int32), ("year",  np.int32), ("type", np.unicode_, 16), ("format", np.unicode_, 16),("averageScore", np.int8), ("tag_vec" , np.int8, (325,)), ("genre_vec", np.int8, (19, )), ("genre_val",  np.int32), ("score",  np.float64)])
    result = np.ndarray(shape = (count,), dtype = dt)
    count = 0
    for i in range(data.size):
        if(data[i][7] & choiceArray[7] != 0 and np.linalg.norm(data[i][5]) != 0 and data[i][2] == choiceArray[2] and data[i][3] == choiceArray[3]): #perform and & (AND) operation to see if they have any matching genres
            result[count] = data[i]
            count += 1
    return result

@utils.time_it
def rank(choiceArray:np.array, data:np.array):
    
    #remove all anime with no matching genre with and AND operation
    #this should reduce intermidiate value already
    choiceArray[5][324] = 10
    print(choiceArray)
    ranking = remove_no_match_genre(choiceArray, data)
    ranking = cosine_similarity_numpy(choiceArray, ranking)
    return ranking

def dot_prod(a, b):
    c = 0
    for i in range(323):
        c += a[i] * b[i]
    return c

@utils.time_it
def cosine_similarity_scipy(choiceArray:np.array, data:np.array):
    for anime in data:
        cosine_simi = 1 - distance.cosine(anime[5], choiceArray[5])
        anime[8] = cosine_simi;
    #sort the values
    data = np.sort(data, order = "score")
    return data[::-1]

@utils.time_it
def cosine_similarity_numpy(choiceArray:np.array, data:np.array):
    #seems to be faster
    choice_norm_tag = np.linalg.norm(choiceArray[5])
    choice_norm_genre = np.linalg.norm(choiceArray[6])
    for anime in data:
        score = 0
        dot_tag = np.dot(anime[5], choiceArray[5])
        norm_tag = choice_norm_tag * np.linalg.norm(anime[5])
        cosine_simi_tag = dot_tag / norm_tag

        dot_g = np.dot(anime[6], choiceArray[6])
        norm_g = choice_norm_genre * np.linalg.norm(anime[6])
        cosine_simi_g = dot_g / norm_g

        score += cosine_simi_tag
        anime[8] = score;
    #sort the values
    data = np.sort(data, order = "score")
    return data[::-1]


main(99423)