import requests
import json
import numpy as np
import time
import pandas as pd


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
            title{
                romaji
            }
            description
            tags{
                name
            }
            genres
            characters(role : MAIN){
                edges{
                    role
                }
                nodes{
                    name{
                    first
                    },
                    description
                    gender
                    modNotes
                }
            }
        }
    }
}
'''


#we use python arrays and then convert to np array, its just easier no need to know sizes in advance, this is important because this will be updated latrer
def getNewPage(data_array : list, page_nb : int) -> bool:
    variables = {
        'page': page_nb,
        'perPage': 50
    }
    response = requests.post(url, json={'query': query_page, 'variables': variables}).json()["data"]
    has_next_page = response["Page"]["pageInfo"]["hasNextPage"]
    
    data = response["Page"]["media"]
    for x in data:
        data_array.append(str(x))
    
    return has_next_page




data_ = []
for x in range(10):
    print(x)
    getNewPage(data_, x)

data__ = np.array(data_)
pd.DataFrame(data__).to_csv("csv/descriptions.csv")

