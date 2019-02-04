FROM golang:1.11-alpine

RUN mkdir /cdots
COPY ./bin/linserver /cdots/server
COPY ./public/ /cdots/public
COPY ./src/go/templates /cdots/templates

ENV CDOTS_TMPL_DIR=/cdots/templates/*
ENV CDOTS_STATIC_DIR=/cdots/public
ENV CDOTS_MONGO_HOST=mdb-mongodb.cdots.svc
ENV CDOTS_MONGO_PORT=27017

LABEL "co.elastic.logs/fileset.stdout"="access"
LABEL "co.elastic.logs/fileset.stderr"="error"
LABEL "co.elastic.metrics/metricsets"="status"

EXPOSE 8080:8080

WORKDIR /cdots
ENTRYPOINT ["./server"]
