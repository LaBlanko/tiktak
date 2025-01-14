#!/bin/bash

export $(cat C:\Users\leonb\jenkins\deploy\.env | xargs)

docker login -u $DOCKER_USER -p $AUTH_TOKEN
cd C:\Users\leonb\jenkins\deploy\jenkins_test
docker compose up -d