#!/usr/bin/env python3


# import pandas as pd
# import matplotlib.pyplot as plt
# from transformers import GPT2TokenizerFast
# from langchain.document_loaders import PyPDFLoader
# from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain.chains.question_answering import load_qa_chain
# from langchain.llms import OpenAI
# from langchain.chains import ConversationalRetrievalChain

# from langchain.vectorstores.cassandra import Cassandra
# from langchain.indexes.vectorstore import VectorStoreIndexWrapper
# from langchain.llms import OpenAI
# # Support for dataset retrieval with Hugging Face
# from datasets import load_dataset

# # With CassIO, the engine powering the Astra DB integration in LangChain,
# # you will also initialize the DB connection:
# import cassio

# from pymongo import MongoClient

# import pprint
# from langchain_community.document_loaders import PyPDFLoader
# from langchain_core.output_parsers import StrOutputParser
# from langchain_core.runnables import RunnablePassthrough
# from langchain_mongodb import MongoDBAtlasVectorSearch
# from langchain.prompts import PromptTemplate
# from langchain.text_splitter import RecursiveCharacterTextSplitter
from pymongo import MongoClient
# import getpass

# import os
import streamlit as st
from dotenv import load_dotenv
# from PyPDF2 import PdfReader
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
# from langchain_community.embeddings import OpenAIEmbeddings, HuggingFaceInstructEmbeddings
# from langchain_community.vectorstores import FAISS
# from langchain_community.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from htmlTemplates import css, bot_template, user_template
# from langchain_community.llms import HuggingFaceHub
# import cohere
# import numpy as np
from langchain_mongodb.vectorstores import MongoDBAtlasVectorSearch
from langchain_cohere import CohereEmbeddings
# import getpass
from decouple import config
# import urllib.parse
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.chat_models import ChatCohere

def get_pdf_text(pdf_uploads):
    text = ""
    pdfs = []
    pdf_docs = ['./Documents/Ethos Employee Handbook.pdf', 
                './Documents/Pre-populated FAQs.pdf', 
                './Documents/New Client Onboarding Questionnaire Template.pdf']
    for doc in pdf_docs:
        # pdf_reader = PdfReader(doc)
        # pdfs.append(pdf_reader)
        # for page in pdf_reader.pages:
        #     text += page.extract_text()
        loader = PyPDFLoader(doc)
        pdf = loader.load()
        pdfs.extend(pdf)

    return pdfs

def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(
        separators=["\n"],
        chunk_size=500, 
        chunk_overlap=50,
        length_function=len
    )
    chunks = text_splitter.split_documents(text)
    return chunks

def get_vector_store(text_chunks=None):
    # embeddings = OpenAIEmbeddings()
    # embeddings = HuggingFaceInstructEmbeddings(model_name="Cohere/Cohere-embed-english-v3.0")

    # setup embeddings connection to Cohere llm
    coApiKey = config('COHERE_API_KEY')
    embeddings = CohereEmbeddings(model="embed-english-v3.0", cohere_api_key=coApiKey)
   
    # setup db connection and vector search
    dbKey = config("DB_CONNECTION")
    client = MongoClient(dbKey)
    db_name = "HR_ChatBot"
    collection_name = "embedded_hr_docs"
    collection = client[db_name][collection_name]
    if text_chunks is None:
        vector_search = MongoDBAtlasVectorSearch(collection, embeddings)
    else:
        vector_search = MongoDBAtlasVectorSearch.from_documents(
            documents=text_chunks,
            embedding=embeddings,
            collection=collection,
            index_name="embeddings",
        )
    # vector_store = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    print(vector_search)
    return vector_search

def get_conversation_chain(vector_store):
    llm = ChatCohere()
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm = llm,
        retriever=vector_store.as_retriever(),
        memory=memory,
    )
    return conversation_chain

def handle_userinput(user_question):
    if "conversation" not in st.session_state or st.session_state.conversation is None:
        vector_store = get_vector_store()
        st.session_state.conversation = get_conversation_chain(vector_store)
    response = st.session_state.conversation({"question": user_question})
    st.session_state.chat_history = response["chat_history"]

    for i, message in enumerate(st.session_state.chat_history):
        if i % 2 == 0:
            st.write(user_template.replace("{{MSG}}", message.content), unsafe_allow_html=True)
        else:
            st.write(bot_template.replace("{{MSG}}", message.content), unsafe_allow_html=True)
    # st.write(user_template.replace("{{MSG}}", user_question), unsafe_allow_html=True)
    # st.write(response)


