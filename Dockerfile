ARG NODE_VERSION=20.18.0

FROM node:${NODE_VERSION}-slim as base

# Set environment variables
ARG DB_URI
ENV DB_URI=${DB_URI}

ARG PORT=3000

WORKDIR /src

# Build
FROM base as build

COPY --link package.json ./
# package-lock.json is not needed here for cross-arch builds
RUN npm install

COPY --link . .

RUN npm run generate

# --- Serve Stage ---
FROM nginx:alpine as final

# Copy static assets from build stage
COPY --from=build /src/.output/public /usr/share/nginx/html

# Expose port and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]