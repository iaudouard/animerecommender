from turtle import title
from fast_autocomplete import autocomplete_factory
import json
import logic
from fast_autocomplete import AutoComplete

"""
animes = logic.openAnimes()

ani_titles = {x.lower() : {} for x in animes}
check = {x.lower() : x for x in animes}

for x in animes:
     
    titles = animes[x]["title"]
    for y in titles:
        if titles[y] is not None:
            ani_titles[titles[y].lower()] = {}
            check[titles[y].lower()] = x
    
            

    titles = animes[x]["synonyms"]
    for y in titles:
        ani_titles[y.lower()] = {}
        check[y.lower()] = x

    
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
    word_search = slower_auto.search(word=search, max_cost=8, size=amnt)

    results = []

    for x in word_search:
        for y in x:
            results.append(check[y])

    return results




while True:

    search = input("Search :")

    print(auto_comp(search, 5))
    