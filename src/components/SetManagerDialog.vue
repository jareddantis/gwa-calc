<template>
  <v-dialog v-model="dialog" :scrollable="true">
    <v-card>
      <v-card-title>
        <span class="title">Manage custom subject sets</span>
      </v-card-title>

      <v-card-text>
        <v-list>
          <v-list-tile v-for="set in customSets" :key="set">
            <v-list-tile-content>
              <v-list-tile-title v-text="set"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action v-if="set !== placeholder">
              <v-btn icon ripple @click.stop="$bus.$emit('confirm-edit-custom-set', set)">
                <v-icon color="grey lighten-1">edit</v-icon>
              </v-btn>
            </v-list-tile-action>

            <v-list-tile-action v-if="set !== placeholder">
              <v-btn icon ripple @click.stop="$bus.$emit('delete-custom-set', set)">
                <v-icon color="grey lighten-1">delete</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-btn v-if="customSets.length < 5"
               flat @click="$bus.$emit('create-new-set', false)">New</v-btn>
        <v-spacer></v-spacer>
        <v-btn flat @click="dialog = false">Done</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'
import { Component, Watch } from 'vue-property-decorator'
import { VBtn, VCard, VCardActions, VCardTitle, VDialog, VIcon, VList, VListTile,
  VListTileAction,  VListTileContent, VListTileTitle, VSpacer } from 'vuetify/lib'

@Component({
  components: {
    VBtn, VCard, VCardActions, VCardTitle, VDialog, VIcon, VList, VListTile,
    VListTileAction, VListTileContent, VListTileTitle, VSpacer,
  },
})
export default class SetManagerDialog extends Vue {
  public dialog: boolean = false
  public placeholder: string = 'You haven\'t defined any custom subjects.'

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
    this.$bus.$on('show-set-manager-dialog', () => this.dialog = true)
  }

  get customSets(): string[] {
    const sets = this.$store.getters.customSets

    if (sets.length === 0) {
      return [this.placeholder]
    } else {
      return sets
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
