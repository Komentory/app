<template>
  <p>
    <label :for="id">{{ label }} {{ isRequired ? '*' : '' }}</label>
  </p>
  <input
    @input="$emit('update:modelValue', handleInputChange($event))"
    :class="[
      'px-4 py-3 text-base border-2 rounded-lg h-full w-full',
      'text-secondary-darker placeholder-gray-300 dark:placeholder-gray-500 dark:bg-secondary dark:border-secondary-dark',
    ]"
    :id="id"
    :type="inputType"
    :tabindex="tabIndex"
    :placeholder="placeholder"
    :value="modelValue"
    :required="isRequired"
  />
  <p v-if="helpText" class="italic text-left text-xs">{{ helpText }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Input',
  props: {
    id: { type: String, required: true },
    label: { type: String, required: true },
    inputType: { type: String, required: true },
    tabIndex: { type: Number, required: true },
    helpText: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    modelValue: { type: String, default: '' },
    isRequired: { type: Boolean, default: false },
  },
  setup: () => {
    // Define event handler for input change.
    const handleInputChange = (event: Event) => (event.target as HTMLInputElement).value
    return { handleInputChange }
  },
})
</script>