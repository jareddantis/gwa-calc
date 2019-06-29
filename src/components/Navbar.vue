<template>
  <div class="navbar" :dark="isDarkMode">
    <router-link to="/" class="tab" v-ripple>
      <v-icon>functions</v-icon>
      <span>Calculator</span>
    </router-link>
    <router-link to="/transmute" class="tab" v-ripple v-show="!isHiddenPshs">
      <v-icon>merge_type</v-icon>
      <span>Transmutation</span>
    </router-link>
    <router-link to="/settings" class="tab" v-ripple>
      <v-icon>settings</v-icon>
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
import { VIcon } from 'vuetify/lib'

@Component({
  components: { VIcon },
  computed: mapState(['isDarkMode', 'isHiddenPshs']),
})
export default class Navbar extends Vue {
  public isDarkMode!: boolean
  public isHiddenPshs!: boolean
}
</script>
