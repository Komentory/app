<template>
  <div
    class="
      grid grid-cols-1
      sm:grid-cols-12
      xl:grid-cols-24
      w-full
      text-secondary-dark
      bg-secondary-darker
      dark:bg-secondary-darkest
    "
  >
    <div class="sm:col-span-12 xl:col-start-7">
      <div class="py-4 px-2 sm:px-6 lg:px-8">
        <div class="grid items-center text-center text-sm grid-cols-1 sm:grid-cols-12 gap-4">
          <div class="sm:col-span-2 sm:text-left">&copy; 2020-{{ new Date().getFullYear() }} Komentory.</div>
          <div class="sm:col-span-5 sm:text-left">
            Project originally developed by
            <a href="https://1wa.co" target="_blank" class="text-secondary-dark">True web artisans</a> team. Special
            thanks to all our
            <a href="https://github.com/Komentory" target="_blank" class="text-secondary-dark">GitHub</a> contributors,
            <a href="https://supabase.io" target="_blank" class="text-secondary-dark">Supabase</a> service and
            <a href="https://shostak.dev" target="_blank" class="text-secondary-dark">Vic Shóstak</a> for bringing this
            wonderful open source project to life.
          </div>
          <div class="sm:col-span-4">
            <div class="inline-flex items-center space-x-2">
              <router-link
                v-for="item in footerMenu"
                :key="item.to"
                :to="{ name: item.to }"
                class="text-secondary-dark"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>
          <div class="mx-auto">
            <router-link :to="{ name: 'index' }" class="no-border">
              <LogoKomentoryIcon :iconType="'secondary-transparent'" :width="36" :height="36" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LogoKomentoryIcon } from '__/icons'

export default defineComponent({
  name: 'FooterMenu',
  components: {
    LogoKomentoryIcon,
  },
  setup() {
    // Define footer menu items.
    const footerMenu = [
      { name: 'About', to: 'index' },
      { name: 'Blog', to: 'index' },
      { name: 'Get Started', to: 'get-started' },
      { name: 'Terms & Conditions', to: 'index' },
    ]

    // Return menu items.
    return { footerMenu }
  },
})
</script>