import json
import math


def getTitles():
	
	"""
	Get list of titles

	Returns:
		[list]: [list of titles] --> Used for auto complete
	"""
	
	with open("./data/AnimeDataShort.json", 'r') as fout:
		tits = json.load(fout)
	titles = [x for x in tits]
	return titles




def openAnimes():
	"""
	Opens Anime JSON and returns it

	Returns:
		[Dict]: [Animes Dict]
	"""
	with open("./data/AnimeDataShort.json", 'r') as fout:
		animes = json.load(fout)
	return dict(animes)


def search(animes, ask):
	
	"""
	function that gets title search and returns the propre anime dict

	Returns:
		string: proper title
	"""
	return animes[ask]




def dot(l1, l2):
    
	"""Dot product of two vectors

	Returns:
		int : result of dot prod
	"""
	prod = 0
	for x in range(len(l1)):
			prod += l1[x] * l2[x]
	return prod
	

			

def weighted_rating(v, m, R, C):

    return (v/(v+m) * R) + (m/(m+v) * C)



def stop_doubles(n1,n2):
	n1 = n1.split(" ")


	if n1[0] in n2:
		return False
	if len(n1) >= 2 and n1[1] in n2:
		return False

	return True




def get_degree_of_sim(v1, v2):
    
	return dot(v1, v2)/(math.sqrt(sum([x**2 for x in v1]))*math.sqrt(sum([x**2 for x in v2])))
	



def inter(animes, choice, check, amnt):

    """
    needs = ["Isekai", 'Bounty Hunter', 'Cooking', 'Cross Dressing', "Human Enhancement", "Super Deformed",
            'Ninja', 'Space Opera', "Anthropomorphism", 'Slow When It Comes To Love', 'Reverse Harem', 'Music',
            'Sports', 'Delinquent', 'time travel', 'vampire', romance]


    Function that finds matching anime, they need to pass the minimum amount of similarity

    Returns:
        list: list of animes that pass the minimum amount of similarity check
    """


    choice_anime_vector = choice['vector']
    name = choice['attributes']["canonicalTitle"]
    anime_type = choice["attributes"]["subtype"]
    final_recommendations = []
    simi = []

    for x in animes:
        anime_vec = animes[x]['vector']
        if 1 in anime_vec:
            degree_of_similarity = get_degree_of_sim(choice_anime_vector, anime_vec)
            if degree_of_similarity >= check and stop_doubles(name,x) and anime_type == animes[x]["attributes"]["subtype"]:
                animes[x]["simi"] = degree_of_similarity
                final_recommendations.append(animes[x])
		

			


    return final_recommendations



def get_date_gap(d1, d2):

    #2021-07-07

    d1 = d1.split("-")
    d2 = d2.split("-")

    return 0.00001 + abs(int(d1[0])-int(d2[0]))




def stop_doubles_in_ranking(animes, new_name):

	new_name = new_name.split(" ")
	for x in animes:
		stripped_name = x.split(" ")
		if new_name[0] in stripped_name:    
			return False
		if len(new_name) >= 2 and new_name[1] in stripped_name:
			return False

	return True

def ranking(recomendation_list, amount_to_recommend, choice, ):
    """
    to use : averageRating, userCount, favoritesCount, popularityRank, ratingRank
    Function that sorts and ranks the proposed recommendations
    Uses a weighed coeficient formula -->( similiratiy(0-1)) * (rating(0-100) * 7/10) + (Amount of ppl that gave it a rating(0-alot)*3/10)

    Args:
        recomendation_list (List of recommendations proposed)
        amount_to_recommend (Int): the selected amount of recommendations

    Returns:
        list: ranked recommendations
    """
    anime_rec_ranking = []
    anime_rec_inter = []
    anime_rec_names = []
    date_og = choice["attributes"]["startDate"]
    if len(recomendation_list) < amount_to_recommend: #check to see if the amount proposed is less than the amount asked
        return []

    for anime in recomendation_list: #different attributes
        check = [anime["attributes"]["averageRating"], anime["attributes"]["userCount"],
                anime["attributes"]["favoritesCount"], anime["attributes"]["popularityRank"],
                anime["attributes"]["ratingRank"],anime["attributes"]["startDate"]]
        name = anime["attributes"]["canonicalTitle"]


        if "" not in check and " " not in check and None not in check and stop_doubles_in_ranking(anime_rec_names,name ): #check if empty variables
            rating = weighted_rating(float(check[1]), 80000, 60, float(check[0]))
            anime["key"] = anime["simi"]  + ((4-(math.log10(check[4]))/(math.log10(200)))/10) + (0.2 - (0.01)* get_date_gap(check[5], date_og))
            anime_rec_inter.append(anime)
            anime_rec_names.append(name) 
            print(anime["key"], anime["simi"], ((4-(math.log10(check[4]))/(math.log10(200)))/6),  (0.2 - (0.01)* get_date_gap(check[5], date_og)) , name)
	
    anime_rec_ranking = sorted(anime_rec_inter, key = lambda k: k["key"], reverse=True) 


    if len(anime_rec_ranking) < amount_to_recommend:
        return []

    return anime_rec_ranking[0:amount_to_recommend]



import time



def run(animes, choice, amnt):

	choice = search(animes, choice)

	amount = int(amnt) #int(input("How many would u want: "))
	start = time.time()
	check = 0.3
	trys = 0
	how = len([x for x in choice['vector'] if x == 1])
	partial_recs = []
	found = False
	while not found:
		anime_recs = inter(animes, choice, check, how)
		if len(anime_recs) >= amount+3:
			partial_recs = anime_recs


		check -= 0.1
		trys += 1

		if trys == 9:
			found = True
			conc = ranking(partial_recs, amount, choice, )
			return conc
			
		conc = ranking(partial_recs, amount, choice, )
		if len(conc) >= amount:
			return conc

	return [animes[list(animes.keys())[x]] for x in range(amnt)]


