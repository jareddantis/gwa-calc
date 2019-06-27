<template>
    <div class="fragment calculator" :dark="isDarkMode">
<!--      Header -->
      <div class="head">
        <div class="left">
          <h1 class="monospaced">{{ average | asAverage }}</h1>
        </div>
        <div class="right">
          <div class="button set-picker" @click="$bus.$emit('show-set-picker-dialog', currentSet.name)" v-ripple>
            <v-icon>school</v-icon>
            <span>{{ currentSet }}</span>
          </div>
          <div class="button clear" @click="onClearClicked" v-ripple>
            <v-icon>delete</v-icon>
            <span>clear</span>
          </div>
        </div>
      </div>

<!--      Body -->
      <div class="body">
        <transition-group name="list" tag="div">
          <subject-card v-for="(subject, i) in currentSubjects"
                        :key="subject.name"
                        :subject-id="i"
                        :subject="subject.name"
                        :units="subject.units"/>
        </transition-group>
      </div>

<!--      Dialogs -->
      <grade-picker-dialog :transmute="false"/>
      <set-picker-dialog/>

<!--      Snackbar -->
      <v-snackbar v-model="clearedGrades"
                  :top="true" :timeout="3000">Cleared grades</v-snackbar>
    </div>
</template>

<style scoped lang="stylus">
  @import '../styles/routes/Calc'
</style>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Component } from 'vue-property-decorator'
import { Subject } from '@/store/subjects'
import SubjectCard from '@/components/SubjectCard.vue'
import { VIcon, VSnackbar } from 'vuetify/lib'

@Component({
  components: {
    SubjectCard,
    // Vuetify
    VIcon, VSnackbar,
  },
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
