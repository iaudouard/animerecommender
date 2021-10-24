
import json
import requests
geners = ['Middle School', 'Cycling', 'Elementary School', 'Mermaid', 'Android', 'All Girls School',
 'Vampire', 'Wrestling', 'Samurai', 'Elf', 'Pirate', 'Bishounen', 'Tentacle', 'Boxing', 'Musical Band',
  'Cooking', 'Air Force', 'Bounty Hunter', 'High School', 'Delinquent', 'Maid', 'Magic', 'Cyborg', 'Alien',
   'Zombie', 'Robot', 'Martial Arts', 'Angel', 'Waitress', 'Dragon', 'Assassin', 'Idol', 'Nurse', 'Magical Girl',
    'Ghost', 'Cross Dressing', 'Loli', 'Deity', 'Ninja', 'Office Lady', 'Gunfights', 'Battle Royale', 'Swordplay',
     'Super Power', 'Present', 'Past', 'Future', 'Space', 'Fantasy World', 'Desert', 'Earth', 'Island', 'Countryside',
    'Human Enhancement', 'Time Travel', 'Mecha', 'Space Travel', 'Alternative Past', 'Historical', 'Alternative Present',
    'Power Suit', 'Transforming Craft', 'Piloted Robot', 'Demon', 'High Fantasy', 'Contemporary Fantasy', 'Dark Fantasy',
    'Absurdist Humour', 'Super Deformed', 'Slapstick', 'Breaking The Fourth Wall', 'Parody', 'Satire', 'Other Planet',
    'Shipboard', 'University', 'School Clubs', 'Japan', 'Korea', 'China', 'Russia', 'Tokyo', 'Kyoto', 'New York',
    'Heian Period', 'Victorian Period', 'Sengoku Period', 'Tokugawa Period', 'World War II', 'Bakumatsu   Meiji Period',
    'Voyeurism', 'Netorare', 'Ahegao', 'Violence', 'Combat', 'Tennis', 'Volleyball', 'Motorsport', 'Basketball', 'Mars',
    'Street Racing', 'Formula Racing', 'Violent Retribution For Accidental Infringement', 'Feudal Warfare',
    'Humanoid Alien', 'Parasite', 'Slow When It Comes To Love', 'Shoujo Ai', 'Shounen Ai',
    'Sudden Girlfriend Appearance', 'Unrequited Love', 'Love Polygon', 'Plot Continuity', 'Stereotypes',
    'Reverse Harem', 'Performance', 'Music', 'Baseball', 'France', 'United Kingdom', 'Italy', 'Germany',
    'United States', 'Europe', 'Americas', 'Middle East', 'Asia', 'Africa', 'Floating Island', 'Parallel Universe',
    'Virtual Reality', 'Mafia', 'Action', 'Angst', 'Blackmail', 'Science Fiction', 'Fantasy', 'Adventure',
    'Horror', 'Thriller', 'Comedy', 'Henshin', 'Ecchi', 'Anthropomorphism', 'Romance', 'Harem', 'Cyberpunk',
    'Friendship', 'Proxy Battles', 'Slice of Life', 'Slavery', 'Politics', 'School Life', 'Steampunk', 'Anti War',
    'Crime', 'Disaster', 'Religion', 'Revenge', 'Conspiracy', 'Sports', 'Dystopia', 'The Arts', 'Law And Order',
    'Drama', 'Coming Of Age', 'Housewives', 'Female Teacher', 'Female Student', 'Dark Skinned Girl', 'Cops',
    'Special Squads', 'Genetic Modification', 'Parental Abandonment', 'Post Apocalypse', 'War', 'Rotten World',
    'Detective', 'Super Robot', 'Working Life', 'Superhero', 'Buddhism', 'Shinsengumi', 'Military', 'Space Battles',
    'Drifting', 'Three Kingdoms', 'Summer', 'Tone Changes', 'Epidemic', 'Space Opera', 'Card Games', 'Thievery', 
    'Navy', 'Student Government', 'Juujin', 'Robot Helper', 'Soccer', 'Content Indicators', 'Dynamic', 'Elements', 
    'Setting', 'Themes', 'Psychological', 'Supernatural', 'Mystery', 'Gender Bender', 'Yaoi', 'Anime Influenced',
    'Dementia', 'Kids', 'Family', 'Target Demographics', 'Shoujo', 'Shounen', 'Seinen', 'Josei', 'Isekai']


needs = ["Middle School",'Isekai','Josei','Seinen', 'Shoujo', 'Shounen','Dementia',
         'Space Opera', "Violent Retribution For Accidental Infringement", "Harem", "Romance" , "Cyberpunk" , "Dystopia"
         , "Sports", "Sudden Girlfriend Appearance", "All Girls School", "Magic", "Space", "Future","School Clubs"
         , "Love Polygon", "Coming Of Age", "Supernatural", "Psychological" ]




"""
needs_by_id = [0, 217, 216, 215, 213, 214, 209, 190, 102, 145, 144, 146, 161, 160, 109, 5, 21, 47, 46, 76, 111, 165, 204, 203]

for x in needs:
    if x in geners:
        needs_by_id.append(geners.index(x))


print(len(needs))
print(len(needs_by_id))

print(needs_by_id)"""



#https://kitsu.io/api/edge/anime/1/categories?page%5Blimit%5D=100&page%5Boffset%5D=0

base = [0] * len(geners)

def openAnimes():
    
    with open('AnimeData.json', 'r') as fout:
        animes = json.load(fout)
    return animes

animes = openAnimes()

for x in animes:
    base = [0] * len(geners)
    if animes[x]["vector"] == base:
        try:
            gen = requests.get("https://kitsu.io/api/edge/anime?filter[text]="+x).json()
            cats_fetch = gen["data"][0]["relationships"]["categories"]["links"]["related"] + "?page%5Blimit%5D=100&page%5Boffset%5D=0"
            gen_list = [y["attributes"]["title"] for y in requests.get(cats_fetch).json()["data"]]
            print("yesss", gen_list)
            if gen_list != []:
                for g in gen_list:
                    base[geners.index(g)] = 1
                animes[x]["vector"] = base[::]
                print(animes[x]["vector"])
        except:
            print("no")
            animes[x]["vector"] = base[::]



with open("AnimeData.json", "w") as fp:
		json.dump(animes, fp)





