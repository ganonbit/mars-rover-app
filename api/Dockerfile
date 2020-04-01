FROM mhart/alpine-node:latest

WORKDIR /api
COPY . .

RUN yarn install 

EXPOSE 8000
CMD ["yarn", "start"]