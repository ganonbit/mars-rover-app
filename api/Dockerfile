FROM mhart/alpine-node:latest

WORKDIR /app


COPY package*.json .
RUN yarn install
COPY /node_modules ./

CMD ["yarn", "start"]