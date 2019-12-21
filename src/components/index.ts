import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'
import '../styles/global.scss'

// Custom components
Vue.component('grade-picker-dialog', () => import(/* webpackChunkName: "dialogs" */ './GradePickerDialog.vue'))
Vue.component('subject-card', () => import(/* webpackChunkName: "subject-card" */ './SubjectCard.vue'))

// Material Design elements
Vue.use(Vuetify)
export default new Vuetify({ directives: { Ripple } })
