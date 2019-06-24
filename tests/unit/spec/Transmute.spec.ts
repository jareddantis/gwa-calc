import Vuex from 'vuex'
import localVue from '../local.vue'
import { shallowMount } from '@vue/test-utils'
import Transmute from '@/routes/Transmute.vue'

describe('Transmute.vue', () => {
  const values = [1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 4, 5]
  const expected = [
    [1, 1.25, 1.25, 1.5, 1.75, 1.75, 2, 2.25, 2.25, 3, 4],
    [1, 1.25, 1.5, 1.5, 1.75, 2, 2, 2.25, 2.5, 3, 4],
    [1.25, 1.25, 1.5, 1.75, 1.75, 2, 2.25, 2.25, 2.5, 3, 4],
    [1.25, 1.5, 1.5, 1.75, 2, 2, 2.25, 2.5, 2.5, 3, 4],
    [1.25, 1.5, 1.75, 1.75, 2, 2.25, 2.25, 2.5, 2.75, 3, 4],
    [1.5, 1.5, 1.75, 2, 2, 2.25, 2.5, 2.5, 2.75, 3, 4],
    [1.5, 1.75, 1.75, 2, 2.25, 2.25, 2.5, 2.75, 2.75, 3, 4],
    [1.5, 1.75, 2, 2, 2.25, 2.5, 2.5, 2.75, 3, 4, 4],
    [1.75, 1.75, 2, 2.25, 2.25, 2.5, 2.75, 2.75, 3, 4, 4],
    [2, 2.25, 2.25, 2.5, 2.75, 2.75, 3, 3, 3, 4, 5],
    [2.25, 2.5, 2.75, 2.75, 3, 3, 3, 3, 4, 4, 5],
  ]
  let store: any

  beforeEach(() => {
    store = new Vuex.Store({
      state: { isDarkMode: false },
      getters: { transmuteGrades: () => [1, 1] },
    })
  })

  for (let i = 0; i < values.length; i++) {
    const previous = values[i]

    for (let j = 0; j < values.length; j++) {
      const current = values[j]
      const expectedFinal = expected[i][j]

      it(`Prev ${previous}, Curr ${current}, Exp ${expectedFinal}`, () => {
        const wrapper = shallowMount(Transmute, { localVue, store })
        // @ts-ignore
        expect(wrapper.vm.compute(previous, current)).toEqual(expectedFinal)
      })
    }
  }
})
