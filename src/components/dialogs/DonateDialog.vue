<template>
  <div>
    <v-dialog v-model="visible" no-click-animation eager persistent fullscreen transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar :color="isDarkMode ? 'gray' : 'white'" :elevation="0">
          <v-btn :dark="isDarkMode" icon @click="visible = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-img :class="`mx-auto mb-4 ${isDarkMode ? 'invert' : ''}`" width="100"
               alt="Jared Dantis" :src="require('../../assets/jared-dantis.svg')"/>
        <h2 class="subtitle-1 text-center mb-4">Thanks for supporting what I do! &hearts;</h2>

        <v-container fluid>
          <v-row dense>
            <v-col v-for="card in cards" :key="card.title" cols="4">
              <v-card outlined height="100" @click="donateHandler(card.title)">
                <div class="method d-flex align-center justify-center">
                  <v-img contain :alt="card.title" :src="card.src" max-height="40%" max-width="70%" />
                </div>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card outlined>
                <v-card-title class="title">
                  Bitcoin (BTC)
                  <v-spacer/>
                  <v-btn text icon small @click="donateHandler('btc')"><v-icon>crop_free</v-icon></v-btn>
                </v-card-title>
                <v-card-text class="monospaced">
                  {{ wallets.btc }}
                  <v-btn text icon x-small @click="copyHandler(wallets.btc)"><v-icon>content_copy</v-icon></v-btn>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card outlined>
                <v-card-title class="title">
                  XRP
                  <v-spacer/>
                  <v-btn text icon small @click="donateHandler('xrp')"><v-icon>crop_free</v-icon></v-btn>
                </v-card-title>
                <v-card-text>
                  <p class="overline">Address</p>
                  <p class="monospaced mb-8">
                    {{ wallets.xrp.address }}
                    <v-btn text icon x-small @click="copyHandler(wallets.xrp.address)"><v-icon>content_copy</v-icon></v-btn></p>
                  <p class="overline">Destination tag</p>
                  <p class="monospaced mb-0">
                    {{ wallets.xrp.tag }}
                    <v-btn text icon x-small @click="copyHandler(wallets.xrp.tag)"><v-icon>content_copy</v-icon></v-btn>
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card outlined>
                <v-card-title class="title">
                  Bitcoin Cash ABC (BCH ABC)
                  <v-spacer/>
                  <v-btn text icon small @click="donateHandler('bch')"><v-icon>crop_free</v-icon></v-btn>
                </v-card-title>
                <v-card-text class="monospaced">
                  {{ wallets.bch }}
                  <v-btn text icon x-small @click="copyHandler(wallets.bch)"><v-icon>content_copy</v-icon></v-btn>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>

    <!-- QR payment dialog -->
    <v-dialog v-model="qrDialog" max-width="280px">
      <v-card>
        <v-card-text>
          <p class="body-1 text-center pt-4">Scan this code to donate</p>
          <div class="qr-code pa-4">
            <v-img alt="QR code" :src="qrSrc"
                   max-width="100%" max-height="100%"/>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn text @click="qrDialog = false">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Clipboard confirmation -->
    <v-snackbar v-model="copyDone" left :timeout="3000">
      {{ copyError ? `Error: ${copyError}` : 'Copied to clipboard' }}
    </v-snackbar>
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/components/dialogs/DonateDialog.scss';
</style>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Component } from 'vue-property-decorator'

@Component({
  computed: mapState(['isDarkMode']),
})
export default class DonateDialog extends Vue {
  public copyError: string = ''
  public copyDone: boolean = false
  public isDarkMode!: boolean
  public qrDialog: boolean = false
  public qrSrc: string = ''
  public visible: boolean = false
  public cards = [
    { title: 'paypal', src: require('../../assets/paypal.png') },
    { title: 'ko-fi', src: require('../../assets/Ko-fi_Logo_RGB.png') },
    { title: 'paymaya', src: require('../../assets/paymaya.png') },
  ]
  public wallets = {
    btc: '3MmJbNGepzbia2zARU7P6G1dYMVxvH8tQN',
    xrp: { address: 'rU2mEJSLqBRkYLVTv55rFTgQajkLTnT6mA', tag: '229138' },
    bch: 'pr39uwqhg5tz46r82kemg2vsg0syqf7tw5vqu40cm3',
  }

  public created() {
    this.$bus.$on('show-donate-dialog', () => this.visible = true)
  }

  public copyHandler(data: string) {
    if (!navigator.clipboard) {
      const el = document.createElement('textarea')
      el.value = data
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()

      try {
        const result = document.execCommand('copy')
        this.copyError = result ? '' : 'Couldn\'t copy'
        this.copyDone = true
        document.body.removeChild(el)
      } catch (err) {
        this.copyError = err
        this.copyDone = true
      }

      return
    }

    navigator.clipboard.writeText(data)
      .then(() => this.copyError = '')
      .catch((err) => this.copyError = err)
      .finally(() => this.copyDone = true)
  }

  public donateHandler(method: string) {
    switch (method) {
      case 'paypal':
        this.openLink('https://paypal.me/jareddantis')
        break
      case 'ko-fi':
        this.openLink('https://ko-fi.com/dantis')
        break
      case 'paymaya':
        this.qrSrc = require('../../assets/paymaya.svg')
        this.qrDialog = true
        break
      default:
        this.qrSrc = require(`../../assets/${method}.png`)
        this.qrDialog = true
    }
  }

  private openLink(link: string) {
    window.open(link, '_blank', 'noopener')
    this.visible = false
  }
}
</script>
