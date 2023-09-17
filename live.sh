#!/bin/bash

sudo chown -R prakhar .
rm -rf .nuxt
rm -rf node_modules
rm -rf .output
echo "✨ Uploading"
scp -r ~/Documents/free-lancing/pizza-hum-project/pizza-hum/* root@85.31.238.178:/root/main/pizza-hum/pizza_hum_frontend
ssh root@85.31.238.178 "
cd /root/main/pizza-hum-project/
docker compose down
rm -rf .output
rm -rf .nuxt
rm -rf node_modules
docker-compose up -d --build
exit "
echo "🔥🔥 Live"
npm i