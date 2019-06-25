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

function getInitialState(): { [key: string]: any } {
  return {
    currentSet: 'PSHS Grade 7',
    customSets: {},
    grades: new Array(9).fill(1),
    transmuteGrades: new Array(2).fill(1),
    isDarkMode: false,
  }
}

export default new Vuex.Store({
  plugins: [ vuexLocal.plugin ],
  state: getInitialState(),
  mutations: {
    deleteSet: (state: any, key) => Vue.delete(state.customSets, key),
    saveSet: (state, { name, subjects }) => Vue.set(state.customSets, name, subjects),
    popGrade: (state) => state.grades.pop(),
    reset: (state) => {
      const initialState = getInitialState()
      Object.keys(initialState).forEach((key) => {
        Vue.set(state, key, initialState[key])
      })
    },
    updateCurrentSet: (state, set) => state.currentSet = set,
    updateDarkMode: (state, mode) => state.isDarkMode = mode,
    updateGrade: (state, { id, grade }) => Vue.set(state.grades, id, grade),
    updateTransmuteGrade: (state, { id, grade }) => Vue.set(state.transmuteGrades, id, grade),
  },
  getters: {
    currentSet: (state) => state.currentSet,
    currentSetSubjects(state) {
      const set = state.currentSet
      return Subjects.has(set) ? Subjects.get(set) : state.customSets[set]
    },
    allCustomSets: (state) => state.customSets,
    customSets: (state) => Array.from(Object.keys(state.customSets)),
    grades: (state) => state.grades,
    transmuteGrades: (state) => state.transmuteGrades,
    isDarkMode: (state) => state.isDarkMode,
    pshsSets: () => setNames,
  },
  actions: {
    clearAllData: ({ commit }) => commit('reset'),
    deleteSet({ state, commit, dispatch }, set) {
      if (state.currentSet === set) {
        dispatch('updateCurrentSet', 'PSHS Grade 7').then(() => {
          commit('deleteSet', set)
        })
      } else {
        commit('deleteSet', set)
      }
    },
    decrement({ commit, state }, { id, inTransmuteMode }) {
      let grade = (inTransmuteMode ? state.transmuteGrades : state.grades)[id]

      // Decrease value (i.e. higher grade)
      if (grade > 1) {
        if (grade > 3) {
          grade -= 1
        } else {
          grade -= 0.25
        }

        commit(inTransmuteMode ? 'updateTransmuteGrade' : 'updateGrade', { id, grade })
      }
    },
    increment({ commit, state }, { id, inTransmuteMode }) {
      let grade = (inTransmuteMode ? state.transmuteGrades : state.grades)[id]

      // Increase value (i.e. lower grade)
      if (grade < 5) {
        if (grade > 2.75) {
          grade += 1
        } else {
          grade += 0.25
        }

        commit(inTransmuteMode ? 'updateTransmuteGrade' : 'updateGrade', { id, grade })
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
