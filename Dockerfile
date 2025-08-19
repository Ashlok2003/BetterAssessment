#---------- Builder Stage ----------
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

#---------- Production Stage ----------
FROM node:20-alpine AS production
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/docs/swagger.yaml ./docs/

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "--experimental-specifier-resolution=node", "dist/server.js"]
