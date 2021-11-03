<template>
  <div class="grid grid-cols-1 sm:grid-cols-12 xl:grid-cols-24">
    <div class="sm:col-span-12 xl:col-start-7">
      <div class="mt-16 py-4 px-2 sm:mt-24 sm:py-6 sm:px-6">
        <div v-if="isLoading">
          <ContentLoader />
        </div>
        <div v-else>
          <div class="my-8 sm:inline-flex sm:items-center sm:space-x-4">
            <router-link :to="{ name: 'projects' }" class="mb-6 sm:mb-0 inline-flex items-center space-x-2 no-border">
              <ArrowLeftIcon class="h-7 w-7" />
              <span class="text-lg sm:hidden">Back</span>
            </router-link>
            <h1 :title="project.attributes.title">{{ project.attributes.title }}</h1>
          </div>
          <div class="my-6">
            <AuthorCard
              :id="project.author.id"
              :full_name="project.author.full_name"
              :avatar_url="project.author.avatar_url"
              :pictureSize="'h-9 w-9'"
            />
          </div>
          <div class="my-6">
            <p>{{ project.attributes.description }}</p>
          </div>
          <div class="my-6 text-secondary-dark">
            <p><DateFormatted :date="project.created_at" :withTime="true" :iconSize="'h-6 w-6'" /></p>
          </div>
          <div class="my-6">
            <h2>Tasks ({{ project.tasks_count }})</h2>
            <div class="my-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              <div v-if="project.tasks.length === 0">No tasks for this project... yet.</div>
              <div v-else v-for="(task, index) in project.tasks" :key="task.id" class="block-item shadow-md">
                <div class="py-6 px-6">
                  <h3>Task #{{ index + 1 }}</h3>
                  <p class="font-bold">{{ task.attributes.title }}</p>
                  <p class="line-clamp-4">{{ task.attributes.description }}</p>
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
import { useToast } from 'vue-toastification'
import { ArrowLeftIcon } from '@heroicons/vue/outline'
import { ContentLoader, DateFormatted, AuthorCard, Button } from '__/components'
import { supabase } from '__/supabase'
import { definitions } from '__/types/supabase'

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
    const toast = useToast()
    // Define needed variables.
    const project: any = ref<definitions['project_with_author_and_tasks']>()
    const isLoading = ref(true)
    // Define async function for getting one project by ID.
    const getProject = async () => {
      try {
        // Send request to Supabase.
        const { data, error } = await supabase
          .from<definitions['project_with_author_and_tasks']>('project_with_author_and_tasks')
          .select()
          .eq('id', props.id)
          .single()
        // Throw error, if something went wrong.
        if (error) throw error
        // Update project object, if get successful response.
        project.value = data
      } catch (error: any) {
        // Show error message in toast.
        toast.error(error.error_description || error.message)
      } finally {
        // Cancel content loading.
        isLoading.value = false
      }
    }
    // Define needed lifecycle hooks.
    onMounted(() => getProject())
    // Return instances and variables.
    return { project, isLoading }
  },
})
</script>
