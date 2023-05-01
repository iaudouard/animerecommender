import numpy as np
import json
import utils
from scipy.spatial import distance
import threading



@utils.time_it
def read_data() -> np.array:
    result = np.load("../../data/data_cleaned.npy")
    return result


def main(choice : int):
    data = read_data()
    choiceArray = utils.get_anime_from_id(choice, data)
    ranking = cosine_similarity_numpy(choiceArray, data)
    for i in range(20):
        print(ranking[i]["id"])
    
    

@utils.time_it
def rank(choiceArray:np.array, data:np.array):
    
    ranking = cosine_similarity_numpy(choiceArray, data)
    return ranking


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
    choice_norm_tag = np.linalg.norm(choiceArray["tag_vec"])
    choice_norm_genre = np.linalg.norm(choiceArray["genre_vec"])
    for anime in data:
        
        score = 0
        dot_tag = np.dot(anime["tag_vec"], choiceArray["tag_vec"])
        norm_tag = choice_norm_tag * np.linalg.norm(anime["tag_vec"])
        cosine_simi_tag = dot_tag / norm_tag
        if(np.isnan(cosine_simi_tag)):
            continue
        dot_g = np.dot(anime["genre_vec"], choiceArray["genre_vec"])
        norm_g = choice_norm_genre * np.linalg.norm(anime["genre_vec"])
        cosine_simi_g = dot_g / norm_g
        if(np.isnan(cosine_simi_g)):
            continue
        
        score = cosine_simi_tag + (0.2 * cosine_simi_g)

        anime["score"] = score;
    #sort the values
    data = np.sort(data, order = ["score", "averageScore"])
    return data[::-1]


main(int(input("MAL ID : ")))