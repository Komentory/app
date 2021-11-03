<template>
  <div class="inline-flex items-center space-x-2">
    <img
      :src="avatar_url ? avatar_url : String(defaultUserImage)"
      :class="pictureSize"
      class="border-2 bg-main border-secondary rounded-full"
      alt="user picture"
    />
    <div>
      <router-link :to="{ name: 'user-details', params: { id } }">{{ full_name }}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { defaultUserImage } from '__/helpers'

export default defineComponent({
  name: 'AuthorCard',
  props: {
    id: { type: String, required: true },
    full_name: { type: String, required: true },
    avatar_url: { type: String, default: '' },
    pictureSize: { type: String, default: 'h-8 w-8' },
  },
  setup: () => {
    return { defaultUserImage }
  },
})
</script>