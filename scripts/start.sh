#!/bin/bash
. /root/.bashrc
nvm use 0.12.7
forever start -l /indikit/out.log /indikit/app.js
forever logs 0 -f
