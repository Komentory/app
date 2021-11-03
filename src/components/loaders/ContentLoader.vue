<template>
  <div class="animate-pulse">
    <div class="py-4">
      <div class="h-3 my-4 gradient-color-yellow-purple-red rounded-full w-1/6"></div>
      <div class="my-8 h-4 gradient-color-yellow-purple-red rounded-full w-4/5"></div>
      <div class="flex items-center space-x-2">
        <div class="h-8 w-8 gradient-color-yellow-purple-red rounded-full"></div>
        <div class="h-3 gradient-color-yellow-purple-red rounded-full w-1/12"></div>
        <div class="h-3 gradient-color-yellow-purple-red rounded-full w-1/6"></div>
      </div>
      <div class="my-6">
        <div class="my-4">
          <div class="h-3 my-2 gradient-color-yellow-purple-red rounded-full w-4/6"></div>
          <div class="h-3 my-2 gradient-color-yellow-purple-red rounded-full w-3/6"></div>
          <div class="h-3 my-2 gradient-color-yellow-purple-red rounded-full w-2/6"></div>
        </div>
      </div>
      <div class="my-4">
        <div class="h-3 my-2 gradient-color-yellow-purple-red rounded-full w-5/6"></div>
        <div class="h-3 my-2 gradient-color-yellow-purple-red rounded-full w-4/6"></div>
        <div class="h-3 my-2 gradient-color-yellow-purple-red rounded-full w-2/6"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContentLoader',
})
</script>