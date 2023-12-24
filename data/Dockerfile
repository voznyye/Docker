FROM esolang/sqlite3:latest

WORKDIR /data

COPY . .

RUN chmod -R 777 /data/

RUN sqlite3 db.db < schema.sql

CMD ["sqlite3", "/data/db.db", ".read", "/data/schema.sql"]
