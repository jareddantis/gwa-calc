<template>
  <v-app>
    <v-content>
      <transition name="zoom" @after-leave="$bus.$emit('router-transition')">
        <keep-alive>
          <router-view :key="$route.fullPath"/>
        </keep-alive>
      </transition>
    </v-content>

<!--    Navbar -->
    <v-bottom-navigation fixed app :dark="isDarkMode" :background-color="isDarkMode ? '#212121' : '#ffcc80'">
      <v-btn to="/">
        <span>Calculate</span>
        <v-icon>functions</v-icon>
      </v-btn>
      <v-btn to="/transmute" v-show="!isHiddenPshs">
        <span>Transmute</span>
        <v-icon>merge_type</v-icon>
      </v-btn>
      <v-btn to="/settings">
        <span>Settings</span>
        <v-icon>settings</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<style scoped lang="stylus">
  @require './styles/global'

  #app
    width: 100vw
    will-change: background
    transition: background 200ms linear

  .v-bottom-navigation--fixed
    position: fixed !important

  .v-item-group.v-bottom-navigation .v-btn
    height: inherit !important

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
import { mapState } from 'vuex'
import { Component, Watch } from 'vue-property-decorator'

@Component({
  computed: mapState(['isDarkMode', 'isHiddenPshs']),
})
export default class App extends Vue {
  public isDarkMode!: boolean
  public isHiddenPshs!: boolean

  @Watch('isDarkMode', { immediate: true })
  private updateVuetifyTheme(theme: boolean) {
    this.$vuetify.theme.dark = theme
  }
}
</script>
