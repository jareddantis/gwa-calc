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

          <div class="setting">
            <span class="subheading" @click="hiddenPshs = !hiddenPshs">Hide PSHS-specific features</span>
            <v-switch :hide-details="true" color="orange" v-model="hiddenPshs"></v-switch>
          </div>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <span class="overline">Custom subjects</span>

          <div class="setting" @click="$bus.$emit('show-set-decoder-dialog')">
            <span class="subheading">Scan subject set code</span>
          </div>

          <div class="setting" @click="$bus.$emit('show-set-encoder-dialog')">
            <span class="subheading">Share subject set</span>
          </div>

          <div class="setting" @click="$bus.$emit('show-set-manager-dialog')">
            <span class="subheading">Manage subject sets</span>
          </div>
        </v-card-text>
      </v-card>
      <v-card class="build-info">
        <v-card-text>
          <span class="overline">about</span>

          <div class="setting">
            <div class="left">
              <span class="subheading">GWA Calc build {{ appVersion }}</span>
              <span class="caption">&copy; 2019 Jared Dantis. Licensed under AGPLv3.</span>
            </div>
            <div class="right">
              <a href="https://jared.gq" target="_blank" rel="noopener">
                <img :src="require('../assets/jared-dantis.svg')"
                     alt="Jared Dantis" :class="isDarkMode ? 'invert' : ''">
              </a>
            </div>
          </div>

          <div class="setting">
            <a :href="`mailto:jareddantis@gmail.com?subject=GWACalc-Vue${appVersion || 'debug'}`"
               target="_blank" rel="noopener"
               class="text--primary subheading">Report a bug or send feedback</a>
          </div>

          <div class="setting" @click="showClearDialog = true">
            <span class="subheading text"
                  :class="isDarkMode ? 'pink--text' : 'red--text'">Delete all data and reset</span>
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

<!--    Dialogs -->
    <set-creator-dialog/>
    <set-decoder-dialog/>
    <set-encoder-dialog/>
    <set-manager-dialog/>

<!--    Edit subject confirmation -->
    <v-dialog class="confirm-dialog" v-model="showEditConfirmDialog" max-width="400px">
      <v-card>
        <v-card-title>
          <span class="title">Edit {{ setToEdit }}?</span>
        </v-card-title>

        <v-card-text>
          <p class="body-1 red--text">This will clear your grades for this subject set.</p>
          <p class="body-1">It's recommended that you back up your currently entered grades first (e.g. through screenshots) before continuing.</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="showEditConfirmDialog = false">Cancel</v-btn>
          <v-btn flat @click="editConfirmedHandler">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

<!--    Clear data -->
    <v-snackbar v-model="deleteSuccessful" color="success"
                :top="true" :timeout="3000">Deleted {{ garbage }}</v-snackbar>
    <v-dialog class="confirm-dialog" v-model="showClearDialog" max-width="400px">
      <v-card>
        <v-card-title>
          <span class="title">Delete {{ garbage }}?</span>
        </v-card-title>

        <v-card-text>
          <p class="body-1 red--text">This process is irreversible!</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="resetState">Cancel</v-btn>
          <v-btn flat @click="clearHandler">Clear</v-btn>
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
    // Vuetify
    VBtn, VCard, VCardActions, VCardText, VCardTitle, VDialog,
    VSnackbar, VSpacer, VSwitch,
  },
})
export default class Settings extends Vue {
  public deleteSuccessful: boolean = false
  public garbage: string = 'all data'
  public isClearingSet: boolean = false
  public setToEdit: string = ''
  public showClearDialog: boolean = false
  public showEditConfirmDialog: boolean = false

  public created() {
    this.$bus.$on('delete-custom-set', (set: string) => {
      this.garbage = set
      this.isClearingSet = true
      this.showClearDialog = true
    })
    this.$bus.$on('confirm-edit-custom-set', (set: string) => {
      this.setToEdit = set
      this.showEditConfirmDialog = true
    })
  }

  public clearHandler() {
    if (this.isClearingSet) {
      this.$store.dispatch('deleteSet', this.garbage).then(() => this.deleteSuccessful = true)
    } else {
      this.$store.dispatch('clearAllData').then(() => this.deleteSuccessful = true)
    }

    this.resetState()
  }

  public editConfirmedHandler() {
    this.$bus.$emit('edit-custom-set', this.setToEdit)
    this.setToEdit = ''
    this.showEditConfirmDialog = false
  }

  public resetState() {
    this.isClearingSet = false
    this.showClearDialog = false
    this.garbage = 'all data'
  }

  get appVersion(): string {
    return this.$store.getters.appVersion
  }
  get isDarkMode(): boolean {
    return this.$store.getters.isDarkMode
  }
  set isDarkMode(mode: boolean) {
    this.$store.commit('updateDarkMode', mode)
  }
  get hiddenPshs(): boolean {
    return this.$store.getters.hiddenPshs
  }
  set hiddenPshs(isHidden: boolean) {
    this.$store.commit('updateHiddenPshs', isHidden)
  }
}
</script>

