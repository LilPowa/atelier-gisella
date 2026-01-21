FROM node:20-slim

# Outils système
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copie des dépendances
COPY package.json package-lock.json ./

# Installation des dépendances (On installe TOUT)
RUN npm ci --include=dev

# Copie du code
COPY . .

# Configuration Environnement
ENV NODE_ENV=production
# Augmentation mémoire pour éviter les crashs
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV PORT=9000
ENV HOST=0.0.0.0
EXPOSE 9000

# --- LA CLÉ DU SUCCÈS EST ICI ---
# On ne construit PAS ici (RUN npm run build est supprimé)
# On construit au moment du lancement (CMD)
CMD sh -c "npm run build && npx medusa db:migrate && (npx medusa user -e gisella@latelierdegisella-bougies.fr -p 8#vs5Nt0jLMewBlE || true) && npx medusa start"