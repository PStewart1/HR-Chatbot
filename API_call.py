import os
import openai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the API key from the environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

def chat_call():
    response = openai.ChatCompletion.create(model="gpt-3.5-turbo", message=[{"role": "user", "content": "HR Assistant"}])
    print(response)
    
chat_call()
