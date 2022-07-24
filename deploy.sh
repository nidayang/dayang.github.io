#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# Set CNAME for "gh-pages" branch
# echo 'dbdgs.cn' > CNAME  # 改成你要绑定的域名

# if [ -z "$GITHUB_TOKEN" ]; then
#   msg='deploy'
#   githubUrl=git@github.com:nidayang/nidayang.github.io.git
# else
#   msg='来自github action的自动部署'
#   githubUrl=https://nidayang:${GITHUB_TOKEN}@github.com:nidayang/nidayang.github.io.git
#   git config --global user.name "nidayang"
#   git config --global user.email "1782055745@qq.com"
# fi
  msg='来自github action的自动部署'
  githubUrl=https://nidayang:${GITHUB_TOKEN}@github.com/nidayang/nidayang.github.io.git
  git config --global user.name "nidayang"
  git config --global user.email "1782055745@qq.com"

git init
git add -A
git commit -m "${msg}"
git push -f $githubUrl master:gh-pages # 推送到github

cd - # 退回开始所在目录
rm -rf docs/.vuepress/dist