
# 图片预加载

## 什么是图片预加载？

图片预加载，简单来讲是将需要用到的一些图片提前进行加载，当真正使用的时候直接从缓存中获取，因此没有了加载等待或者图片显示不出来的问题。

## 为什么要图片预加载？

在一些以图片为主的网站，特别是一些动画较多的H5网站。这些网站有着大量的图片资源，同时对动画的流畅性要求较高，如果用户的网络较慢，就会出现图片没有显示完全，动画就已经在播放的情况了，因此图片资源必须做到提前预加载，这样才能保证动画的流畅性和完整性

## 如何做到图片预加载？

先上代码，等会再解释

```
const QueueLoad = {
    /**
     * 加载队列
     * @param {array} imgList  图片队列
     * @param {function} progressFun 加载进度
     * @param {function} completeFun  加载完成
     * @param {object} opts  配置参数
     * @param {string} opts.basePath 配置根目录路径
     * @return {array} 加载队列数组
     */
    load: function (imgList, progressFun,completeFun, opts) {

          let _opts = opts || {};

          let _progressFun = progressFun || null;
          let _completeFun = completeFun || null;

          let _imgList = [];
          if (imgList && imgList.length > 0) _imgList = imgList;

          let _basePath = _opts.basePath !== undefined ? _opts.basePath : ''; //设置根目录路径

          let _queueArr = [];  //图片加载队列
          let _loadNum = 0;   //加载的图片数量

          if (_imgList.length <= 0) {
                if (_completeFun !== undefined) _completeFun();
                return;
          }

          // 遍历图片队列
          _imgList.forEach((item,index)=>{
              let _tempObj={};
              let _img = new Image();
              _tempObj.src = _basePath + _imgList[index];
              _img.onload = loadOneImgComplete;
              _img.onerror = loadOneImgComplete;
              _tempObj.img = _img;
              _queueArr.push(_tempObj);
          })

          //开始加载
          startLoad();

          //开始加载
          function startLoad() {

              let _obj = _queueArr[0];
              let _img = _obj.img;
              _img.src = _obj.src;

          }

          //队列加载进度
          function loadOneImgComplete() {

              let _obj = _queueArr[_loadNum];
              _loadNum++;

              if (_loadNum >= _queueArr.length) {
                  loadComplete();
                  return;
              }

              let _img = _obj.img;
              _img.src = _obj.src;

              if (_progressFun) _progressFun(_loadNum / _queueArr.length);

          }

          //队列加载完成
          function loadComplete() {

              if (_progressFun) _progressFun(1);
              if (_completeFun) _completeFun();

          }

          //给到加载对象队列 进行img索引复制操作
          return _queueArr;

          },
    };

    // eg.
    let imgList=[
        'images/img1.jpg',
        'images/img2.jpg',
        'images/img3.jpg',
        'images/img4.jpg',
        'images/img5.jpg',
        'images/img6.jpg',
        'images/img7.jpg',
    ];
    QueueLoad.load(imgList,function (pro){
        console.log(pro);
    },function (){
        console.log('加载完成');
    })

```
相信上面的代码比较简单，再加上一些注释和案例，大家应该都看的明白。上面封装的一个方法，可以实现一个简单的图片预加载的功能。

## 如何获取要加载的图片路径？

上面，我们解决了图片加载的问题，但是在实际的项目开发中，我们会遇到另外一个问题，就是图片的地址的获取有时并不是那么方便。

1、图片存放在不同的目录下，很有可能有两级或者三级目录；
2、图片的命名也不一定就像上面的案例一样是按照数字来排序命名的；
3、在项目的开发过程中，还会经常的增加图片，删除图片，重新命名等。

因此我们要解决图片路径获取的一个问题，为此我们可以用gulp来优化这个问题。

第一步，安装gulp，建议全部安装
```
npm install gulp -g
```
第二步，我们在根目录下新建一个gulpfile.js的文件，同时创建一个imagse目录来进行测试，目录结构如下
```
demo
└───images
│   │   lazy.png
│   |   shareImg.jpg
│   │
|   └───home
|   |    |   num1.png
│   |    |   num2.png
│   |    |   num3.png
│   |    |
│   |    └───icons
|   |         |    icon0.png
|   |         |    icon1.png
|   └───public
│        |   closeBtn.pn
│        |   suerBtn.png
└───index.html
└───gulpfile.js

```
gulpfile.js的代码
```
let gulp = require('gulp');

let fs = require('fs'); //引用文件系统模块  gulp内置的模块

// 读取文件
function readFileList(path, filesList) {
  let files = fs.readdirSync(path); //读取 path路径下的文件
  // 遍历
  files.forEach(function(item, index) {
    let stat = fs.statSync(path + item);
    if (stat.isDirectory()) {
      //递归读取文件
      readFileList(path + item + "/", filesList);
    } else {
      //mac下会读取.DS_Store文件 需要过滤掉
      if(item!==".DS_Store"){
        let obj = {}; //定义一个对象存放文件的路径和名字
        obj.fullPath=path+item;
        filesList.push(obj);
      }
    }
  });
  return filesList;
}

gulp.task('getPath', function() {
  let imageList = [];
  readFileList("./images/", imageList);

  let imgPathArr=[];
  for (let i = 0; i < imageList.length; i++) {
      imgPathArr.push('"'+imageList[i].fullPath+'"');
  }
  // 在根目录下创建imgpath.txt文本文件，同时将imgPathArr里的内容写入到该文件下
  fs.writeFile("imgpath.txt", imgPathArr, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("file writes sucess!!");
    }
  });
});
```
第三步 切换到该文件夹下 执行"gulp getPath" 命令
```
cd demo
gulp getPath
```
最后在根目录下 会生成一个imgpath.txt的文件，里面的内容就是我们所有图片的路径。导出的代码如下
```
"./images/ShareImg.jpg",
"./images/home/iocns/icon0.png",
"./images/home/iocns/icon1.png",
"./images/home/iocns/listIcon1.png",
"./images/home/iocns/listIcon2.png",
"./images/home/iocns/listIcon3.png",
"./images/home/iocns/listIcon4.png",
"./images/home/num1.png",
"./images/home/num2.png",
"./images/home/num3.png",
"./images/lazy.png",
"./images/public/closeBtn.png",
"./images/public/suerBtn.png"
```
最终导出的结果和我们预期的一致。
