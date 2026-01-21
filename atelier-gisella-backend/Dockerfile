FROM node:20-slim

# Outils système
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copie des dépendances
COPY package.json package-lock.json ./

# Installation complète (pour avoir Vite/React)
RUN npm ci --include=dev

# Copie du code
COPY . .

# Construction (BUILD)
# On le fait ICI, dans l'image.
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# Réseau
EXPOSE 9000
ENV PORT=9000
ENV HOST=0.0.0.0

# Démarrage rapide (car tout est déjà construit)
CMD sh -c "npx medusa db:migrate && (npx medusa user -e gisella@latelierdegisella-bougies.fr -p 8#vs5Nt0jLMewBlE || true) && npx medusa start"