FROM python:3.13-rc-alpine

ADD main.py .

RUN pip install -q langchain==0.0.150 pypdf pandas matplotlib tiktoken textract transformers openai faiss-cpu requests  python-dotenv

CMD [“python3”, “./main.py”]
