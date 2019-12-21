<template>
  <v-app>
    <v-content>
      <router-view :key="$route.fullPath"/>

      <!-- Dialogs -->
      <donate-dialog/>
      <set-creator-dialog/>
      <set-decoder-dialog/>
      <set-encoder-dialog/>
      <set-manager-dialog/>
      <transmute-dialog/>
      <!-- Edit subject confirmation dialog -->
      <v-dialog class="confirm-dialog" v-model="showEditConfirmDialog" max-width="400px">
        <v-card>
          <v-card-title>
            <span class="title">Edit {{ setToEdit }}?</span>
          </v-card-title>

          <v-card-text>
            <p class="body-1 red--text">Editing the subjects will clear your grades for this subject set.</p>
            <p class="body-1">It's recommended that you back up your currently entered grades first (e.g. through screenshots) before continuing.</p>
          </v-card-text>

          <v-card-actions>
            <v-spacer/>
            <v-btn text @click="showEditConfirmDialog = false">Cancel</v-btn>
            <v-btn text @click="editConfirmedHandler">Edit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Clear data dialog -->
      <v-dialog class="confirm-dialog" v-model="showClearDialog" max-width="400px">
        <v-card>
          <v-card-title>
            <span class="title">Delete {{ garbage }}?</span>
          </v-card-title>

          <v-card-text>
            <p class="body-1 red--text">This process is irreversible!</p>
          </v-card-text>

          <v-card-actions>
            <v-spacer/>
            <v-btn text @click="resetState">Cancel</v-btn>
            <v-btn text @click="clearHandler">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Delete confirmation -->
      <v-snackbar v-model="deleteSuccessful" color="success" left :timeout="3000">Deleted</v-snackbar>
    </v-content>

    <nav-drawer/>
  </v-app>
</template>

<style lang="scss" scoped>
@import './styles/global';
</style>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Component, Watch } from 'vue-property-decorator'

@Component({
  components: {
    DonateDialog: () => import('./DonateDialog.vue'),
    NavDrawer: () => import('./components/NavDrawer.vue'),
    SetCreatorDialog: () => import('./SetCreatorDialog.vue'),
    SetDecoderDialog: () => import('./SetDecoderDialog.vue'),
    SetEncoderDialog: () => import('./SetEncoderDialog.vue'),
    SetManagerDialog: () => import('./SetManagerDialog.vue'),
    TransmuteDialog: () => import('./TransmuteDialog.vue'),
  },
  computed: mapState(['isDarkMode']),
})
export default class App extends Vue {
  public isDarkMode!: boolean
  public deleteSuccessful: boolean = false
  public garbage: string = 'all data'
  public isClearingSet: boolean = false
  public setToEdit: string = ''
  public showClearDialog: boolean = false
  public showEditConfirmDialog: boolean = false

  public created() {
    this.$bus.$on('delete-all-data', () => this.showClearDialog = true)
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
      this.$store.dispatch('deleteSet', this.garbage)
        .then(() => this.deleteSuccessful = true)
        .then(() => this.resetState())
    } else {
      this.$store.dispatch('clearAllData')
        .then(() => this.deleteSuccessful = true)
        .then(() => this.resetState())
    }
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

  @Watch('isDarkMode', { immediate: true })
  private updateVuetifyTheme(theme: boolean) {
    const barColor = document.querySelector('meta[name=theme-color]') as HTMLMetaElement
    if (barColor !== null) {
      if (theme) {
        barColor.content = '#212121'
      } else {
        barColor.content = '#e65100'
      }
    }

    this.$vuetify.theme.dark = theme
  }
}
</script>
