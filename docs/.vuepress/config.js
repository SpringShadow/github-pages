module.exports = {
  title: '逝者如斯',
  base: "/github-pages/",
  description: '子在川上曰：“逝者如斯夫，不舍昼夜。”',
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  locales: {
      "/": {
          "lang": "zh-CN"
      }
  },
  plugins: [
      [
          "@vuepress/back-to-top",
          true
      ],
      [
          "@vuepress/medium-zoom",
          true
      ]
  ],
  themeConfig: {
    sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
    theme:'foo',
    nav: [
      { text: '首页', link: '/home/' },
      {
        text: '文章',
        items: [
          { text: 'html', link: '/html/' },
          { text: 'css', link: '/css/' },
          { text: 'js', link: '/js/' },
          { text: 'webpack', link: '/webpack/' },
          { text: 'vue', link: '/vue/' },
          { text: 'node', link: '/node/' },
          { text: 'utils', link: '/utils/' },
        ]
      },
      { text: '常用库', link: '/library/' },
      { text: '随笔', link: '/life/' },
      { text: '摘抄', link: '/excerpt/' },
    ],
    sidebar:{
       // docs文件夹下面的accumulate文 件夹 文档中md文件 书写的位置(命名随意)
        '/home/':[
          "",
        ],
        '/html/':[
          "",
        ],
        '/css/':[
          "",
        ],
        '/js/':[
          "",
          "preload"
        ],
        '/webpack/':[
          "",
        ],
        '/vue/':[
          "",
        ],
        '/node/':[
          "",
        ],
        '/utils/':[
          "",
        ],
        '/library/':[
          "",
        ],
        '/life/':[
          "",
        ],
        '/excerpt/':[
          "",
        ],
     }
  },
};
