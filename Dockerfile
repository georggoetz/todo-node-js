FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /wait-for-it.sh && chmod +x /wait-for-it.sh

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "./wait-for-it.sh --timeout=180 $TODO_DB_HOST:$TODO_DB_PORT -- npm start"]
