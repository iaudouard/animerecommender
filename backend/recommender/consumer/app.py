from flask import Flask, jsonify
from recommender.recommender import AnimeRecommender

app = Flask(__name__)
recommender = AnimeRecommender()


@app.route("/")
def recommend():
    recommendation = recommender.get_cosine_recommendation(recommender.get_anime_from_id(1))
    #TODO: return recommendation
    return jsonify({ "result" : "recommendation" })
