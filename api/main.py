from flask import Flask, render_template
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
    def get(self, user_input, number_of_anime):
        return {'data' : (run(animes, parse_decorator(user_input), number_of_anime))}

api.add_resource(Recommendation, '/api/<string:user_input>+<int:number_of_anime>')

if __name__ == '__main__':
	app.run(debug=True)

