FROM node:20-slim

RUN apt-get update && apt-get install -y python3 make g++ curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --include=dev

COPY . .

# Build + runtime dans le même environnement
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm run build
RUN test -f .medusa/server/public/admin/index.html

ENV PORT=9000
ENV HOST=0.0.0.0
EXPOSE 9000

CMD sh -c "npx medusa db:migrate && npx medusa start"
