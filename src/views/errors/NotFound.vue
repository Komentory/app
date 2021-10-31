<template>
  <div class="container px-2 py-4 sm:px-0 sm:py-0">
    <div class="grid items-center justify-center h-screen sm:w-screen">
      <div class="py-6 px-6 sm:py-8 sm:px-8 xl:py-10 mx-auto block-item shadow-lg">
        <div class="w-72">
          <h1 class="mb-8 text-center">Oops! 404...</h1>
          <div class="text-center">
            <p class="my-4">
              Page <strong>{{ $router.currentRoute.value.path }}</strong> is not found!
            </p>
            <p class="text-sm">
              If you see this error often, email our team at
              <a href="mailto:team@komentory.com?subject=404">team@komentory.com</a>. We'll fix it!
            </p>
          </div>
          <div class="mt-8">
            <Button @click="() => $router.replace({ name: 'index' })" :tabIndex="1" class="w-full">
              Go to index page
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from '__/components'

export default defineComponent({
  name: 'NotFound',
  components: {
    Button,
  },
})
</script>