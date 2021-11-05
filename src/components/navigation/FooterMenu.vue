<template>
  <footer>
    <div class="grid-wrapper">
      <div class="grid-container">
        <div class="p-4">
          <div class="grid-wrapper items-center text-center gap-4">
            <div class="copyright">
              <strong>&copy; 2020-{{ new Date().getFullYear() }} Komentory.</strong> Project originally developed by
              <a href="https://1wa.co" target="_blank">True web artisans</a> team. Special thanks to all our
              <a href="https://github.com/Komentory" target="_blank">GitHub</a>
              contributors, <a href="https://supabase.io" target="_blank">Supabase</a> and
              <a href="https://m.do.co/c/b41859fa9b6e" target="_blank">DigitalOcean</a>
              trouble-free services, and
              <a href="https://shostak.dev" target="_blank">Vic Shóstak</a> for bringing this wonderful open source
              project to life.
            </div>
            <div class="footer-menu">
              <div class="inline-flex items-center space-x-2">
                <router-link v-for="item in footerMenu" :key="item.to" :to="{ name: item.to }">
                  {{ item.name }}
                </router-link>
              </div>
            </div>
            <div class="footer-logo">
              <router-link :to="{ name: 'index' }" class="no-border">
                <LogoKomentoryIcon :iconStyle="'color-main bg-transparent'" :width="36" :height="36" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
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