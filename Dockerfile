# Dockerfile

FROM node:16-alpine
WORKDIR /opt/app
COPY src/package.json src/package-lock.json .
RUN yarn install
COPY src/ .
