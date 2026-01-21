FROM node:20-slim

# Outils système
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copie des dépendances
COPY package.json package-lock.json ./

# Installation complète (Dev + Prod) pour garantir que Vite/React sont là
RUN npm install --include=dev

# Copie du code
COPY . .

# Configuration de la mémoire pour le Build (Évite les crashs silencieux)
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV NODE_ENV=production

# Construction explicite de l'Admin
RUN npm run build

# Exposition et Réseau
EXPOSE 9000
ENV PORT=9000
ENV HOST=0.0.0.0

# Démarrage SIMPLIFIÉ (Juste les migrations et le serveur)
# On a retiré la création d'utilisateur pour éviter les conflits au boot
CMD sh -c "npx medusa db:migrate && npx medusa start"