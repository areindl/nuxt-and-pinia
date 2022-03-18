<template>
  <div class="p-10 space-y-10">
    <h1 class="font-bold text-5xl font-sans text-gray-700">Cycle Store</h1>
    <button v-if="!hasCycles" @click="loadData" class="bg-green-300 rounded shadow-sm px-5 py-2 hover:bg-green-400">
      Load Data
    </button>

    <div class="space-y-5 max-w-md" v-if="hasCycles">
      <p>Item with ID=1:</p>
      <p v-if="cycleOne" class="bg-gray-200 rounded-md p-2">{{ cycleOne.id }} - {{ cycleOne.title }}</p>
      <div>
        <p class="font-bold">All Items:</p>
        <ul class="list-disc space-y-1 pl-8">
          <li v-for="cycle in cycles">{{ cycle.title }}</li>
        </ul>
      </div>

      <div>{{ otherGetter }}</div>

      <div class="space-x-3">
        <button @click="resetStore" class="bg-red-300 rounded shadow-sm px-5 py-2 hover:bg-red-400">Reset Store</button>

        <button @click="deleteLastItem" class="bg-orange-300 rounded shadow-sm px-5 py-2 hover:bg-orange-400">
          Pop Cycle
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCycleStore } from "~/store/cycle"
import { reactive, computed } from "vue"

const cycleStore = useCycleStore()

const cycles = computed(() => {
  return cycleStore.cycles
})

const hasCycles = computed(() => {
  return cycleStore.hasCycles
})

const otherGetter = computed(() => {
  return cycleStore.otherGetter
})

const cycleOne = computed(() => {
  return getCycleById(1)
})

const getCycleById = cycleStore.getCycleById

const acticeCycle = cycleStore.activeCycle

const loadData = () => {
  console.log("loadData")
  cycleStore.loadCycles()
}

const deleteLastItem = () => {
  console.log("pop cycle")
  cycleStore.deleteLastItem()
}

const resetStore = () => {
  console.log("resetStore")
  cycleStore.clearCycles()
}

/**
 * Subscribe to store mutations.
 *  The handler is called after every mutation and receives the mutation descriptor and post-mutation state as arguments.
 */
cycleStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // same as cycleStore.$id
  mutation.storeId // 'cart'
  // only available with mutation.type === 'patch object'

  console.log("cycleStore.$subscribe", mutation, state)
})
</script>
