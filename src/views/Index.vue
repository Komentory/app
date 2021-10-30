<template>
  <div class="grid grid-cols-1 sm:grid-cols-12 xl:grid-cols-24">
    <div class="sm:col-span-12 xl:col-start-7 mt-24">
      <div class="py-4 px-2 sm:px-6 lg:px-8">
        <h1 class="line-clamp-1 text-4xl">Index</h1>
      </div>
      <div class="py-4 px-2 sm:px-6 lg:px-8">
        <p>Dashboard.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Index',
})
</script>