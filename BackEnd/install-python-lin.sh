#!/bin/bash 

sudo apt-get update
sudo apt install python3-pip
pip install -U langchain langchain-community langchain-mongodb langchain_cohere pymongo cohere pypdf pypdf2
pip install flask tiktoken python-dotenv python-decouple requests streamlit gradio