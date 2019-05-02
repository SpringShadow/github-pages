# 为什么写博客

## 从零开始搭建个人博客

## 前言

喜欢写 Blog 的人，会经历三个阶段。

>第一阶段，刚接触 Blog，觉得很新鲜，试着选择一个免费空间来写。

> 第二阶段，发现免费空间限制太多，就自己购买域名和空间，搭建独立博客。

>第三阶段，觉得独立博客的管理太麻烦，最好在保留控制权的前提下，让别人来管，自己只负责写文章。

[阮一峰 - 喜欢写 Blog 的人，会经历三个阶段](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)

这里，将逐步介绍使用 VuePress 配合 Github Pages 从零开始搭建属于自己的博客。

在进行文档中讲述的操作前，需要检查环境信息是否与我的环境一致，以及需要注意文档的更新时间，可能会存在工具软件版本升级导致的未知问题。

### 环境信息

| 涉及工具 |      工具版本      |
| -------- | :----------------: |
| 操作系统 | Win10  教育版 64 位 |
| Git      |       2.17.0       |
| Node     |       8.11.2       |
| Npm      |       6.9.0        |
| Yarn     |       1.7.0        |

### 更新时间

文档写于 2019 年 04 月 06 日，晚。

## Vue Press 的安装与配置

### VuePress 介绍

VuePress 由两部分组成：一部分是支持用 Vue 开发主题的极简静态网站生成器，另一个部分是为书写技术文档而优化的默认主题。它的诞生初衷是为了支持 Vue 及其子项目的文档需求。

每一个由 VuePress 生成的页面都带有预渲染好的 HTML，也因此具有非常好的加载性能和搜索引擎优化（SEO）。同时，一旦页面被加载，Vue 将接管这些静态内容，并将其转换成一个完整的单页应用（SPA），其他的页面则会只在用户浏览到的时候才按需加载。

### 它是如何工作的？

事实上，一个 VuePress 网站是一个由 Vue、Vue Router 和 webpack 驱动的单页应用。如果你以前使用过 Vue 的话，当你在开发一个自定义主题的时候，你会感受到非常熟悉的开发体验，你甚至可以使用 Vue DevTools 去调试你的自定义主题。

在构建时，我们会为应用创建一个服务端渲染（SSR）的版本，然后通过虚拟访问每一条路径来渲染对应的 HTML。这种做法的灵感来源于 Nuxt 的 nuxt generate 命令，以及其他的一些项目，比如 Gatsby

### VuePress 安装

#### 全局安装

如果你只是想尝试一下 VuePress，你可以全局安装它：

```
# 安装
yarn global add vuepress # 或者：npm install -g vuepress

# 新建一个 markdown 文件
echo '# Hello VuePress!' > README.md

# 开始写作
vuepress dev .

# 构建静态文件
vuepress build .
```

#### 现有项目

如果你想在一个现有项目中使用 VuePress，同时想要在该项目中管理文档，则应该将 VuePress 安装为本地依赖。作为本地依赖安装让你可以使用持续集成工具，或者一些其他服务（比如 Netlify）来帮助你在每次提交代码时自动部署。

```
# 将 VuePress 作为一个本地依赖安装
yarn add -D vuepress # 或者：npm install -D vuepress

# 新建一个 docs 文件夹
mkdir docs

# 新建一个 markdown 文件
echo '# Hello VuePress!' > docs/README.md

# 开始写作
npx vuepress dev docs
```

接着，在 package.json 里加一些脚本：

