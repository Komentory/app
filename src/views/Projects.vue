<template>
  <main>
    <div class="grid-wrapper">
      <div class="grid-container">
        <h1 class="line-clamp-1 text-4xl">Projects</h1>
        <div class="h-10"></div>
        <div class="grid-inner-items gap-4">
          <ProjectLoader v-if="isLoading" class="block-item shadow-md" />
          <div v-else v-for="(project, index) in projects" :key="project.id" class="block-item shadow-md">
            <div class="gradient-color-yellow-purple-red h-6 rounded-t-3xl"></div>
            <div class="pt-6 pb-4 px-6">
              <div class="flex flex-col sm:h-76">
                <div class="flex-grow">
                  <AuthorCard
                    :id="project.author.id"
                    :full_name="project.author.full_name"
                    :avatar_url="project.author.avatar_url"
                    :pictureSize="'h-8 w-8'"
                    class="text-sm"
                  />
                  <h3 class="my-2 line-clamp-2">{{ project.attributes.title }}</h3>
                  <p class="line-clamp-3">{{ project.attributes.description }}</p>
                </div>
                <Button
                  @click="() => $router.push({ name: 'project-details', params: { id: project.id } })"
                  :action="'info'"
                  :tabIndex="index + 1"
                  class="my-4 w-full"
                >
                  View project tasks ({{ project.tasks_count }})
                </Button>
                <div class="text-center text-sm text-gray-300 dark:text-secondary-dark">
                  <DateFormatted :date="project.created_at" :withTime="true" :iconSize="'h-5 w-5'" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { ProjectLoader, AuthorCard, Button, DateFormatted } from '__/components'
import { supabase } from '__/supabase'
import { definitions } from '__/types/supabase'

export default defineComponent({
  name: 'Projects',
  components: {
    ProjectLoader,
    AuthorCard,
    Button,
    DateFormatted,
  },
  setup: () => {
    // Define needed instances.
    const toast = useToast()
    // Define needed variables.
    const projects: any = ref<definitions['projects_author_tasks_count']>()
    const isLoading = ref(true)
    // Define async function for getting all active projects (status = 0).
    const getAllProjects = async () => {
      try {
        // Send request to Supabase.
        const { data, error } = await supabase
          .from<definitions['projects_author_tasks_count']>('projects_author_tasks_count')
          .select('*')
          .eq('status', 1)
        // Throw error, if something went wrong.
        if (error) throw error
        // Update projects object, if get successful response.
        projects.value = data
      } catch (error: any) {
        // Show error message in toast.
        toast.error(error.error_description || error.message)
      } finally {
        // Cancel content loading.
        isLoading.value = false
      }
    }
    // Define needed lifecycle hooks.
    onMounted(() => getAllProjects())
    // Return instances and variables.
    return { projects, isLoading }
  },
})
</script>
