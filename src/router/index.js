import { createRouter, createWebHistory } from 'vue-router';

import HomeLayout from '../components/home-layout.vue';
import Home from '../views/home.vue';
import Test1 from '../views/test1.vue';
import CanOpen from '../views/canopen.vue';
import ScriptCollections from '../views/script-collections.vue';
import LogAnalysis from '../views/log-analysis.vue';
import Developing from '../components/developing.vue';
import Test2 from '../views/test2.vue';
import { Test } from '../views/test3.jsx';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';

export const routes = setupLayouts(generatedRoutes);
// export const sidebarRoutes = [
//   {
//     path: '/',
//     name: 'canopen',
//     // component: HomeLayout,
//     component: CanOpen,
//     meta: {
//       title: 'CAN 管理',
//     },
//     children: [
//       {
//         path: 'test1',
//         name: 'test1',
//         component: Test1,
//         title: '频道管理',
//       },
//       {
//         path: 'test1',
//         name: 'test1',
//         component: Test1,
//         title: '节点设备管理',
//       },
//     ],
//   },
//   {
//     path: '/log-analysis',
//     name: 'log-analysis',
//     component: LogAnalysis,
//     meta: {
//       title: '日志分析',
//     },
//   },
//   {
//     path: '/script-collections',
//     name: 'script-collections',
//     component: ScriptCollections,
//     meta: {
//       title: '脚本集合',
//     },
//   },
//   {
//     path: '/test1',
//     name: 'test1',
//     component: Test1,
//     meta: {
//       title: '测试1',
//     },
//   },
//   {
//     path: '/test2',
//     name: 'test2',
//     component: Test2,
//     meta: {
//       title: '测试2',
//     },
//   },
//   {
//     path: '/test3',
//     name: 'test3',
//     component: Test,
//     meta: {
//       title: '测试3',
//     },
//   },
//   // {
//   //   path: 'maintenanceTools',
//   //   name: 'maintenanceTools',
//   //   title: '维护人员工具',
//   //   component: MaintenanceTools,
//   // },
//   // {
//   //   path: '/about',
//   //   name: 'about',
//   //   title: '关于',
//   //   component: () => import('../components/about.vue'),
//   // },
// ];

// export const routes = [
//   {
//     path: '/',
//     component: HomeLayout,
//     children: sidebarRoutes,
//     meta: {
//       title: '首页',
//     },
//   },
//   {
//     hidden: true,
//     path: '/:pathMatch(.*)*',
//     name: 'NotFound',
//     redirect: '/',
//     meta: {
//       title: 'abc',
//     },
//   },
// ];

// 公共路由;
export const constantRoutes = [
  {
    path: '/',
    component: HomeLayout,
    // component: () => import('~/views/index.vue'),
    title: '首页',
    children: [
      {
        path: '',
        component: () => import('~/views/index.vue'),
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true },
      },
      {
        path: 'test1',
        name: 'test',
        component: () => import('~/views/test1.vue'),
        title: '频道管理',
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  // routes: constantRoutes,
  routes,
  scrollBehavior: () => {
    return { y: 0 };
  },
});

export default router;
