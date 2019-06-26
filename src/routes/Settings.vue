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

          <div class="setting" @click="$bus.$emit('show-set-manager-dialog')">
            <span class="subheading">Manage custom subject sets</span>
          </div>

          <div class="setting" @click="showClearDialog = true">
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
              <span class="subheading">GWA Calc build 20190701</span>
              <span class="caption">&copy; 2019 Jared Dantis. All rights reserved.</span>
            </div>
            <div class="right">
              <img :src="require('../assets/jared-dantis.svg')"
                   alt="Jared Dantis" :class="isDarkMode ? 'invert' : ''">
            </div>
          </div>

          <div class="setting">
            <a href="http://server.jared.gq/feedback/?subject=GWACalc-Vue"
               target="_blank" rel="noopener"
               class="text--primary subheading">Report a bug or send feedback</a>
          </div>
        </v-card-text>
      </v-card>
      <v-card class="donate">
        <v-card-text>
          <span class="overline">donate</span>

          <div class="setting">
            <a href="//paypal.me/jareddantis"
               target="_blank" rel="noopener"
               class="text--primary subheading">PayPal</a>
          </div>
          <div class="setting">
            <a href="//ko-fi.com/dantis"
               target="_blank" rel="noopener"
               class="text--primary subheading">Ko-fi</a>
          </div>
        </v-card-text>
      </v-card>
    </div>

<!--    Custom subject set manager -->
    <set-manager-dialog/>

<!--    Clear data -->
    <v-snackbar v-model="clearedData" color="success"
                :top="true" :timeout="3000">Deleted all data</v-snackbar>
    <v-dialog class="clear-dialog" v-model="showClearDialog">
      <v-card>
        <v-card-title>
          <span class="title">Delete all data</span>
        </v-card-title>

        <v-card-text>
          <p class="body-1 red--text">This process is irreversible. Continue?</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="showClearDialog = false">Cancel</v-btn>
          <v-btn flat @click="clearAllData">Clear</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped lang="stylus">
  @import '../styles/routes/Settings'
</style>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VDialog,
  VSnackbar, VSpacer, VSwitch } from 'vuetify/lib'

@Component({
  components: {
    VBtn, VCard, VCardActions, VCardText, VCardTitle, VDialog,
    VSnackbar, VSpacer, VSwitch,
  },
})
export default class Settings extends Vue {
  public showClearDialog: boolean = false
  public clearedData: boolean = false

  public clearAllData() {
    this.showClearDialog = false
    this.$store.dispatch('clearAllData').then(() => {
      // Show confirmation snackbar
      this.clearedData = true
    })
  }

  get isDarkMode(): boolean {
    return this.$store.getters.isDarkMode
  }
  set isDarkMode(mode: boolean) {
    this.$store.commit('updateDarkMode', mode)
  }
}
</script>

