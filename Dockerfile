FROM golang:1.11-alpine

RUN mkdir /cdots
COPY ./bin/linserver /cdots/server
COPY ./public/ /cdots/public
COPY ./src/go/templates /cdots/templates

ENV CDOTS_TMPL_DIR=/cdots/templates/*
ENV CDOTS_STATIC_DIR=/cdots/public
ENV CDOTS_MONGO_URI=mongodb://mdb-mongodb.cdots.svc:27017/cdots

LABEL "co.elastic.logs/fileset.stdout"="access"
LABEL "co.elastic.logs/fileset.stderr"="error"
LABEL "co.elastic.metrics/metricsets"="status"

EXPOSE 8080:8080

WORKDIR /cdots
ENTRYPOINT ["./server"]
