<template>
  <v-card class="subject" :dark="isDarkMode" :class="inTransmuteMode ? 'full-width' : ''">
    <div class="subject-content" :dark="isDarkMode">
      <div class="label">
        <p class="body-2">
          {{ subject }} <span v-if="units" class="units">&bull; {{ units }} unit{{ units !== 1.0 ? 's' : '' }}</span>
        </p>
      </div>
      <div class="value">
        <h2 class="monospaced">{{ grade | asGrade }}</h2>
      </div>
      <div class="controls">
        <div class="button edit" @click="onEditClicked" v-ripple>
          <v-icon>edit</v-icon>
        </div>
        <div class="button minus" @click="$store.dispatch('decrement', subjectId)" v-ripple>
          <v-icon>remove</v-icon>
        </div>
        <div class="button plus" @click="$store.dispatch('increment', subjectId)" v-ripple>
          <v-icon>add</v-icon>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style scoped lang="stylus">
  @import '../styles/components/SubjectCard'
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

  public isDarkMode!: boolean
  private transmuteGrade: number = 1

  public created() {
    this.$bus.$on('grade-picked', (payload: any) => {
      const { subjectId, transmute, value } = payload

      // Check if we're meant to be receiving this
      if (this.subjectId === subjectId && this.inTransmuteMode === transmute) {
        this.$store.commit('updateGrade', { id: subjectId, grade: value })
      }
    })
  }

  public onEditClicked() {
    this.$bus.$emit('show-grade-picker-dialog', { id: this.subjectId, transmute: this.inTransmuteMode })
  }

  get grade(): number {
    if (!this.inTransmuteMode) {
      return this.$store.getters.grades[this.subjectId!]
    } else {
      return this.transmuteGrade
    }
  }
  get inTransmuteMode(): boolean {
    return this.$route.fullPath.includes('/transmute')
  }
}
</script>
