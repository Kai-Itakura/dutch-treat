FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install -g @nestjs/cli


