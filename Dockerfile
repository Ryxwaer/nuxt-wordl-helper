ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-slim as base

# Set environment variables
ARG DB_URI
ENV DB_URI=${DB_URI}

ARG PORT=80

WORKDIR /src

# Build
FROM base as build

COPY --link package.json ./
RUN npm install

COPY --link . .

RUN npm run build

# Run
FROM base

ENV PORT=$PORT
ENV NODE_ENV=production

COPY --from=build /src/.output /src/.output

# geoip-country loads a .dat file via fs.readFileSync at runtime.
# Nitro's file tracer only copies JS/JSON, so we copy the data file explicitly.
COPY --from=build /src/node_modules/geoip-country/data/ /src/.output/server/node_modules/geoip-country/data/

CMD [ "node", ".output/server/index.mjs" ]