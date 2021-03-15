FROM node:14-alpine

WORKDIR /app
COPY package.json .
RUN npm install --only-prod
RUN npm install --save-dev sass
COPY . .

CMD [ "npm", "start" ]