# Etapa de desarrollo
FROM node:18 AS development

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración y el package.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto en el que Next.js corre por defecto
EXPOSE 3000

# Ejecuta el comando de desarrollo
CMD ["npm", "run", "dev"]