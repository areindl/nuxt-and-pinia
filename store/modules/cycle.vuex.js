/**
 *  Vuex Module
 */

export const namespaced = true
export const state = () => ({
  cycles: [],
})

const MUTATION = {
  SET_CYCLES: "SET_CYCLES",
  ADD_CYCLE: "ADD_CYCLE",
  UPDATE_CYCLE: "UPDATE_CYCLE",
  DELETE_CYCLE: "DELETE_CYCLE",
}

export const mutations = {
  [MUTATION.SET_CYCLES](state, cycles) {
    state.cycles = [...cycles]
  },
  [MUTATION.ADD_CYCLE](state, cycle) {
    state.cycles.push(cycle)
  },
  [MUTATION.UPDATE_CYCLE](state, payload) {
    const item = state.cycles.find((o) => o.id === payload.id)
    Object.assign(item, payload)
  },
  [MUTATION.DELETE_CYCLE](state, cycleId) {
    state.cycles = [...state.cycles.filter((cycle) => cycle.id !== cycleId)]
  },
}

export const actions = {
  /**
   *  @description: stores the cycles in the database
   */
  saveCycles({ commit, state }) {
    return new Promise((resolve, reject) => {
      reject(new Error("Not implemented"))
    })
  },

  /**
   *  @description: Get all items from the database
   *  @payload options {forceRefresh: Boolean}
   */
  async loadCycles({ commit, state, getters }, options = {}) {
    if (getters.hasCycles && !options.forceRefresh) {
      return state.cycles
    }

    const cycles = await this.$axios.$get("/cycle")
    if (cycles.length) commit(MUTATION.SET_CYCLES, cycles)
    return state.cycles
  },

  async createCycle({ commit, state, getters }, cycle) {
    const result = await this.$axios.$post("/cycle", cycle)
    commit(MUTATION.ADD_CYCLE, result)
    return result
  },

  async updateCycle({ commit }, { id, payload }) {
    const cycle = await this.$axios.$patch(`/cycle/${id}`, payload)
    commit(MUTATION.UPDATE_CYCLE, cycle)
    return cycle
  },

  async deleteCycle({ state, commit, getters }, { cycleId }) {
    await this.$axios.$delete(`/cycle/${cycleId}`)
    commit(MUTATION.DELETE_CYCLE, cycleId)
  },
}

export const getters = {
  activeCycle: (state) => {
    return state.cycles.find((cycle) => cycle.isActive)
  },

  getCycles: (state) => {
    return state.cycles
  },

  getNextCycles: (state) => {
    return state.cycles.filter((cycle) => cycle.isCompleted === false)
  },

  hasCycles: (state) => {
    return state.cycles.length > 0
  },

  getCycle: (state) => (cycleId) => {
    return state.cycles.find((cycle) => cycle.id === cycleId)
  },

  getCyclesByHorizon: (state) => (horizonId) => {
    return state.cycles.filter((cycle) => cycle.horizonId === horizonId)
  },
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters,
}
