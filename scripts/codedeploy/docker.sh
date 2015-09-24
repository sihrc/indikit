#!/bin/bash
sudo docker build -t indikit /indikit

# kill all old processes
DOCKER_INSTANCES=$(sudo docker ps -q)
if [ -n "$DOCKER_INSTANCES" ]
then
  sudo docker kill $DOCKER_INSTANCES
fi

sudo docker run -p 80:3000 -d -t indikit &
