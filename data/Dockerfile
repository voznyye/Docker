FROM esolang/sqlite3:latest

WORKDIR /data

COPY schema.sql /data/

COPY db.db /data/

RUN chmod -R 777 /data

CMD ["sqlite3", "/data/db.db", ".read", "/data/schema.sql"]
