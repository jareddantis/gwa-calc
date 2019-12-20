<template>
  <v-dialog v-model="dialog" scrollable max-width="600px">
    <v-card>
      <v-card-title>
        <span class="title">Manage custom subject sets</span>
      </v-card-title>

      <v-card-text>
        <v-list>
          <v-list-item v-for="set in customSets" :key="set">
            <v-list-item-content>
              <v-list-item-title v-text="set"/>
            </v-list-item-content>

            <v-list-item-action v-if="set !== placeholder">
              <v-btn icon small @click.stop="$bus.$emit('confirm-edit-custom-set', set)">
                <v-icon color="grey lighten-1">edit</v-icon>
              </v-btn>
            </v-list-item-action>

            <v-list-item-action v-if="set !== placeholder">
              <v-btn icon small @click.stop="$bus.$emit('delete-custom-set', set)">
                <v-icon color="grey lighten-1">delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-btn v-if="customSets.length < 5"
               text @click="$bus.$emit('create-new-set', false)">New</v-btn>
        <v-spacer/>
        <v-btn text @click="dialog = false">Done</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class SetManagerDialog extends Vue {
  public dialog: boolean = false
  public placeholder: string = 'You haven\'t defined any custom subjects.'

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

