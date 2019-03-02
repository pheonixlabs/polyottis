FROM node:10

WORKDIR /usr/app/src

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 8081

CMD [ "npm", "start" ]
