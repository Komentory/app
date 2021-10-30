<template>
  <div class="px-2 py-4 sm:px-0 sm:py-0">
    <div class="grid items-center justify-center h-screen sm:w-screen">
      <div class="py-6 px-6 sm:py-8 sm:px-8 xl:py-10 mx-auto block-item shadow-lg">
        <div class="w-72 sm:w-96" v-if="!isUserLoggedIn">
          <div class="mb-8 text-center">
            <h1 class="gradient-text gradient-color-yellow-main-blue">Join Komentory</h1>
            <h2 class="text-base text-gray-400 dark:text-secondary">Sign up and use it for free</h2>
          </div>
          <UserRegisterForm />
          <hr class="my-8" />
          <div class="text-center text-sm">
            Already have an account? <router-link :to="{ name: 'login' }">Login</router-link>!
          </div>
        </div>
        <div class="w-64" v-else>
          <h1 class="mb-8 text-center">Oh, wait...</h1>
          <div class="text-center"><strong>Friend,</strong> you're already registered!</div>
          <div class="mt-8">
            <Button @click="() => $router.replace({ name: 'account' })" :tabIndex="1" class="w-full">
              Go to account
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { UserRegisterForm, Button } from '__/components'

export default defineComponent({
  name: 'UserRegister',
  components: {
    UserRegisterForm,
    Button,
  },
  computed: {
    ...mapGetters(['isUserLoggedIn']),
  },
})
</script>