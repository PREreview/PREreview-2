#!/bin/sh

NODE_ENV='development'
echo -e 'installing dependencies...\n'

rm -rf node_modules && yarn
