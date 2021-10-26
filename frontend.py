from flask import Flask, redirect, url_for, render_template, request, session
from logic import *
import jinja2

app = Flask(__name__)
animes = openAnimes()


@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
		
        try:
        	results = run(animes, request.form['animeChoice'], request.form['howMany'])
        	return render_template('resulttesting.html', results=results)
        except:
            return render_template('home.html')

    return render_template('home.html')

@app.route('/home/',methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
		
        try:
        	results = run(animes, request.form['animeChoice'], request.form['howMany'])
        	return render_template('resulttesting.html', results=results)
        except:
            return render_template('home.html')

    return render_template('home.html')
		


@app.route('/rec/', methods=['GET','POST'])
def rec():
    if request.method == "POST":
    	anime_name = request.form['animeChoice']
    	amnt = request.form['howMany']
    	list_of_recommendations = run(animes, anime_name, amnt)
    	num = len(list_of_recommendations)
    	print(list_of_recommendations)
    	return render_template("resulttesting.html", title = anime_name, rec = list_of_recommendations, num = int(num))

    else:
    	return render_template('home.html', tits = getTitles())


@app.route('/finsih/', methods=['GET', 'POST'])
def continurfunc():
    return render_template('result.html')








app.secret_key = 'joe momma'

if __name__ == '__main__':
	app.run(debug=True)

