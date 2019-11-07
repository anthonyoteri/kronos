#!/bin/ash

# Wait for MYSQL to be ready
echo "Waiting for mysql on ${MYSQL_HOST}:${MYSQL_PORT}"
while ! nc -z ${MYSQL_HOST}:${MYSQL_PORT}; do sleep 1; done
echo "DB is ready..."

python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py collectstatic --noinput

echo Starting Gunicorn.
exec gunicorn --bind 0.0.0.0:8000 --workers 8 --worker-class gthread kronos.wsgi "$@"
