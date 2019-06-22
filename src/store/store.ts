import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import localforage from 'localforage'
import Subjects, { setNames } from './subjects'

Vue.use(Vuex)

const vuexLocal = new VuexPersist({
  key: 'gwa-calc',
  storage: localforage,
})

export default new Vuex.Store({
  plugins: [ vuexLocal.plugin ],
  state: {
    currentSet: 'PSHS Grade 7',
    customSets: new Map(),
    grades: new Array(9).fill(1),
    isDarkMode: false,
  },
  mutations: {
    deleteSet: (state: any, key) => state.customSets.delete(key),
    saveNewSet: (state, { name, subjects }) => state.customSets.set(name, subjects),
    popGrade: (state) => state.grades.pop(),
    updateCurrentSet: (state, set) => state.currentSet = set,
    updateDarkMode: (state, mode) => state.isDarkMode = mode,
    updateGrade: (state, { id, grade }) => Vue.set(state.grades, id, grade),
  },
  getters: {
    currentSet: (state) => state.currentSet,
    currentSetSubjects(state) {
      const set = state.currentSet
      return Subjects.has(set) ? Subjects.get(set) : state.customSets.get(set)
    },
    customSets: (state) => Array.from(Object.keys(state.customSets)),
    grades: (state) => state.grades,
    isDarkMode: (state) => state.isDarkMode,
    pshsSets: () => setNames,
  },
  actions: {
    decrement({ commit, state }, id) {
      let grade = state.grades[id]

      // Decrease value (i.e. higher grade)
      if (grade > 1) {
        if (grade > 3) {
          grade -= 1
        } else {
          grade -= 0.25
        }

        commit('updateGrade', { id, grade })
      }
    },
    increment({ commit, state }, id) {
      let grade = state.grades[id]

      // Increase value (i.e. lower grade)
      if (grade < 5) {
        if (grade > 2.75) {
          grade += 1
        } else {
          grade += 0.25
        }

        commit('updateGrade', { id, grade })
      }
    },
    clearGrades({ commit, state }, set) {
      // Empty array first
      for (const grade of state.grades) {
        commit('popGrade')
      }

      // Then repopulate with ones
      const newSet = set || state.currentSet
      const setLength = (Subjects.has(newSet) ? Subjects.get(newSet) : state.customSets.get(newSet)).length
      for (let id = 0; id < setLength; id++) {
        commit('updateGrade', { id, grade: 1 })
      }
    },
    updateCurrentSet: ({ commit, dispatch }, set) => {
      dispatch('clearGrades', set).then(() => {
        commit('updateCurrentSet', set)
      })
    },
  },
})
