#!/bin/bash

DOCKER_BUILDKIT=1 docker build -t us.gcr.io/sertech-arq/superset:$(git rev-parse --short HEAD) .
docker push us.gcr.io/sertech-arq/superset:$(git rev-parse --short HEAD)