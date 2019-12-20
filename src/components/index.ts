import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'
import '../styles/global.scss'

// Custom components
Vue.component('nav-drawer', () => import('./Drawer.vue'))
Vue.component('subject-card', () => import('./SubjectCard.vue'))

// Material Design elements
Vue.use(Vuetify)
export default new Vuetify({ directives: { Ripple } })
