<template>
  <span v-html="emoji" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Emoji',
  props: {
    id: { type: String, required: true },
  },
  setup: (props) => {
    const emoji = `&#${props.id};`
    return { emoji }
  },
})
</script>

<style scoped>
span {
  font-size: inherit;
}
</style>