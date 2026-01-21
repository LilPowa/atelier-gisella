FROM node:20-slim

# Outils système pour compiler certaines librairies
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copie des dépendances
COPY package.json package-lock.json ./

# Installation des dépendances (On installe TOUT grâce au package.json nettoyé)
RUN npm install

# Copie du code source
COPY . .

# Construction de l'application (Admin + Backend)
RUN npm run build

ENV NODE_ENV=production
# On donne de la mémoire à Node pour le build
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Variables d'exécution
ENV PORT=9000
ENV HOST=0.0.0.0
EXPOSE 9000

# Démarrage : Migration -> Création User (Ignore erreur si existe) -> Start
CMD sh -c "npx medusa db:migrate && (npx medusa user -e gisella@latelierdegisella-bougies.fr -p 8#vs5Nt0jLMewBlE || true) && npx medusa start"