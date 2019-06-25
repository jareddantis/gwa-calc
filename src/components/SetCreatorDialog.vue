<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>
        <span class="title">{{ updating ? 'Edit subject set'
                                        : 'Create subject set' }}</span>
      </v-card-title>

      <v-card-text>
        <v-text-field ref="setname" label="Subject set name" color="orange"
                      v-model="name" counter="30" maxlength="30"
                      :rules="[rules.setName, rules.required]"
                      hint="Example: UPD BSCS First Year"></v-text-field>

        <div class="set-body">
          <div class="subject"
               v-for="(subject, index) in subjects"
               :key="ids[index]">
            <div class="subject-handle">
              <v-icon>drag_indicator</v-icon>
            </div>
            <div class="subject-name">
              <v-text-field label="Subject name" color="orange" outline
                            :rules="[rules.subjectName, rules.required]"
                            v-model="subject.name" counter="20"
                            maxlength="20" ref="subjectname"></v-text-field>
            </div>
            <div class="subject-units">
              <v-text-field label="Units" color="orange"
                            outline :rules="[rules.units, rules.required]"
                            v-model="subject.units" ref="subjectunits"></v-text-field>
            </div>
            <div class="subject-delete" @click="removeSubject(index)">
              <v-icon>clear</v-icon>
            </div>
          </div>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn flat @click="addSubject">Add row</v-btn>
        <v-spacer></v-spacer>
        <v-btn flat @click="dialog = false">Cancel</v-btn>
        <v-btn flat @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Sortable from 'sortablejs'
import { Component } from 'vue-property-decorator'
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VDialog,
  VIcon, VSpacer, VTextField } from 'vuetify/lib'

@Component({
  components: { VBtn, VCard, VCardActions, VCardText, VCardTitle, VDialog,
    VIcon, VTextField, VSpacer },
})
export default class SetCreatorDialog extends Vue {
  public subjects: any[] = []
  public ids: string[] = []
  public name: string = ''
  public updating: boolean = false
  public dialog: boolean = false
  public rules = {
    required: (value: any) => !!value || 'Required',
    setName: (value: string) => {
      const customSets = this.$store.getters.customSets

      // No duplicate set allowed
      return !customSets.hasOwnProperty(value) || 'Subject set already exists'
    },
    subjectName: (value: string) => {
      // No duplicate subject allowed
      return this.subjectNames.filter((name) => name === value).length < 2
        || 'Subject already exists'
    },
    units: (value: any) => !isNaN(value) || 'Invalid number',
  }

  public created() {
    this.$bus.$on('create-new-set', () => {
      this.resetState()
      this.addSubject()
      this.name = ''
      this.updating = false
      this.dialog = true
    })
    this.$bus.$on('edit-custom-set', (set: string) => {
      this.resetState()
      this.populate(set)
      this.name = set
      this.updating = true
      this.dialog = true
    })
  }

  public mounted() {
    const table = document.querySelector('.set-body') as HTMLDivElement
    Sortable.create(table, {
      handle: '.subject-handle',
      onEnd: ({ oldIndex, newIndex }) => {
        const movedSubject = this.subjects.splice(oldIndex!, 1)[0]
        const movedId = this.ids.splice(oldIndex!, 1)[0]
        this.subjects.splice(newIndex!, 0, movedSubject)
        this.ids.splice(newIndex!, 0, movedId)
      },
    })
  }

  public populate(set: string) {
    const subjects = this.$store.getters.allCustomSets[set]

    for (const subject of subjects) {
      this.subjects.push(subject)
      this.ids.push(Math.random().toString(36).substring(2, 15))
    }
  }

  public resetState() {
    // Empty subjects in case dialog is shown again
    for (const subject of this.subjects) {
      this.subjects.pop()
      this.ids.pop()
    }
  }

  public addSubject() {
    this.subjects.push({ name: '', units: '' })
    this.ids.push(Date.now().toString())
  }

  public removeSubject(index: number) {
    if (this.subjects.length === 1) {
      // Empty the subject if there is only one left
      this.subjects[0].name = ''
      this.subjects[0].units = ''
    } else {
      this.subjects.splice(index, 1)
      this.ids.splice(index, 1)
    }
  }

  public save() {
    const { name, subjects } = this

    // Name must not be blank
    if (name.length === 0) {
      (this.$refs.setname as HTMLElement).focus()
      return
    }

    // All fields must be valid
    const nameFields = this.$refs.subjectname as any[]
    const unitFields = this.$refs.subjectunits as any[]
    const fields = nameFields.concat(unitFields)
    for (const field of fields) {
      if (!field.validate()) {
        field.focus()
        return
      }
    }

    this.$store.commit('saveSet', { name, subjects })
    this.$bus.$emit('show-set-picker-dialog')
    this.dialog = false
  }

  get subjectNames(): string[] {
    const names = []

    for (const subject of this.subjects) {
      names.push(subject.name)
    }

    return names
  }
}
</script>

<style scoped lang="stylus">
  @import '../styles/components/SetCreatorDialog'
</style>
