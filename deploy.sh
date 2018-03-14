#!/usr/bin/env bash

export STATIC_ROOT="$DEPLOYMENT_TARGET/static"

function python () {
  "/d/home/python364x64/python.exe" "$@"
}

# echo "Collecting static files"
#
# python manage.py collectstatic --noinput --clear

echo "Installing pip dependencies"

python -m pip install -r requirements.txt -q

echo "Running migrations"

python manage.py migrate

echo "Running server"

python manage.py runserver
