<template>
  <v-card class="subject" :dark="isDarkMode" :class="inTransmuteMode ? 'full-width' : ''">
    <div class="subject-content" :dark="isDarkMode">
      <div class="label">
        <p class="body-2 font-weight-medium">
          {{ subject }} <span v-if="units" class="units">&bull; {{ units }} unit{{ units !== 1.0 ? 's' : '' }}</span>
        </p>
      </div>
      <div class="value" v-ripple @click="onEditClicked">
        <h2 class="monospaced">{{ grade | asGrade }}</h2>
        <v-icon>arrow_drop_down</v-icon>
      </div>
      <div class="controls">
        <v-btn class="minus elevation-0" fab small :color="buttonColor" :dark="isDarkMode"
               @click="$store.dispatch('decrement', { id: subjectId, inTransmuteMode })">
          <v-icon color="black">remove</v-icon>
        </v-btn>
        <v-btn class="plus elevation-0" fab small :color="buttonColor" :dark="isDarkMode"
               @click="$store.dispatch('increment', { id: subjectId, inTransmuteMode })">
          <v-icon color="black">add</v-icon>
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
@import '../styles/components/SubjectCard';
</style>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  computed: mapState(['isDarkMode']),
})
export default class SubjectCard extends Vue {
  @Prop({ required: true }) public readonly subject: string | undefined
  @Prop({ required: true }) public readonly subjectId: number | undefined
  @Prop({ default: 0 })     public readonly units: number | undefined
  @Prop({ default: false }) public readonly inTransmuteMode: boolean | undefined

  public isDarkMode!: boolean

  public created() {
    this.$bus.$on('grade-picked', (payload: any) => {
      const { subjectId, transmute, value } = payload

      // Check if we're meant to be receiving this
      if (this.subjectId === subjectId && this.inTransmuteMode === transmute) {
        this.$store.commit(transmute ? 'updateTransmuteGrade' : 'updateGrade', { id: subjectId, grade: value })
      }
    })
  }

  public onEditClicked() {
    this.$bus.$emit('show-grade-picker-dialog', {
      id: this.subjectId,
      name: this.subject,
      transmute: this.inTransmuteMode,
      grade: this.grade,
    })
  }

  get buttonColor(): string {
    return this.isDarkMode ? 'orange darken-3' : 'orange lighten-4'
  }
  get grade(): number {
    return (this.inTransmuteMode ? this.$store.getters.transmuteGrades
                                 : this.$store.getters.grades)[this.subjectId!]
  }
}
</script>
