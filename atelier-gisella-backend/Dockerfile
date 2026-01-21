# Utiliser une image Node.js stable
FROM node:20-slim

# Installer les outils systèmes (Python/Make) nécessaires pour certaines libs
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# 1. INSTALLATION
# On force l'installation de TOUTES les dépendances (y compris Vite, React, etc.)
RUN npm install --include=dev

# Copier tout le code source
COPY . .

# 2. CONSTRUCTION (BUILD)
# On définit l'environnement de production
ENV NODE_ENV=production
# On augmente la mémoire pour que le build ne plante pas
ENV NODE_OPTIONS="--max-old-space-size=4096"
# On lance le build (cela DOIT prendre plus de 1 minute)
RUN npm run build

# 3. CONFIGURATION RÉSEAU
EXPOSE 9000
ENV PORT=9000
ENV HOST=0.0.0.0

# 4. DÉMARRAGE
# On fait les migrations DB + Création Admin + Démarrage Serveur
CMD sh -c "npx medusa db:migrate && (npx medusa user -e gisella@latelierdegisella-bougies.fr -p 8#vs5Nt0jLMewBlE || true) && npx medusa start"
