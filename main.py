import recoms.recom as model
from flask import Flask, app, render_template, request, jsonify
import json
import bs4 as bs
import urllib.request
import requests


app = Flask(__name__)


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/recommend', methods=["GET", "POST"])
def recommend():
    if request.method == "POST":
        m = request.json
        recom = model.get_recommendations(m)
        recom = recom.tolist()
        return jsonify(recom)
    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)
