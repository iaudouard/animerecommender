import json
import numpy as np

DB_PATH = "./json/anime_db.json"


def open_json(filepath: str):
    with open(filepath, "r") as f:
        return json.load(f)


def save_json(filepath: str, data: any):
    with open(filepath, "w") as f:
        json.dump(data, f)


def main(db_path: str):
    # TODO : clean up data so there are no season 2 of things etc
    data = open_json(db_path)
    updated_data = []
    for anime in data:
        temp = []
        for info in data[anime]:
            if info == "tag_vec":
                norm = np.linalg.norm(data[anime][info])
                if norm != 0:
                    for i in range(len(data[anime][info])):
                        data[anime][info][i] = i/norm


            if info in ["id", "seasonYear", "type", "format", "averageScore", "tag_vec"]:
                temp.append(data[anime][info])
            if info == "gen_vec":
                temp.append(data[anime][info])
                temp.append(int(''.join(str(i) for i in data[anime][info]), 2))

        updated_data.append(tuple(temp))

    save_json("./json/data_as_list_normalised.json", updated_data)


main(DB_PATH)
