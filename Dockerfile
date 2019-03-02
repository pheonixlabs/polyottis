FROM node

WORKDIR /usr/app/src

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "start" ]
