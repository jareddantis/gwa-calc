import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'calc',
      component: () => import(/* webpackChunkName: "calc" */ './Calc.vue'),
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
  scrollBehavior(to: any, from: any, savedPosition: any) {
    return { x: 0, y: 0 }
  },
})
