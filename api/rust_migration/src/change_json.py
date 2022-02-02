import json



with open("anime_db.json") as ft:
    animes = json.load(ft)

for x in animes:
    animes[x]["type_"] = animes[x]["type"]
    del animes[x]["type"]

print(animes["Cowboy Bebop"])



with open("anime_db.json", "w") as ft:
    json.dump(animes, ft)