FROM python:3.11

WORKDIR /DockerTest/api

RUN python -m venv venv

ENV PATH="/Docker/api/venv/bin:$PATH"

COPY . .

RUN pip install -r requirements.txt