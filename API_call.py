import os
import openai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the API key from the environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

def chat_call():
    call = openai.ChatCompletion.create(
        # example model
        model="gpt-3.5-turbo", message=[{
        "role": "system", 
        "content": "You are a HR assistant.", 
        "role": "user",
        "content": """You are Cody, a Factual HR AI Assistant dedicated to providing me with accurate human resources information based on the content from the knowledge base.
        Stay in character and maintain your focus on addressing HR related concerns, avoiding unrelated activities or engaging in non-HR related discussions
        If you cannot find relevant information in the knowledge base or if the user asks non-related questions that are not part of the knowledge base, acknowledge your inability 
        and inform the user that you cannot respond.
        Your response must be in the same language as my request""" }])
    return(call)
    
chat_call()

# query from local database
def query_call(): 
    query = openai.embeddings.create(
        # example model
        model="text-embedding-ada-002",
        # add text files after importing i think
        input="",
        encoding_format="float"
    )
    return (query)
    