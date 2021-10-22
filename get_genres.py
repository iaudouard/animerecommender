
import json

import requests
geners = ['Action', 'Adventure', 'Comedy', 'Drama', 'Sci-Fi', 'Space', 'Mystery', 'Magic', 'Supernatural', 'Police',
        'Fantasy', 'Sports', 'Romance', 'Cars', 'Slice of Life', 'Racing', 'Horror', 'Psychological', 'Thriller', 
        'Martial Arts', 'Super Power', 'School', 'Ecchi', 'Vampire', 'Historical', 'Military', 'Dementia', 'Mecha', 
        'Demons', 'Samurai', 'Harem', 'Music', 'Parody', 'Shoujo Ai', 'Game', 'Shounen Ai', 'Kids', 'Hentai', 'Yuri', 
        'Yaoi', 'Anime Influenced', 'Gender Bender', 'Doujinshi', 'Mahou Shoujo', 'Mahou Shounen', 'Gore', 'Law', 'Cooking', 
        'Mature', 'Medical', 'Political', 'Tokusatsu', 'Youth', 'Workplace', 'Crime', 'Zombies', 'Documentary', 'Family', 'Food', 
        'Friendship', 'Tragedy', 'Isekai']

base = [0] * len(geners)

def openAnimes():
    """
	Opens Anime JSON and returns it

	Returns:
		[Dict]: [Animes Dict]
	"""
    with open('AnimeData.json', 'r') as fout:
        animes = json.load(fout)
    return animes

animes = openAnimes()

for x in animes:
    base = [0] * len(geners)
    print(animes[x]["relationships"]["genres"]["links"]["related"])
    gen = requests.get(animes[x]["relationships"]["genres"]["links"]["related"]+"?page%5Blimit%5D=100&page%5Boffset%5D=0").json()
    try:
        gen_list = [y["attributes"]["name"] for y in gen["data"]]

        for g in gen_list:
            base[geners.index(g)] = 1
        print(base)
        animes[x]["vector"] = base[::]
    except:
        print("error no genres")
        animes[x]["vector"] = base[::]

with open("AnimeDataWithVector.json", "w") as fp:
		json.dump(animes, fp)





