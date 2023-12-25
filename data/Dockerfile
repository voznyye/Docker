FROM esolang/sqlite3:latest

WORKDIR /data

COPY . .

ENV PATH="/Docker/data/:$PATH"

RUN chmod -R 777 /data

CMD "./init.sh"