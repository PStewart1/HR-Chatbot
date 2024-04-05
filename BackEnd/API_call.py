# from dotenv import load_dotenv
from flask import Flask, request, redirect, url_for
from extract_information import query_data

app = Flask(__name__)

# install httpie and flask
# start the api with flask
# flask --app API_call.py run
# open another terminal and run the http requests
# http POST localhost:5000 query="what is the name of this company?"

@app.route('/', methods=['POST', 'GET'])
def chat_data():
    if request.method == 'POST':
        # Get data from request 
        data = request.json['query']
        # print('data: ', data)
        # pass query to query handler function
        response = query_data(data) 
        source_documents = response[1]
        return response[0]
    else:
        return "Hello World"




if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
