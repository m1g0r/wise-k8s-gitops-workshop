import datetime
import random
from os import environ

import pytz
from flask import Flask, render_template, request

app = Flask(__name__)
app_version = environ.get("APP_VERSION", default="v1")


@app.get("/")
def get_ip():
    return render_template(
        "index.html",
        now_dt=datetime.datetime.now((pytz.timezone("Europe/Kiev"))),
        kwh_data=round(random.uniform(1,5), 3),
        ip_address=request.remote_addr,
        version=app_version,
    )
