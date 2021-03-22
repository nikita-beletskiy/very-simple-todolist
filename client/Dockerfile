FROM node:14-alpine as build

WORKDIR /app

COPY package.json .
RUN npm install --only-prod
COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /var/www
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]