<template>
  <h1>Answer ID: {{ id }}</h1>
  <div v-if="isLoading">
    <ContentLoader />
  </div>
  <div v-else>
    <p>
      <router-link :to="{ name: 'task-answers', params: { id: answer.task_id } }">Back</router-link>
    </p>
    <p>{{ answer.attrs.description }}</p>
    <p>{{ answer.created_at }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { AnswerDataService as Answer, AnswerResponse } from '__/services'
import { ContentLoader } from '__/components'

export default defineComponent({
  name: 'Answer',
  props: {
    id: { type: String, required: true },
  },
  components: {
    ContentLoader,
  },
  setup: (props) => {
    // Define needed instances.
    const router = useRouter()

    // Define needed variables.
    const isLoading = ref(true)
    const answer: any = ref({})

    // Define function for getting task by alias.
    const getAnswerByAlias = async () => {
      try {
        const { data: answer_response }: AnswerResponse = await Answer.getByID(props.id)
        // Successful response from API server, or failed with warning message.
        if (answer_response.status === 200) {
          // Get the task data:
          answer.value = answer_response.answer // add answer info
          // Cancel content loader.
          isLoading.value = false
        } else if (answer_response.status === 404) {
          // Failed response from API server.
          router.replace({ name: 'not-found' }) // 404: replace path to Not Found page
        } else console.warn(answer_response.msg) // or show error message
      } catch (error: any) {
        console.error(error)
      }
    }

    // Define needed lifecycle hooks.
    onMounted(() => getAnswerByAlias())

    // Return instances and lifecycle hooks.
    return { answer, isLoading }
  },
})
</script>
