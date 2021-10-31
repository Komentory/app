<template>
  <svg :width="width" :height="height" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g v-if="iconType === 'secondary'">
      <rect height="66" rx="21" fill="#f6f4ef" stroke="#00ab55" stroke-width="2" width="66" x="1" y="1" />
      <path
        d="m51.604 54.5858-7.128-11.7-3.312 4.032v7.668h-4.572v-25.2h4.572v11.556l8.964-11.556h5.328l-7.992 9.792 9.144 15.408z"
        fill="#00ab55"
      />
    </g>
    <g v-else-if="iconType === 'secondary-transparent'">
      <rect height="66" rx="21" stroke="#00ab55" stroke-width="2" width="66" x="1" y="1" />
      <path
        d="m51.604 54.5858-7.128-11.7-3.312 4.032v7.668h-4.572v-25.2h4.572v11.556l8.964-11.556h5.328l-7.992 9.792 9.144 15.408z"
        fill="#00ab55"
      />
    </g>
    <g v-else>
      <rect height="66" width="66" rx="21" fill="#00ab55" stroke="#f6f4ef" stroke-width="2" x="1" y="1" />
      <path
        d="m51.604 54.5858-7.128-11.7-3.312 4.032v7.668h-4.572v-25.2h4.572v11.556l8.964-11.556h5.328l-7.992 9.792 9.144 15.408z"
        fill="#f6f4ef"
      />
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LogoKomentoryIcon',
  props: {
    iconType: { type: String, default: '' },
    width: { type: Number, default: 46 },
    height: { type: Number, default: 46 },
  },
})
</script>