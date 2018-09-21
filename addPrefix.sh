#!/bin/sh

set -x

BRANCH_NAME=$1

sed -e "\$i ,pathPrefix: '${BRANCH_NAME}'" gatsby-config.js
