#!/bin/bash 

sudo apt-get update
pip install -U streamlit pypdf2 langchain python-dotenv faiss-cpu huggingface-hub pandas matplotlib requests python-dotenv
pip install flask pymongo tiktoken langchain-mongodb datasets textract transformers faiss-cpu cohere langchain-community
pip install InstructorEmbedding sentence_transformers
