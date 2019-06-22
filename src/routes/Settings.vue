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
            <span class="name subheading" @click="isDarkMode = !isDarkMode">Enable dark mode</span>
            <v-switch :hide-details="true" color="orange" v-model="isDarkMode"></v-switch>
          </div>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <span class="overline">Data</span>

          <div class="setting">
            <span class="name subheading">Manage custom subjects</span>
          </div>

          <div class="setting">
            <span class="name subheading red--text">Delete all data and reset</span>
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
            <span class="name subheading">Report a bug or send feedback</span>
          </div>

          <v-divider></v-divider>

          <div class="bottom">
            <v-btn flat>paypal</v-btn>
            <v-btn flat>ko-fi</v-btn>
            <v-btn flat>bitcoin</v-btn>
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

