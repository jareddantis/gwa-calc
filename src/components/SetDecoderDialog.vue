<template>
  <div class="dialog-root">
    <!--  Scan dialog -->
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="orange">
          <v-btn icon dark @click="end">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Scan code</v-toolbar-title>
        </v-toolbar>

        <video id="scanner"></video>
      </v-card>
    </v-dialog>

    <!--  Import confirm dialog -->
    <v-dialog v-model="confirmDialog">
      <v-card>
        <v-card-title>
          <span class="title">Scan successful</span>
        </v-card-title>

        <v-card-text>
          <p>Import <strong>{{ scannedName }}?</strong></p>
          <p>Subjects include <strong>{{ scannedPreview }}</strong></p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="cancel">Cancel</v-btn>
          <v-btn flat @click="save">Import</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Set already exists! -->
    <v-snackbar v-model="importSuccess" color="green"
                :top="true" :timeout="3000">Imported successfully</v-snackbar>

    <!-- Set already exists! -->
    <v-snackbar v-model="importError" color="red"
                :top="true" :timeout="3000">{{ importErrorText }}</v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import QRScanner from 'qr-scanner'
import { decompressFromBase64 } from 'lz-string'
import { Component } from 'vue-property-decorator'
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VDialog, VList, VListTile,
  VListTileContent, VListTileTitle, VSnackbar, VSpacer, VToolbar, VToolbarTitle } from 'vuetify/lib'

// @ts-ignore
import QRScannerWorker from 'qr-scanner/qr-scanner-worker.min.js'

@Component({
  components: {
    VBtn, VCard, VCardActions, VCardText, VCardTitle, VDialog, VList, VListTile,
    VListTileContent, VListTileTitle, VSnackbar, VSpacer, VToolbar, VToolbarTitle,
  },
})
export default class SetDecoderDialog extends Vue {
  public confirmDialog: boolean = false
  public importError: boolean = false
  public importErrorText: string = ''
  public importSuccess: boolean = false
  public importedSet: { [key: string]: any } = {}
  public dialog: boolean = false
  public scannedName: string = ''
  public scannedPreview: string = ''
  private scanner: QRScanner | null = null

  public created() {
    this.$bus.$on('show-set-decoder-dialog', () => this.begin())
    QRScanner.WORKER_PATH = QRScannerWorker
  }

  public begin() {
    const vidEl = document.getElementById('scanner') as HTMLVideoElement

    this.scanner = new QRScanner(vidEl, (result: string) => this.onScanned(result))
    this.scanner.start()
      .then(() => this.dialog = true)
      .catch((err: any) => this.onError(err))
  }

  public end(isDueToError: boolean) {
    this.reset(isDueToError)
    this.dialog = false

    if (this.scanner !== null) {
      this.scanner!.stop()
      this.scanner!.destroy()
      this.scanner = null
    }
  }

  public onError(text: string) {
    this.importErrorText = text
    this.importError = true
    this.end(true)
  }

  public onScanned(result: string) {
    try {
      const data = JSON.parse(decompressFromBase64(result))

      if (data.hasOwnProperty('name') && data.hasOwnProperty('subjects') && data.subjects.length > 0) {
        const subjectsPreview = []
        let totalUnits = 0

        this.scanner!.pause()

        // Preview subjects and units
        for (const subject of data.subjects) {
          const { name, units } = subject

          // Preview max 3 subjects in dialog
          if (subjectsPreview.length < 3) {
            subjectsPreview.push(`${name} (${units} units)`)
          }

          // Add to total units
          totalUnits += units
        }

        // Build preview text
        switch (subjectsPreview.length) {
          case 2:
            this.scannedPreview = `${subjectsPreview[0]} and ${subjectsPreview[2]}.`
            break
          case 1:
            this.scannedPreview = `${subjectsPreview[0]}.`
            break
          default:
            this.scannedPreview = `${subjectsPreview[0]}, ${subjectsPreview[1]}, and ${subjectsPreview[2]}.`
        }

        this.importedSet = data
        this.scannedName = `${data.name} (${totalUnits} total units)`
        this.confirmDialog = true
      } else {
        this.onError('Malformed or invalid subject set')
      }
    } catch (err) {
      // If JSON.parse fails, the QR data is most likely not a JSON object
      this.onError(err)
    }
  }

  public reset(isDueToError: boolean) {
    if (!isDueToError) {
      this.importErrorText = ''
    }

    this.importedSet = {}
    this.scannedName = ''
    this.scannedPreview = ''
  }

  public cancel() {
    this.reset(false)
    this.confirmDialog = false
    this.scanner!.start().catch((err: any) => this.onError(err))
  }

  public save() {
    this.confirmDialog = false

    // Check if there is no set with the same name
    const { name, subjects } = this.importedSet
    if (this.$store.getters.customSets.indexOf(name)) {
      this.$store.dispatch('saveSet', { name, subjects }).then(() => {
        this.importSuccess = true
        this.end(false)
      })
    } else {
      this.onError(`Set '${name}' already exists`)
    }
  }
}
</script>

<style scoped lang="stylus">
  #scanner
    max-width: 100%
    max-height: 100%
    width: 100%
    height: 100%
</style>
