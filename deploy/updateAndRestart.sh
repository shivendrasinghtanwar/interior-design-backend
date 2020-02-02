#!/bin/bash

# any future command that fails will exit the script
set -e

# Delete the old repo
# rm -rf /home/ubuntu/ci_cd_demo/git pull origin master

# clone the repo again
cd /home/lendbox/admin-node
echo $PWD
git pull
npm i
pm2 reload admin
pm2 ls