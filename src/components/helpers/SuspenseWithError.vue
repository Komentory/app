<template>
  <slot v-if="error" name="error"></slot>
  <Suspense v-else>
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #fallback>
      <slot name="fallback"></slot>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from 'vue'

export default defineComponent({
  name: 'SuspenseWithError',
  setup: () => {
    // Define needed instances.
    const error = ref<Error>()
    // Catch any errors.
    onErrorCaptured((e: Error) => {
      error.value = e
      return true
    })
    // Return instances and variables.
    return { error }
  },
})
</script>