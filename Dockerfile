FROM node:18-alpine as deps

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn

FROM deps as builder

COPY . /app/

RUN yarn build

FROM nginx

WORKDIR /usr/share/nginx/html/

EXPOSE 80
# COPY public/ /usr/share/nginx/html/
COPY --from=builder /app/dist/ /app/node_modules/ /usr/share/nginx/html/