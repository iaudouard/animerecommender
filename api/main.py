from flask import Flask, render_template, request
from flask_restful import Resource, Api
from logic import *

app = Flask(__name__)
api = Api(app)
animes = openAnimes()


@app.route("/", methods=['GET', 'POST'])
def index():
    return render_template('index.html')

def parse_decorator(decorator):
    return decorator.replace('-', ' ')

def parse_response(response):
    return '{' + str(response) + '}'

class Recommendation(Resource):
    def get(self, user_input, number_of_anime):
        return {'data' : parse_response(run(animes, parse_decorator(user_input), number_of_anime))}

api.add_resource(Recommendation, '/api/<string:user_input>+<int:number_of_anime>')

if __name__ == '__main__':
	app.run(debug=True)

