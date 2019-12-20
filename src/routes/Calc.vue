<template>
    <div class="fragment calculator" :dark="isDarkMode">
<!--      Header -->
      <div class="head">
        <div class="left">
          <v-btn text icon @click="$bus.$emit('open-drawer')">
            <v-icon>menu</v-icon>
          </v-btn>
        </div>
        <div class="center">
          <h1 class="monospaced">{{ average | asAverage }}</h1>
        </div>
        <div class="right">
          <v-btn text icon @click="onClearClicked">
            <v-icon>delete</v-icon>
          </v-btn>
        </div>
      </div>

<!--      Body -->
      <div class="body">
        <transition-group name="list" tag="div">
          <subject-card v-for="(subject, i) in currentSubjects"
                        :key="subject.name" :in-transmute-mode="false"
                        :subject-id="i"
                        :subject="subject.name"
                        :units="subject.units"/>
        </transition-group>
      </div>

<!--      Dialogs -->
      <grade-picker-dialog :transmute="false"/>

<!--      Snackbar -->
      <v-snackbar v-model="clearedGrades" left :timeout="3000">Cleared grades</v-snackbar>
    </div>
</template>

<style lang="scss" scoped>
@import '../styles/routes/Calc';
</style>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Component } from 'vue-property-decorator'
import { Subject } from '@/store/subjects'

@Component({
  computed: mapState(['currentSet', 'isDarkMode']),
})
export default class Calculator extends Vue {
  public currentSet!: string
  public isDarkMode!: boolean
  public clearedGrades: boolean = false

  public onClearClicked() {
    this.$store.dispatch('clearGrades').then(() => this.clearedGrades = true)
  }

  get average(): number {
    let total = 0
    let totalUnits = 0

    // Get weighted sum
    this.currentSubjects.forEach((subject: Subject, i: number) => {
      totalUnits += subject.units
      total += this.grades[i] * subject.units
    })

    return total / totalUnits
  }
  get grades(): number[] {
    return this.$store.getters.grades
  }
  get currentSubjects(): Subject[] {
    return this.$store.getters.currentSetSubjects
  }
}
</script>
