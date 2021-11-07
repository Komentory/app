<template>
  <main>
    <div class="grid-wrapper">
      <div class="grid-container">
        <ul class="inline-flex items-center space-x-2">
          <li>
            <router-link :to="{ name: 'index' }"><HomeIcon class="h-6 w-6" /></router-link>
          </li>
          <li class="text-secondary-dark">&mdash;</li>
          <li><router-link :to="{ name: 'projects' }">Projects</router-link></li>
        </ul>
        <SuspenseWithError>
          <template #default><ProjectContent :projectId="id" /></template>
          <template #fallback><ProjectContentLoader /></template>
          <template #error><h1>I failed to load</h1></template>
        </SuspenseWithError>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
import { HomeIcon } from '@heroicons/vue/outline'
import { SuspenseWithError } from '__/components'

export default defineComponent({
  name: 'Project',
  props: {
    id: { type: String, required: true },
  },
  components: {
    HomeIcon,
    SuspenseWithError,
    ProjectContent: defineAsyncComponent(() => import('__/controllers/ProjectContent.vue')),
    ProjectContentLoader: defineAsyncComponent(() => import('__/components/loaders/ProjectContentLoader.vue')),
  },
})
</script>
