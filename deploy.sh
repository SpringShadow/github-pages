#!/usr/bin/env sh

# dos2unix deploy.sh

set -e

# 配置

git config --local user.name "SpringShadow"
git config --local user.email "597707404@qq.com"

# 生成静态文件
npm run docs:build

cd ./public


# 提交代码到 github 触发 Travis Ci 部署到静态站点
git add -A
git commit -m 'deploy update'

# 推送
git push -f git@github.com:SpringShadow/github-pages.git master:gh-pages
