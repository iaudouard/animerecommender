import numpy as np
import os


class AnimeRecommender:
    def __init__(self):
        self.data = self.read_data()

    def read_data(self):
        file_name = os.path.abspath(path="data/data_cleaned_only_origin_anime.npy")
        return np.load(file_name)

    def get_anime_from_id(self, id:int) -> np.array:
        for anime in self.data:
            if anime[0] == id:
                return anime
        return None
    
    def get_cosine_recommendation(self, queryVector:np.array):
        #seems to be faster
        choice_norm_tag = np.linalg.norm(queryVector["tag_vec"])
        choice_norm_genre = np.linalg.norm(queryVector["genre_vec"])
        for anime in self.data:

            score = 0
            dot_tag = np.dot(anime["tag_vec"], queryVector["tag_vec"])
            norm_tag = choice_norm_tag * np.linalg.norm(anime["tag_vec"])
            cosine_simi_tag = dot_tag / norm_tag
            if(np.isnan(cosine_simi_tag)):
                continue
            dot_g = np.dot(anime["genre_vec"], queryVector["genre_vec"])
            norm_g = choice_norm_genre * np.linalg.norm(anime["genre_vec"])
            cosine_simi_g = dot_g / norm_g
            if(np.isnan(cosine_simi_g)):
                continue

            score = cosine_simi_tag + (0.2 * cosine_simi_g)

            anime["score"] = score;
        #sort the values
        sorted_data = np.sort(self.data, order = ["score", "averageScore"])
        return sorted_data[::-1]


