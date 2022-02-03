from typing import final
from fast_autocomplete import autocomplete_factory
import json
from fast_autocomplete import AutoComplete
#import logic

"""animes = logic.openAnimes()

ani_titles = {x.lower() : {} for x in animes}
check = {x.lower() : {"title":x, "rating":animes[x]["seasonYear"]} for x in animes}

for x in animes:
     
    titles = animes[x]["title"]
    for y in titles:
        if titles[y] is not None:
            ani_titles[titles[y].lower()] = {}
            check[titles[y].lower()] = {"title":x, "rating":animes[x]["seasonYear"]}
    
            

    titles = animes[x]["synonyms"]
    for y in titles:
        ani_titles[y.lower()] = {}
        check[y.lower()] = {"title":x, "rating":animes[x]["seasonYear"]}

    
with open("anime_titles.json", "w") as ft:
    json.dump([ani_titles, check], ft )

"""

"""content_files = {
    'words': {
        'filepath': "anime_titles.json",
        'compress': True  # means compress the graph data in memory
    }
}


autocomplete = autocomplete_factory(content_files=content_files)
words = autocomplete.search(word="Period")


for x in words:
    print(autocomplete.words[x[0]].display)

"""

with open("anime_titles.json", "r") as ft:
    ani_titles, check = list(json.load(ft))

slower_auto =  AutoComplete(words = ani_titles)

print("tree made")


def auto_comp(search, amnt):

    search = search.replace(" ", "")
    word_search = slower_auto.search(word=search, max_cost=5, size=5)

    results = []

    for x in word_search:
        for y in x:
            rating = check[y]["rating"]
            if rating is None:

                results.append((check[y]["title"], 10000))
            else:
                results.append((check[y]["title"], rating))


    results.sort(key = lambda x:x[1])
    return [x[0] for x in results]



"""
with open("data/anime_db.json") as f:
    animes = json.load(f)

for x in animes:
    eng_tit = animes[x]["title"]["english"]

    if eng_tit is not None:
        animes[x]["title"]["userPreferred"] = eng_tit
    


with open("data/anime_db.json", "w") as f:
    json.dump(animes, f)
"""
