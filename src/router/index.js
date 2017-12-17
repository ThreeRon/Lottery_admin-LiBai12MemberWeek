import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Home from '@/views/Home'

import ActiveManage from '@/views/activeManage/index'

import ActiveData from '@/views/activeData/index'
import DataDetail from '@/views/activeData/DataDetail'
import OverviewData from '@/views/activeData/OverviewData'
import UserData from '@/views/activeData/UserData'
import PlayerData from '@/views/activeData/PlayerData'

import ActiveSet from '@/views/activeManage/activeSet'
import ScreenInfoSet from '@/views/activeManage/ScreenInfoSet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/',
      name: '首页',
      component: Home,
      redirect: '/activemanage',
      children: [
        {
          path: 'activemanage',
          component: ActiveManage,
          name: '活动列表'
        },
        {
          path: 'activeset',
          component: ActiveSet,
          name: '活动设置',
          redirect: '/activeset/info',
          children: [
            {
              path: 'info/:id',
              component: ScreenInfoSet,
              name: '活动信息录入'
            }
          ]
        },
        {
          path: 'activedata',
          component: ActiveData,
          name: '活动数据'
        },
        {
          path: 'datadetail',
          component: DataDetail,
          name: '数据详情',
          redirect: '/datadetail/overview',
          children: [
            {
              path: 'overview/:id',
              component: OverviewData,
              name: '数据概览'
            },
            {
              path: 'user/:id',
              component: UserData,
              name: '中奖用户'
            },
            {
              path: 'player/:id',
              component: PlayerData,
              name: '玩家数据'
            }
          ] // end datadetail children
        },
        {
          path: 'activeset',
          component: ActiveSet,
          name: '活动设置',
          redirect: '/activeset',
        }
      ]
    }
  ]
})
