<template>
  <div class="w-72 sm:w-96" v-if="!isUserLoggedIn">
    <div class="mb-8 text-center">
      <h1 class="mb-1 gradient-text gradient-color-yellow-purple-red">Greetings, friend!</h1>
      <h2 class="text-base text-gray-400 dark:text-secondary">Sign into your account</h2>
    </div>
    <div class="my-8">
      <Button
        @click="loginWithGoogle"
        :tabIndex="1"
        class="flex justify-center items-center space-x-2 w-full mt-6 mb-3"
      >
        <LogoGoogleIcon />
        <span>Continue with Google</span>
      </Button>
      <Button
        @click="loginWithFacebook"
        :tabIndex="2"
        class="flex justify-center items-center space-x-2 w-full mt-3 mb-6"
      >
        <LogoFacebookIcon />
        <span>Continue with Facebook</span>
      </Button>
    </div>
    <div class="my-6">
      <div class="flex justify-center items-center relative">
        <span class="h-px dark:bg-secondary absolute inset-x-0"></span>
        <span class="dark:bg-secondary-darker dark:text-secondary text-sm relative px-4">
          Or with email & password
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
        :tabIndex="3"
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
        :tabIndex="4"
        :isRequired="true"
      />
      <p class="text-right text-sm">
        <router-link :to="{ name: 'reset-password' }">Forgot your password?</router-link>
      </p>
    </div>
    <div class="mt-3 mb-6">
      <Button @click="loginWithEmail" :action="'success'" :tabIndex="5" class="w-full">Let me in!</Button>
    </div>
    <div class="mt-8 text-center text-sm">
      No account? <router-link :to="{ name: 'register' }">Register</router-link> a new one!
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
import { LOGIN_WITH_EMAIL_ACTION, LOGIN_WITH_GOOGLE_ACTION, LOGIN_WITH_FACEBOOK_ACTION } from '__/store-constants'
import { Input, Button } from '__/components'
import { LogoGoogleIcon, LogoFacebookIcon } from '__/icons'

export default defineComponent({
  name: 'UserLoginForm',
  components: {
    Input,
    Button,
    LogoGoogleIcon,
    LogoFacebookIcon,
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
    const loginWithEmail = async () => await store.dispatch(LOGIN_WITH_EMAIL_ACTION, form)
    // Define async function for user login with Google.
    const loginWithGoogle = async () => await store.dispatch(LOGIN_WITH_GOOGLE_ACTION)
    // Define async function for user login with Facebook.
    const loginWithFacebook = async () => await store.dispatch(LOGIN_WITH_FACEBOOK_ACTION)
    // Return instances and variables.
    return { form, loginWithEmail, loginWithGoogle, loginWithFacebook }
  },
})
</script>