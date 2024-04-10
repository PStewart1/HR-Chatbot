FROM python:3.10-alpine

WORKDIR /BackEnd

COPY . .

RUN pip install langchain langchain-community langchain-mongodb langchain_cohere pymongo cohere 
RUN pip install flask tiktoken python-dotenv python-decouple requests flask-cors
# RUN pip install pypdf pypdf2 streamlit gradio httpie

EXPOSE 5000

CMD ["python3", "API_call.py"]

# start docker
# navigate to this directory: "cd HR-Chatbot/BackEnd"
# run "docker build -t chatbot_backend:latest ."
# run "docker run -p 5000:5000 chatbot_backend:latest" 