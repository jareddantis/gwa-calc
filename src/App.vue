<template>
  <v-app :dark="isDarkMode">
    <div id="app">
      <transition name="zoom" @after-leave="scrollToTop">
        <keep-alive>
          <router-view :key="$route.fullPath"/>
        </keep-alive>
      </transition>
      <navbar/>
    </div>

<!--    Dialogs -->
    <grade-picker-dialog/>
    <set-manager-dialog/>
    <set-picker-dialog/>
    <set-creator-dialog/>
  </v-app>
</template>

<style scoped lang="stylus">
  @require './styles/global'

  #app
    width: 100vw

  // Router view transition
  .zoom-enter-to, .zoom-leave
    transform: scale(1.0)
    opacity: 1
  .zoom-enter, .zoom-leave-to
    transform: scale(0.95)
    opacity: 0
  .zoom-enter
    transform: translateY(30px)
  .zoom-enter-active, .zoom-leave-active
    will-change: transform, opacity
  .zoom-enter-active
    transition: all 100ms 200ms $ease-out
  .zoom-leave-active
    transition: all 100ms $ease-in
</style>

<script lang="ts">
import Vue from 'vue'
import { VApp } from 'vuetify/lib'
import { mapState } from 'vuex'
import { Component } from 'vue-property-decorator'
import GradePickerDialog from '@/components/GradePickerDialog.vue'
import Navbar from '@/components/Navbar.vue'
import SetCreatorDialog from '@/components/SetCreatorDialog.vue'
import SetManagerDialog from '@/components/SetManagerDialog.vue'
import SetPickerDialog from '@/components/SetPickerDialog.vue'

@Component({
  components: {
    GradePickerDialog, Navbar, SetCreatorDialog, SetPickerDialog,
    SetManagerDialog, VApp },
  computed: mapState(['isDarkMode']),
})
export default class App extends Vue {
  public isDarkMode!: boolean

  public scrollToTop() {
    window.scrollTo(0, 0)
  }
}
</script>
