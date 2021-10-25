import csv
import json

#ivan is gay for cameron erni is a big fat duudy

def getTitles():
	
	"""
	Get list of titles

	Returns:
		[list]: [list of titles] --> Used for auto complete
	"""
	
	with open("./data.json", 'r') as fout:
		tits = json.load(fout)
	titles = [x for x in tits]
	return titles




def openAnimes():
	"""
	Opens Anime JSON and returns it

	Returns:
		[Dict]: [Animes Dict]
	"""
	with open("./data.json", 'r') as fout:
		animes = json.load(fout)
	return animes


def search(animes, ask):
	#ivan is gay
	
	"""
	function that gets title search and returns the propre anime dict

	Returns:
		string: proper title
	"""
	return animes[ask]



def notin(list, title):

	if 'second' in title.lower():
		return False

	t = title.split()

	for x in list:

		a  = x['Title'].split()

		if a[0] == t[0]:
			if len(a) >= 2 and len(t) >= 2:
				if a[1] == t[1]:
					return False

		if x['Title'].lower() in title.lower():
			return False
	return True



def dot(l1, l2):
    
	"""Dot product of two vectors

	Returns:
		int : result of dot prod
	"""
	#ivan is gay

	prod = 0
	for x in range(len(l1)):
    		prod += l1[x] * l2[x]

	return prod


def has_musts(musts, anime_vec):
	"""Function that returns if anime respects all the musts

	Args:
		musts ([type]): [description]
		anime_vec ([type]): [description]

	Returns:
		[type]: [description]
	"""
	same = []
	if len(musts) > 2:
		for x in musts:
			if anime_vec[x] == 1:
				same += 1

		if len(same) >= len(musts)//2:
			return True

		return False
	else:
		for x in musts:
			if anime_vec[x] == 0:
				return False
		return True



def stop_doubles(n1,n2):
	n1 = n1.split(" ")

	if n1[0] in n2:
		return False
	if len(n1) >= 2 and n1[1] in n2:
		return False

	return True


def inter(animes, choice, check, amnt):

	"""
	needs = ["Middle School",'Isekai','Josei','Seinen', 'Shoujo', 'Shounen','Dementia',
         'Space Opera', "Violent Retribution For Accidental Infringement", "Harem", "Romance" , "Cyberpunk" , "Dystopia"
         , "Sports", "Sudden Girlfriend Appearance", "All Girls School", "Magic", "Space", "Future","School Clubs"
         , "Love Polygon", "Coming Of Age", "Supernatural", "Psychological" ]

	Function that finds matching anime, they need to pass the minimum amount of similarity

	Returns:
		list: list of animes that pass the minimum amount of similarity check
	"""

	musts_check = [0, 217, 216, 215, 213, 214, 209, 190, 102, 145, 144,
				 146, 161, 160, 109, 5, 21, 47, 46, 76, 111, 165, 204, 203]
	must = [x for x in range(len(choice["vector"])) if x in  musts_check and choice["vector"][x] == 1]

	og = choice['vector']
	name = choice['attributes']["canonicalTitle"]
	final_recommendations = []
	simi = []
	
	for x in animes:
		anime_vec = animes[x]['vector']
		degree_of_similarity = dot(og, anime_vec)/amnt
		if degree_of_similarity >= check and stop_doubles(name,x):
			if has_musts(must, anime_vec):
				animes[x]["simi"] = degree_of_similarity
				final_recommendations.append(animes[x])

			

	#ivan is gay

	return final_recommendations




def stop_doubles_in_ranking(animes, new_name):

	new_name = new_name.split(" ")
	for x in animes:
		stripped_name = x.split(" ")
		if new_name[0] in stripped_name:
			return False
		if len(new_name) >= 2 and new_name[1] in stripped_name:
			return False

	return True

def ranking(recomendation_list, amount_to_recommend):
	"""
	to use : averageRating, userCount, favoritesCount, popularityRank, ratingRank
	Function that sorts and ranks the proposed recommendations
	Uses a weighed coeficient formula -->( similiratiy(0-54)) * (rating(0-100) * 7/10) + (Amount of ppl that gave it a rating(0-alot)*3/10)

	Args:
		recomendation_list (List of recommendations proposed)
		amount_to_recommend (Int): the selected amount of recommendations

	Returns:
		list: ranked recommendations
	"""
	anime_rec_ranking = []
	anime_rec_inter = []
	anime_rec_names = []

	if len(recomendation_list) < amount_to_recommend: #check to see if the amount proposed is less than the amount asked
		return []


	for anime in recomendation_list: #different attributes
		check = [anime["attributes"]["averageRating"],anime["attributes"]["userCount"],
		 		anime["attributes"]["favoritesCount"], anime["attributes"]["popularityRank"],
				anime["attributes"]["ratingRank"]]
		name = anime["attributes"]["canonicalTitle"]
		if "" not in check and " " not in check and None not in check and stop_doubles_in_ranking(anime_rec_names,name ): #check if empty variables
			anime["key"] = float(anime["simi"]) * float(check[0])*4/10 + float(check[1])*4/10 + float(check[2])*1/10\
						 + float(check[3])*1/10 + float(check[4]) *1/10 #applying formula
			anime_rec_inter.append(anime)
			anime_rec_names.append(name)
	
	anime_rec_ranking = sorted(anime_rec_inter, key = lambda k: k["key"], reverse=True) 


	if len(anime_rec_ranking) < amount_to_recommend:
		return []
	
	return anime_rec_ranking[0:amount_to_recommend]







def run(choice, amnt):

	animes = openAnimes()
	choice = search(animes, choice)
	amount = int(amnt) #int(input("How many would u want: "))

	check = 1
	trys = 0
	print('Searching...')
	how = len([x for x in choice['vector'] if x == 1])
	partial_recs = []
	found = False
	while not found:
		anime_recs = inter(animes, choice, check, how)

		if len(anime_recs) >= amount:
			partial_recs = anime_recs


		check -= 0.1
		trys += 1

		if trys == 8:
			print('Sorry we didnt find anything...')
			found = True

	#ivan is gay
		conc = ranking(partial_recs, amount)
		if len(conc) >= amount:
			return conc



	#ivan is gay

