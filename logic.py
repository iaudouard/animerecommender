import csv
from difflib import SequenceMatcher
import requests
from bs4 import BeautifulSoup
import numpy






def getTitles():
	
	"""
	Get list of titles

	Returns:
		[list]: [list of titles] --> Used for auto complete
	"""

	data = open('./AnimeData.csv', 'r', encoding="utf8")
	reading = csv.DictReader(data, delimiter=',', )

	animes = []

	tits = []

	for x in reading:
		animes.append(dict(x))

	for x in animes:
		tits.append(x['Title'])

	#Play around with the tits
	return tits

def openAnimes():
	"""
	Opens Anime CSV and Turns it into a Dictonary. Also vectorizes the genre in order to go faster

	Returns:
		[Dict]: [Animes Dict]
	"""
	data = open('./AnimeData.csv', 'r', encoding="utf8")
	reading = csv.DictReader(data, delimiter=',', )

	animes = []

	for x in reading:
		animes.append(dict(x))


	for x in animes:
		x['Vector'] = x['Vector'].strip('][').split(', ')
		x['Vector'] = [int(y) for y in x['Vector']]


	return animes

def similar(a, b):
	"""
	Gives ratio of similarity between two keys

	Args:
		a (string): input of user
		b (string): anime title

	Returns:
		[type]: [description]
	"""
	return SequenceMatcher(None, a, b).ratio()



def search(animes, ask):

	
	"""
	function that gets title search and returns the propre title

	Returns:
		string: proper title
	"""
	what = []
	for x in animes:
		try:
			if len(x['Title']) >= 2 and ask[0].lower() == x['Title'][0].lower() and ask[1].lower() == x['Title'][1].lower():
				if similar(ask, x['Title']) > 0.6 and x['Genre'] != "":
					pos = x['Title']

					what.append(pos)
		except:
			pass

	amount = 0
	best = ''

	for x in what:
		if similar(ask, x) > amount:
			amount = similar(ask, x)
			best = x

	for x in animes:
		if x['Title'] == best:
			return x



def whatwelike(animes ,choice):

	"""
	Inter function just used to call ask
	"""
	ask = search(animes, choice)


	return ask


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




def inter(animes, choice, check, amount, amnt):


	must = None

	if choice['Vector'][14] == 1:

		must = 14

	elif choice['Vector'][4] == 1:

		must = 4

	elif choice['Vector'][24] == 1:

		must = 24

	elif choice['Vector'][12] == 1:

		must = 12




	ty = choice['Type']

	og = choice['Vector']

	final = []
	simi = []

	for x in animes:

		d = x['Vector']

		comp = numpy.dot(og, d)/amnt

		if comp >= check and notin(final, x['Title']) and choice['Title'] not in x['Title'] and ty == x['Type'] and x['ScoredBy'] != "" and x['Rating'] != "":

			if must != None and x['Vector'][must] == 1:
				simi.append(comp)
				final.append(x)

			elif must == None:
				simi.append(comp)
				final.append(x)


	return final, simi













def ranking(animes, ls, amount):

	rank = []

	simi = ls[1]
	if len(simi) < amount:
		return []


	for name in range(len(ls[0])):
		if ls[0][name]['ScoredBy'] != '' and ls[0][name]['Rating'] != '':
			ls[0][name]['key'] = (simi[name] * (float(ls[0][name]['Rating']) * (7/10) + float(ls[0][name]['ScoredBy'])*(3/10)))
			rank.append(ls[0][name])

	sort = sorted(rank, key=lambda k: k['key'], reverse=True)
	ranked = {}
	for x in range(amount):
		ranked[x] = sort[x]


	for x in range(len(ranked)):

		ranked[x]['key'] = ""
	return ranked




def update(animes, dic):


	ok = True

	for x in range(len(dic)):

		if dic[x]['img'] == "":
			ok = False

	if ok:
		return dic


	for x in range(len(dic)):

		for y in range(len(animes)):

			if animes[y] == dic[x] and animes[y]['img'] == "":

 				try:
 					URL = dic[x]['Link']
 					headers = {"user-Agent" : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'}
 					page = requests.get(URL, headers = headers)
 					soup = BeautifulSoup(page.content, 'html.parser')
 					img = soup.find(itemprop = 'image')
 					print(animes[y]['Title'])

 					animes[y]['img'] = img["data-src"]
 					dic[x]['img'] = img["data-src"]

	 			except:
 					animes[y]['img'] = 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'
 					dic[x]['img'] = 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'




	fnames = ['Anime_id','Title','Genre','Synopsis','Type','Producer','Studio','Rating','ScoredBy','Popularity','Members','Episodes','Source','Aired','Link','Vector','img','key']

	f = open('/home/ivanadrd/mysite/AnimeData.csv', 'w', encoding='utf8')

	writ = csv.DictWriter(f, fieldnames = fnames)

	writ.writeheader()

	for x in animes:
		writ.writerow(x)


	f.close()
	return dic




def run(choice, amnt):

	animes = openAnimes()

	choice = whatwelike(animes, choice)

	amount = int(amnt) #int(input("How many would u want: "))
	check = 1
	trys = 0
	print('Searching...')
	how = len([x for x in choice['Vector'] if x == 1])

	joe = 0

	while True:

		interr = inter(animes, choice, check, amount, how)

		if len(interr[0]) >= amount:
			joe = interr
			break


		check -= 0.1

		trys += 1

		if trys == 9:
			print('Sorry we didnt find anything...')
			break



	conc = ranking(animes, joe, amount)

	if conc != {} and len(conc) >= amount:
		return update(animes, conc)


