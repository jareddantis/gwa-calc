<template>
  <div class="fragment transmute">
    <div class="content">
      <div class="final-grade" :dark="isDarkMode">
        <h1 class="monospaced">{{ finalGrade | asGrade }}</h1>
        <p>Final grade</p>
      </div>
      <subject-card :subject-id="0"
                    :subject="'Previous quarter'"/>
      <subject-card :subject-id="1"
                    :subject="'Current tentative'"/>
    </div>

    <grade-picker-dialog :transmute="true"/>
  </div>
</template>

<style scoped lang="stylus">
  @import '../styles/routes/Transmute'
</style>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Component } from 'vue-property-decorator'
import GradePickerDialog from '@/components/GradePickerDialog.vue'

@Component({
  components: {
    GradePickerDialog,
  },
  computed: mapState(['isDarkMode']),
})
export default class Transmute extends Vue {
  public isDarkMode!: boolean

  public created() {
    this.$bus.$on('update-grade-transmute', (payload: any) => {
      const {id, newGrade} = payload
      this.$set(this.grades, id, newGrade)
    })
  }

  get grades(): number[] {
    return this.$store.getters.transmuteGrades
  }

  get finalGrade(): number {
    const prev = this.grades[0] / 3          // Previous grade makes 1/3 of final
    const curr = (this.grades[1] * 2) / 3    // Current grade makes 2/3 of final
    const final = prev + curr

    if (final > 3) {
      // There are no decimal steps above 3.00, so we round to whole integers
      // We also round half down (i.e. 0.5 becomes 0)
      return -Math.round(-final)
    } else {
      // Round to nearest 0.25
      return Math.round(final * 4) / 4
    }
  }
}
</script>
