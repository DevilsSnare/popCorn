import re

from numpy.core.numeric import moveaxis
import recoms.recom as model
from flask import Flask, app, render_template, request, jsonify
import json
import bs4 as bs
import urllib.request
import requests


app = Flask(__name__)


def recom(name):
    inSeries = model.get_recommendations(name)
    inList = inSeries.tolist()
    inJSON = json.dumps(inList)
    return inJSON


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/s_result', methods=['POST'])
def s_result():
    movie = request.form['movie_name']
    return render_template('s_result.html', movie_name=movie)


@app.route('/recommend', methods=['POST'])
def recommend():
    mName = request.form['name']
    mArr = recom(mName)
    return mArr


if __name__ == "__main__":
    app.run(debug=True)
