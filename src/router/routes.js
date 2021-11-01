import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/admin',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: '/admin/index',
        name: 'index',
        meta: {
          title: '首页',
          auth: true
        },
        component: _import('system/index')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 个人中心
      {
        path: '/admin/profile',
        name: 'Profile',
        meta: {
          title: '个人中心',
          auth: true
        },
        component: _import('system/user/profile/index.vue')
      },
      // 期刊管理页
      {
        path: '/journal/list',
        name: 'JournalList',
        hidden: true,
        meta: {
          title: '期刊列表',
          auth: true
        },
        component: _import('system/journalClass/journal/index.vue')
      },
      {
        path: '/journal/article',
        name: 'JournalArticle',
        hidden: true,
        meta: {
          title: '期刊文献列表',
          auth: true
        },
        component: _import('system/journalClass/article/index.vue')
      }
    ]
  }
]

/**
 * 在主框架之外显示(前台页面路由)
 */
const frameOut = [
  // 登录
  {
    path: '/admin/login',
    name: 'AdminLogin',
    meta: {
      auth: false
    },
    component: _import('system/login/page.vue')
  },
  // 404
  {
    path: '/404',
    name: '404',
    meta: {
      auth: false
    },
    component: _import('system/error/404')
  },
  // 刷新页面 必须保留
  {
    path: '/refresh',
    name: 'refresh',
    meta: {
      auth: false
    },
    component: _import('system/function/refresh')
  },
  // 页面重定向 必须保留
  {
    path: '/redirect/:route*',
    name: 'redirect',
    meta: {
      auth: false
    },
    component: _import('system/function/redirect')
  },
  // 前台页面开始
  {
    path: '/',
    redirect: { name: 'Home' }
  },
  {
    path: '/home/index',
    name: 'Home',
    meta: {
      auth: true,
      front: true
    },
    component: _import('front/pages/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      auth: false,
      front: true,
      single: true
    },
    component: _import('front/pages/user/login.vue')
  },
  {
    path: '/userCenter',
    name: 'UserCenter',
    meta: {
      auth: false,
      front: true,
      single: false
    },
    component: _import('front/pages/user/center/index.vue')
  },
  {
    path: '/userCenter/editPassword',
    name: 'EditPassword',
    meta: {
      auth: false,
      front: true,
      single: false
    },
    component: _import('front/pages/user/center/editPassword.vue')
  },
  {
    path: '/userCenter/passwordIssue',
    name: 'PasswordIssue',
    meta: {
      auth: false,
      front: true,
      single: false
    },
    component: _import('front/pages/user/center/passwordIssue.vue')
  },
  {
    path: '/userCenter/modifyPersonalData',
    name: 'ModifyPersonalData',
    meta: {
      auth: false,
      front: true,
      single: false
    },
    component: _import('front/pages/user/center/modifyPersonalData.vue')
  },
  {
    path: '/userCenter/digital',
    name: 'Digital',
    meta: {
      auth: false,
      front: true,
      single: false
    },
    component: _import('front/pages/user/center/digital.vue')
  },
  {
    path: '/userCenter/collection',
    name: 'Collection',
    meta: {
      auth: false,
      front: true,
      single: false
    },
    component: _import('front/pages/user/center/collection.vue')
  },
  {
    path: '/userCenter/sharedResource',
    name: 'SharedResource',
    meta: {
      auth: false,
      front: true,
      single: false
    },
    component: _import('front/pages/user/center/sharedResource.vue')
  },
  //云书包
  {
    path: '/userCenter/cloudSatchel',
    name: 'CloudSatchel',
    meta: {
      auth: false,
      front: true,
      single: false
    },
    component: _import('front/pages/user/center/netBag/index.vue')
  },
  //个人网盘
  {
    path: '/userCenter/networkDrive',
    name: 'UserDisk',
    meta: {
      auth: false,
      front: true,
      single: false
    },
    component: _import('front/pages/user/center/networkDrive/index.vue')
  },
  //资源共享列表
  {
    path: '/share/index',
    name: 'ShareList',
    meta: {
      auth: false,
      front: true,
      single: false
    },
    component: _import('front/pages/share/index.vue')
  },
  {
    path: '/share/detail',
    name: 'ShareDetail',
    meta: {
      auth: false,
      front: true,
      single: false
    },
    component: _import('front/pages/share/detail/index.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      auth: false,
      front: true,
      single: true
    },
    component: _import('front/pages/user/register.vue')
  },
  {
    path: '/resetPassword',
    name: 'ResetPassword',
    meta: {
      auth: false,
      front: true,
      single: true
    },
    component: _import('front/pages/user/resetPassword.vue')
  },
  {
    path: '/search/index',
    name: 'SearchIndex',
    meta: {
      auth: true,
      front: true
    },
    component: _import('front/pages/search/index.vue')
  },
  {
    path: '/search/analyze',
    name: 'SearchAnalyze',
    meta: {
      auth: true,
      front: true
    },
    component: _import('front/pages/search/analyze/index.vue')
  },
  {
    path: '/article/detail',
    name: 'ArticleDetail',
    meta: {
      auth: true,
      front: true
    },
    component: _import('front/pages/search/detail/index.vue')
  },
  {
    path: '/question',
    name: 'Question',
    meta: {
      auth: true,
      front: true
    },
    component: _import('front/pages/service/question.vue')
  },
  {
    path: '/overview',
    name: 'Overview',
    meta: {
      auth: true,
      front: true
    },
    component: _import('front/pages/overview/index.vue')
  },
  {
    path: '/softwareDownload',
    name: 'SoftwareDownload',
    meta: {
      auth: true,
      front: true
    },
    component: _import('front/pages/service/softwareDownload.vue')
  },
  {
    path: '/thematic',
    name: 'Thematic',
    meta: {
      auth: true,
      front: true
    },
    component: _import('front/pages/resources/thematic.vue')
  },
  {
    path: '/thematicDetail',
    name: 'ThematicDetail',
    meta: {
      auth: true,
      front: true
    },
    component: _import('front/pages/resources/thematicDetail.vue')
  },
  {
    path: '/bigData/utilize',
    name: 'Utilize',
    meta: {
      auth: true,
      front: true
    },
    component: _import('front/pages/bigData/utilize.vue')
  },
  {
    path: '/html/学院首页',
    name: 'html',
    meta: {
      auth: false,
      front: true,
      single: true
    },
    component: _import('html/学院首页.vue')
  },
  {
    path: '/html/详细页',
    name: 'html',
    meta: {
      auth: false,
      front: true
    },
    component: _import('html/详细页.vue')
  },
  {
    path: '/html/栏目页',
    name: 'html',
    meta: {
      auth: false,
      front: true
    },
    component: _import('html/栏目页.vue')
  },
  {
    path: '/html/软件下载',
    name: 'html',
    meta: {
      auth: false,
      front: true
    },
    component: _import('html/软件下载.vue')
  },
  {
    path: '/html/常见问题',
    name: 'html',
    meta: {
      auth: false,
      front: true
    },
    component: _import('html/常见问题.vue')
  },
  {
    path: '/html/问卷调查',
    name: 'html',
    meta: {
      auth: false,
      front: true
    },
    component: _import('html/问卷调查.vue')
  },
  {
    path: '/html/馆内资源',
    name: 'html',
    meta: {
      auth: false,
      front: true
    },
    component: _import('html/馆内资源.vue')
  },
  {
    path: '/html/军网资源',
    name: 'html',
    meta: {
      auth: false,
      front: true
    },
    component: _import('html/军网资源.vue')
  },
  {
    path: '/html/互联网资源',
    name: 'html',
    meta: {
      auth: false,
      front: true
    },
    component: _import('html/互联网资源.vue')
  },
  {
    path: '/html/热点专题',
    name: 'html',
    meta: {
      auth: false,
      front: true
    },
    component: _import('html/热点专题.vue')
  },
  {
    path: '/html/视频资源',
    name: 'html',
    meta: {
      auth: false,
      front: true
    },
    component: _import('html/视频资源.vue')
  },
  {
    path: '/html/大数据-读者',
    name: 'html',
    meta: {
      auth: false,
      front: true
    },
    component: _import('html/大数据-读者.vue')
  },
  {
    path: '/html/大数据-资源',
    name: 'html',
    meta: {
      auth: false,
      front: true
    },
    component: _import('html/大数据-资源.vue')
  },
  {
    path: '/html/大数据-利用',
    name: 'html',
    meta: {
      auth: false,
      front: true
    },
    component: _import('html/大数据-利用.vue')
  },
  {
    path: '/html/登录页',
    name: 'html',
    meta: {
      auth: false,
      front: true,
      single: true
    },
    component: _import('html/登录页.vue')
  },
  {
    path: '/html/忘记密码',
    name: 'html',
    meta: {
      auth: false,
      front: true,
      single: true
    },
    component: _import('html/忘记密码.vue')
  },
  {
    path: '/html/个人中心',
    name: 'html',
    meta: {
      auth: false,
      front: true
    },
    component: _import('html/个人中心.vue')
  },
  {
    path: '/html/专家图书馆',
    name: 'html',
    meta: {
      auth: false,
      front: true
    },
    component: _import('html/专家图书馆.vue')
  },
  {
    path: '/html/专家详细',
    name: 'html',
    meta: {
      auth: false,
      front: true
    },
    component: _import('html/专家详细.vue')
  }
]

// /**
//  * 错误页面
//  */
// const errorPage = [
//   {
//     path: '*',
//     name: '404',
//     component: _import('system/error/404')
//   }
// ]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export const commonRouter = [
  ...frameIn,
  ...frameOut
  // ...errorPage
]
