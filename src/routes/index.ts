import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'calc',
      component: () => import(/* webpackChunkName: "calc" */ './Calc.vue'),
    },
  ],
})

const waitForStorageToBeReady = async (to: any, from: any, next: any) => {
  // @ts-ignore
  await store.restored
  next()
}
router.beforeEach(waitForStorageToBeReady)

export default router
