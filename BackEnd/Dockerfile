FROM python:3.13-rc-alpine

ADD main.py .

RUN pip install -U langchain langchain-community langchain-mongodb langchain_cohere pymongo cohere pypdf pypdf2
RUN pip install flask tiktoken python-dotenv python-decouple requests streamlit gradio 

CMD [“python3”, “./main.py”]
