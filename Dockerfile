### STAGE 1: Build ###
FROM python:3.7-alpine3.12
RUN apk add --no-cache nginx
FROM node:14-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY default.conf /etc/nginx/conf.d/default.conf 
COPY --from=build /usr/dist/ /usr/share/nginx/html
EXPOSE 80