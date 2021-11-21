FROM node:16-alpine

WORKDIR /usr/app

COPY package.json ./
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install
COPY ./ ./

ENTRYPOINT  [ "npm","start" ]

