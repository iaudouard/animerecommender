import json

import numpy as np
import utils
from scipy.spatial.distance import minkowski


def read_data() -> np.array:
    with open("../../data/json/data_as_list.json", "r") as fout:
        data = json.load(fout)
        dt = np.dtype(
            [
                ("id", np.int32),
                ("year", np.int32),
                ("type", np.unicode_, 16),
                ("format", np.unicode_, 16),
                ("averageScore", np.int8),
                ("tag_vec", np.int16, (323,)),
                ("genre_vec", np.int16, (19,)),
                ("genre_val", np.int32),
                ("score", np.int8),
            ]
        )
        result = np.ndarray(shape=(len(data),), dtype=dt)  # size x 8
        for i in range(len(data)):
            for j in range(8):
                if data[i][j] != None:
                    result[i][j] = data[i][j]
            result[i][8] = -100000
        return result


def jaccard_similarity_numpy(choiceArray: np.array, data: np.array):
    for anime in data:
        anime[8] = minkowski(choiceArray[5], anime[5])
    return np.sort(data, order="score")[::-1]


def main(query_id: int):
    data = read_data()
    query = utils.get_anime_from_id(query_id, data)
    ranking = jaccard_similarity_numpy(query, data)

    return query, ranking[0:10]


print(main(1))
