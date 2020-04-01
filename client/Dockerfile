FROM mhart/alpine-node:latest

WORKDIR /app


COPY package*.json .
RUN yarn install 
COPY /node_modules ./node_modules

WORKDIR /app/client

CMD ["yarn", "start"]