#!/bin/ash

python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py collectstatic --noinput

echo Starting Gunicorn.
exec gunicorn --bind 0.0.0.0:8000 --workers 8 --worker-class gthread kronos.wsgi "$@"
