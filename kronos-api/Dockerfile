FROM alpine:3.9

ENV PYTHONUNBUFFERED=1
ENV PIP_NO_CACHE_DIR=0
ENV PYTHONPATH=/app

ENV DJANGO_SETTINGS_MODULE=kronos.settings

RUN mkdir /app
WORKDIR /app

RUN apk add --no-cache \
    curl \
    py3-gunicorn \
    python3 \
    python3-dev \
    sqlite \
    --

RUN python3 -m ensurepip \
    && rm -r /usr/lib/python*/ensurepip \
    && pip3 install --no-cache --upgrade \
        pip \
        setuptools \
        wheel \
    && if [ ! -e /usr/bin/pip ]; \
        then ln -s pip3 /usr/bin/pip; \
    fi

RUN pip install -U pipenv

COPY Pipfile .
COPY Pipfile.lock .

RUN pipenv install --system

COPY backend ./backend
COPY kronos ./kronos
COPY manage.py .
COPY docker-entrypoint.sh .

RUN chmod +x docker-entrypoint.sh

EXPOSE 8000
STOPSIGNAL SIGINT

ENTRYPOINT /app/docker-entrypoint.sh
