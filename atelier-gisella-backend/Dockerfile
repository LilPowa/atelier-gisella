FROM node:20-slim

# Outils système + curl (utile aussi pour le healthcheck, voir plus bas)
RUN apt-get update && apt-get install -y python3 make g++ curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --include=dev

COPY . .

# Build en "dev" pour garantir la génération des assets admin
ENV NODE_ENV=development
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# Stoppe le build si l'admin n'a pas été généré
RUN test -f .medusa/server/public/admin/index.html

# Runtime
ENV NODE_ENV=production
ENV PORT=9000
ENV HOST=0.0.0.0
EXPOSE 9000

CMD sh -c "npx medusa db:migrate && npx medusa start"
