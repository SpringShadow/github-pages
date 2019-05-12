# webpack配置(二)

上一篇文章 [webpack配置(一)](../webpack/todolist.html)里我们构建了一个简单的的web服务
这篇文章，我们将会在原来的基础上来优化我们的配置。

## 代码的热加载
代码热加载需要使用webpack的两个自带的插件，因此我们得先引入webpack这个库，然后使用相关的插件
```js{4}
const webpack = require("webpack");
module.exports = {
  //...
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
```
那么什么是热加载？在这里顺便提一下。

热加载的基本原理，构建 bundle 的时候，加入一段 HMR runtime 的 js 和一段和服务沟通的 js 。
文件修改会触发 webpack 重新构建，服务器通过向浏览器发送更新消息，
浏览器通过 jsonp 拉取更新的模块文件，jsonp 回调触发模块热替换逻辑，
从而实现每次修改某个 js 文件后，页面局部更新。

## 代码优化


### 开发环境和生产环境编译代码映射问题
### css单独分离打包
### 浏览器代码缓存
