FROM mysql:latest

ENV MYSQL_DATABASE=mydatabase \
    MYSQL_USER=myuser \
    MYSQL_PASSWORD=mypassword \
    MYSQL_ROOT_PASSWORD=root

COPY ./init.sql /docker-entrypoint-initdb.d/
