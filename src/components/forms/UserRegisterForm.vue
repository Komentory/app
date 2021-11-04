<template>
  <div class="w-72 sm:w-96" v-if="!isUserLoggedIn">
    <div class="mb-8 text-center">
      <h1 class="mb-1 gradient-text gradient-color-yellow-purple-red">Join Komentory</h1>
      <h2 class="text-base text-gray-400 dark:text-secondary">Sign up and use it for free</h2>
    </div>
    <div class="mt-6 mb-3">
      <Input
        v-model="form.user_metadata.full_name"
        :id="'full_name'"
        :label="'Full name'"
        :inputType="'text'"
        :placeholder="'Enter your first and last name'"
        :helpText="''"
        :tabIndex="1"
        :isRequired="true"
        :autocomplete="'name'"
      />
    </div>
    <div class="my-3">
      <Input
        v-model="form.email"
        :id="'email'"
        :label="'Email'"
        :inputType="'email'"
        :placeholder="'Enter your email address'"
        :helpText="'Only a valid email, e.g. mail@example.com'"
        :tabIndex="2"
        :isRequired="true"
        :autocomplete="'email'"
      />
    </div>
    <div class="mt-3 mb-6">
      <Input
        v-model="form.password"
        :id="'password'"
        :label="'Password'"
        :inputType="'password'"
        :placeholder="'Enter your secret password'"
        :helpText="'At least 6 characters, letters in different registers, numbers.'"
        :tabIndex="3"
        :isRequired="true"
        :autocomplete="'new-password'"
      />
    </div>
    <div class="my-6">
      <SwitchGroup>
        <div class="flex items-center space-x-2">
          <Switch
            v-model="servicePolicyAgreement"
            :class="servicePolicyAgreement ? 'bg-main' : 'bg-secondary'"
            class="switch"
            tabindex="4"
          >
            <span :class="servicePolicyAgreement ? 'translate-x-5' : 'translate-x-1'" />
          </Switch>
          <SwitchLabel class="text-sm">
            I agree with the
            <router-link :to="{ name: 'index' }" class="dark:text-secondary">Terms & Conditions</router-link>
          </SwitchLabel>
        </div>
      </SwitchGroup>
    </div>
    <div class="my-6">
      <Button
        @click="register"
        :action="'success'"
        :isLoading="isLoading"
        :disabled="!servicePolicyAgreement || isLoading"
        :tabIndex="5"
        class="w-full"
      >
        And now register me!
      </Button>
    </div>
    <div class="mt-8 text-center text-sm">
      Already have an account? <router-link :to="{ name: 'login' }">Login</router-link> now!
    </div>
  </div>
  <div class="w-64" v-else>
    <h1 class="mb-8 text-center">Oh, wait...</h1>
    <div class="text-center"><strong>Friend</strong>, you're already registered!</div>
    <div class="mt-8">
      <Button @click="() => $router.replace({ name: 'account' })" :tabIndex="1" class="w-full"> Go to account </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters(['isLoading', 'isUserLoggedIn']),
  },
  setup() {
    // Define needed instances.
    const store = useStore()
    // Define needed variables.
    const servicePolicyAgreement = ref(false)
    const form = reactive({
      email: '',
      password: '',
      user_metadata: { full_name: '' },
    })
    // Define async function for register a new user with email and password.
    const register = async () => await store.dispatch(REGISTER_ACTION, form)
    // Return instances and variables.
    return { servicePolicyAgreement, form, register }
  },
})
</script>