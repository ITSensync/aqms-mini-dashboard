# ===============================
# 1️⃣ Build stage
# ===============================
FROM node:18-bullseye AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Copy dependency files
COPY package.json package-lock.json* ./

# Install clean & deterministic
RUN npm ci

# Copy source
COPY . .

# Build Next.js
RUN npm run build


# ===============================
# 2️⃣ Production stage
# ===============================
FROM node:18-bullseye AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy only necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

CMD ["npm", "start"]