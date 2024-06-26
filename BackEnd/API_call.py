from flask import Flask, request
from extract_information import query_data
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

# install all the dependencies in install-python-lin.sh
# install flask and start the api
# flask --app API_call.py run

@app.route('/', methods=['GET'])
def home():
    return "Hello! What can I help you with today?"

@app.route('/chat', methods=['POST'])
def chat_data():
    # Get data from request 
    data = request.json['query']
    # pass query to query handler function
    response = query_data(data) 
    source_documents = response[1]
    return response[0]

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)