import datetime
import pytz

from os import environ
from flask import Flask, request, render_template

app = Flask(__name__)
app_version = environ.get("APP_VERSION", default="v1")


@app.get("/")
def get_ip():
    return render_template(
        "index.html",
        now_dt=datetime.datetime.now((pytz.timezone("Europe/Kiev"))),
        ip_address=request.remote_addr,
        version=app_version,
    )
