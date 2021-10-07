FROM node:14-alpine

WORKDIR /bot

COPY . .

RUN yarn install

ENTRYPOINT ["sh", "entrypoint.sh"]