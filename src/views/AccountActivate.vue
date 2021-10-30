<template>
  <p>Successful activate account</p>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  AccountDataService as Account,
  AccountActivateRequest as ActivateRequest,
  AccountActivateResponse as ActivateResponse,
  PostmarkDataService as Postmark,
  PostmarkRequest,
} from '__/services'

export default defineComponent({
  name: 'AccountActivate',
  props: {
    code: { type: String, required: true },
  },
  setup: (props) => {
    // Define needed instances.
    const router = useRouter()

    // Checking activation code.
    if (!props.code) {
      // If failed, replace path to Index page.
      router.replace({ name: 'index' })
    }

    // Define async function for sign out.
    const accountActivate = async () => {
      // Define variables.
      let requestData: ActivateRequest = {
        code: props.code,
      }

      try {
        // Define await function for activate account.
        const { data: activate_response }: ActivateResponse = await Account.activate(requestData)
        // Successful response from API server.
        if (activate_response.status === 200) {
          // Define data for Postmark request.
          let postmarkData: PostmarkRequest = {
            email: activate_response.user.email,
            template: 'welcome',
            variables: {
              first_name: activate_response.user.first_name,
            },
          }
          // Define await function for send email.
          const { status } = await Postmark.send(postmarkData)
          // Successful response from Postmark server and go to sign in page, or failed with error message.
          if (status === 200) {
            router.replace({ name: 'login' }) // 200: replace path to User Login page
          } else console.error(`status error ${status}`) // or show error message
        } else if (activate_response.status === 400) {
          // Failed response from API server.
          console.warn(activate_response.msg)
        }
      } catch (error: any) {
        console.error(error)
      }
    }

    // Define needed lifecycle hooks.
    onMounted(() => accountActivate())
  },
})
</script>