#!/bin/bash 

sudo apt-get update
sudo apt install python3-pip
pip install -U streamlit pypdf2 langchain python-dotenv faiss-cpu huggingface-hub pandas matplotlib requests python-dotenv 
pip install flask pymongo tiktoken langchain-mongodb datasets textract transformers faiss-cpu cohere langchain-community 
pip install langchain_cohere python-decouple pypdf InstructorEmbedding sentence_transformers
