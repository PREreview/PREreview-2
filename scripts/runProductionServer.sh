#!/bin/sh

source ./config/production.env

echo -e "$NODE_ENV environment loaded\n"

yarn server
