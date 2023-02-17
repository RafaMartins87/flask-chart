from flask import Flask, render_template, redirect, url_for
import pandas as pd
import json
import plotly as plotly
import plotly.express as px

app = Flask(__name__, static_url_path='',
            static_folder='static',
            template_folder='template')

app.config["DEBUG"] = True


@app.route("/")
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)
