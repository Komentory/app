<template>
  <div class="grid grid-cols-1 sm:grid-cols-12 xl:grid-cols-24">
    <div class="sm:col-span-12 xl:col-start-7">
      <div class="mt-20 py-4 px-2 sm:mt-24 sm:py-6 sm:px-6">
        <div v-if="isLoading">
          <ContentLoader />
        </div>
        <div v-else>
          <div class="my-6 sm:inline-flex sm:items-center sm:space-x-4">
            <router-link :to="{ name: 'projects' }" class="no-border">
              <ArrowLeftIcon class="h-7 w-7 mb-4 sm:mb-0" />
            </router-link>
            <h1 :title="project.title">{{ project.title }}</h1>
          </div>
          <div class="my-6">
            <AuthorCard
              :id="author.user_id"
              :first_name="author.first_name"
              :last_name="author.last_name"
              :picture="author.picture"
              :pictureSize="'h-9 w-9'"
            />
          </div>
          <div class="my-6">
            <p>{{ project.description }}</p>
          </div>
          <div class="my-6 text-secondary-dark">
            <p><DateFormatted :date="project.created_at" :withTime="true" :iconSize="'h-6 w-6'" /></p>
          </div>
          <div class="my-6">
            <h2>Tasks ({{ project.tasks_count }})</h2>
            <div class="my-4 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              <div v-for="(task, index) in tasks" :key="task.id" class="block-item shadow-md">
                <div class="py-6 px-6">
                  <h3>Task #{{ index + 1 }}</h3>
                  <p class="font-bold">{{ task.name }}</p>
                  <p class="line-clamp-4">{{ task.description }}</p>
                  <div class="mt-6">
                    <Button
                      @click="() => $router.push({ name: 'task-details', params: { id: task.id } })"
                      :tabIndex="index + 1"
                      class="w-full"
                    >
                      Task details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/outline'
import { ProjectDataService as Project, ProjectResponse } from '__/services'
import { ContentLoader, DateFormatted, AuthorCard, Button } from '__/components'

export default defineComponent({
  name: 'Project',
  props: {
    id: { type: String, required: true },
  },
  components: {
    ContentLoader,
    ArrowLeftIcon,
    DateFormatted,
    AuthorCard,
    Button,
  },
  setup: (props) => {
    // Define needed instances.
    const router = useRouter()

    // Define needed variables.
    const isLoading = ref(true)
    const project: any = ref({})
    const author: any = ref({})
    const tasks: any = ref([{}])

    // Define function for getting project by ID.
    const getProjectByID = async () => {
      try {
        const { data: project_response }: ProjectResponse = await Project.getByID(props.id)
        // Successful response from API server, or failed with warning message.
        if (project_response.status === 200) {
          // Get the project data:
          project.value = {
            created_at: project_response.project.created_at, // add project created at date
            updated_at: project_response.project.updated_at, // add project updated at date
            tasks_count: project_response.project.tasks_count, // add project tasks count
            ...project_response.project.attrs, // add project attributes
          }
          author.value = project_response.project.author // add project author
          tasks.value = project_response.project.tasks // add project tasks
          // Cancel content loader.
          isLoading.value = false
        } else if (project_response.status === 404) {
          // Failed response from API server.
          router.replace({ name: 'not-found' }) // 404: replace path to Not Found page
        } else console.warn(project_response.msg) // or show error message
      } catch (error: any) {
        console.error(error)
      }
    }

    // Define needed lifecycle hooks.
    onMounted(() => getProjectByID())

    // Return instances and lifecycle hooks.
    return { project, author, tasks, isLoading }
  },
})
</script>
