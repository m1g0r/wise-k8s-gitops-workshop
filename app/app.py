import datetime

from os import environ
from flask import Flask, request, render_template

app = Flask(__name__)
app_version = environ.get("APP_VERSION", default="v1")


@app.get("/")
def get_ip():
    return render_template(
        "index.html",
        utc_dt=datetime.datetime.utcnow(),
        ip_address=request.remote_addr,
        version=app_version,
    )
