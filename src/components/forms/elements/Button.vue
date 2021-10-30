<template>
  <button
    :class="[
      bg.light,
      border.light,
      text.light,
      hover.light,
      bg.dark,
      border.dark,
      text.dark,
      hover.dark,
      'px-6 pt-3 pb-2.5 font-medium border-b-4 rounded-lg',
    ]"
    :tabindex="tabIndex"
  >
    <slot>Button Text</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Button',
  props: {
    action: { type: String, default: '' },
    tabIndex: { type: Number, required: true },
  },
  setup: (props) => {
    // Define needed variables.
    const style = ref({
      bg: { light: '', dark: '' },
      text: { light: '', dark: '' },
      border: { light: '', dark: '' },
      hover: { light: '', dark: '' },
    })

    // Define styles for button.
    switch (props.action) {
      case 'success':
        style.value = {
          bg: { light: 'bg-main', dark: 'dark:bg-secondary-dark' },
          text: { light: 'text-white', dark: 'dark:text-secondary' },
          border: { light: 'border-main-dark', dark: 'dark:border-main' },
          hover: {
            light: 'hover:bg-secondary hover:text-secondary-dark hover:border-transparent',
            dark: 'dark:hover:bg-main dark:hover:text-secondary-light dark:hover:border-transparent',
          },
        }
        break
      case 'info':
        style.value = {
          bg: { light: 'bg-blue-500', dark: 'dark:bg-secondary-dark' },
          text: { light: 'text-white', dark: 'dark:text-secondary' },
          border: { light: 'border-blue-700', dark: 'dark:border-blue' },
          hover: {
            light: 'hover:bg-secondary hover:text-secondary-dark hover:border-transparent',
            dark: 'dark:hover:bg-blue dark:hover:text-secondary-light dark:hover:border-transparent',
          },
        }
        break
      case 'warning':
        style.value = {
          bg: { light: 'bg-yellow-500', dark: 'dark:bg-secondary-dark' },
          text: { light: 'text-white', dark: 'dark:text-secondary' },
          border: { light: 'border-yellow-700', dark: 'dark:border-yellow' },
          hover: {
            light: 'hover:bg-secondary hover:text-secondary-dark hover:border-transparent',
            dark: 'dark:hover:bg-yellow dark:hover:text-secondary-light dark:hover:border-transparent',
          },
        }
        break
      case 'error':
        style.value = {
          bg: { light: 'bg-red-500', dark: 'dark:bg-secondary-dark' },
          text: { light: 'text-white', dark: 'dark:text-secondary' },
          border: { light: 'border-red-700', dark: 'dark:border-red' },
          hover: {
            light: 'hover:bg-secondary hover:text-secondary-dark hover:border-transparent',
            dark: 'dark:hover:bg-red dark:hover:text-secondary-light dark:hover:border-transparent',
          },
        }
      default:
        style.value = {
          bg: { light: 'bg-secondary', dark: 'dark:bg-secondary-dark' },
          text: { light: 'text-secondary-dark', dark: 'dark:text-secondary' },
          border: { light: 'border-secondary-dark', dark: 'dark:border-secondary' },
          hover: {
            light: 'hover:bg-secondary-dark hover:text-secondary hover:border-transparent',
            dark: 'dark:hover:bg-secondary dark:hover:text-secondary-darker dark:hover:border-transparent',
          },
        }
        break
    }

    // Return variables.
    return { bg: style.value.bg, border: style.value.border, text: style.value.text, hover: style.value.hover }
  },
})
</script>