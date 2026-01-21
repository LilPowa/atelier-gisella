# 1. On part d'une image Node.js légère
FROM node:20-slim

# 2. On installe les outils système nécessaires (Python/Make pour certaines libs)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# 3. On définit le dossier de travail
WORKDIR /app

# 4. On copie les fichiers de dépendances
COPY package.json package-lock.json ./

# 5. On installe TOUT (y compris les devDependencies pour le build)
RUN npm install

# 6. On copie tout le code source
COPY . .

# 7. On construit l'application (Admin + Backend)
# On force NODE_ENV=production pour que le build soit optimisé
ENV NODE_ENV=production
RUN npm run build

# 8. On expose le port 9000
EXPOSE 9000

# 9. Commande de démarrage : Migrations + Serveur
# On force l'écoute sur 0.0.0.0 pour Docker
ENV HOST=0.0.0.0
ENV PORT=9000

CMD sh -c "npx medusa db:migrate && (npx medusa user -e gisella@latelierdegisella-bougies.fr -p 8#vs5Nt0jLMewBlE || true) && npx medusa start"
