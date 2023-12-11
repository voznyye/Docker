FROM python:3.9

WORKDIR /DockerTest/api

RUN python -m venv venv

ENV PATH="/DockerTest/api/venv/bin:$PATH"

COPY requirements.txt .

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

COPY . .
