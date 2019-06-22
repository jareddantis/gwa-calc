import Vue from 'vue'
import Vuetify from 'vuetify'
import '../styles/global.styl'
import 'vuetify/src/stylus/app.styl'

// Custom components
Vue.component('navbar', () => import('./Navbar.vue'))
Vue.component('subject-card', () => import('./SubjectCard.vue'))
Vue.component('set-picker-dialog', () => import('./SetPickerDialog.vue'))
Vue.component('grade-picker-dialog', () => import('./GradePickerDialog.vue'))

// Material Design elements
Vue.use(Vuetify)
