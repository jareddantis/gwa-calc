<template>
  <v-dialog v-model="dialog" max-width="400px">
    <v-card>
      <v-card-title>
        <span class="title">Pick a grade for {{ subjectName }}</span>
      </v-card-title>

      <v-card-text>
<!--        Show grades with 2 decimal places-->
        <v-select :items="possibleGrades.map((grade) => grade.toFixed(2))"
                  :dark="isDarkMode" color="orange"
                  :value="value"
                  @change="onValueChange"
                  label="Grade" outline></v-select>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="dialog = false">Close</v-btn>
        <v-btn flat @click="onValueSave">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VDialog, VSelect, VSpacer } from 'vuetify/lib'

@Component({
  components: {
    VBtn, VCard, VCardActions, VCardText, VCardTitle, VDialog, VSelect, VSpacer,
  },
  computed: mapState(['isDarkMode']),
})
export default class GradePickerDialog extends Vue {
  @Prop({ required: true }) public readonly transmute: boolean | undefined
  public isDarkMode!: boolean
  public readonly possibleGrades = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 4, 5]
  public subjectName: string = ''
  public subjectId: number = 0
  public value: string = '1.00'
  public dialog: boolean = false

  public created() {
    this.$bus.$on('show-grade-picker-dialog', (payload: any) => {
      const { id, name, transmute, grade } = payload

      if (this.transmute === transmute) {
        this.subjectName = name
        this.subjectId = id
        this.value = grade.toFixed(2)
        this.dialog = true
      }
    })
  }

  public onValueChange(newValue: string) {
    this.value = newValue
  }

  public onValueSave() {
    const { subjectId, transmute, value } = this

    this.$bus.$emit('grade-picked', { subjectId, transmute, value: parseFloat(value) })
    this.dialog = false
  }
}
</script>
