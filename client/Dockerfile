FROM mhart/alpine-node:latest

WORKDIR /client

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]