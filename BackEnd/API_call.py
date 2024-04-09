# from dotenv import load_dotenv
from flask import Flask,jsonify, request, redirect, url_for
from extract_information import query_data
import requests
from flask_cors import CORS

app = Flask(__name__)
app.config["DEBUG"] = True
CORS = (app)

# install all the dependencies in install-python-lin.sh
# install flask and start the api
# flask --app API_call.py run

@app.route('/chat_data', methods=['POST', 'GET'])
def chat_data():
    if request.method == 'POST':
        # Get data from request 
        data = request.json['query']
        print('data: ', data)
        # pass query to query handler function
        response = query_data(data) 
        source_documents = response[1]
        return response[0]
    else:
        return "Hello! What can I help you with today?"

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)