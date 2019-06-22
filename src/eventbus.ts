import _Vue from 'vue'

export default function eventBusPlugin(Vue: typeof _Vue): void {
  Vue.prototype.$bus = new _Vue()
}
