<template>
  <div class="w-72 sm:w-96" v-if="!isUserLoggedIn">
    <div class="mb-8 text-center">
      <h1 class="gradient-text gradient-color-yellow-main-blue">Greetings!</h1>
      <h2 class="text-base text-gray-400 dark:text-secondary">Sign into your account</h2>
    </div>
    <div class="my-6">
      <Button
        @click="loginWithGoogle"
        :action="''"
        :tabIndex="1"
        class="flex justify-center items-center space-x-2 w-full"
      >
        <LogoGoogleIcon />
        <span>Continue with Google</span>
      </Button>
    </div>
    <div class="my-8">
      <div class="flex justify-center items-center relative">
        <span class="h-px dark:bg-secondary absolute inset-x-0"></span>
        <span class="dark:bg-secondary-darker dark:text-secondary text-sm relative px-4">
          Or login with email & password
        </span>
      </div>
    </div>
    <div class="mt-6 mb-3">
      <Input
        v-model="form.email"
        :id="'email'"
        :label="'Email'"
        :inputType="'email'"
        :placeholder="'Your email address'"
        :tabIndex="2"
        :isRequired="true"
      />
    </div>
    <div class="mt-3 mb-6">
      <Input
        v-model="form.password"
        :id="'password'"
        :label="'Password'"
        :inputType="'password'"
        :placeholder="'Your password'"
        :tabIndex="3"
        :isRequired="true"
      />
      <p class="text-right text-sm">
        <router-link :to="{ name: 'password-reset' }">Forgot your password?</router-link>
      </p>
    </div>
    <div class="mt-4 mb-6">
      <Button @click="login" :action="'success'" :tabIndex="4" class="w-full">Let me in!</Button>
    </div>
    <div class="mt-8 text-center text-sm">
      No account? <router-link :to="{ name: 'register' }">Register</router-link> a new one!
    </div>
  </div>
  <div class="w-64" v-else>
    <h1 class="mb-8 text-center">Oh, wait...</h1>
    <div class="text-center"><strong>Friend,</strong> you're already logged in!</div>
    <div class="mt-8">
      <Button @click="() => $router.replace({ name: 'account' })" :tabIndex="1" class="w-full"> Go to account </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { mapGetters } from 'vuex'
import { useStore } from '__/store'
import { LOGIN_ACTION, LOGIN_WITH_GOOGLE_ACTION } from '__/store-constants'
import { Input, Button } from '__/components'
import { LogoGoogleIcon } from '__/icons'

export default defineComponent({
  name: 'UserLoginForm',
  components: {
    Input,
    Button,
    LogoGoogleIcon,
  },
  computed: {
    ...mapGetters(['isUserLoggedIn']), // getter for checking if user is logged in
  },
  setup: () => {
    // Define needed instances.
    const store = useStore()
    // Define needed variables.
    const form = reactive({
      email: '',
      password: '',
    })
    // Define async function for user login with email and password.
    const login = async () => store.dispatch(LOGIN_ACTION, form)
    // Define async function for user login with Google.
    const loginWithGoogle = async () => store.dispatch(LOGIN_WITH_GOOGLE_ACTION)
    // Return instances and variables.
    return { form, login, loginWithGoogle }
  },
})
</script>