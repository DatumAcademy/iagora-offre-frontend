# Étape 1 : Build de l'application
FROM node:18-alpine AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le package.json et le package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du projet dans le conteneur
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Serveur Node.js pour servir l'application React
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers buildés depuis l'étape précédente
COPY --from=build /app/build ./build

# Copier le fichier server.js dans le conteneur
COPY server.js .

# Installer express
RUN npm install express

# Exposer le port
EXPOSE 3005

# Démarrer le serveur Node.js
CMD ["node", "server.js"]
