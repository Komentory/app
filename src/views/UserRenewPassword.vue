<template>
  <div class="px-2 py-4 sm:px-0 sm:py-0">
    <div class="grid items-center justify-center h-screen sm:w-screen">
      <div class="py-6 px-6 sm:py-8 sm:px-8 xl:py-10 mx-auto block-item shadow-lg"><UserRenewPasswordForm /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UserRenewPasswordForm } from '__/components'

export default defineComponent({
  name: 'UserRenewPassword',
  components: {
    UserRenewPasswordForm,
  },
})
</script>