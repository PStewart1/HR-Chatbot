FROM python:3.10-alpine

COPY . .

RUN pip install langchain langchain-community langchain-mongodb langchain_cohere pymongo cohere 
RUN pip install flask tiktoken python-dotenv python-decouple requests pypdf pypdf2 
# RUN pip install gradio

EXPOSE 5000

CMD ["flask", "--app", "API_call.py", "run"]
# CMD ["python3", "extract_information.p/home/paul/.local/sharey"]



# start docker
# navigate to this directory: "cd HR-Chatbot/BackEnd"
# run "docker build . -t hr_chatbot_back:latest"
# run "docker run -p 5000:5000 hr_chatbot_back:latest" 