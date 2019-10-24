FROM node:12.4.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .
RUN yarn install

COPY public/ ./public/
COPY src/ ./src/
COPY package.json ./

RUN yarn build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /app
COPY --from=build /app/build /app

COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT /docker-entrypoint.sh