<template>
  <router-view v-slot="{ Component, route }">
    <MainMenu v-if="!routesWithoutMenu.includes(route.name)" />
    <div class="flex flex-col h-screen">
      <transition
        :name="route.meta.transitionName || 'fade'"
        :mode="route.meta.transitionMode || 'out-in'"
        class="flex-grow"
      >
        <component :is="Component" :key="route.path" />
      </transition>
      <FooterMenu v-if="!routesWithoutMenu.includes(route.name)" />
    </div>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { AuthChangeEvent, Session } from '@supabase/supabase-js'
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
    // Define needed variables.
    const routesWithoutMenu = [
      'login',
      'login-success',
      'logout',
      'register',
      'reset-password',
      'renew-password',
      'not-found',
    ]
    // Checking, if Supabase auth token is available in localStorage.
    onMounted(() => {
      // Subscribe to user auth updates and mutate store's state if needed.
      // See: https://supabase.io/docs/reference/javascript/auth-onauthstatechange
      supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
        // Switching by events.
        switch (event) {
          case 'SIGNED_IN' || 'USER_UPDATED':
            // Mutate store's state with the user object from Supabase.
            // See: https://supabase.io/docs/reference/javascript/auth-session
            if (session) store.commit(USER_MUTATE, session.user)
            break
          case 'SIGNED_OUT':
            // If the signed out event happen, mutate store's state with the empty user object.
            store.commit(USER_MUTATE, <State['user']>{})
            break
        }
      })
    })
    // Return instances and variables.
    return { routesWithoutMenu }
  },
})
</script>