def main():
    load_dotenv()

    st.set_page_config(page_title="Chat with multiple PDFs",
                       page_icon=":books:")
    st.write(css, unsafe_allow_html=True)

    if "conversation" not in st.session_state:
        st.session_state.conversation = None
    if "chat_history" not in st.session_state:
        st.session_state.chat_history = None

    st.header("Chat with multiple PDFs :books:")
    user_question = st.text_input("Ask a question about your documents:")
    if user_question:
        handle_userinput(user_question)
    st.write(user_template.replace("{{MSG}}", "Hello robot"), unsafe_allow_html=True)
    st.write(bot_template.replace("{{MSG}}", "Hello human"), unsafe_allow_html=True)
    with st.sidebar:
        st.subheader("Your documents")
        pdf_docs = st.file_uploader(
            "Upload your PDFs here and click on 'Process'", accept_multiple_files=True)
        if st.button("Process"):
            with st.spinner("Processing..."):
                # get pdf text
                raw_text = get_pdf_text(pdf_docs)
                # get the text chunks
                text_chunks = get_text_chunks(raw_text)
                # create vector store
                vector_store = get_vector_store(text_chunks)
                # create conversation chain
                # conversation = get_conversation_chain(vector_store)
                st.session_state.conversation = get_conversation_chain(vector_store)


if __name__ == "__main__":
    main()



# Define collection and index name
# db_name = "sample_mflix"
# collection_name = "embedded_movies "
# atlas_collection = client[db_name][collection_name]
# vector_search_index = "plot_embedding"

# You MUST add your PDF to local files in this notebook (folder icon on left hand side of screen)

# Simple method - Split by pages 
# loader = PyPDFLoader("Ethos Employee Handbook.pdf")
# pages = loader.load_and_split()
# print(pages[0])

# SKIP TO STEP 2 IF YOU'RE USING THIS METHOD
# chunks = pages

# Advanced method - Split by chunk

# Step 1: Convert PDF to text
# import textract
# doc = textract.process("Ethos Employee Handbook.pdf")

# Step 2: Save to .txt and reopen (helps prevent issues)
# with open('Ethos Employee Handbook.txt', 'w') as f:
#     f.write(doc.decode('utf-8'))

# with open('Ethos Employee Handbook.txt', 'r') as f:
#     text = f.read()

# Step 3: Create function to count tokens
# tokenizer = GPT2TokenizerFast.from_pretrained("gpt3.5")

# def count_tokens(text: str) -> int:
#     return len(tokenizer.encode(text))

# Step 4: Split text into chunks
# text_splitter = RecursiveCharacterTextSplitter(
#     # Set a really small chunk size, just to show.
#     chunk_size = 512,
#     chunk_overlap  = 24,
#     length_function = count_tokens,
# )

# Split PDF into documents
# text_splitter = RecursiveCharacterTextSplitter(
#     chunk_size=200, 
#     chunk_overlap=20,
#     length_function=count_tokens
# )
# docs = text_splitter.split_documents(data)
# Print the first document
# docs[0]

# chunks = text_splitter.create_documents([text])

# Result is many LangChain 'Documents' around 500 tokens or less (Recursive splitter sometimes allows more tokens to retain context)
# type(chunks[0]) 


# langchain.schema.Document

# Quick data visualization to ensure chunking was successful

# Create a list of token counts
# token_counts = [count_tokens(chunk.page_content) for chunk in chunks]

# Create a DataFrame from the token counts
# df = pd.DataFrame({'Token Count': token_counts})

# Create a histogram of the token count distribution
# df.hist(bins=40, )

# Show the plot
# plt.show()

# Get embedding model
# embeddings = OpenAIEmbeddings()

# Create vector database
# db = FAISS.from_documents(chunks, embeddings)

# Check similarity search is working
# query = "Who directed Flash Gordon?"
# docs = db.similarity_search(query)
# docs[0]

# Create QA chain to integrate similarity search with user queries (answer query from knowledge base)

# chain = load_qa_chain(OpenAI(temperature=0), chain_type="stuff")

# query = "Who directed Flash Gordon?"
# docs = db.similarity_search(query)

# chain.run(input_documents=docs, question=query)

# from IPython.display import display
# import ipywidgets as widgets

# Create conversation chain that uses our vectordb as retriver, this also allows for chat history management
# qa = ConversationalRetrievalChain.from_llm(OpenAI(temperature=0.1), db.as_retriever())

# chat_history = []

# def on_submit(_):
    # query = input_box.value
    # input_box.value = ""
    
    # if query.lower() == 'exit':
    #     print("Thank you for using the State of the Union chatbot!")
    #     return
    
    # result = qa({"question": query, "chat_history": chat_history})
    # chat_history.append((query, result['answer']))
    
    # display(widgets.HTML(f'<b>User:</b> {query}'))
    # display(widgets.HTML(f'<b><font color="blue">Chatbot:</font></b> {result["answer"]}'))

# print("Welcome to the Transformers chatbot! Type 'exit' to stop.")

# input_box = widgets.Text(placeholder='Please enter your question:')
# input_box.on_submit(on_submit)

# display(input_box)