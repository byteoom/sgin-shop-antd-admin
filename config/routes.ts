export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: './home',
  },
  {
    path: '/user/login',
    layout: false,
    name: 'login',
    component: './user/login',
  },
  {
    name: '个人中心',
    path: '/profile',
    component: './user/user-center',
    hideInMenu: true,
    icon: 'user',
  },
  {
    name: '商品管理',
    path: '/product',
    icon: 'shopping',
    routes: [
      {
        name: '商品分类',
        path: '/product/category',
        component: './product/category',
      },
      {
        name: '创建商品',
        path: '/product/create',
        component: './product/create',
        // hideInMenu: true,
      },
      {
        name: '商品列表',
        path: '/product/list',
        component: './product/list',
      },
      {
        name: '商品sku',
        path: '/product/sku',
        component: './product/sku',
      },
      {
        name: '编辑sku',
        path: '/product/sku/edit/:uuid',
        component: './product/sku/edit',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '订单管理',
    path: '/order',
    icon: 'shopping',
    routes: [
      {
        name: '订单列表',
        path: '/order/list',
        component: './order/list/index',
      },
    ],
  },
  {
    name: '页面管理',
    path: '/page',
    icon: 'file',
    routes: [
      {
        name: '页面列表',
        path: '/page/list',
        component: './page/list/index',
      },
    ],
  },
  {
    name: '系统管理',
    path: '/system',
    icon: 'setting',
    routes: [
      {
        name: '支付管理',
        path: '/system/pay',
        routes: [
          {
            name: '支付方式管理',
            path: '/system/pay/index',
            component: './system/paypal/index',
          },
          {
            name: 'paypal配置',
            path: '/system/pay/edit',
            component: './system/paypal/edit',
            hideInMenu: true,
          },
          {
            name: '支付宝配置',
            path: '/system/pay/alipay/edit',
            component: './system/alipay/edit',
            hideInMenu: true,
          },
          {
            name: 'paypal支付测试',
            path: '/system/pay/paypal-test',
            component: './system/paypal/test-pay',
          },
        ],
      },
      {
        name: '日志管理',
        path: '/system/log',
        routes: [
          {
            name: '登录日志',
            path: '/system/log/login',
            component: './system/log/login',
          },
          {
            name: '操作日志',
            path: '/system/log/operation',
            component: './system/log/operation',
          },
        ],
      },
      {
        name: '系统配置',
        path: '/system/config',
        routes: [
          {
            name: '站点配置',
            path: '/system/config/site',
            component: './system/config/site',
          },
          {
            name: '邮件配置',
            path: '/system/config/email',
            component: './system/config/email',
          },
          {
            name: '货币配置',
            path: '/system/config/currency',
            component: './system/config/currency',
          },
        ],
      },
      {
        name: '用户管理',
        path: '/system/user',
        component: './user/manager',
      },
      {
        name: '用户授权',
        path: '/system/user/permission/:userid',
        component: './user/bind-permission',
        hideInMenu: true,
      },
      {
        name: '团队管理',
        path: '/system/team',
        component: './team/index',
      },
      {
        name: '团队成员管理',
        path: '/system/team/member/:teamid',
        component: './team/member',
        hideInMenu: true,
      },
      {
        name: '团队角色',
        path: '/system/team/role/:teamid',
        component: './team/role',
        hideInMenu: true,
      },
      {
        name: '菜单管理',
        path: '/system/menu',
        component: './system/menu',
      },
      {
        name: '菜单管理（绑定api）',
        path: '/system/menu/bindapi/:menuid',
        component: './system/menu/bind-api',
        hideInMenu: true,
      },

      {
        name: 'api管理',
        path: '/system/api',
        component: './system/api',
      },
      {
        name: '权限管理',
        path: '/system/permission',
        component: './system/permission',
      },
      {
        name: '权限管理(绑定菜单)',
        hideInMenu: true,
        path: '/system/permission/menu/:permissionid',
        component: './system/permission/bind-menu',
      },
      {
        name: '资源管理',
        path: '/system/resource',
        component: './system/resource',
      },
    ],
  },
  {
    component: '404',
    path: '/*',
  },
];
