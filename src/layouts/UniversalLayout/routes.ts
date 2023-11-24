/**
 * UniversalLayout 路由配置 入口
 * 
 */

import { lazy } from 'react';
import { IRouter } from '@/@types/router.d';

const universalLayoutRotes: IRouter[] = [
  // {
  //   path: '/home',
  //   meta: {
  //     icon: 'home',
  //     title: '首页',
  //   },
  //   redirect: '/home/workplace',
  //   children: [
  //     {
  //       path: 'workplace',
  //       meta: {
  //         icon: 'control',
  //         title: '工作台',
  //       },
  //       component: lazy(() => import('@/pages/home')),
  //     },
  //   ],
  // },
  {
    path: '/article',
    redirect: '/article/list',
    meta: {
      icon: 'page',
      title: '文章管理',
    },
    children: [
      {
        path: 'list',
        redirect: '/pages/article',
        meta: {
          icon: 'list',
          title: '文章列表',
        },
        component: lazy(() => import('@/pages/article')),
      },
      {
        path: 'add',
        redirect: '/pages/article',
        meta: {
          icon: 'list',
          title: '添加文章',
          hidden: true
        },
        component: lazy(() => import('@/pages/article/add')),
      },
      {
        path: 'list',
        redirect: '/pages/list/basic',
        meta: {
          icon: 'list',
          title: '列表页面',
          hidden: true
        },
        children: [
          {
            path: 'table',
            meta: {
              title: '文章列表',
            },
            component: lazy(() => import('@/pages/pagesample/list/table')),
          },
          {
            path: 'search',
            redirect: '/pages/list/search/table',
            meta: {
              title: '搜索列表',
            },
            children: [
              {
                path: 'table',
                meta: {
                  title: '搜索表格',
                },
                component: lazy(() => import('@/pages/pagesample/list/search/table')),
              },
            ],
          },
        ],
      },
      {
        path: 'form',
        redirect: '/pages/form/basic',
        meta: {
          icon: 'edit',
          title: '表单页面',
          hidden: true
        },
        children: [
          {
            path: 'basic',
            meta: {
              title: '基础表单',
            },
            component: lazy(() => import('@/pages/pagesample/form/basic')),
          },
          {
            path: 'complex',
            meta: {
              title: '高级表单',
            },
            component: lazy(() => import('@/pages/pagesample/form/complex')),
          },
        ],
      },
      {
        path: 'detail',
        meta: {
          icon: 'detail',
          title: '详情页',
          hidden: true
        },
        children: [
          {
            path: 'basic',
            meta: {
              title: '基础详情',
              tabNavType: 'querypath',
            },
            component: lazy(() => import('@/pages/pagesample/detail/basic')),
          },
          {
            path: 'module',
            meta: {
              title: 'universal-layout.menu.pages.detail.module',
              tabNavType: 'querypath',
            },
            component: lazy(() => import('@/pages/pagesample/detail/module')),
          },
          {
            path: 'table',
            meta: {
              title: 'universal-layout.menu.pages.detail.table',
              tabNavType: 'querypath',
            },
            component: lazy(() => import('@/pages/pagesample/detail/table')),
          },
        ],
      },
    ],
  },
  {
    path: '/product',
    redirect: '/pages/product',
    meta: {
      icon: 'page',
      title: '产品管理',
    },
    children: [
      {
        path: 'list',
        redirect: '/pages/product',
        meta: {
          icon: 'list',
          title: '产品列表',
        },
        component: lazy(() => import('@/pages/product')),
      }
    ],
  },
  {
    path: '/roles',
    redirect: '/roles/user',
    meta: {
      icon: 'permissions',
      title: '角色管理',
    },
    children: [
      {
        path: 'user',
        meta: {
          icon: 'detail',
          title: '用户列表',
          roles: ['ADMIN'],
        },
        component: lazy(() => import('@/pages/roles/user')),
      },
      {
        path: 'list',
        meta: {
          icon: 'detail',
          title: '所有用户可查看',
        },
        component: lazy(() => import('@/pages/roles/list')),
      },
      {
        path: 'test',
        meta: {
          icon: 'detail',
          title: 'universal-layout.menu.roles.test',
          roles: ['test'],
        },
        component: lazy(() => import('@/pages/roles/test')),
      },
      {
        path: 'update',
        meta: {
          title: '修改个人信息',
          hidden: true
        },
        component: lazy(() => import('@/pages/roles/update')),
      },
    ],
  },
];

export default universalLayoutRotes;
