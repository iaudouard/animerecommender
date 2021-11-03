import json
"""geners = ['Middle School', 'Cycling', 'Elementary School', 'Mermaid', 'Android', 'All Girls School',
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
needs = ["Isekai", 'Bounty Hunter', 'Cooking', 'Cross Dressing', "Human Enhancement", "Super Deformed",
         'Ninja', 'Space Opera', "Anthropomorphism", 'Slow When It Comes To Love', 'Reverse Harem', 'Music', 'Sports', 'Delinquent']
needs_by_id = []
for x in needs:
    if x in geners:
        needs_by_id.append(geners.index(x))
print(len(needs))
print(len(needs_by_id))
print(needs_by_id)
"""

"""
#https://kitsu.io/api/edge/anime/1/categories?page%5Blimit%5D=100&page%5Boffset%5D=0
def openAnimes():
    
    with open('AnimeData.json', 'r') as fout:
        animes = json.load(fout)
    return animes
animes = openAnimes()
aniimes_short = {}
for anime in animes:
    try:
        new_dict = {"attributes": {"averageRating":animes[anime]["attributes"]["averageRating"], "canonicalTitle" : animes[anime]["attributes"]["canonicalTitle"],
                                "startDate":animes[anime]["attributes"]["startDate"], "ratingRank" : animes[anime]["attributes"]["ratingRank"],
                                    "popularityRank": animes[anime]["attributes"]["popularityRank"], "favoritesCount" : animes[anime]["attributes"]["favoritesCount"],
                                    "userCount" : animes[anime]["attributes"]["userCount"], "subtype" : animes[anime]["attributes"]["subtype"],
                                    "synopsis":animes[anime]["attributes"]["synopsis"], "posterImage" : animes[anime]['attributes']["posterImage"]["large"] },
                    "vector" : animes[anime]["vector"]  
                    }
        aniimes_short[anime] = new_dict
    except :
        pass
with open("AnimeDataShort.json", "w") as fp:
		json.dump(aniimes_short, fp)
"""
rando = ['Middle School', 'Cycling', 'Elementary School', 'Mermaid', 'Android', 'All Girls School',
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
    'Horror', 'Thriller', 'Comedy', 'Henshin', 'Ecchi', 'Anthropomorphism', 'Romance']