#!/usr/bin/python3.8
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from logic import *
import requests

app = Flask(__name__)
cors = CORS(app)
animes = openAnimes()


@app.route("/", methods=['GET', 'POST'])
def index():
    anime_title =  request.args.get('anime_title')
    number_of_anime =  request.args.get('number_of_anime')

    anime_title = requests.get(f"https://kitsu.io/api/edge/anime?filter[text]={anime_title}").json()["data"][0]["attributes"]["canonicalTitle"]
    write_input(anime_title, number_of_anime)
    if anime_title in animes:
        return jsonify({'data' : (run(animes, anime_title, int(number_of_anime)))})
    else:
        return jsonify({'data' : f"Anime Not Found"})

@app.route("/get_titles", methods=['GET', 'POST'])
def get_animes():

    anime_titles = getTitles()

    return jsonify({'data' : anime_titles})


@app.route("/get_anime_info", methods=['GET', 'POST'])
def get_anime_info():

    anime = request.args.get('anime_title')
    anime = requests.get(f"https://kitsu.io/api/edge/anime?filter[text]={anime}").json()["data"][0]["attributes"]["canonicalTitle"]

    if anime in animes:
        return jsonify({'data' : animes[anime]})
    else:
        return jsonify({'data' : f"Anime Not Found"})


@app.route("/title_exists", methods=['GET', 'POST'])
def title_exists():
    anime_title = request.args.get('anime_title')
    if anime_title in animes:
        return jsonify({"data":[True]})
    else:
        return jsonify({"data":[False]})

if __name__ == '__main__':
	app.run(debug=True)

