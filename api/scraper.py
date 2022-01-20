import json


gens = ['Space', 'Crime', 'Episodic', 'Ensemble Cast', 'Primarily Adult Cast', 'Noir', 'Tragedy', 'Guns', 'Cyberpunk', 'Male Protagonist', 'Philosophy', 'Martial Arts', 'Anti-Hero', 'LGBTQ+ Themes', 'Amnesia', 'Gambling', 'Cyborg', 'Yakuza', 'Drugs', 'Tanned Skin', 'Police', 'Terrorism', 'Transgender', 'Nudity', 'Gender Bending', 'Military', 'Foreign', 'Work', 'Fugitive', 'Shounen', 'Twins', 'Aliens', 'Religion', 'Slapstick', 'Body Horror', 'Female Protagonist', 'Witch', 'Magic', 'Conspiracy', 'Urban Fantasy', 'Kuudere', 'American Football', 'Primarily Male Cast', 'School', 'School Club', 'Delinquents', 'Coming of Age', 'Bullying', 'Josei', 'College', 'Love Triangle', 'Heterosexual', 'Chibi', 'Drawing', 'Cycling', 'Football', 'Cars', 'Seinen', 'CGI', 'Rural', 'Detective', 'Memory Manipulation', 'Revenge', 'Historical', 'Adoption', 'Dissociative Identities', 'Medicine', 'Time Skip', 'Crossdressing', 'Suicide', 'Torture', 'Rape', 'Ninja', 'Super Power', 'Cultivation', 'Primarily Child Cast', 'Anachronism', 'Pirates', 'Ships', 'War', 'Politics', 'Lost Civilization', 'Swordplay', 'Henshin', 'Shapeshifting', 'Animals', 'Real Robot', 'Skeleton', 'Badminton', 'Espionage', 'Super Robot', 'Robots', 'Mermaid', 'Dinosaurs', 'Battle Royale', 'Female Harem', 'Time Manipulation', 'Zombie', 'Body Swapping', 'Asexual', 'Assassins', 'Cult', 'Age Regression', 'Tennis', 'Boxing', 'Parody', 'Tsundere', 'Otaku Culture', 'Butler', 'Primarily Teen Cast', 'Post-Apocalyptic', 'Survival', 'Gangs', 'Dystopian', 'Urban', 'Denpa', 'Mafia', 'Gore', 'Afterlife', 'Vampire', 'Artificial Intelligence', 'Nun', 'Food', 'Meta', 'Surreal Comedy', 'Angels', 'Cosmic Horror', 'Kaiju', 'Mythology', 'Bisexual', 'Achronological Order', 'Gods', 'Demons', 'Netorare', 'Tomboy', 'Archery', 'Samurai', 'Motorcycles', 'Virtual World', 'Video Games', 'Isekai', 'Primarily Female Cast', 'Shoujo', 'Incest', 'Reincarnation', 'Full CGI', 'Band', 'Swimming', 'Gyaru', 'Baseball', 'Nekomimi', 'Slavery', 'Hikikomori', 'Family Life', 'Rehabilitation', 'Cute Girls Doing Cute Things', 'Teacher', 'Aviation', 'Alternate Universe', 'Yuri', 'Yandere', 'Space Opera', 'Wuxia', 'Steampunk', 'Dragons', 'Male Harem', 'Fairy Tale', 'Maids', 'Werewolf', 'Age Gap', 'Chimera', 'Ojou-sama', 'Disability', 'Idol', 'Musical', 'Youkai', 'Dullahan', 'Mahjong', 'Classic Literature', 'Go', 'Ghost', 'Card Battle', 'Augmented Reality', 'Shrine Maiden', "Boys' Love", 'Kemonomimi', 'Superhero', 'Tokusatsu', 'Bondage', 'Language Barrier', 'Environmental', 'Basketball', 'Crossover', 'Educational', 'Photography', 'Economics', 'Kids', 'Trains', 'Tentacles', 'Succubus', 'Elf', 'Goblin', 'Writing', 'Anal Sex', 'Fellatio', 'Mopeds', 'Oiran', 'Circus', 'Dancing', 'Agender', 'Golf', 'Karuta', 'Surfing', 'Cosplay', 'Satire', 'Feet', 'Fitness', 'Software Development', 'Centaur', 'Cannibalism', 'Triads', 'Wrestling', 'Iyashikei', 'Agriculture', 'Fashion', 'Chuunibyou', 'Prostitution', 'Astronomy', 'Death Game', 'Sadism', 'Femdom', 'Defloration', 'Futanari', 'MILF', 'Large Breasts', 'Handjob', 'Irrumatio', 'Acting', 'Office Lady', 'Skateboarding', 'Athletics', 'Rotoscoping', 'Fencing', 'Inseki', 'Ice Skating', 'Tanks', "Teens' Love", 'Makeup', 'Anthology', 'No Dialogue', 'Lacrosse', 'Villainess', 'Cunnilingus', 'Calligraphy', 'Poker', 'Judo', 'Outdoor', 'Fishing', 'Bar', 'Human Pet', 'Virginity', 'Threesome', 'Nakadashi', 'Blackmail', 'Sex Toys', 'Cheerleading', 'Facial', 'Masturbation', 'Boobjob', 'Cute Boys Doing Cute Things', 'Monster Girl', 'Table Tennis', 'Masochism', 'Ero Guro', 'Pandemic', 'Autobiographical', 'Achromatic', 'Biographical', 'Puppetry', 'Dungeon', 'Vore', 'Monster Boy', '4-koma', 'Shogi', 'Scissoring', 'Public Sex', 'Rakugo', 'Scat', 'Watersports', 'Ashikoki', 'Group Sex', 'Sweat', 'Volleyball', 'E-Sports', 'Flash', 'Flat Chest', 'Voyeur', 'POV', 'Advertisement', 'Ahegao', 'Firefighters', 'Exhibitionism', 'Stop Motion', 'Vikings', 'Pregnant', 'Lactation', 'Sumata', 'Scuba Diving', 'Rimjob', 'Netori', 'Rugby', 'DILF', 'Sumo', 'Netorase', 'Amputation', 'Armpits', 'VTuber', 'Airsoft', 'Deepthroat', 'Parkour', 'Asphyxiation', 'Reformation', 'Necromancy']

