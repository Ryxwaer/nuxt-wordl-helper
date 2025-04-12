ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-slim as base

# Set environment variables
ARG DB_URI
ENV DB_URI=${DB_URI}

ARG PORT=80

WORKDIR /src

# Build
FROM base as build

COPY --link package.json package-lock.json ./
RUN npm install

COPY --link . .

RUN npm run build

# Run
FROM base

ENV PORT=$PORT
ENV NODE_ENV=production

COPY --from=build /src/.output /src/.output

CMD [ "node", ".output/server/index.mjs" ]