import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import '../styles/global.styl'

// Custom components
Vue.component('navbar', () => import('./Navbar.vue'))
Vue.component('subject-card', () => import('./SubjectCard.vue'))
Vue.component('set-creator-dialog', () => import('./SetCreatorDialog.vue'))
Vue.component('set-decoder-dialog', () => import('./SetDecoderDialog.vue'))
Vue.component('set-encoder-dialog', () => import('./SetEncoderDialog.vue'))
Vue.component('set-manager-dialog', () => import('./SetManagerDialog.vue'))
Vue.component('set-picker-dialog', () => import('./SetPickerDialog.vue'))
Vue.component('grade-picker-dialog', () => import('./GradePickerDialog.vue'))

// Material Design elements
Vue.use(Vuetify)
