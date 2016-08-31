#!/bin/bash

WEB_PATH='/root/www/live-search/node-vue-server-webpack'

echo "开始拉取并重启live-search服务"
cd $WEB_PATH
echo "拉取代码中..."
git reset --hard
git clean -f
git pull
echo "拉取完成..."
echo "开始重启服务"
pm2 restart live
echo "重启live-search服务完成"