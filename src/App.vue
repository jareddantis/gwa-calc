<template>
  <v-app>
    <v-content>
      <router-view :key="$route.fullPath"/>
    </v-content>
  </v-app>
</template>

<style lang="scss" scoped>
@import './styles/global';

#app {
  width: 100vw;
  will-change: background;
  transition: background 200ms linear;
}
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
