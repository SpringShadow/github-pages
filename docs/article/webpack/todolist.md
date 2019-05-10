# todolist的webpack配置

## 操作系统和开发工具版本

| 涉及工具        |      工具版本      |
| --------------| :----------------: |
| 操作系统        |      Mac Pro       |
| Node          |       12.1.0       |
| Npm           |       6.9.0        |
| webpack       |       4.31.0       |
| webpack-cli   |       3.1.1        |
| vue           |       3.7.0        |

## 项目初始化

运行以下命令来创建一个新项目：

```
vue init
```
然后一路回车，之后生成一个package.json为文件

接着安装一些相关的依赖文件
```
cnpm install vue --save
cnpm install vue-loader webpack --save-dev
```
## 编译.vue文件

webpack4 默认的打包入口文件为`./src`下的`index.js`或者`main.js`文件，因此我们新建一个`src`目录，
在该目录下新建一个`index.js`文件作为入口文件，接着再创建一个`app.vue`文件作为我们要打包的文件。

`index.js`文件代码

```js{4}
import Vue from 'vue';
import App from './app.vue';

const root = document.createElement('div');  //创建div节点
document.body.appendChild(root);            //将div节点添加到body下

new Vue({
  render:(h)=>h(App)
}).$moun(root);  //将vue实例挂在到root节点上

```
我们为`app.vue`文件创建一些简单的内容
```js{4}
<template >
    <div class="text">{{text}}</div>
</template>

<script>

export default {
      data(){
        return{
          text:"这是测试文本"
        }
      }
}
</script>

<style scoped>
    .text{
      color:rgb(148, 163, 218);
    }

</style>

```
接下来我们来配置webpack，我们在项目目录下新建一个webpack.config.js文件，直接上代码，再加注释
```js{4}
const path = require('path');   //node内置的文件模块，方便处理各种路径问题

const { VueLoaderPlugin } = require('vue-loader');  //vue-loader升级到15.0+版本之后必须是使用该插件，不然在编译的时候一直报错

module.exports = {
  mode:"development",
  entry:path.join(__dirname,'src/index.js'),
  output:{                                            //声明出口文件
      filename: 'bundle.js',                          //将挂载的App全部打包成一个bundle.js,在浏览器中可以直接运行的代码
      path: path.join(__dirname,'dist')               //bundle.js保存的位置
  },
  module:{
    rules:[
      //编译所有的.vue文件
      {
        test:/.vue$/,
        loader:'vue-loader'
      }
    ]
  },
  plugins: [
        new VueLoaderPlugin(),  //vue-loader升级到15.0+版本要使用该插件
    ],
};

```
::: warning
  1、webpack4版本下，对应的webpack-cli也要升级，不然一直会报错
  ```
  /Users/xiaoqingqing/Works/node_modules/_webpack-cli@2.1.5@webpack-cli/bin/config-yargs.js:89
				describe: optionsSchema.definitions.output.properties.path.description,
  ```
  解决办法:

`npm i webpack-cli@3.1.1 -D`

2、就是在使用vue-loader15.0+版本时候，编译会报如下的错误
```
vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.
 @ ./src/index.js 3:0-28 9:16-19
```
解决办法:如上面webpack.config.js所示，使用VueLoaderPlugin这个插件
:::

## 处理css文件 编译less等
