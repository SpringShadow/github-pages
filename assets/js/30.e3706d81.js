(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{182:function(e,v,t){"use strict";t.r(v);var _=t(0),u=Object(_.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,v=e.$createElement,t=e._self._c||v;return t("div",{staticClass:"content"},[t("h1",{attrs:{id:"vue状态管理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vue状态管理","aria-hidden":"true"}},[e._v("#")]),e._v(" vue状态管理")]),e._v(" "),t("p",[e._v("vuex在刷新页面，分享页面的时候需要注意的一些问题")]),e._v(" "),t("p",[e._v("关于 vuex 的应用场景的考虑")]),e._v(" "),t("p",[e._v("1、不是所有的组件, 路由之间的数据传递都应该通过 vuex, 当同时存在两种方式可以选择的时候,选择 vuex 的唯一理由只有一个:")]),e._v(" "),t("p",[t("code",[e._v("需要响应式的状态")])]),e._v(" "),t("p",[e._v("why?")]),e._v(" "),t("p",[t("code",[e._v("因为 vuex 虽然有辅助函数, 但是用起来还是要 引入, 定义. 而且真的是一刷新页面就挂了.")])]),e._v(" "),t("p",[e._v("2、可以通过监听 beforeunload 事件, 在其中缓存 state, 然后在 onload 事件再恢复, 这样可以避免掉vuex 的丢值.")]),e._v(" "),t("p",[e._v("3、没有必要追求全项目统一的一种通信方式, 理论上你不考虑刷新分享, 全项目都用 vuex, 什么事情也不会有的.")]),e._v(" "),t("p",[e._v("4、vuex 是状态管理, 不是保存常量的地方.")])])}],!1,null,null,null);v.default=u.exports}}]);