# Étape 1 : Build de l'application
# Utiliser une image Node.js officielle pour construire le projet
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

# Étape 2 : Serveur web pour servir l'application React
# Utiliser une image Nginx pour servir les fichiers statiques
FROM nginx:alpine

# Copier les fichiers buildés depuis l'étape précédente vers le dossier par défaut de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80 pour le serveur web
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
