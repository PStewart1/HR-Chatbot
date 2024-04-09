# Usar una imagen base de Node.js
FROM node:17.0

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el package.json y el package-lock.json (o yarn.lock)
COPY package*.json ./

# Instalar dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Comando para ejecutar la aplicación
CMD ["npm", "start"]

# Exponer el puerto 3000 (o el que use tu aplicación React)
EXPOSE 3000

# start docker
# navigate to this directory: "cd HR-Chatbot/FrontEnd/mychatbot"
# run "docker build -t hr_chatbot_front:latest ."
# run "docker run -p 3000:3000 hr_chatbot_front:latest" 
