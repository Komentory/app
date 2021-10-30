<template>
  <div class="my-3">
    <Input
      v-model="form.email"
      :id="'email'"
      :label="'Email'"
      :inputType="'email'"
      :placeholder="'Your email address'"
      :tabIndex="1"
      :isRequired="true"
    />
  </div>
  <div class="my-3">
    <Input
      v-model="form.password"
      :id="'password'"
      :label="'Password'"
      :inputType="'password'"
      :placeholder="'Your password'"
      :tabIndex="2"
      :isRequired="true"
    />
    <p class="text-right text-sm">
      <router-link :to="{ name: 'password-reset' }">Forgot your password?</router-link>
    </p>
  </div>
  <div class="mt-6 mb-4">
    <Button @click="login" :action="'success'" :tabIndex="3" class="w-full"> Okay, let me in! </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from '__/store'
import { LOGIN_ACTION } from '__/store-constants'
import { Input, Button } from '__/components'

export default defineComponent({
  name: 'UserLoginForm',
  components: {
    Input,
    Button,
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
    // Return instances and variables.
    return { form, login }
  },
})
</script>