# Node.js Image
FROM node:18-alpine

# Arbeitsverzeichnis
WORKDIR /app

# Abhängigkeiten installieren
COPY package.json package-lock.json* ./
RUN npm install --production

# App-Code
COPY . .

# Startkommando
CMD ["npm", "start"]

# Port
EXPOSE 3000
