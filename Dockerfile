FROM node:11-alpine

USER root
RUN mkdir -p /home/node/app/ 

RUN apk update && apk add --no-cache ca-certificates

WORKDIR /home/node/app

COPY . .

RUN npm cache clean --force\
    && npm install typescript -g\
    && npm install

RUN tsc

CMD ["/bin/sh", "-c", "docker/entrypoint.sh 2>&1  | tee -a /var/log/look-and-play.log"]
