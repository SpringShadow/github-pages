# webpack配置优化

上一篇文章 [webpack基础配置](../webpack/todolist.html)里我们启动了一个简单的的web服务

这篇文章，我们将会在原来的基础上来完善和优化我们的配置。

## 代码的热加载

热加载的基本原理，构建 bundle 的时候，加入一段 HMR runtime 的 js代码 和一段和服务沟通的 js代码。
文件修改会触发 webpack 重新构建，服务器通过向浏览器发送更新消息，
浏览器通过 jsonp 拉取更新的模块文件，jsonp 回调触发模块热替换逻辑，
从而实现每次修改某个 js 文件后，页面局部更新。

代码热加载需要使用webpack的两个自带的插件，因此我们得先引入webpack这个库，然后使用相关的插件
```js{}
const webpack = require("webpack");
module.exports = {
  //...
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
```

## 区分开发环境和生产环境
我们的webpack.config.js的配置中是没有对开发环境和生产环境做区分的，
其实在实际的项目中，开发环境和生产环境的配置有很多的区别，
因此我们需要设置一些环境变量来标识开发环境和生产环境，
由于Mac和Windows系统在设置环境变量的时候有一定的差异，为此我们需要使用一个包文件来做兼容，
那么我们来安装这个包

`npm install cross-env`

安装了这个包之后，我们修改下package.json文件，修改之后如下

```js{}
"scripts": {
  "build": "cross-env NODE_ENV=production webpack --config webpack.config.js",
  "dev": "cross-env NODE_ENV=development webpack-dev-server --config  webpack.config.js"
},
```
然后我们在webpack.config.js里就可以获取和设置环境变量了

```js{}
const isDev=process.env.NODE_ENV==='development';   //设置环境变量

const config={

  //相关基础配置

  ...

};

if(isDev){
  //这里写开发环境下的配置

}else{
  //这里写生产环境下的配置
}

module.exports=config;
```

## css单独分离打包
我们运行`npm run build`命令之后，发现在dist目录下，所有的css代码被打包到js文件里了，
显然这不是我们在生产环境所需要的，因此我们需要将css代码单独提取出来，我们可以使用
mini-css-extract-plugin这个插件来进行处理，我们来安装这个插件

`npm install mini-css-extract-plugin --save-dev`

修改webpack.config.js代码

```js{}
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

  ...

  module:{
    rules:[
      {
      // 编译.less文件
      test: /\.less$/,
      use:[
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader" // translates CSS into CommonJS
        },
        {
          loader: 'postcss-loader',
            options: {
                sourceMap: true,            //复用less-loader生成的sourceMap,加快打包的速度
            }
        },
        {
          loader: "less-loader" // compiles Less to CSS
        }
      }
    ]
  },
  plugins: [

    ...

    new MiniCssExtractPlugin({
        filename: 'index.[contenthash:8].css'
    })
  ]
};
```
再次执行`npm run build`的时候，在`dist`目录下就会生成带有hash值的css文件了

## 提取 Vue 组件中的已处理的 CSS 为单个 CSS 文件

需要用到的插件为`extract-text-webpack-plugin`,先安装这个插件，`npm install extract-text-webpack-plugin --save-dev`

```js{}
let ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {

  ...

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader' 
            })
          }
        }
      }
    ]
  },
  plugins: [

    ...

    new MiniCssExtractPlugin({
        filename: 'index.[contenthash:8].css'
    })
  ]
};
```

## 公共模块的提取



## 浏览器代码缓存
