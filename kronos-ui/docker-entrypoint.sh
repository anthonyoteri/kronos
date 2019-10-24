#!/bin/ash

echo "Installing app."
cp -a /app/* /usr/share/nginx/html/

exec nginx -g "daemon off;"