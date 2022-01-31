from os import environ
from flask import Flask, request, jsonify

app = Flask(__name__)
app_version = environ.get("APP_VERSION", default="v1")


@app.get("/")
def get_ip():
    ip_address = request.remote_addr
    return jsonify(
        {
            "Version": f"{app_version}",
            "message": "Wellcome to Wise GitOps Workshop",
            "Requester": f"{ip_address}",
        }
    )
