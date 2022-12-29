// Basic routing without permission

import { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '../constant'

/** 基础路由 */
export const basicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    component: LAYOUT,
    redirect: '/home',
    meta: {
      title: 'Root'
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'tool',
        name: 'Tool',
        component: () => import('@/views/tools/index.vue'),
        redirect: '/tool/removalWatermark',
        children: [
          {
            path: 'removalWatermark',
            name: 'RemovalWatermark',
            component: () => import('@/views/tools/removalWatermark.vue')
          }
        ]
      }
    ]
  }
]
