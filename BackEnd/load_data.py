from pymongo import MongoClient
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_mongodb.vectorstores import MongoDBAtlasVectorSearch
from langchain_cohere import CohereEmbeddings
from decouple import config
from langchain_text_splitters import RecursiveCharacterTextSplitter


load_dotenv()

def get_pdf_text():
    pdfs = []
    pdf_docs = ['./Documents/Ethos Employee Handbook.pdf', 
                './Documents/Pre-populated FAQs.pdf', 
                './Documents/New Client Onboarding Questionnaire Template.pdf']
    for doc in pdf_docs:
        loader = PyPDFLoader(doc)
        pdf = loader.load()
        pdfs.extend(pdf)
    return pdfs

def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(
        # separators=["\n"],
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

pdfs = get_pdf_text()
chunks = get_text_chunks(pdfs)
get_vector_store(chunks)
