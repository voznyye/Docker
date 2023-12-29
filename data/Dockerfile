FROM debian:bullseye-slim

WORKDIR /data/

COPY . .

RUN chmod -R 777 /data && \
    apt update && \
    apt install -y sqlite3 && \
    ./init.sh
