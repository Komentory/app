<template>
  <!-- 🔐	-->
  <Emoji id="128272" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Emoji from '__/components/emoji/Emoji.vue'

export default defineComponent({
  name: 'EmojiOtherLockWithKey',
  components: {
    Emoji,
  },
})
</script>