<template>
  <div class="navbar" :dark="isDarkMode">
    <router-link to="/" class="tab">
      <i class="material-icons">functions</i>
      <span>Calculator</span>
    </router-link>
    <router-link to="/transmute" class="tab">
      <i class="material-icons">merge_type</i>
      <span>Transmutation</span>
    </router-link>
    <router-link to="/settings" class="tab">
      <i class="material-icons">settings</i>
      <span>Settings</span>
    </router-link>
  </div>
</template>

<style scoped lang="stylus">
  @import '../styles/components/Navbar'
</style>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Component } from 'vue-property-decorator'

@Component({
  computed: mapState(['isDarkMode']),
})
export default class Navbar extends Vue {
  public isDarkMode!: boolean
}
</script>
