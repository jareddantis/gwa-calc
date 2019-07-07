<template>
  <div class="dialog-root">
<!--    Picker -->
    <v-dialog v-model="dialog" max-width="480px">
      <v-card>
        <v-card-title>
          <span class="title">Share subject set</span>
        </v-card-title>

        <div class="set-list" v-if="sets.length > 0">
          <v-list>
            <v-list-tile v-for="set in sets"
                         :key="set" @click="encode(set)">
              <v-list-tile-content>
                <v-list-tile-title v-text="set"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </div>

        <v-card-text v-else>
          <span class="body-1">You haven't created any subject sets yet!</span>
        </v-card-text>
      </v-card>
    </v-dialog>

<!--    QR code -->
    <v-dialog v-model="qrDialog" max-width="480px" persistent scrollable>
      <v-card>
        <v-card-text v-if="isGenerating">
          <v-progress-circular color="orange" indeterminate
                               :size="70" :width="7"></v-progress-circular>
        </v-card-text>

        <v-card-text v-else>
          <img id="qr-canvas" :src="generatedQR"/>
          <p class="body-1">Tell your friends to scan this code to import <strong>{{ encodedSet }}</strong></p>
        </v-card-text>

        <v-card-actions v-show="!isGenerating">
          <v-btn flat @click="share" v-show="canShare">Share</v-btn>
          <v-btn flat @click="saveToDisk">Save</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat @click="reset">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

<!--    Web Share API error -->
    <v-snackbar v-model="shareFailed" color="red"
                :top="true" :timeout="3000">Error creating share request</v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import QRCode from 'qrcode'
import { saveAs as saveToFile } from 'file-saver'
import { compressToBase64 } from 'lz-string'
import { Component } from 'vue-property-decorator'
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VDialog, VList, VListTile,
  VListTileContent, VListTileTitle, VProgressCircular, VSnackbar, VSpacer } from 'vuetify/lib'

@Component({
  components: {
    VBtn, VCard, VCardActions, VCardText, VCardTitle, VDialog, VList, VListTile,
    VListTileContent, VListTileTitle, VProgressCircular, VSnackbar, VSpacer,
  },
})
export default class SetEncoderDialog extends Vue {
  public dialog: boolean = false
  public encodedSet: string = ''
  public generatedQR: string = ''
  public generationError: string = ''
  public generationFailed: boolean = false
  public isGenerating: boolean = false
  public qrDialog: boolean = false
  public shareError: string = ''
  public shareFailed: boolean = false

  public created() {
    this.$bus.$on('show-set-encoder-dialog', () => {
      this.reset()
      this.dialog = true
    })
  }

  public reset() {
    this.encodedSet = ''
    this.generatedQR = ''
    this.generationError = ''
    this.generationFailed = false
    this.isGenerating = false
    this.qrDialog = false
    this.shareError = ''
    this.dialog = false
  }

  public async createQRFile(): Promise<File> {
    this.isGenerating = true
    const blob = await (await fetch(this.generatedQR)).blob()
    const file = new File([blob], `${this.encodedSet.replace(/ /g, '')}.png`, {
      type: 'image/png',
    })

    return new Promise((resolve) => {
      this.isGenerating = false
      resolve(file)
    })
  }

  public async share() {
    const data = {
      files: [ await this.createQRFile() ],
      title: this.encodedSet,
      text: `Calculate your average for ${this.encodedSet}`,
      url: 'https://calc.jared.gq',
    }

    if (navigator.canShare(data)) {
      navigator.share(data)
        .catch((err) => {
          this.shareError = err
          this.shareFailed = true
        })
    } else {
      this.shareError = 'Browser does not support file sharing'
      this.shareFailed = true
    }
  }

  public async saveToDisk() {
    const file = await this.createQRFile()
    saveToFile(file, file.name)
  }

  public async encode(set: string) {
    // Show dialog, loading
    this.isGenerating = true
    this.qrDialog = true

    // Get subjects
    const subjectSet = this.$store.getters.customSet(set)
    if (subjectSet.subjects.length) {
      try {
        // Create QR code
        this.generatedQR = await QRCode.toDataURL(compressToBase64(JSON.stringify(subjectSet)))
        this.isGenerating = false
        this.encodedSet = set
      } catch (err) {
        this.generationError = err
        this.generationFailed = true
      }
    } else {
      this.generationError = `No subjects exist for ${set}.`
      this.generationFailed = true
    }
  }

  get canShare(): boolean {
    return navigator.share !== undefined && navigator.canShare !== undefined
  }

  get sets(): string[] {
    return this.$store.getters.customSets
  }
}
</script>

<style scoped lang="stylus">
  #qr-canvas
    display: block
    max-width: 100%
    margin: 1.5rem auto

  p.body-1
    text-align: center

  div.v-progress-circular
    width: 100% !important
</style>
