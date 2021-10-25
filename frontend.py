from flask import Flask, redirect, url_for, render_template, request, session
from logic import *
import jinja2

app = Flask(__name__)



@app.route("/", methods=['GET', 'POST'])
def index():
    return render_template("home.html")

@app.route('/home/',methods=['GET', 'POST'])
def home():
	if request.method == 'POST':
		print('here')
		animes = openAnimes()
		user_input = request.form['animeChoice']
		amount_of_recommendations = request.form['howMany']
		
		whatisearched = whatwelike(animes, user_input)
		# try:
		yourDic = run(user_input, amount_of_recommendations)
		print('here', yourDic)
		num = len(yourDic)
		return render_template("result.html", title = whatisearched, rec = yourDic, num = int(num))
		# except:
		# 	return render_template('test.html')
			

	return render_template('home.html', tits = getTitles())
		


@app.route('/rec/', methods=['GET','POST'])
def rec():
    if request.method == "POST":
    	animes = openAnimes()
    	usr_input = request.form['animeChoice']
    	amnt = request.form['howMany']

    	try:
    		whatisearched = whatwelike(animes, usr_input)['Title']

    	except :
    		return render_template('rec.html')
    		# give limit to thing
    	try:
    	    yourDic = run(usr_input, amnt)
    	    num = len(yourDic)
    	    return render_template("result.html", title = whatisearched, rec = yourDic, num = int(num))
    	except :
    		return render_template('rec.html')


    else:
    	return render_template('rec.html', tits = getTitles())


@app.route('/finsih/', methods=['GET', 'POST'])
def continurfunc():
    return render_template('result.html')








app.secret_key = 'joe momma'

if __name__ == '__main__':
	app.run(debug=True)

