<template>
  <v-app :dark="isDarkMode">
    <div id="app">
      <transition name="zoom" mode="out-in"
                  @after-leave="$bus.$emit('router-transition')">
        <keep-alive>
          <router-view :key="$route.fullPath"/>
        </keep-alive>
      </transition>
      <navbar/>
    </div>
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
    transition: all 150ms 300ms $ease-out
  .zoom-leave-active
    transition: all 150ms $ease-in
</style>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Component } from 'vue-property-decorator'
import Navbar from '@/components/Navbar.vue'

@Component({
  components: {
    Navbar,
  },
  computed: mapState(['isDarkMode']),
})
export default class App extends Vue {
  public isDarkMode!: boolean
}
</script>
