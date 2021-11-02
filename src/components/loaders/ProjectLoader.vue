<template>
  <div class="animate-pulse border border-blue-300 shadow rounded-3xl">
    <div class="bg-blue-400 h-24 rounded-t-3xl"></div>
    <div class="py-4 px-6">
      <div class="flex items-center space-x-2">
        <div class="h-7 w-7 bg-blue-400 rounded-full"></div>
        <div class="h-3 bg-blue-400 rounded-full w-1/3"></div>
      </div>
      <div class="my-6">
        <div class="h-3 bg-blue-400 rounded-full w-3/4"></div>
        <div class="my-4">
          <div class="h-3 my-2 bg-blue-400 rounded-full w-full"></div>
          <div class="h-3 my-2 bg-blue-400 rounded-full w-5/6"></div>
          <div class="h-3 my-2 bg-blue-400 rounded-full w-2/6"></div>
        </div>
      </div>
      <div class="my-4">
        <div class="h-11 bg-blue-400 rounded-lg w-full"></div>
        <div class="h-3 my-4 mx-auto bg-blue-400 rounded-full w-1/2"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProjectLoader',
})
</script>