from flask import Flask, request, jsonify

app = Flask(__name__)


@app.get("/")
def get_ip():
    ip_address = request.remote_addr
    return jsonify(
        {
            "Version": "0.0.1",
            "message": "Wellcome to Wise GitOps Workshop",
            "Requester": f"{ip_address}",
        }
    )
