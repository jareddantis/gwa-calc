<template>
  <v-dialog v-model="dialog" scrollable max-width="600px">
    <v-card>
      <v-card-title>
        <span class="title">Subject sets</span>
      </v-card-title>

      <div class="set-list">
        <v-list subheader v-show="!isHiddenPshs">
          <v-subheader>Philippine Science High School</v-subheader>
          <v-list-item v-for="set in pshsSets"
                       :key="set" @click="save(set)"
                       :disabled="set === currentSet">
            <v-list-item-content>
              <v-list-item-title v-text="set"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider v-show="!isHiddenPshs"></v-divider>

        <v-list :subheader="!isHiddenPshs" v-if="customSets.length > 0">
          <v-subheader v-show="!isHiddenPshs">Custom subjects</v-subheader>
          <v-list-item v-for="set in customSets"
                       :key="set" @click="save(set)"
                       :disabled="set === currentSet">
            <v-list-item-content>
              <v-list-item-title v-text="set"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list subheader v-else>
          <v-subheader>Custom subjects</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <span class="body-1">You can create custom subject sets in Settings.</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Component } from 'vue-property-decorator'
import { VBtn, VCard, VCardActions, VCardTitle, VDialog, VDivider, VIcon, VList, VListItem,
  VListItemAction, VListItemContent, VListItemTitle, VSpacer, VSubheader } from 'vuetify/lib'

@Component({
  components: {
    VBtn, VCard, VCardActions, VCardTitle, VDialog, VDivider, VIcon, VList, VListItem,
    VListItemAction, VListItemContent, VListItemTitle, VSpacer, VSubheader,
  },
  computed: mapState(['currentSet', 'isHiddenPshs']),
})
export default class SetPickerDialog extends Vue {
  public currentSet!: string
  public isHiddenPshs!: boolean
  public dialog: boolean = false

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
