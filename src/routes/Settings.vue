<template>
  <div class="fragment settings">
    <div class="content">
      <div class="title">
        <span class="headline">Settings</span>
      </div>
      <v-card>
        <v-card-text>
          <span class="overline">Appearance</span>

          <div class="setting">
            <span class="subheading" @click="isDarkMode = !isDarkMode">Enable dark mode</span>
            <v-switch :hide-details="true" color="orange" v-model="isDarkMode"></v-switch>
          </div>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <span class="overline">Data</span>

          <div class="setting">
            <span class="subheading">Manage custom subjects</span>
          </div>

          <div class="setting">
            <span class="subheading text"
                  :class="isDarkMode ? 'pink--text' : 'red--text'">Delete all data and reset</span>
          </div>
        </v-card-text>
      </v-card>
      <v-card class="build-info">
        <v-card-text>
          <span class="overline">about</span>

          <div class="setting">
            <div class="left">
              <span class="subheading">GWA Calc build 15.0-20190701</span>
              <span class="caption">&copy; 2015-2019 Jared Dantis. All rights reserved.</span>
            </div>
            <div class="right">
              <img src="/img/name.svg" alt="Jared Dantis" :class="isDarkMode ? 'invert' : ''">
            </div>
          </div>

          <div class="setting">
            <span class="subheading">Report a bug or send feedback</span>
          </div>
        </v-card-text>
      </v-card>
      <v-card class="donate">
        <v-card-text>
          <span class="overline">donate</span>

          <div class="setting">
            <a href="//paypal.me/jareddantis" target="_blank" rel="noopener" class="text--primary subheading">PayPal</a>
          </div>
          <div class="setting">
            <a href="//ko-fi.com/dantis" target="_blank" rel="noopener" class="text--primary subheading">Ko-fi</a>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<style scoped lang="stylus">
  @import '../styles/routes/Settings'
</style>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class Settings extends Vue {
  get isDarkMode(): boolean {
    return this.$store.getters.isDarkMode
  }
  set isDarkMode(mode: boolean) {
    this.$store.commit('updateDarkMode', mode)
  }
}
</script>

