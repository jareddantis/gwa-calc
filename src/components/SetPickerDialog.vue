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

        <v-list subheader v-if="customSets.length > 0">
          <v-subheader>Custom</v-subheader>
          <v-list-tile v-for="set in customSets"
                       :key="set" @click="save(set)"
                       :disabled="set === currentSet">
            <v-list-tile-content>
              <v-list-tile-title v-text="set"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-list subheader v-else>
          <v-subheader>Custom</v-subheader>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                <span class="body-1">You can create custom subject sets in Settings.</span>
              </v-list-tile-title>
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
  VListTileAction,  VListTileContent, VListTileTitle, VSpacer, VSubheader } from 'vuetify/lib'

@Component({
  components: {
    VBtn, VCard, VCardTitle, VDialog, VDivider, VIcon, VList, VListTile,
    VListTileAction, VListTileContent, VListTileTitle, VSpacer, VSubheader,
  },
  computed: mapState(['currentSet']),
})
export default class SetPickerDialog extends Vue {
  public currentSet!: string
  public dialog: boolean = false

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
    this.$store.dispatch('updateCurrentSet', set)
    this.dialog = false
  }

  get pshsSets(): string[] {
    return this.$store.getters.pshsSets
  }

  get customSets(): string[] {
    return this.$store.getters.customSets
  }
}
</script>
