<template>
  <v-dialog v-model="dialog" :scrollable="true">
    <v-card>
      <v-card-title>
        <span class="title">Subject sets</span>
      </v-card-title>
      <v-card-text>
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
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'
import { Component, Watch } from 'vue-property-decorator'
import { VBtn, VCard, VCardTitle, VDialog, VDivider, VIcon, VList, VListTile,
  VListTileAction,  VListTileContent, VListTileTitle, VSubheader } from 'vuetify/lib'

@Component({
  components: {
    VBtn, VCard, VCardTitle, VDialog, VDivider, VIcon, VList, VListTile,
    VListTileAction, VListTileContent, VListTileTitle, VSubheader,
  },
  computed: mapState(['currentSet']),
})
export default class SetPickerDialog extends Vue {
  public currentSet!: string
  public dialog: boolean = false

  private readonly placeholder: string = 'Define new custom set...'

  @Watch('dialog')
  public onDialogToggle(newVal: boolean, oldVal: boolean) {
    const rootEl = this.$root.$el as HTMLElement
    if (newVal) {
      disableBodyScroll(rootEl)
    } else {
      enableBodyScroll(rootEl)
    }
  }

  public created() {
    this.$bus.$on('show-set-picker-dialog', () => this.dialog = true)
  }

  public save(set: string) {
    if (set !== this.placeholder) {
      this.$store.dispatch('updateCurrentSet', set)
    } else {
      this.$bus.$emit('create-new-set', true)
    }
    this.dialog = false
  }

  get pshsSets(): string[] {
    return this.$store.getters.pshsSets
  }

  get customSets(): string[] {
    const sets = this.$store.getters.customSets

    if (sets.length < 5) {
      return [this.placeholder].concat(sets)
    } else {
      return sets
    }
  }
}
</script>
