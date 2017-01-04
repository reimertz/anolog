#!/bin/bash

# config
set -o errexit
git config --global user.email "deploy-bot@anolog.io"
git config --global user.name "Travis Deploy Bot"

echo "Cleaning up..."
# cleanup
rm -rf build

echo "Starting build script..."
# build
npm run build

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "master" ]; then
  echo "This is a PR. Skipping deploy step."
  exit 0
fi

echo "Deploying..."
# deploy
cd build
git init
git add --all
git commit -m "Deploy to Github Pages"
git push --force "https://${ACCESS_TOKEN}@github.com/reimertz/anolog"  master:gh-pages > /dev/null 2>&1