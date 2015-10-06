#!/bin/bash
. /root/.bashrc
nvm use 4.0.0
gulp dev&
tail -Fq /dev/null
