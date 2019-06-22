<template>
  <v-dialog v-model="showDialog" max-width="500">
    <v-card>
      <h1 @click="showDialog = false">Pick a grade for id {{ subjectId }}, transmute={{ transmute }}</h1>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class GradePickerDialog extends Vue {
  @Prop({ required: true }) public readonly transmute: boolean | undefined

  public subjectId: number = 0
  public value: number = 1.0
  public showDialog: boolean = false

  public created() {
    this.$bus.$on('show-grade-picker-dialog', (payload: any) => {
      const { id, transmute } = payload

      // Check if we're meant to be receiving this
      if (this.transmute === transmute) {
        this.subjectId = id
        this.showDialog = true
      }
    })
  }

  public onValueSave() {
    const { subjectId, transmute, value } = this
    this.$bus.$emit('grade-picked', { subjectId, transmute, value })
  }
}
</script>

<style scoped>

</style>
