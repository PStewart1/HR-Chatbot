# Usar una imagen base de Node.js
FROM node:14

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
