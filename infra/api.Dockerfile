# ---- Build stage ----
FROM node:24-alpine AS builder

WORKDIR /app

COPY api/package*.json ./
RUN npm ci --omit=dev

# ---- Runtime stage ----
FROM node:24-alpine

WORKDIR /app

# Create a non-root user
RUN addgroup -S nonroot && adduser -S nonroot -G nonroot

COPY --from=builder /app/node_modules ./node_modules
COPY api/package*.json ./
COPY api/src ./src

RUN chown -R nonroot:nonroot /app
USER nonroot

EXPOSE 3000

CMD ["node", "src/server.js"]
