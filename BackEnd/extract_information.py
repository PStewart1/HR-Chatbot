from pymongo import MongoClient
# import streamlit as st
from dotenv import load_dotenv
# from langchain.memory import ConversationBufferMemory
# from langchain.chains import ConversationalRetrievalChain
from langchain.chains import RetrievalQA

from langchain_mongodb.vectorstores import MongoDBAtlasVectorSearch
from langchain_cohere import CohereEmbeddings
from decouple import config
from langchain_cohere.chat_models import ChatCohere
import gradio as gr
from gradio.themes.base import Base
from langchain.prompts import PromptTemplate


load_dotenv()

def get_vector_store():
    # setup embeddings connection to Cohere llm
    coApiKey = config('COHERE_API_KEY')
    embeddings = CohereEmbeddings(model="embed-english-v3.0", cohere_api_key=coApiKey)
   
    # setup db connection and vector search
    dbKey = config("DB_CONNECTION")
    client = MongoClient(dbKey)
    db_name = "HR_ChatBot"
    collection_name = "embedded_hr_docs"
    collection = client[db_name][collection_name]

    vector_search = MongoDBAtlasVectorSearch(collection, embeddings)
    return vector_search

def query_data(query):
    vector_store = get_vector_store()
    # print("vector_store: ", vector_store)
    # docs = vector_store.similarity_search(query, K=1)
    # print("docs: ", docs)
    # as_output = docs[0].page_content

    llm = ChatCohere(model="command-r", temperature=0.1)
    retriever = vector_store.as_retriever(search_type="similarity")

    prompt_template = """
    You are a factual HR AI Assistant dedicated to providing me with accurate human resources information based on the content from the knowledge base.
    Stay in character and maintain your focus on addressing HR related concerns, avoiding unrelated activities or engaging in non-HR related discussions
    Your response must be in the same language as my request. If you cannot find relevant information in the given knowledge base or if the user asks non-related 
    questions that are not part of the knowledge base, acknowledge your inability and inform the user that you cannot respond.

    Knowledge Base: {context}

    Question: {question}
    """
    PROMPT = PromptTemplate(
        template=prompt_template, input_variables=["context", "question"]
    )

    qa = RetrievalQA.from_chain_type(
        llm, 
        chain_type="stuff", 
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={"prompt": PROMPT}
    )
    # retriever_output = qa.invoke(query)
    docs = qa({"query": query})

    return docs["result"], docs['source_documents']


with gr.Blocks(theme=Base(), title="Demo for the backend") as demo:
    gr.Markdown(
        """
        # Demo for the backend
        """
    )
    textbox = gr.Textbox(label="Ask a question")
    with gr.Row():
        button = gr.Button("Submit", variant="primary")
    with gr.Column():
        output1 = gr.Textbox(lines=1,max_lines=10, label="Chat Answer")
        output2 = gr.Textbox(lines=1,max_lines=10, label="Sources")

    button.click(query_data, textbox, outputs=[output1, output2])

demo.launch()
