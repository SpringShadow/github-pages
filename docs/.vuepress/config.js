module.exports = {
    title: '逝者如斯',
    base: "/github-pages/",
    description: '子在川上曰：“逝者如斯夫，不舍昼夜。”',
    head: [
        ['link', {
            rel: 'icon',
            href: '/favicon.ico'
        }]
    ],
    // dest:"public",
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
        nav: [{
                text: '首页',
                link: '/home/'
            },
            {
                text: '文章',
                items: [
                    // { text: 'html', link: '/article/html/' },
                    // { text: 'css', link: '/article/css/' },
                    {
                        text: 'javascript',
                        link: '/article/javascript/'
                    },
                    // { text: 'es6', link: '/article/es6/' },
                    {
                        text: 'webpack',
                        link: '/article/webpack/'
                    },
                    // { text: 'vue', link: '/article/vue/' },
                    // { text: 'node', link: '/article/node/' },
                    // { text: 'utils', link: '/article/utils/' },
                    {
                        text: '性能优化',
                        link: '/article/optimize/'
                    },
                ]
            },
            // {
            //     text: '常用库',
            //     link: '/library/'
            // },
            // {
            //     text: '随笔',
            //     link: '/life/'
            // },
            // {
            //     text: '摘抄',
            //     link: '/excerpt/'
            // },
        ],
        // sidebar: {
        //     // docs文件夹下面的accumulate文 件夹 文档中md文件 书写的位置(命名随意)
        //     '/home/': [
        //         "",
        //     ],
        //     '/article/html/': [
        //         "",
        //     ],
        //     '/article/css/': [
        //         "",
        //     ],
        //     '/article/javascript/': [
        //         "",
        //         // "codeStandards",
        //         "preload",
        //         "arr",
        //         // "reg",
        //     ],
        //     '/article/es6/': [
        //         "",
        //         "compile",
        //         "difference",
        //         "promise",
        //         "other"
        //     ],
        //     '/article/webpack/': [
        //         "",
        //         "webpack",
        //     ],
        //     '/article/vue/': [
        //         "",
        //         "vue-loader",
        //         "components",
        //         "server",
        //         "vueRouter",
        //         "vuex"
        //     ],
        //     '/article/node/': [
        //         "",
        //     ],
        //     '/article/utils/': [
        //         "",
        //     ],
        //     '/article/optimize/': [
        //         "",
        //     ],
        //     '/library/': [
        //         "",
        //     ],
        //     '/life/': [
        //         "",
        //         "ride",
        //         "choose",
        //         "status"
        //     ],
        //     '/excerpt/': [
        //         "",
        //     ],
        //     '/markdown/': [
        //         "",
        //     ],
        // },
        // sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        lastUpdated: '最后更新于', // 文档更新时间：每个文件git最后提交的时间
        search: true,
        sidebarDepth: 2,
        searchMaxSuggestions: 10,
        docsRepo: "SpringShadow/github-pages",
        docsDir: "docs",
        docsBranch: "master",
        editLinks: true,
        editLinkText: "在 GitHub 上编辑此页"
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@alias': '/images'
            }
        }
    }
};
