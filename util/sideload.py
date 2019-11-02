import sys
import gzip
import json
import urllib.parse

import requests

base_url = sys.argv[1]

with gzip.open(sys.stdin.buffer, "rt") as f:
    content = f.read().splitlines()

projects = filter(lambda l: l.startswith("Project"), content)
records = filter(lambda l: l.startswith("Timer"), content)

for project in projects:
    _, name, slug, description, locked, *rest = project.split(',')

    body = {
        "slug": urllib.parse.unquote(slug),
        "name": urllib.parse.unquote(name),
        "description": urllib.parse.unquote(description),
        "locked": locked == 'True',
    }

    requests.post(base_url + "/api/projects/", json=body)


for record in records:
    _, project, start_time, stop_time = record.split(",")

    body = {
        "project": project,
        "start_time": start_time.replace("+00:00", "Z"),
        "stop_time": stop_time.replace("+00:00", "Z") if stop_time else None,
    }

    requests.post(base_url + "/api/records/", json=body)
