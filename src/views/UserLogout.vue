<template>
  <div class="container px-2 py-4 sm:px-0 sm:py-0">
    <div class="grid items-center justify-center h-screen sm:w-screen">
      <div class="py-6 px-6 sm:py-8 sm:px-8 xl:py-10 mx-auto block-item shadow-lg">
        <div class="w-64">
          <h1 class="mb-8 text-center">Oh, wait...</h1>
          <div class="text-center"><strong>Friend</strong>, you're already logged out!</div>
          <div class="mt-8">
            <Button @click="() => $router.replace({ name: 'login' })" :tabIndex="1" class="w-full">
              Go to login page
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from '__/store'
import { LOGOUT_ACTION } from '__/store-constants'
import { Button } from '__/components'

export default defineComponent({
  name: 'UserLogout',
  components: {
    Button,
  },
  setup: () => {
    // Define needed instances.
    const store = useStore()
    // Proceed user logout.
    onMounted(async () => await store.dispatch(LOGOUT_ACTION))
  },
})
</script>