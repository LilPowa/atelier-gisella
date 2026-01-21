FROM node:20-slim

# Outils système (Correction : suppression de paquets inutiles)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 1. INSTALLATION
COPY package.json package-lock.json ./
# On utilise npm install pour être sûr de tout avoir
RUN npm install --include=dev

# 2. COPIE CODE
COPY . .

# 3. CONSTRUCTION (En mode Dev pour garantir la génération des assets)
ENV NODE_ENV=development
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# 4. VERIFICATION (Le point crucial)
# Cette commande va lister le fichier. S'il n'existe pas, le build s'arrête ICI (erreur).
# On saura immédiatement si l'admin a été construit.
RUN ls -la .medusa/server/public/admin/index.html

# 5. CONFIGURATION PROD
ENV NODE_ENV=production
ENV PORT=9000
ENV HOST=0.0.0.0
EXPOSE 9000

# 6. DÉMARRAGE SIMPLIFIÉ
CMD sh -c "npx medusa db:migrate && npx medusa start"