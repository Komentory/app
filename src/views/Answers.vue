<template>
  <h1>Answers for task ID: {{ id }}</h1>
  <div v-if="isLoading">
    <ContentLoader />
  </div>
  <div v-else>
    <p>
      <router-link :to="{ name: 'task-details', params: { id } }">Back</router-link>
    </p>
    <div class="grid grid-flow-row grid-cols-1 gap-2 sm:grid-cols-3">
      <div v-for="answer in answers" :key="answer.id" class="py-2 px-3 border rounded">
        <AuthorCard
          :id="answer.author.user_id"
          :first_name="answer.author.first_name"
          :last_name="answer.author.last_name"
          :picture="answer.author.picture"
        />
        <div class="mt-2 mb-4 truncate">
          <router-link :to="{ name: 'answer-details', params: { id: answer.id } }">
            {{ answer.attrs.description }}
          </router-link>
        </div>
        <DateFormatted :date="answer.created_at" :locale="'en-US'" :withTime="true" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { AnswerDataService as Answer, AnswersResponse } from '__/services'
import { ContentLoader, DateFormatted, AuthorCard } from '__/components'

export default defineComponent({
  name: 'Answers',
  props: {
    id: { type: String, required: true },
  },
  components: {
    ContentLoader,
    DateFormatted,
    AuthorCard,
  },
  setup: (props) => {
    // Define needed instances.
    const router = useRouter()

    // Define needed variables.
    const isLoading = ref(true)
    const answers: any = ref([{}])

    // Define function for getting answers by task ID.
    const getAnswerByTaskID = async () => {
      try {
        const { data: answers_response }: AnswersResponse = await Answer.getAllByTaskID(props.id)
        // Successful response from API server, or failed with warning message.
        if (answers_response.status === 200) {
          // Get the task data:
          answers.value = answers_response.answers // add answers info
          // Cancel content loader.
          isLoading.value = false
        } else if (answers_response.status === 404) {
          // Failed response from API server.
          router.replace({ name: 'not-found' }) // 404: replace path to Not Found page
        } else console.warn(answers_response.msg) // or show error message
      } catch (error: any) {
        console.error(error)
      }
    }

    // Define needed lifecycle hooks.
    onMounted(() => getAnswerByTaskID())

    // Return instances and lifecycle hooks.
    return { answers, isLoading }
  },
})
</script>
