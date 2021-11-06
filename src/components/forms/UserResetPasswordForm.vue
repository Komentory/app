<template>
  <div class="w-72 sm:w-96" v-if="!isUserLoggedIn">
    <div class="mb-8 text-center">
      <h1 class="mb-1 gradient-text gradient-color-purple-pink-red">Forgot your password?</h1>
      <h2 class="text-base">Restore access via magic link</h2>
    </div>
    <div class="my-6">
      <Input
        v-model="form.email"
        :id="'email'"
        :label="'Email you submitted at registration'"
        :inputType="'email'"
        :placeholder="'Enter your email address'"
        :helpText="'Only a valid email, e.g. mail@example.com'"
        :tabIndex="1"
        :isRequired="true"
      />
    </div>
    <div class="mt-3 mb-6">
      <Button
        @click="resetPassword"
        :action="'warning'"
        :isLoading="isLoading"
        :disabled="form.email.length === 0 || isLoading"
        :tabIndex="2"
        class="w-full"
      >
        Send magic link to me!
      </Button>
    </div>
    <div class="mt-8 text-center text-sm">
      <p>Already have an account? <router-link :to="{ name: 'login' }">Login</router-link> now!</p>
      <p>No account? <router-link :to="{ name: 'register' }">Register</router-link> a new one!</p>
    </div>
  </div>
  <div class="w-64" v-else>
    <h1 class="mb-8 text-center">Oh, wait...</h1>
    <div class="text-center"><strong>Friend,</strong> you're already logged in!</div>
    <div class="mt-8">
      <Button @click="() => $router.replace({ name: 'account' })" :tabIndex="1" class="w-full">Go to account</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { mapGetters } from 'vuex'
import { useStore } from '__/store'
import { RESET_PASSWORD_ACTION } from '__/store-constants'
import { Input, Button } from '__/components'

export default defineComponent({
  name: 'UserResetPassword',
  components: {
    Input,
    Button,
  },
  computed: {
    ...mapGetters(['isLoading', 'isUserLoggedIn']),
  },
  setup: () => {
    // Define needed instances.
    const store = useStore()
    // Define needed variables.
    const form = reactive({
      email: '',
    })
    // Define async function for user login with email and password.
    const resetPassword = async () => await store.dispatch(RESET_PASSWORD_ACTION, form)
    // Return instances and variables.
    return { form, resetPassword }
  },
})
</script>