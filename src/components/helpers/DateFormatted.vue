<template>
  <div class="inline-flex items-center space-x-2">
    <div class="inline-flex items-center space-x-1">
      <CalendarIcon :class="iconSize" />
      <div>{{ dateFormatted }}</div>
    </div>
    <div v-if="withTime" class="inline-flex items-center space-x-1">
      <ClockIcon :class="iconSize" />
      <div>{{ timeFormatted }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CalendarIcon, ClockIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'DateFormatted',
  components: {
    CalendarIcon,
    ClockIcon,
  },
  props: {
    date: { type: String, required: true },
    iconSize: { type: String, required: true },
    locale: { type: String, default: 'en' },
    withTime: { type: Boolean, default: false },
  },
  setup: (props) => {
    // Define needed variables.
    const date = new Date(props.date)

    // Formatted date.
    const dateFormatted = date.toLocaleDateString(props.locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    // Formatted time.
    const timeFormatted = date.toLocaleTimeString(props.locale, {
      hour: '2-digit',
      minute: '2-digit',
    })

    // Return instances and lifecycle hooks.
    return { dateFormatted, timeFormatted }
  },
})
</script>