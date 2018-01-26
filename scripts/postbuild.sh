#!/usr/bin/env sh
set -e

echo Running post build script

rm -rf dist

mkdir dist

cp manifest.json dist/

cp -r public/ dist/public

# find dist/public -type f -name '*.map' -delete

cp popup.html dist/
