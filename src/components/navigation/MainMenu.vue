<template>
  <Disclosure
    as="nav"
    v-slot="{ open }"
    :class="[
      'z-50 drop-shadow-md fixed w-full',
      'bg-main',
      'dark:bg-secondary-darker dark:border-b-2 dark:border-secondary-dark',
    ]"
  >
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16 sm:h-20">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <DisclosureButton
            class="
              inline-flex
              items-center
              justify-center
              p-1
              rounded-full
              text-main
              hover:text-secondary
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white
            "
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-7 w-7" aria-hidden="true" />
            <XIcon v-else class="block h-7 w-7" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex-1 flex items-center justify-center sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
            <router-link :to="{ name: 'index' }" class="no-border">
              <svg fill="none" height="46" width="46" viewBox="0 0 68 68" xmlns="http://www.w3.org/2000/svg">
                <rect height="66" width="66" rx="21" fill="#00ab55" stroke="#f6f4ef" stroke-width="2" x="1" y="1" />
                <path
                  d="m51.604 54.5858-7.128-11.7-3.312 4.032v7.668h-4.572v-25.2h4.572v11.556l8.964-11.556h5.328l-7.992 9.792 9.144 15.408z"
                  fill="#f6f4ef"
                />
              </svg>
            </router-link>
          </div>
          <div class="hidden sm:block sm:ml-8">
            <div class="flex space-x-4">
              <router-link
                v-for="item in mainMenu"
                :key="item.name"
                :to="{ name: item.to }"
                :class="[
                  $router.currentRoute.value.name === item.to ? 'text-main' : 'text-secondary',
                  'text-base font-medium',
                ]"
                :aria-current="$router.currentRoute.value.name === item.to ? 'page' : undefined"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <router-link
            :to="{ name: 'index' }"
            class="
              p-1
              rounded-full
              no-border
              text-secondary
              hover:text-main
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white
            "
          >
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-7 w-7" aria-hidden="true" />
          </router-link>
          <Menu as="div" class="ml-3 relative">
            <div>
              <MenuButton
                class="
                  bg-gray-800
                  flex
                  text-sm
                  rounded-full
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white
                "
              >
                <span class="sr-only">Open user menu</span>
                <CurrentUserAvatar />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="
                  origin-top-right
                  absolute
                  right-0
                  mt-2
                  w-48
                  rounded-lg
                  shadow-lg
                  py-1
                  dark:bg-secondary-dark
                  ring-1 ring-black ring-opacity-5
                  focus:outline-none
                "
              >
                <MenuItem v-for="item in userMenu" :key="item.name" class="no-border">
                  <router-link
                    :to="{ name: item.to }"
                    :class="[
                      $router.currentRoute.value.name === item.to ? [''] : ['text-secondary'],
                      'block px-4 py-2 text-sm',
                    ]"
                  >
                    {{ item.name }}
                  </router-link>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <DisclosureButton as="div" v-for="item in mainMenu" :key="item.to">
          <router-link
            :to="{ name: item.to }"
            :class="[
              'block px-3 py-2 rounded-lg font-medium cursor-pointer no-border',
              $router.currentRoute.value.name === item.to
                ? ['', 'dark:bg-secondary-dark dark:text-secondary dark:hover:text-main']
                : ['', 'dark:text-secondary dark:hover:bg-secondary-dark dark:hover:text-secondary'],
            ]"
            :aria-current="$router.currentRoute.value.name === item.to ? 'page' : undefined"
          >
            {{ item.name }}
          </router-link>
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import { defineComponent } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'
import { CurrentUserAvatar } from '__/components'

export default defineComponent({
  name: 'MainMenu',
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
    CurrentUserAvatar,
  },
  setup() {
    // Define main menu items.
    const mainMenu = [
      { name: 'Dashboard', to: 'index' },
      { name: 'Projects', to: 'projects' },
      { name: 'Get started', to: 'get-started' },
    ]

    // Define user menu items.
    const userMenu = [
      { name: 'My profile', to: 'account' },
      { name: 'Settings', to: 'projects' },
      { name: 'Sign out', to: 'logout' },
    ]

    // Return menu items.
    return { mainMenu, userMenu }
  },
})
</script>