FROM node:lts-alpine

WORKDIR /bot

COPY . .

RUN yarn install

ENTRYPOINT ["sh", "entrypoint.sh"]