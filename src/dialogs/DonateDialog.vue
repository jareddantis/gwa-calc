<template>
  <div>
    <v-bottom-sheet v-model="visible" inset>
      <v-sheet class="pt-8">
        <v-img :class="`mx-auto mb-4 ${isDarkMode ? 'invert' : ''}`" width="100"
               alt="Jared Dantis" :src="require('../assets/jared-dantis.svg')"/>
        <h2 class="subtitle-1 text-center mb-4">Thanks for supporting what I do!</h2>

        <v-container fluid>
          <v-row dense>
            <v-col v-for="card in cards" :key="card.title" cols="4">
              <v-card outlined height="80" @click="donateHandler(card.title)">
                <div class="method d-flex align-center justify-center">
                  <v-img contain :alt="card.title" :src="card.src" max-width="70%"/>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>

    <v-dialog v-model="paymayaQR" max-width="280px">
      <v-card>
        <v-card-text>
          <p class="body-1 text-center pt-4">Scan this code<br>in your PayMaya&trade; app</p>
          <div class="qr-code pa-4">
            <v-img alt="PayMaya QR code" :src="require('../assets/paymaya.svg')"
                   max-width="100%" max-height="100%"/>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn text @click="paymayaQR = false">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
  div.method {
    width: 100%;
    height: 100%;
  }
  .v-image.invert {
    filter: invert(1);
  }
  .v-card.outlined {
    background-color: #ffffff;
  }
  div.qr-code {
    background: white;
  }
</style>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Component } from 'vue-property-decorator'

@Component({
  computed: mapState(['isDarkMode']),
})
export default class DonateDialog extends Vue {
  public isDarkMode!: boolean
  public paymayaQR: boolean = false
  public visible: boolean = false
  public cards = [
    { title: 'paypal', src: require('../assets/paypal.png') },
    { title: 'ko-fi', src: require('../assets/Ko-fi_Logo_RGB.png') },
    { title: 'paymaya', src: require('../assets/paymaya.png') },
  ]

  public created() {
    this.$bus.$on('show-donate-dialog', () => this.visible = true)
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
        this.paymayaQR = true
        this.visible = false
        break
    }
  }

  private openLink(link: string) {
    window.open(link, '_blank', 'noopener')
    this.visible = false
  }
}
</script>
