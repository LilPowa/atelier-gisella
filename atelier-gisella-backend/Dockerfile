FROM node:20-slim

# 1. Outils système
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 2. Copie des dépendances
COPY package.json package-lock.json ./

# 3. Installation des dépendances
# On utilise 'npm ci' qui est plus fiable pour les déploiements (respecte strictement le lockfile)
# On ne met PAS encore NODE_ENV=production ici pour garantir que Vite et les outils de build sont là
RUN npm ci --include=dev

# 4. Copie du code source
COPY . .

# 5. Arguments de build (Optionnel mais recommandé d'être explicite)
# Cela assure que si ton medusa-config.ts vérifie ces vars pendant le build, elles existent.
ARG DATABASE_URL
ARG STORE_CORS
ARG ADMIN_CORS
ARG REDIS_URL
ARG JWT_SECRET
ARG COOKIE_SECRET

# 6. Configuration mémoire pour le build
ENV NODE_OPTIONS="--max-old-space-size=4096"

# 7. Construction du projet (Backend + Admin Panel)
# C'est ici que l'admin va être généré correctement car nous sommes encore dans un env "neutre"
RUN npm run build

# 8. Passage en mode Production UNIQUEMENT pour l'exécution finale
ENV NODE_ENV=production
ENV PORT=9000
ENV HOST=0.0.0.0

# 9. Exposition
EXPOSE 9000

# 10. Démarrage
CMD npx medusa db:migrate && npx medusa start