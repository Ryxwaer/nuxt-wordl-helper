# Build Stage
FROM node:18-alpine AS build-stage

ARG DB_URI
ENV DB_URI=${DB_URI}

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Build the Nuxt app (for SSR or SSG)
RUN npm run build

# Production Stage - Run with Node
FROM node:18-alpine AS production-stage

WORKDIR /app

# Copy the built output and node_modules
COPY --from=build-stage /app/.output ./.output
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/package*.json ./

# Expose Nuxt default port
EXPOSE 3000

# Run Nuxt server
CMD ["node", ".output/server/index.mjs"]
