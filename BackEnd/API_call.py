# from dotenv import load_dotenv
from flask import Flask, request, redirect, url_for
from extract_information import query_data

app = Flask(__name__)
app.config["DEBUG"] = True

# create a .env file and add the DB_CONNECTION and COHERE_API_KEY variables

# install all the dependencies in the dockerfile
# install flask and start the api
# flask --app API_call.py run

# OR
# start the docker container. instructions in the docker file
# install httpie
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
    app.run(host="0.0.0.0", port=5000)