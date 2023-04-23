import json

DB_PATH = "./json/anime_db.json"


def open_json(filepath: str):
    with open(filepath, "r") as f:
        return json.load(f)


def save_json(filepath: str, data: any):
    with open(filepath, "w") as f:
        json.dump(data, f, indent=4)


def main(db_path: str) -> dict:
    data = open_json(db_path)
    titles = {}
    for anime in data.values():
        for title in anime["title"]:
            if (
                anime["title"][title] is not None
                and title != "native"
                and anime["title"][title].lower() not in titles.keys()
            ):
                titles[anime["title"][title].lower()] = [
                    {},
                    anime["title"]["userPreferred"],
                    anime["averageScore"],
                ]

    save_json("./json/anime_titles.json", titles)


main(DB_PATH)
