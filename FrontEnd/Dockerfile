FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
EXPOSE 3000

# start docker
# navigate to this directory: "cd HR-Chatbot/FrontEnd/mychatbot"
# run "docker build -t hr_chatbot_front:latest ."
# run "docker run -p 3000:3000 hr_chatbot_front:latest" 
