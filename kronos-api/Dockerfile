FROM alpine:3.10

ENV PYTHONUNBUFFERED=1
ENV PIP_NO_CACHE_DIR=0
ENV PYTHONPATH=/app

ENV DJANGO_SETTINGS_MODULE=kronos.settings

RUN mkdir /app
WORKDIR /app

RUN apk add --no-cache \
    curl \
    gcc \
    libc-dev \
    mariadb-dev \
    py3-gunicorn \
    python3 \
    python3-dev \
    --

COPY requirements.txt .
RUN pip3 install --upgrade pip; pip3 install -r requirements.txt

COPY backend ./backend
COPY kronos ./kronos
COPY manage.py .
COPY docker-entrypoint.sh .

RUN chmod +x docker-entrypoint.sh

EXPOSE 8000
STOPSIGNAL SIGINT

ENTRYPOINT /app/docker-entrypoint.sh
