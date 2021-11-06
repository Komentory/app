<template>
  <main>
    <div class="grid-wrapper">
      <div class="grid-container">
        <h1 class="text-4xl">Projects</h1>
        <div class="h-10"></div>
        <div class="grid-inner-items gap-4">
          <SuspenseWithError>
            <template #default><ProjectsList /></template>
            <template #fallback><ProjectLoader /></template>
            <template #error><h1>I failed to load</h1></template>
          </SuspenseWithError>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
import { SuspenseWithError } from '__/components'

export default defineComponent({
  name: 'Projects',
  components: {
    SuspenseWithError,
    ProjectLoader: defineAsyncComponent(() => import('__/components/loaders/ProjectLoader.vue')),
    ProjectsList: defineAsyncComponent(() => import('__/controllers/ProjectsList.vue')),
  },
})
</script>
