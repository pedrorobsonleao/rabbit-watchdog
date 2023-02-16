FROM node:lts-alpine

WORKDIR /bot

COPY . .

RUN yarn install && \
cat entrypoint.sh | \
tr -d '\r' >entrypoint && \
mv entrypoint entrypoint.sh && \
chmod 755 entrypoint.sh

ENTRYPOINT ["/bin/sh","entrypoint.sh"]