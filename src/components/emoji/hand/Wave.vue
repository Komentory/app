<template>
  <!-- 👋 -->
  <Emoji id="128075" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Emoji from '__/components/emoji/Emoji.vue'

export default defineComponent({
  name: 'EmojiHandWave',
  components: {
    Emoji,
  },
})
</script>