import numpy as np
import json
import utils
from scipy.spatial import distance
import threading



@utils.time_it
def read_data() -> np.array:
    result = np.load("../../data/data_cleaned_only_origin_anime.npy")
    return result


def main(choice : int):
    data = read_data()
    choiceArray = utils.get_anime_from_id(choice, data)
    print(choiceArray)
    ranking = cosine_similarity_numpy(choiceArray, data)
    for i in range(20):
        print(ranking[i]["id"], ranking[i]["score"], ranking[i]["averageScore"], ranking[i]["meanScore"])
    
    

@utils.time_it
def rank(choiceArray:np.array, data:np.array):
    
    ranking = cosine_similarity_numpy(choiceArray, data)
    return ranking


def calculate_year_similarity(x, my):
    # Define the range of the function
    min_year = 1950
    max_year = 2023
    
    # Calculate the distance between x and my
    distance = abs(x - my)
    
    # Calculate the maximum possible distance in the range
    max_distance = max_year - min_year
    
    # Calculate the similarity score as a linear function of the distance
    similarity_score = 0.05 * (1 - distance / max_distance)
    
    # Ensure that the similarity score is always between 0 and 0.1
    similarity_score = max(similarity_score, 0)
    similarity_score = min(similarity_score, 0.1)
    
    return similarity_score


def calculate_total_score(similarity_score, avg_score, year, mean_score, user_avg_year):
    # Set weights for each feature
    similarity_weight = 0.8
    avg_score_weight = 0.1
    mean_score_weight = 0.05
    
    # Normalize each feature to the range [0, 1]
    similarity_score_norm = similarity_score
    avg_score_norm = (avg_score - 10.0) / 90.0
    mean_score_norm = (mean_score - 10.0) / 90.0
    
    year = calculate_year_similarity(year, user_avg_year)

    # Calculate total score as weighted sum of normalized features
    total_score = (similarity_weight * similarity_score_norm) + (avg_score_weight * avg_score_norm) + \
                    + (mean_score_weight * mean_score_norm) + year
    
    return total_score

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
        score = calculate_total_score(score, anime["averageScore"], anime["year"], anime["meanScore"], choiceArray["year"])
        anime["score"] = score;
    #sort the values
    data = np.sort(data, order = ["score", "averageScore"])
    return data[::-1]


main(int(input("MAL ID : ")))