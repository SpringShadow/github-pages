# vue组件
vue的组件式开发，是vue的核心，vue的项目，基本上都是建立在大量的组件上的，
通过将一个个单一的组件，巧妙的像搭积木一样，组成我们复杂的项目。
那么，接下来，我们开始学习和使用vue组件。

## 组件的使用

一个vue组件就是一个vue实例，一个很简单的vue组件可以像下面这样来定义和使用：

```js{4}
import Vue from 'vue';
//定义一个组件
const component = {
  template: `
    <div>
        this is textVal: {{text}}
    </div>
  `,
  data(){
    return {
      text:0
    };
  }
};
//全局定义这个组件
Vue.component('Comp', component);
//使用这个全局定义的组件
new Vue({
  components:{
    Comp:component
  },
  el:'#root',
  template:`<comp></comp>`
});
```
::: tip
vue官方推荐组件定义的时候，组件名要使用驼峰的命名方式，比如全局定义组件时
`Vue.component('CompA', component);`

使用组件时 `template:<comp-a></comp-a>`
:::

::: warning
组件里定义data的时候，data不能是一个对象，而是应该是一个函数，这个函数里返回你要定义的数据，
而且这个函数里返回的对象不能是全局的对象。这样做的目的是保证组件里的数据的独立性，
避免当这个组件在被重复使用的时候共用同一份数据。
:::

## 使用组件
### 全局使用
### 局部使用

组件组成 组件使用 组件通信 组件插槽
