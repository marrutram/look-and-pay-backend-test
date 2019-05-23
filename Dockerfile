FROM node:11-alpine

USER root
RUN mkdir -p /home/node/app/ 

RUN apk update && apk add --no-cache ca-certificates

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

WORKDIR /home/node/app

COPY . .

RUN npm cache clean -f \
    && npm rebuild bcrypt --build-from-source \
    && npm install typescript -g \
    && npm install

RUN tsc

CMD ["/bin/sh", "-c", "docker/entrypoint.sh 2>&1  | tee -a /var/log/look-and-play.log"]
