ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine AS base

# Set environment variables
ARG DB_URI
ENV DB_URI=${DB_URI}

ARG PORT=80

WORKDIR /src

# Build
FROM base AS build

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

# Run
FROM base

ENV PORT=$PORT
ENV NODE_ENV=production

COPY --from=build /src/.output /src/.output

CMD [ "node", ".output/server/index.mjs" ]