gens_manga = ['Space', 'Crime', 'Episodic', 'Ensemble Cast', 'Primarily Adult Cast', 'Noir', 'Tragedy', 'Guns', 'Cyberpunk', 'Male Protagonist', 'Philosophy', 'Martial Arts', 'Anti-Hero', 'LGBTQ+ Themes', 'Amnesia', 'Gambling', 'Cyborg', 'Yakuza', 'Drugs', 'Tanned Skin', 'Police', 'Terrorism', 'Transgender', 'Nudity', 'Gender Bending', 'Military', 'Foreign', 'Work', 'Fugitive', 'Shounen', 'Twins', 'Aliens', 'Religion', 'Slapstick', 'Body Horror', 'Female Protagonist', 'Witch', 'Magic', 'Conspiracy', 'Urban Fantasy', 'Kuudere', 'American Football', 'Primarily Male Cast', 'School', 'School Club', 'Delinquents', 'Coming of Age', 'Bullying', 'Josei', 'College', 'Love Triangle', 'Heterosexual', 'Chibi', 'Drawing', 'Cycling', 'Football', 'Cars', 'Seinen', 'CGI', 'Rural', 'Detective', 'Memory Manipulation', 'Revenge', 'Historical', 'Adoption', 'Dissociative Identities', 'Medicine', 'Time Skip', 'Crossdressing', 'Suicide', 'Torture', 'Rape', 'Ninja', 'Super Power', 'Cultivation', 'Primarily Child Cast', 'Anachronism', 'Pirates', 'Ships', 'War', 'Politics', 'Lost Civilization', 'Swordplay', 'Henshin', 'Shapeshifting', 'Animals', 'Real Robot', 'Skeleton', 'Badminton', 'Espionage', 'Super Robot', 'Robots', 'Mermaid', 'Dinosaurs', 'Battle Royale', 'Female Harem', 'Time Manipulation', 'Zombie', 'Body Swapping', 'Asexual', 'Assassins', 'Cult', 'Age Regression', 'Tennis', 'Boxing', 'Parody', 'Tsundere', 'Otaku Culture', 'Butler', 'Primarily Teen Cast', 'Post-Apocalyptic', 'Survival', 'Gangs', 'Dystopian', 'Urban', 'Denpa', 'Mafia', 'Gore', 'Afterlife', 'Vampire', 'Artificial Intelligence', 'Nun', 'Food', 'Meta', 'Surreal Comedy', 'Angels', 'Cosmic Horror', 'Kaiju', 'Mythology', 'Bisexual', 'Achronological Order', 'Gods', 'Demons', 'Netorare', 'Tomboy', 'Archery', 'Samurai', 'Motorcycles', 'Virtual World', 'Video Games', 'Isekai', 'Primarily Female Cast', 'Shoujo', 'Incest', 'Reincarnation', 'Full CGI', 'Band', 'Swimming', 'Gyaru', 'Baseball', 'Nekomimi', 'Slavery', 'Hikikomori', 'Family Life', 'Rehabilitation', 'Cute Girls Doing Cute Things', 'Teacher', 'Aviation', 'Alternate Universe', 'Yuri', 'Yandere', 'Space Opera', 'Wuxia', 'Steampunk', 'Dragons', 'Male Harem', 'Fairy Tale', 'Maids', 'Werewolf', 'Age Gap', 'Chimera', 'Ojou-sama', 'Disability', 'Idol', 'Musical', 'Youkai', 'Dullahan', 'Mahjong', 'Classic Literature', 'Go', 'Ghost', 'Card Battle', 'Augmented Reality', 'Shrine Maiden', "Boys' Love", 'Kemonomimi', 'Superhero', 'Tokusatsu', 'Bondage', 'Language Barrier', 'Environmental', 'Basketball', 'Crossover', 'Educational', 'Photography', 'Economics', 'Kids', 'Trains', 'Tentacles', 'Succubus', 'Elf', 'Goblin', 'Writing', 'Anal Sex', 'Fellatio', 'Mopeds', 'Oiran', 'Circus', 'Dancing', 'Agender', 'Golf', 'Karuta', 'Surfing', 'Cosplay', 'Satire', 'Feet', 'Fitness', 'Software Development', 'Centaur', 'Cannibalism', 'Triads', 'Wrestling', 'Iyashikei', 'Agriculture', 'Fashion', 'Chuunibyou', 'Prostitution', 'Astronomy', 'Death Game', 'Sadism', 'Femdom', 'Defloration', 'Futanari', 'MILF', 'Large Breasts', 'Handjob', 'Irrumatio', 'Acting', 'Office Lady', 'Skateboarding', 'Athletics', 'Rotoscoping', 'Fencing', 'Inseki', 'Ice Skating', 'Tanks', "Teens' Love", 'Makeup', 'Anthology', 'No Dialogue', 'Lacrosse', 'Villainess', 'Cunnilingus', 'Calligraphy', 'Poker', 'Judo', 'Outdoor', 'Fishing', 'Bar', 'Human Pet', 'Virginity', 'Threesome', 'Nakadashi', 'Blackmail', 'Sex Toys', 'Cheerleading', 'Facial', 'Masturbation', 'Boobjob', 'Cute Boys Doing Cute Things', 'Monster Girl', 'Table Tennis', 'Masochism', 'Ero Guro', 'Pandemic', 'Autobiographical', 'Achromatic', 'Biographical', 'Puppetry', 'Dungeon', 'Vore', 'Monster Boy', '4-koma', 'Shogi', 'Scissoring', 'Public Sex', 'Rakugo', 'Scat', 'Watersports', 'Ashikoki', 'Group Sex', 'Sweat', 'Volleyball', 'E-Sports', 'Flash', 'Flat Chest', 'Voyeur', 'POV', 'Advertisement', 'Ahegao', 'Firefighters', 'Exhibitionism', 'Stop Motion', 'Vikings', 'Pregnant', 'Lactation', 'Sumata', 'Scuba Diving', 'Rimjob', 'Netori', 'Rugby', 'DILF', 'Sumo', 'Netorase', 'Amputation', 'Armpits', 'VTuber', 'Airsoft', 'Deepthroat', 'Parkour', 'Asphyxiation', 'Reformation', 'Necromancy', 'Full Color', 'Omegaverse', 'Squirting', 'Abuse']


