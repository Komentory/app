<template>
  <h1>Task ID: {{ id }}</h1>
  <div v-if="isLoading">
    <ContentLoader />
  </div>
  <div v-else>
    <p>
      <router-link :to="{ name: 'project-details', params: { id: task.project_id } }">Back</router-link>
    </p>
    <p>{{ task.attrs.name }}</p>
    <p>{{ task.created_at }}</p>
    <h2>Steps</h2>
    <ul>
      <li v-for="step in steps" :key="step.position">{{ step.position }}. {{ step.description }}</li>
    </ul>
    <p>
      Answers: {{ task.answers_count }}
      <router-link v-if="task.answers_count > 0" :to="{ name: 'task-answers', params: { id: task.id } }">
        Show
      </router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { TaskDataService as Task, TaskResponse } from '__/services'
import { ContentLoader } from '__/components'

export default defineComponent({
  name: 'Task',
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
    const task: any = ref({})
    const steps: any = ref([{}])
    const isLoading = ref(true)

    // Define function for getting task by ID.
    const getTaskByID = async () => {
      try {
        const { data: task_response }: TaskResponse = await Task.getByID(props.id)
        // Successful response from API server, or failed with warning message.
        if (task_response.status === 200) {
          // Get the task data:
          task.value = task_response.task // add task info
          steps.value = task_response.task.attrs.steps.sort((a: any, b: any) => a.position - b.position) // add sort for steps
          // Cancel content loader.
          isLoading.value = false
        } else if (task_response.status === 404) {
          // Failed response from API server.
          router.replace({ name: 'not-found' }) // 404: replace path to Not Found page
        } else console.warn(task_response.msg) // or show error message
      } catch (error: any) {
        console.error(error)
      }
    }

    // Define needed lifecycle hooks.
    onMounted(() => getTaskByID())

    // Return instances and lifecycle hooks.
    return { task, steps, isLoading }
  },
})
</script>
