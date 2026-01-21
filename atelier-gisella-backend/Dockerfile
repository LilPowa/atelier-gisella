# On utilise une image Node.js récente
FROM node:20-slim

# On définit le dossier de travail
WORKDIR /app

# On installe les outils système requis (Python/Make sont parfois nécessaires pour certaines libs)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# On copie d'abord les fichiers de dépendances (pour le cache Docker)
COPY package.json package-lock.json ./

# ÉTAPE CRUCIALE : On installe TOUT (y compris les devDependencies pour avoir Vite/Typescript)
# On force le mode développement pour l'installation
ENV NODE_ENV=development
RUN npm install

# On copie le reste du code source
COPY . .

# On repasse en production pour le build et l'exécution
ENV NODE_ENV=production

# On augmente la mémoire disponible pour le build (évite les crashs sur VPS)
ENV NODE_OPTIONS="--max-old-space-size=4096"

# On lance la construction de l'Admin
RUN npm run build

# On expose le port 9000
EXPOSE 9000

# On force l'écoute sur toutes les interfaces
ENV HOST=0.0.0.0
ENV PORT=9000

# Commande de démarrage robuste :
# 1. Migration DB
# 2. Création User (avec || true pour ne pas planter s'il existe déjà)
# 3. Démarrage serveur
CMD sh -c "npx medusa db:migrate && (npx medusa user -e gisella@latelierdegisella-bougies.fr -p 8#vs5Nt0jLMewBlE || true) && npx medusa start"
