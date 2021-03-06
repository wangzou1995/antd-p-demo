import {IConfig, IPlugin} from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/
import slash from 'slash2';
import themePluginConfig from './themePluginConfig';

const {pwa} = defaultSettings;

// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
const {ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION} = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';

const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
          workboxPluginMode: 'InjectManifest',
          workboxOptions: {
            importWorkboxFrom: 'local',
          },
        }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        }
      ],
    },
    {
      path: '/oauth',
      component: '../layouts/OauthLayout',
      routes: [
        {
          path: '/oauth/login',
          component: './oauth/login',
          name: 'oauthLogin',
          query: {
            systemName: "",
            callback_url: ""
          }
        },
        {
          path: '/oauth/register',
          component: './oauth/register',
          name: 'register',
        },
        {
          path: '/oauth/reset',
          component: './oauth/reset',
          name: 'reset',
        }
      ],
    },
    {
      path: '/users',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/users/register',
          component: './users/register',
          name: 'register',
        },
        {
          path: '/users/reset',
          component: './users/reset',
          name: 'reset',
        }
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './BaseWelcome',
            },
            {
              path: '/merchant',
              name: 'merchant',
              icon: 'usergroup-add',
              component: './merchant',
            },
            {
              path: '/app',
              name: 'app',
              icon: 'appstore',
              component: './app',
            },
            {
              path: '/subscribe',
              name: 'subscribe',
              icon: 'pull-request',
              component: './subscribe',
            },
            {
              path: '/market',
              name: 'market',
              icon: 'shopping-cart',
              component: './market',
            },
            {
              path: '/order',
              name: 'order',
              icon: 'transaction',
              component: './order',
            },
            {
              path: '/approval',
              name: 'approval',
              icon: 'file-protect',
              component: './approval',
            },
            {
              path: '/users',
              routes: [
                {
                  path: '/users/info',
                  name: 'info',
                  component: './users/info',
                },
                {
                  path: '/users/password',
                  component: './users/password',
                }
              ]
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    }
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  // chainWebpack: webpackPlugin,
  // proxy: {
  //   '/server/api/': {
  //     target: 'https://preview.pro.ant.design/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/server': '' },
  //   },
  // },
  proxy: {
    '/merchant/': {  //匹配所有以/api/为开头的接口
      target: 'http://56.56.59.15:6660/', //后端服务器地址
      changeOrigin: true,
      pathRewrite: {'^/merchant/': ''},  //因为我们项目的接口前面并没有api 所以直接去掉
    },
  },
} as IConfig;