index_anime = {gens[x] : x for x in range(len(gens))}

index_manga = {gens_manga[x] : x for x in range(len(gens_manga))}


with open("manga_db.json") as fs:
   manga = json.load(fs)

with open("anime_db.json") as ft:
   animes = json.load(ft)

genres_anime = ['Action', 'Adventure', 'Drama', 'Sci-Fi', 'Mystery', 'Comedy', 'Supernatural', 'Fantasy', 'Sports', 'Romance', 'Slice of Life', 'Horror', 'Psychological', 'Thriller', 'Ecchi', 'Mecha', 'Music', 'Mahou Shoujo', 'Hentai']
genres_manga = ['Drama', 'Mystery', 'Psychological', 'Thriller', 'Action', 'Adventure', 'Fantasy', 'Horror', 'Sci-Fi', 'Slice of Life', 'Comedy', 'Sports', 'Mahou Shoujo', 'Music', 'Romance', 'Supernatural', 'Ecchi', 'Hentai', 'Mecha']

index_g_anime = {genres_anime[x] : x for x in range(len(genres_anime))}
index_g_manga = {genres_manga[x] : x for x in range(len(genres_manga))}

for x in animes:
   vec = [0 for x in range(len(gens))]
   gen = []
   for y in animes[x]["tags"]:
      index = index_anime[y["name"]]
      vec[index] = y["rank"]
   animes[x]["tag_vec"] = vec

   g_vec = [0 for x in range(len(genres_anime))]
   for y in animes[x]["genres"]:
      index = index_g_anime[y]
      g_vec[index] = 1
   animes[x]["gen_vec"] = g_vec





for x in manga:
   vec = [0 for x in range(len(gens_manga))]
   gen = []
   for y in manga[x]["tags"]:
      index = index_manga[y["name"]]
      vec[index] = y["rank"]
   manga[x]["tag_vec"] = vec

   g_vec = [0 for x in range(len(genres_anime))]
   for y in manga[x]["genres"]:
      index = index_g_manga[y]
      g_vec[index] = 1
   manga[x]["gen_vec"] = g_vec

      


with open("manga_db.json", 'w') as fs:
   json.dump(manga, fs)

with open("anime_db.json", "w") as ft:
   json.dump(animes, ft)




"""for x in animes:

   tags = animes[x]["tags"]
   genres = animes[x]["genres"]

"""

   

