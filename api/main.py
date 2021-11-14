from flask import Flask, render_template, request, jsonify
from logic import *

app = Flask(__name__)
animes = openAnimes()


@app.route("/", methods=['GET', 'POST'])
def index():
    headers = request.headers
    anime_title =  request.args.get('anime_title')
    number_of_anime =  request.args.get('number_of_anime')

    print(anime_title, number_of_anime)
    if anime_title in animes:
        return jsonify({'data' : (run(animes, anime_title, int(number_of_anime)))})
    else:
        return jsonify({'data' : f"Anime Not Found, {anime_title}    {number_of_anime},   {headers}"})


if __name__ == '__main__':
	app.run(debug=True)





"""IVan Way"""

"""from flask import Flask, render_template
from flask_restful import Resource, Api
from flask_cors import CORS
from logic import *

app = Flask(__name__)
cors = CORS(app)
api = Api(app)
app.config['CORS_HEADERS'] = 'Content-Type'
animes = openAnimes()


@app.route("/", methods=['GET', 'POST'])
def index():
    return render_template('index.html')

def parse_decorator(decorator):
    return decorator.replace('-', ' ')

class Recommendation(Resource):
    def get(self, anime_title, number_of_anime):
        return {'data' : (run(animes, parse_decorator(anime_title), number_of_anime))}

api.add_resource(Recommendation, '/api/<string:anime_title>+<int:number_of_anime>')

if __name__ == '__main__':
	app.run(debug=True)
"""




