<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>
        <span class="title">Subject sets</span>
      </v-card-title>
      <v-list subheader>
        <v-subheader>Philippine Science High School</v-subheader>
        <v-list-tile v-for="set in pshsSets"
                     :key="set" @click="save(set)"
                     :disabled="set === currentSet">
          <v-list-tile-content>
            <v-list-tile-title v-text="set"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list subheader>
        <v-subheader>Custom</v-subheader>
        <v-list-tile v-for="set in customSets"
                     :key="set" @click="save(set)"
                     :disabled="set === currentSet">
          <v-list-tile-content>
            <v-list-tile-title v-text="set"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Component } from 'vue-property-decorator'
import { VCard, VCardTitle, VDialog, VDivider, VList, VListTile, VListTileContent,
  VListTileTitle, VSubheader } from 'vuetify/lib'

@Component({
  components: {
    VCard, VCardTitle, VDialog, VDivider, VList, VListTile, VListTileContent,
    VListTileTitle, VSubheader,
  },
  computed: mapState(['currentSet']),
})
export default class SetPickerDialog extends Vue {
  public currentSet!: string
  public dialog: boolean = false

  private readonly customPlaceholder: string = 'Define new custom set...'

  public created() {
    this.$bus.$on('show-set-picker-dialog', () => this.dialog = true)
  }

  public save(set: string) {
    this.dialog = false
    if (set !== this.customPlaceholder) {
      this.$store.dispatch('updateCurrentSet', set)
    }
  }

  get pshsSets(): string[] {
    return this.$store.getters.pshsSets
  }

  get customSets(): string[] {
    const available = this.$store.getters.customSets

    if (!available.length) {
      return [this.customPlaceholder]
    }
    return available
  }
}
</script>