```
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

然后就可以开始写作了：

```
yarn docs:dev # 或者：npm run docs:dev
```

要生成静态的 HTML 文件，运行：

```
yarn docs:build # 或者：npm run docs:build
```

默认情况下，文件将会被生成在 .vuepress/dist，当然，你也可以通过 .vuepress/config.js 中的 dest 字段来修改，生成的文件可以部署到任意的静态文件服务器上，参考[部署](https://vuepress.vuejs.org/zh/guide/deploy.html) 来了解更多。

### VuePress 配置

#### 首页

默认的主题提供了一个首页（Homepage）的布局 （用于 这个网站的主页)。想要使用它，需要在你的根级 `README.md` 的 `YAML front matter` 指定 home: true。以下是这个网站实际使用的数据：

```
---
home: true
heroImage: /hero.png
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue 驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```

#### 导航栏

导航栏可能包含你的页面标题、搜索框、 导航栏链接、多语言切换、仓库链接，它们均取决于你的配置。

##### 导航栏链接

你可以通过`themeConfig.nav` 增加一些导航栏链接：

```
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ]
  }
}
```

当你提供了一个 `items` 数组而不是一个单一的 `link` 时，它将显示为一个 `下拉列表` ：

```
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        items: [
          { text: 'Chinese', link: '/language/chinese' },
          { text: 'Japanese', link: '/language/japanese' }
        ]
      }
    ]
  }
}
```

此外，你还可以通过嵌套的 `items` 来在 `下拉列表` 中设置分组：

#### 侧边栏

想要使 侧边栏（Sidebar）生效，需要配置 `themeConfig.sidebar`，基本的配置，需要一个包含了多个链接的数组：

```
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      '/',
      '/page-a',
      ['/page-b', 'Explicit link text']
    ]
  }
}

```

你可以省略 `.md` 拓展名，同时以 `/ `结尾的路径将会被视为 `*/README.md`，这个链接的文字将会被自动获取到（无论你是声明为页面的第一个 header，还是明确地在 `YAML front matter` 中指定页面的标题）。如果你想要显示地指定链接的文字，使用一个格式为 `[link, text]` 的数组。

#### 搜索框

##### 内置搜索

你可以通过设置 `themeConfig.search: false` 来禁用默认的搜索框，或是通过 `themeConfig.searchMaxSuggestions` 来调整默认搜索框显示的搜索结果数量：

```
module.exports = {
  themeConfig: {
    search: false,
    searchMaxSuggestions: 10
  }
}
```

内置搜索只会为`页面的标题`、`h2` 和 `h3` 构建搜索索引，如果你需要全文搜索，你可以使用 `Algolia 搜索`。

#### 最后更新时间

你可以通过 `themeConfig.lastUpdated` 选项来获取每个文件最后一次 git 提交的 UNIX 时间戳 (ms)，同时它将以合适的日期格式显示在每一页的底部：

```
module.exports = {
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
  }
}
```

请注意，`themeConfig.lastUpdated` 默认是关闭的，如果给定一个字符串，它将会作为前缀显示（默认值是：`Last Updated`）。

使用须知，由于 lastUpdated 是基于 git 的，所以你只能在一个基于 git 的项目中启用它。

### VuePress 部署

#### 部署

下述的指南基于以下条件：

- 文档放置在项目的 docs 目录中；
- 使用的是默认的构建输出位置；
- VuePress 以本地依赖的形式被安装到你的项目中，并且配置了如下的 `npm scripts`:

```
{
   "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs",
	"deploy": "bash deploy.sh"
  }
}
```

#### GitHub Pages

- 在 `docs/.vuepress/config.js` 中设置正确的 base。
如果你打算发布到 `https://<USERNAME>.github.io/`，则可以省略这一步，因为 `base` 默认即是 `"/"`。
如果你打算发布到 `https://<USERNAME>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 `base` 设置为 `"/<REPO>/"`。
- 在你的项目中，创建一个如下的 deploy.sh 文件（请自行判断去掉高亮行的注释）:
```
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

# Error: Unknown system error -116: Unknown system error -116, unlink '/path/your-project/docs/.vuepress/dist/.git'
rm -rf docs/.vuepress/dist/.git

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

- 执行部署
```
npm run deploy
```

## 参考资源

- [VuePress 官方文档](https://vuepress.vuejs.org/zh/guide/)

Enjoy.❤
