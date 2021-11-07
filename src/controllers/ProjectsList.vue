<template>
  <div v-for="(project, index) in projects" :key="project.id" class="block-item shadow-md">
    <div class="gradient-color-purple-pink-red h-6 rounded-t-3xl"></div>
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
          <h2 class="my-2 line-clamp-2 dark:text-secondary">{{ project.attributes.title }}</h2>
          <div class="line-clamp-3">{{ stripHTMLTagsFromString(project.attributes.description) }}</div>
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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { DateFormatted, AuthorCard, Button } from '__/components'
import { supabase } from '__/supabase'
import { definitions } from '__/types/supabase'
import { stripHTMLTagsFromString } from '__/helpers'

export default defineComponent({
  name: 'ProjectList',
  components: {
    DateFormatted,
    AuthorCard,
    Button,
  },
  setup: async () => {
    // Define needed instances.
    const toast = useToast()
    // Define needed variables.
    const projects: any = ref<definitions['projects_author_tasks_count']>()
    // Define async function for getting all active projects (status = 0).
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
    }
    // Return instances and variables.
    return { projects, stripHTMLTagsFromString }
  },
})
</script>