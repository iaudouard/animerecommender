import requests
import json
import numpy as np
import time


url = 'https://graphql.anilist.co'

query_page = '''
query ($id: Int, $page: Int, $perPage: Int) {
    Page (page: $page, perPage: $perPage) {
        pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
        }
        media (id: $id, type : ANIME) {
            idMal
            tags{
                id
                rank
            }
            genres
            averageScore
            meanScore
            seasonYear
            format
            relations{
                edges{
                    relationType(version : 2)
                }
                nodes{
                    startDate{
                        year
                    }
                }
            }
        }
    }
}
'''

query_tags = '''
query{
    MediaTagCollection{
        id
    }
}
'''

query_genres = '''
query{
    GenreCollection
}
'''
genres = requests.post(url, json={'query': query_genres}).json()["data"]["GenreCollection"]
tags = requests.post(url, json={'query': query_tags}).json()["data"]["MediaTagCollection"]

#we make a tag mapper to mapp the tags/genres to the propper array index, because tags dont go from 1-n, because ppl are dumb
genre_mapper = {genres[x] : x for x in range(len(genres))}
tag_mapper = {tags[x]["id"] : x for x in range(len(tags))}

skipped = 0
#we use python arrays and then convert to np array, its just easier no need to know sizes in advance, this is important because this will be updated latrer
def getNewPage(data_array : list, page_nb : int) -> bool:
    global skipped
    variables = {
        'page': page_nb,
        'perPage': 50
    }
    response = requests.post(url, json={'query': query_page, 'variables': variables}).json()["data"]
    has_next_page = response["Page"]["pageInfo"]["hasNextPage"]
    for x in response["Page"]["media"]:
        if has_prequel(x["relations"]["edges"], x["relations"]["nodes"], x["seasonYear"]): #if has a prequel then it is not a season 1 or whatever
            skipped += 1    
            if(skipped % 100 == 0): print("I skipped ", skipped, " anime")
            continue

        tags_vec = [0 for j in range(len(tags))]
        for j in x["tags"]:
            tags_vec[tag_mapper[j["id"]]] = j["rank"]
        genres_vec = [0 for j in range(len(genres))]
        for j in x["genres"]:
            genres_vec[genre_mapper[j]] = 1

        if x["seasonYear"] != None:
            tags_vec.append(x["seasonYear"] - 2000)
        else:
            tags_vec.append(0)
        
        tags_vec.append(format_switch(x["format"])) #we add the format as a parameter
        data = [x["idMal"], x["seasonYear"], x["averageScore"] , np.array(tags_vec, dtype = np.int32), np.array(genres_vec, dtype = np.int16), int(''.join(str(i) for i in genres_vec), 2), x["meanScore"], float(0)]
        data_array.append(data)
    
    return has_next_page


def format_switch(format):
    
    if format ==  "TV":
        return 1
    elif format == "TV_SHORT":
        return 2
    elif format == "MOVIE":
        return 3
    elif format == "SPECIAL":
        return 4
    elif format == "OVA":
        return 5
    elif format == "ONA":
        return 6
    elif format == "MUSIC":
        return 7
    elif format == "MANGA":
        return 8
    elif format == "NOVEL":
        return 9
    elif format == "ONE_SHOT":
        return 10
    else:
        return 0
        
def has_prequel(connections, edges, year):

    for c in range(len(connections)):
        if connections[c]["relationType"] in ["PREQUEL", "PARENT"]:
            if year == None:
                return True
            if edges[c]["startDate"]["year"] != None and edges[c]["startDate"]["year"] < year:
                return True
            
    return False

data_total = []
has_next_page = True
page = 1
while(has_next_page):
    last_time = time.time()
    has_next_page = getNewPage(data_total, page)
    new_time = time.time()
    page+=1
    if(0.7 > (new_time-last_time)):
        time.sleep(0.8 - (new_time-last_time))
    print("Stored ", (page - 1 )* 50, "anime")
    if(page % 10 == 0) :
        print("Done up to page :", page)

dt = np.dtype([("id", np.int32), ("year",  np.int16), ("averageScore", np.int8), ("tag_vec" , np.int32, (len(tags)+2,)), ("genre_vec", np.int16, (len(genres), )), ("genre_val",  np.int32), ("meanScore",  np.int8), ("score",  np.float16)])
data_as_np = np.ndarray(shape = (len(data_total),), dtype=dt)
for i in range(len(data_total)):
    for j in range(8):
        if((j not in [3, 4] and data_total[i][j] != None )or j in [3, 4]):  
            data_as_np[i][j] = data_total[i][j]


np.save("data_cleaned.npy", data_as_np)

