FROM mhart/alpine-node:latest

WORKDIR /client

COPY package*.json .
RUN yarn install 
RUN yarn build
COPY . .

CMD ["yarn", "start"]