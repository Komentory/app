<template>
  <div class="container px-2 py-4 sm:px-0 sm:py-0">
    <div class="grid items-center justify-center h-screen sm:w-screen">
      <div class="py-6 px-6 sm:py-8 sm:px-8 xl:py-10 mx-auto block-item shadow-lg">
        <div class="w-72">
          <h1 class="mb-8 text-center">Yes, it works!</h1>
          <div class="text-center">
            <p><strong>Friend</strong>, you're successfully logged in to the Komentory project!</p>
            <p class="text-sm">
              You will be moved to your account in <strong>3</strong> seconds. If not, please click the button below for
              manual redirect.
            </p>
          </div>
          <div class="mt-8">
            <Button @click="() => $router.replace({ name: 'account' })" :tabIndex="1" class="w-full">
              Go to your account
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '__/components'

export default defineComponent({
  name: 'UserLoginSuccess',
  components: {
    Button,
  },
  setup: () => {
    // Define needed instances.
    const router = useRouter()
    // Define needed variables.
    const redirect = setInterval(async () => await router.replace({ name: 'account' }), 3000)
    // Define needed lifecycle hooks.
    onMounted(() => redirect)
    onUnmounted(() => clearInterval(redirect))
  },
})
</script>