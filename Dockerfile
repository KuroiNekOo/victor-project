FROM node:22-alpine

# Installer OpenSSL pour Prisma (Alpine 3.22+)
RUN apk add --no-cache openssl libssl3 ca-certificates

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le schema Prisma
COPY prisma ./prisma/

# Générer le client Prisma
RUN npx prisma generate

# Copier le reste de l'application
COPY . .

# Exposer le port
EXPOSE 3000

# Script de démarrage qui exécute les migrations puis lance l'app
# CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
CMD ["tail", "-f", "/dev/null"]
