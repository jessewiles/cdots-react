FROM golang:1.11-alpine

RUN mkdir /cdots
COPY ./bin/linserver /cdots/server
COPY ./public/ /cdots/.
COPY ./src/go/templates /cdots/templates

ENV TMPL_DIR=/cdots/templates
ENV STATIC_DIR=/cdots/public

EXPOSE 8080:8080

CMD /cdots/server
