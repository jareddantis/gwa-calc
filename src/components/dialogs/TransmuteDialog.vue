<template>
  <div>
    <v-dialog v-model="visible" eager persistent fullscreen transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar :color="isDarkMode ? 'gray' : 'white'" :elevation="0">
          <v-btn :dark="isDarkMode" icon @click="visible = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list subheader class="content">
          <v-list-item>
            <div class="final-grade elevation-2">
              <h1 class="monospaced">{{ finalGrade | asGrade }}</h1>
              <p>Final grade</p>
            </div>
          </v-list-item>
          <v-list-item><subject-card :in-transmute-mode="true"
                                     :subject-id="0" :subject="'Previous quarter'"/></v-list-item>
          <v-list-item><subject-card :in-transmute-mode="true"
                                     :subject-id="1" :subject="'Current tentative'"/></v-list-item>
          <v-list-item>
            <p class="body-1 grey--text">Grade transmutations are performed according to
              <a href="http://irc.pshs.edu.ph/downloads/2017-student-handbook.pdf#page=28"
                 target="_blank" rel="noopener" class="grey--text">the PSHS System Student Handbook.</a></p>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>

    <grade-picker-dialog :transmute="true"/>
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/components/dialogs/TransmuteDialog';
</style>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Component } from 'vue-property-decorator'

@Component({
  computed: mapState(['isDarkMode']),
})
export default class TransmuteDialog extends Vue {
  public isDarkMode!: boolean
  public visible: boolean = false

  public created() {
    this.$bus.$on('show-transmute-dialog', () => this.visible = true)
    this.$bus.$on('update-grade-transmute', (payload: any) => {
      const {id, newGrade} = payload
      this.$set(this.grades, id, newGrade)
    })
  }

  public compute(prevGrade: number, currGrade: number) {
    const prev = prevGrade / 3          // Previous grade makes 1/3 of final
    const curr = (currGrade * 2) / 3    // Current grade makes 2/3 of final
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

  get grades(): number[] {
    return this.$store.getters.transmuteGrades
  }

  get finalGrade(): number {
    return this.compute(this.grades[0], this.grades[1])
  }
}
</script>
