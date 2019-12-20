<template>
  <!-- Navigation drawer -->
  <v-navigation-drawer app temporary v-model="visible" :width="300">
    <v-img :src="isDarkMode ? darkWaves : lightWaves" aspect-ratio="1.5">
      <div :class="`header ml-4 ${isDarkMode ? '' : 'black--text'}`">
        <h3 class="subtitle-2">GWA Calc {{ appVersion ? `build ${appVersion}` : 'debug build' }}</h3>
        <p class="caption mb-0">&copy; 2015-2019, 2019-2020 <a href="https://jared.gq" class="text--primary"
                                                    target="_blank" rel="noopener">Jared Dantis</a></p>
        <p class="caption"><a href="https://github.com/jareddantis/gwa-calc/blob/master/LICENSE.md"
                              target="_blank" class="text--primary" rel="noopener">Build licensed under AGPLv3</a></p>
      </div>
    </v-img>
    <v-list nav rounded flat dense>
      <v-subheader class="overline">Subject sets</v-subheader>
      <v-list-item>
        <v-select :items="subjects" :value="currentSet" @change="setChanged"
                  :dark="isDarkMode" color="orange" label="Current"
                  outlined hide-details class="mt-2 mb-4"/>
      </v-list-item>
      <v-list-item-group>
        <v-list-item @click="$bus.$emit('show-set-manager-dialog')">
          <v-list-item-icon><v-icon>add</v-icon></v-list-item-icon>
          <v-list-item-content><v-list-item-title class="body-2">Create or manage sets</v-list-item-title></v-list-item-content>
        </v-list-item>
        <v-list-item @click="$bus.$emit('show-set-encoder-dialog')">
          <v-list-item-icon><v-icon>share</v-icon></v-list-item-icon>
          <v-list-item-content><v-list-item-title class="body-2">Share set</v-list-item-title></v-list-item-content>
        </v-list-item>
        <v-list-item @click="$bus.$emit('show-set-decoder-dialog')">
          <v-list-item-icon><v-icon>camera_alt</v-icon></v-list-item-icon>
          <v-list-item-content><v-list-item-title class="body-2">Import set</v-list-item-title></v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <v-subheader class="overline mt-4">Tools</v-subheader>
      <v-list-item-group>
        <v-list-item v-show="!isHiddenPshs" @click="$bus.$emit('show-transmute-dialog')">
          <v-list-item-icon><v-icon>merge_type</v-icon></v-list-item-icon>
          <v-list-item-content><v-list-item-title class="body-2">Transmute PSHS grades</v-list-item-title></v-list-item-content>
        </v-list-item>
        <v-list-item @click="$store.commit('updateDarkMode', !isDarkMode)">
          <v-list-item-icon><v-icon>brightness_3</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="body-2">{{ isDarkMode ? 'Disable' : 'Enable' }} dark mode</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="$bus.$emit('delete-all-data')">
          <v-list-item-icon><v-icon>delete_forever</v-icon></v-list-item-icon>
          <v-list-item-content><v-list-item-title class="body-2">Delete all data</v-list-item-title></v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <v-divider class="my-6"/>
      <v-subheader class="overline mt-4">Application</v-subheader>
      <v-list-item-group>
        <v-list-item @click="$store.commit('updateHiddenPshs', !isHiddenPshs)">
          <v-list-item-icon><v-icon>school</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="body-2">{{ isHiddenPshs ? 'Show' : 'Hide ' }} PSHS features</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="openLink(`mailto:jareddantis@gmail.com?subject=GWACalc-Vue-${this.appVersion || 'debug'}`)">
          <v-list-item-icon><v-icon>comment</v-icon></v-list-item-icon>
          <v-list-item-content><v-list-item-title class="body-2">Send feedback</v-list-item-title></v-list-item-content>
        </v-list-item>
        <v-list-item @click="openLink('https://github.com/jareddantis/gwa-calc')">
          <v-list-item-icon><v-icon>open_in_new</v-icon></v-list-item-icon>
          <v-list-item-content><v-list-item-title class="body-2">View on GitHub</v-list-item-title></v-list-item-content>
        </v-list-item>
        <v-list-item @click="showDonate">
          <v-list-item-icon><v-icon>monetization_on</v-icon></v-list-item-icon>
          <v-list-item-content><v-list-item-title class="body-2">Donate to me</v-list-item-title></v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
@import '../styles/components/Drawer';
</style>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { mapState } from 'vuex'

@Component({
  computed: mapState(['isDarkMode', 'isHiddenPshs']),
})
export default class Drawer extends Vue {
  public isDarkMode!: boolean
  public isHiddenPshs!: boolean
  public visible: boolean = false
  private darkWaves = require('../assets/wavy-dark.svg')
  private lightWaves = require('../assets/wavy.svg')

  public created() {
    this.$bus.$on('open-drawer', () => this.visible = true)
  }

  public setChanged(set: string) {
    this.$store.dispatch('updateCurrentSet', set)
    this.visible = false
  }

  public openLink(link: string) {
    window.open(link, '_blank', 'noopener')
    this.visible = false
  }

  public showDonate() {
    this.$bus.$emit('show-donate-dialog')
    this.visible = false
  }

  get appVersion(): string {
    return this.$store.getters.appVersion
  }
  get currentSet(): string {
    return this.$store.getters.currentSet
  }
  get subjects(): string[] {
    let subjects: string[] = []
    const customSets = this.$store.getters.customSets

    if (customSets.length > 0) {
      subjects = subjects.concat(customSets)
    }

    if (!this.isHiddenPshs) {
      subjects = subjects.concat(this.$store.getters.pshsSets)
    }

    return subjects
  }
}
</script>