#!/bin/sh
set -e

echo "Validating required params..."

if [ -z $ENVIRONMENT ]; then
  echo "ENVIRONMENT is missing" >&2;
  exit 1
fi

echo "Getting configuration  in alpha..."

npm run start