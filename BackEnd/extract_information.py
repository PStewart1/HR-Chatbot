from pymongo import MongoClient
from dotenv import load_dotenv
from langchain.chains import RetrievalQA
from langchain_mongodb.vectorstores import MongoDBAtlasVectorSearch
from langchain_cohere import CohereEmbeddings
from decouple import config
from langchain_cohere.chat_models import ChatCohere
from langchain.prompts import PromptTemplate


load_dotenv()

def get_vector_store():
    """
    
    """
    # setup embeddings connection to Cohere llm
    coApiKey = config('COHERE_API_KEY')
    embeddings = CohereEmbeddings(model="embed-english-v3.0", cohere_api_key=coApiKey)
   
    # setup db connection and vector search
    dbKey = config("DB_CONNECTION")
    client = MongoClient(dbKey)
    db_name = "HR_ChatBot"
    collection_name = "embedded_hr_docs"
    collection = client[db_name][collection_name]

    vector_search = MongoDBAtlasVectorSearch(collection, embeddings, index_name="vector_indexcosine")
    return vector_search

def query_data(query):
    """
    This function takes in a query and returns 2 responses.
    The first response is the chat response from the ai.
    The second response is the source documents that the ai used to generate the response.
    """
    vector_store = get_vector_store()

    llm = ChatCohere(model="command-r", temperature=0.1)
    retriever = vector_store.as_retriever(search_type="similarity")

    prompt_template = """
    You are a factual HR AI Assistant dedicated to providing me with accurate human resources information based on the content from the knowledge base.
    Stay in character and maintain your focus on addressing HR related concerns, avoiding unrelated activities or engaging in non-HR related discussions
    Your response should be in the same language as my question. If you cannot find relevant information in the given knowledge base or if the user asks non-related 
    questions that are not part of the knowledge base, acknowledge your inability and inform the user that you cannot respond. 
    Do not mention the knowledge base in your response. Try to keep your responses short if possible. If the user is asking about a serious issue, instruct them to reach out
    to their HR rep Krystal at 'hello@yourhrstrategist.com' for further assistance.

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
    response = qa({"query": query})
    return response["result"], response['source_documents']
