module.exports = {
  title: "",
  description: "",
  dest: "docs",
  base: "/",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  theme: "reco", // 使用reco主题
  themeConfig: {
    nav: [
      {
        text: "Home",
        link: "/",
        icon: "reco-home",
      },
      {
        text: "java编程",
        icon: "reco-message",
        items: [
          {
            text: "vuepress-reco",
            link: "/docs/theme-reco/",
          },
          {
            text: "idea",
            link: "/docs/IDEA/idea_tip.md",
          },
          {
            text: "设计模式",
            link: "/docs/DesignPatterns/",
          },
        ],
      },
      {
        text: "TimeLine",
        link: "/timeline/",
        icon: "reco-date",
      },
      {
        text: "Contact",
        icon: "reco-message",
        items: [
          {
            text: "GitHub",
            link: "https://github.com/recoluan",
            icon: "reco-github",
          },
        ],
      },
    ],
    sidebar: {
      "/docs/theme-reco/": ["", "theme", "plugin", "api"],
      "/docs/DesignPatterns/": [
        {
          title: "设计模式",
          sidebarDepth: 2,
          children: [
            {
              title: "七大设计原则",
              path: "/docs/DesignPatterns/seven_principle.md",
            },
            {
              title: "创建型-单例设计模式",
              path: "/docs/DesignPatterns/create_singlton.md",
            },
            {
              title: "创建型-原型设计模式",
              path: "/docs/DesignPatterns/create_Prototype.md",
            },
            {
              title: "结构型-代理设计模式",
              path: "/docs/DesignPatterns/structure_proxy.md",
            },
          ],
        },
      ],
    },
    type: "blog",
    blogConfig: {
      category: {
        location: 2,
        text: "Category",
      },
      tag: {
        location: 3,
        text: "Tag",
      },
    },
    friendLink: [
      {
        title: "午后南杂",
        desc: "Enjoy when you can, and endure when you must.",
        email: "1156743527@qq.com",
        link: "https://www.recoluan.com",
      },
      // {
      //   title: "vuepress-theme-reco",
      //   desc: "A simple and beautiful vuepress Blog & Doc theme.",
      //   avatar:
      //     "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
      //   link: "https://vuepress-theme-reco.recoluan.com",
      // },
    ],
    logo: "/logo.png",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    author: "",
    authorAvatar: "/avatar.png",
    record: "xxxx",
    startYear: "2022",
  },
  markdown: {
    lineNumbers: true,
  },
};
