FROM docker.elastic.co/beats/filebeat:6.6.0
COPY filebeat.docker.yml /usr/share/filebeat/filebeat.yml
USER root
RUN chown root:filebeat /usr/share/filebeat/filebeat.yml
USER filebeat

FROM golang:1.11-alpine

RUN mkdir /cdots
COPY ./bin/linserver /cdots/server
COPY ./public/ /cdots/public
COPY ./src/go/templates /cdots/templates

ENV CDOTS_TMPL_DIR=/cdots/templates/*
ENV CDOTS_STATIC_DIR=/cdots/public
ENV CDOTS_MONGO_HOST=mdb-mongodb.cdots.svc
ENV CDOTS_MONGO_PORT=27017

EXPOSE 8080:8080

WORKDIR /cdots
ENTRYPOINT ["./server"]
