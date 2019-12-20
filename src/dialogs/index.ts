import Vue from 'vue'

// Dialogs
Vue.component('donate-dialog', () => import('./DonateDialog.vue'))
Vue.component('grade-picker-dialog', () => import('./GradePickerDialog.vue'))
Vue.component('set-creator-dialog', () => import('./SetCreatorDialog.vue'))
Vue.component('set-decoder-dialog', () => import('./SetDecoderDialog.vue'))
Vue.component('set-encoder-dialog', () => import('./SetEncoderDialog.vue'))
Vue.component('set-manager-dialog', () => import('./SetManagerDialog.vue'))
Vue.component('transmute-dialog', () => import('./TransmuteDialog.vue'))
