from dotenv import load_dotenv
from flask import Flask, request
from extract_information import query_data

app = Flask(__name__)

load_dotenv()


@app.route('/chat_data', methods=['POST', 'GET'])
def chat_data(): 
    
    
    # Get data from request 
    data = request.json 
    print()
    # Insert data into MongoDB 
    query_data.insert_one(data) 
    
  
    return 'Data added to MongoDB'    




if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
