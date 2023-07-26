FROM node:16.14.2 as builder

WORKDIR /app

COPY . .

ENV API=http://api:8000
RUN npm install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

RUN npm run build

RUN rm -rf node_modules && \
  NODE_ENV=production npm install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

FROM node:16.14.2-alpine

WORKDIR /app

COPY --from=builder /app  .

ARG API_URL

ENV API=http://api:8000
ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "npm", "start" ]
