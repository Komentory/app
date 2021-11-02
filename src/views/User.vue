<template>User</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'User',
  props: {
    id: { type: String, required: true },
  },
})
</script>