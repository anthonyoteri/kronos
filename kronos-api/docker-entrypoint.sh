#!/bin/ash

if [ ! -f /config/kronos.db ]; then
    touch /config/kronos.db
fi

ln -sf /config/kronos.db /app/kronos.db

python3 manage.py migrate
python3 manage.py collectstatic --noinput

echo Starting Gunicorn.
exec gunicorn --bind 0.0.0.0:8000 --workers 8 --worker-class gthread kronos.wsgi "$@"