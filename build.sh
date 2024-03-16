#!/bin/sh


if [ -f .env ]
then
  export $(cat .env | xargs)
fi

isdocker=${1:-true}
arch=${2:-arm64}

if [ $isdocker ]; then
  yarn run build:docker
else
  yarn run build
fi

docker build --platform=linux/$arch -t ${repository} .