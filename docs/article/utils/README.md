# 工具函数

在日常的开发过程中，经常会使用一些工具函数，这里做一些简单的整理。

## 获取单个参数
```
/**
 * [getParam ]
 * @param  {String} name
 * @param  {String} url   [default:location.href]
 * @return {String|Boolean}
 */
function getParam(name, url) {
    if(typeof name !== 'string') return false;
    if (!url) url = window.location.href;
    // 当遇到name[xx]时，对方括号做一下转义为 name\[xxx\]，因为下面还需要使用name做正则
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

getParam('query','https://juejin.im/search?query=hello&time=2017-11-12')
// output:
// "hello"
```
