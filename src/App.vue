<template>
  <router-view v-slot="{ Component, route }">
    <MainMenu v-if="!(route.name === 'login' || route.name === 'logout' || route.name === 'register')" />
    <div class="flex flex-col h-screen">
      <transition :name="route.meta.transitionName || 'fade'" mode="out-in" class="flex-grow">
        <component :is="Component" :key="route.path" />
      </transition>
      <FooterMenu v-if="!(route.name === 'login' || route.name === 'logout' || route.name === 'register')" />
    </div>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { supabase } from '__/supabase'
import { useStore, State } from '__/store'
import { USER_MUTATE } from '__/store-constants'
import { MainMenu, FooterMenu } from '__/components'

export default defineComponent({
  name: 'App',
  components: {
    MainMenu,
    FooterMenu,
  },
  setup: () => {
    // Define needed instances.
    const store = useStore()
    // Checking, if Supabase auth token is available in localStorage.
    onMounted(() => {
      if ('supabase.auth.token' in localStorage) {
        // Mutate store's state with the user object from Supabase.
        // See: https://supabase.io/docs/reference/javascript/auth-session
        store.commit(USER_MUTATE, supabase.auth.user())
        // Subscribe to user auth updates and mutate store's state if needed.
        // See: https://supabase.io/docs/reference/javascript/auth-onauthstatechange
        supabase.auth.onAuthStateChange((event: any, session: any) => {
          // Switching by events.
          switch (event) {
            case 'SIGNED_OUT':
              // If the signed out event happen, mutate store's state with the empty user object.
              store.commit(USER_MUTATE, <State['user']>{})
              break
            default:
              // For all other events state just mutate store's state with the user object.
              store.commit(USER_MUTATE, session.user)
          }
        })
      }
    })
  },
})
</script>
