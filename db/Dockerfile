FROM postgres:16-alpine

ENV POSTGRES_DB=taskflow
ENV POSTGRES_USER=taskflow
ENV POSTGRES_PASSWORD=taskflow

COPY 01.schema.sql /docker-entrypoint-initdb.d/

EXPOSE 5432