export default [

  
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user/login',
          layout: false,
          name: 'login',
          component: './User/Login',
        },
        {
          path: '/user',
          redirect: '/user/login',
        },
       
      ],
    },

    {
      name: '个人中心',
      path: '/user/profile',
      component: './User/PersonalCenter',
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
          component: './ProductCategory',
        },
        {
          name: '创建商品',
          path: '/product/create',
          component: './Product/Create',
          hideInMenu: true,
        },
        {
          name: '商品管理',
          path: '/product/manager',
          component: './Product/Manager/ProductManagement',
        },
        {
          name: '商品SKU',
          path: '/product/sku',
          component: './Product/Manager/ProductItem',
        },
        {
          name: '编辑SKU',
          path: '/product/sku/edit/:uuid',
          component: './Product/Edit/EditProductItem',
          hideInMenu: true,
        }
      ],
    },
    {
      name: '系统管理',
      path: '/system',
      icon: 'setting',
      routes: [
        {
          name: '用户管理',
          path: '/system/user',
          component: './User/Manager',
        },
        {
          name: '用户授权',
          path: '/system/user/permission/:userId',
          component: './User/BindPermission',
          hideInMenu: true,
        },
        {
          name: '团队管理',
          path: '/system/team',
          component: './Team',
        },
        {
          name: '团队成员管理',
          path: '/system/team/member/:teamId',
          component: './Team/Member',
          hideInMenu: true,
        },
        {
          name: '团队角色',
          path: '/system/team/role/:teamId',
          component: './Team/Role',
          hideInMenu: true,
        },
        {
          name: '菜单管理',
          path: '/system/menu',
          component: './Sys/Menu',
        },
        {
          name: '菜单管理（绑定api）',
          path: '/system/menu/bindapi/:menuId',
          component: './Sys/Menu/BindApi',
          hideInMenu: true,
        },
        {
          name: '登录日志',
          path: '/system/loginlog',
          component: './Sys/LoginLog',
        },
        {
          name: '操作日志',
          path: '/system/oplog',
          component: './Sys/OpLog',
        },
        {
          name: 'API管理',
          path: '/system/api',
          component: './Sys/Api',
        },
        {
          name: '权限管理',
          path: '/system/permission',
          component: './Sys/Permission',
        },
        {
          name: '权限管理(绑定菜单)',
          hideInMenu: true,
          path: '/system/permission/menu/:permissionId',
          component: './Sys/Permission/BindMenu',
        },
        {
          name: '资源管理',
          path: '/system/resource',
          component: './Sys/Resource',
        },
      ],
    },
    {
      component: '404',
      path: '/*',
    },
  ];