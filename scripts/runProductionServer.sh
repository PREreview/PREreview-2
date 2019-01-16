#!/bin/sh

source ./config/production.env

echo -e "$NODE_ENV environment loaded\n"

nohup bash -c "yarn server" > /dev/null 2>&1 &
