/**
 *  Pinia Store
 */
import { defineStore } from "pinia"
import { useHorizonStore } from "./horizon"

interface State {
  cycles: Cycle[]
}

interface Cycle {
  userId: number
  id: number
  title: string
  completed: boolean
}

export const useCycleStore = defineStore({
  id: "cycle-store",

  // convert to a function
  state: (): State => ({
    cycles: [],
  }),

  // Convert Actions
  actions: {
    // no context as first argument, use `this` instead
    async loadCycles() {
      if (this.cycles.length > 0) return "Cycles already loaded"
      const response = await fetch("https://jsonplaceholder.typicode.com/todos")
      let data = <Cycle[]>await response.json()
      data = data.slice(0, 10)

      this.updateCycles(data)
    },

    deleteLastItem() {
      this.cycles.pop()
    },

    // mutations can now become actions, instead of `state` as first argument use `this`
    updateCycles(payload) {
      this.cycles = payload
    },

    // Easily clear store
    clearCycles() {
      this.$reset()
    },
  },

  // Convert Getters
  getters: {
    hasCycles: (state) => state.cycles.length > 0,

    getCycles: (state) => {
      return state.cycles
    },

    activeCycle: (state) => {
      return state.cycles.find((cycle) => cycle.completed)
    },

    // Passing Arguments to Getters
    /* getCycle: (state) => (cycleId) => {
      return state.cycles.find((cycle) => cycle.id === cycleId)
    },*/
    getCycleById: (state) => {
      return (cycleId) => state.cycles.find((cycle) => cycle.id === cycleId)
    },

    // ACCESSING OTHER GETTERS
    getActiveCycleTitle() {
      // autocompletion ✨
      return this.activeCycle?.title
    },

    // ACCESSING GETTER FROM ANOTHER STORE
    otherGetter(state) {
      const horizonStore = useHorizonStore()
      return horizonStore.hasHorizon ? "Horizon is working" : "Horizon is not working"
    },
  },
})
