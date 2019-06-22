import Vue from 'vue'
import Router from 'vue-router'
import Calc from './Calc.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'calc',
      component: Calc,
    },
    {
      path: '/transmute',
      name: 'transmute',
      component: () => import(/* webpackChunkName: "transmute" */ './Transmute.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import(/* webpackChunkName: "settings" */ './Settings.vue'),
    },
  ],
})
