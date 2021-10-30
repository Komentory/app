<template>
  <div class="my-3">
    <Input
      v-model="form.user_metadata.first_name"
      :id="'first_name'"
      :label="'First name'"
      :inputType="'text'"
      :placeholder="'Enter your first name'"
      :helpText="''"
      :tabIndex="1"
      :isRequired="true"
    />
  </div>
  <div class="my-3">
    <Input
      v-model="form.user_metadata.last_name"
      :id="'last_name'"
      :label="'Last name'"
      :inputType="'text'"
      :placeholder="'Enter your last name'"
      :helpText="''"
      :tabIndex="2"
    />
  </div>
  <div class="my-3">
    <Input
      v-model="form.email"
      :id="'email'"
      :label="'Email'"
      :inputType="'email'"
      :placeholder="'Enter your email address'"
      :helpText="'Only a valid email, we\'ll send a confirmation email to it.'"
      :tabIndex="3"
      :isRequired="true"
    />
  </div>
  <div class="my-3">
    <Input
      v-model="form.password"
      :id="'password'"
      :label="'Password'"
      :inputType="'password'"
      :placeholder="'Enter your secret password'"
      :helpText="'At least 8 characters, letters in different registers, numbers.'"
      :tabIndex="4"
      :isRequired="true"
    />
  </div>
  <div class="my-6">
    <SwitchGroup>
      <div class="flex items-center">
        <Switch
          v-model="form.user_metadata.marketing_email_subscription"
          :class="form.user_metadata.marketing_email_subscription ? 'bg-main' : 'bg-secondary'"
          tabindex="5"
          class="
            relative
            inline-flex
            items-center
            h-7
            w-10
            transition-colors
            rounded-full
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600
          "
          id="marketing_email_subscription"
        >
          <span
            :class="form.user_metadata.marketing_email_subscription ? 'translate-x-5' : 'translate-x-1'"
            class="inline-block w-4 h-4 transition-transform transform bg-white rounded-full"
          />
        </Switch>
        <SwitchLabel class="ml-2 text-sm">Subscribe to the marketing emails</SwitchLabel>
      </div>
    </SwitchGroup>
  </div>
  <div class="mt-6 mb-4">
    <Button @click="register" :action="'success'" :tabIndex="6" class="w-full">And now register me!</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from '__/store'
import { REGISTER_ACTION } from '__/store-constants'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { Input, Button } from '__/components'

export default defineComponent({
  name: 'UserRegisterForm',
  components: {
    Input,
    Button,
    Switch,
    SwitchGroup,
    SwitchLabel,
  },
  setup() {
    // Define needed instances.
    const store = useStore()
    // Define needed variables.
    const form = reactive({
      email: '',
      password: '',
      user_metadata: {
        first_name: '',
        last_name: '',
        marketing_email_subscription: true,
      },
    })
    // Define async function for register a new user with email and password.
    const register = async () => store.dispatch(REGISTER_ACTION, form)
    // Return instances and variables.
    return { form, register }
  },
})
</script>