<template>
  <v-bottom-navigation class="navbar" fixed :dark="isDarkMode"
                       :background-color="isDarkMode ? '#212121' : '#ffcc80'">
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
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Component } from 'vue-property-decorator'

@Component({
  computed: mapState(['isDarkMode', 'isHiddenPshs']),
})
export default class Navbar extends Vue {
  public isDarkMode!: boolean
  public isHiddenPshs!: boolean
}
</script>
