#!/usr/bin/env python3

from pymongo import MongoClient

import streamlit as st
from dotenv import load_dotenv
# from PyPDF2 import PdfReader
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter

from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from htmlTemplates import css, bot_template, user_template
from langchain_mongodb.vectorstores import MongoDBAtlasVectorSearch
from langchain_cohere import CohereEmbeddings
from decouple import config
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
