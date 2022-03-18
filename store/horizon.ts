import { defineStore } from "pinia"

export const useHorizonStore = defineStore({
  // id is required so that Pinia can connect the store to the devtools
  id: "horizon-store",
  state: () => ({}),
  getters: {
    hasHorizon: (state) => true,
  },
  actions: {},
})
