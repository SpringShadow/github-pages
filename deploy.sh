#!/usr/bin/env sh

# dos2unix deploy.sh

set -e

# 配置

git config --local user.name "SpringShadow"
git config --local user.email "597707404@qq.com"

# 拉取代码
git pull

# 提交代码到 github 触发 Travis Ci 部署到静态站点
git add -A
git commit -m 'deploy'

# 推送
git push
