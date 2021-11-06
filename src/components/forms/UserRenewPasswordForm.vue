<template>
  <div class="w-72 sm:w-96">
    <div class="mb-8 text-center">
      <h1 class="mb-1 gradient-text gradient-color-purple-pink-red">Hooray! It worked</h1>
      <h2 class="text-base">Update your password now</h2>
    </div>
    <div class="my-6">
      <div class="mt-6 mb-3">
        <Input
          v-model="form.new_password"
          :id="'new_password'"
          :label="'New password'"
          :inputType="'password'"
          :placeholder="'Enter your new secret password'"
          :helpText="'At least 6 characters, letters in different registers, numbers.'"
          :tabIndex="1"
          :isRequired="true"
          :autocomplete="'new-password'"
        />
      </div>
      <div class="mt-3 mb-6">
        <Input
          v-model="form.new_password_again"
          :id="'new_password_again'"
          :label="'Re-type your new password'"
          :inputType="'password'"
          :placeholder="'Enter your new secret password once again'"
          :helpText="
            form.new_password === form.new_password_again ? '' : 'Passwords are not the same! Please try again.'
          "
          :tabIndex="2"
          :isRequired="true"
          :autocomplete="'new-password'"
        />
      </div>
    </div>
    <div class="mt-3 mb-6">
      <Button
        @click="renewPassword"
        :action="'success'"
        :isLoading="isLoading"
        :disabled="form.new_password !== form.new_password_again || isLoading"
        :tabIndex="3"
        class="w-full"
      >
        Change my password!
        {{ isLoading }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { mapGetters } from 'vuex'
import { useRouter } from 'vue-router'
import { useStore } from '__/store'
import { RENEW_PASSWORD_ACTION } from '__/store-constants'
import { Input, Button } from '__/components'
import { getHashValueByName } from '__/helpers'

export default defineComponent({
  name: 'UserRenewPassword',
  components: {
    Input,
    Button,
  },
  computed: {
    ...mapGetters(['isLoading']),
  },
  setup: () => {
    // Define needed instances.
    const store = useStore()
    const router = useRouter()
    // Define needed variables.
    const form: any = reactive({
      access_token: getHashValueByName('access_token', router.currentRoute.value.hash), // get Supabase hash from URL
      new_password: '',
      new_password_again: '',
    })
    // Define async function for renew password.
    const renewPassword = async () => await store.dispatch(RENEW_PASSWORD_ACTION, form)
    // Return instances and variables.
    return { form, renewPassword }
  },
})
</script>