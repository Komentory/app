<template>
  <label :for="id">
    <p>{{ label }} {{ isRequired ? '*' : '' }}</p>
    <input
      @input="$emit('update:modelValue', handleInputChange($event))"
      :class="[
        'px-4 py-3 text-base border-2 rounded-lg h-full w-full',
        'text-secondary-darker placeholder-gray-300',
        'dark:placeholder-gray-500 dark:bg-secondary dark:border-secondary-dark',
        'disabled:cursor-not-allowed',
        regExpPattern?.test(modelValue) ? '' : 'text-red',
      ]"
      :id="id"
      :type="inputType"
      :tabindex="tabIndex"
      :placeholder="placeholder"
      :value="modelValue"
      :autocomplete="autocomplete"
      :required="isRequired"
      :disabled="isDisabled"
    />
  </label>
  <p v-if="helpText" class="italic text-left text-xs">{{ helpText }}</p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

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
    autocomplete: { type: String, default: 'on' },
    isRequired: { type: Boolean, default: false },
    isDisabled: { type: Boolean, default: false },
  },
  setup: (props) => {
    // Define needed variables.
    const regExpPattern = ref<RegExp>()
    // Switch by input type.
    switch (props.inputType) {
      case 'email':
        regExpPattern.value = /.+@.+\..+/i // email address, like mail@example.com
        break
      default:
        regExpPattern.value = /.+/i // any characters or numbers
    }
    // Define event handler for input change.
    const handleInputChange = (event: Event) => (event.target as HTMLInputElement).value
    // Return instances and variables.
    return { regExpPattern, handleInputChange }
  },
})
</script>