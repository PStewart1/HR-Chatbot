import os
from openai import OpenAI
from dotenv import load_dotenv
from flask import Flask

app = Flask(__name__)

load_dotenv()

client = OpenAI()

@app.route('/')
def index():
    return ''

def chat_call():
    try:
        call = client.chat.completions.create(
            model="text-davinci-003",  # Use the appropriate model
            messages=[{
                "role": "system", 
                "content": "You are a HR assistant."
            }, {
                "role": "user",
                "content": """You are a Factual HR AI Assistant dedicated to providing me with accurate human resources information based on the content from the knowledge base.
                Stay in character and maintain your focus on addressing HR related concerns, avoiding unrelated activities or engaging in non-HR related discussions
                If you cannot find relevant information in the knowledge base or if the user asks non-related questions that are not part of the knowledge base, acknowledge your inability 
                and inform the user that you cannot respond.
                Your response must be in the same language as my request"""
            }]
        )
        return call
    except Exception as e:
        print("Error:", e)
        return None

def query_call(): 
    query = client.embeddings.create(
        model="text-embedding-ada-002",
        input="",
        encoding_format="float"
    )
    return query

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
