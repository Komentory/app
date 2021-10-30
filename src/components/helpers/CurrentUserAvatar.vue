<template>
  <img
    :src="user.user_metadata?.picture ? user.user_metadata?.picture : defaultUserImage"
    class="w-10 h-10 mx-auto border-2 rounded-full bg-secondary-dark border-secondary-light dark:border-main"
    alt="user picture"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { defaultUserImage } from '__/helpers'

export default defineComponent({
  name: 'CurrentUserAvatar',
  computed: {
    ...mapState(['user']),
  },
  setup: () => {
    return { defaultUserImage }
  },
})
</script>