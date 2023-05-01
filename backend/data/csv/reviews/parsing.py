import pandas as pd 

data = pd.read_csv("pared_reviews.csv")
users = data["anime_uid"].unique()
pd.DataFrame(users).to_csv("animes.csv", index=False)