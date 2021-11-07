<template>
  <h1 class="my-6 sm:my-10 text-4xl">{{ project.attributes.title }}</h1>
  <div class="h-1 w-1/4 gradient-color-purple-pink-red rounded-full"></div>
  <div class="my-6 sm:my-10 grid grid-cols-1 lg:grid-cols-4 gap-x-10">
    <div class="mb-4 lg:col-span-3">
      <h2 class="mb-4">Project description</h2>
      <div v-html="convertMarkdownToHTML(project.attributes.description)"></div>
      <div class="mt-6 text-sm">
        <ul class="inline-flex items-center space-x-2">
          <li><FolderIcon class="h-5 w-5" /></li>
          <li>Category:</li>
          <li>
            <router-link :to="{ name: 'projects' }">{{ project.attributes.category }}</router-link>
          </li>
        </ul>
        <div v-if="project.attributes.tags">
          <ul class="inline-flex items-center space-x-2">
            <li><TagIcon class="h-5 w-5" /></li>
            <li>Tags:</li>
            <li>
              <router-link v-for="tag in project.attributes.tags" :key="tag" :to="{ name: 'projects' }" class="mr-2">
                {{ tag }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="lg:col-span-1">
      <h3 class="mb-4">Author</h3>
      <AuthorCard
        :id="project.author.id"
        :full_name="project.author.full_name"
        :avatar_url="project.author.avatar_url"
        :pictureSize="'h-10 w-10'"
      />
      <h3 class="my-6">Created at</h3>
      <DateFormatted :date="project.created_at" :withTime="true" :iconSize="'h-5 w-5'" class="text-sm" />
    </div>
  </div>
  <h2 class="mb-6">Tasks ({{ project.tasks_count }})</h2>
  <div class="grid-inner-items gap-4">
    <div v-if="project.tasks.length === 0">No tasks for this project... yet.</div>
    <div v-else v-for="(task, index) in project.tasks" :key="task.id" class="block-item shadow-md">
      <div class="pt-6 pb-4 px-6">
        <div class="flex flex-col sm:h-64">
          <div class="flex-grow">
            <h3 class="line-clamp-2 dark:text-secondary">
              <span class="dark:text-secondary-dark">#{{ index + 1 }}</span> {{ task.title }}
            </h3>
            <p class="line-clamp-3">{{ stripHTMLTagsFromString(task.description) }}</p>
          </div>
          <Button
            @click="() => $router.push({ name: 'task-details', params: { id: task.id } })"
            :disabled="task.status !== 1"
            :tabIndex="index + 1"
            class="my-4 w-full"
          >
            View task details
          </Button>
          <div class="text-center text-secondary-dark">
            Steps count: {{ task.steps_count }}, ~{{ task.steps_count * 1.5 }} min
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { TagIcon, FolderIcon } from '@heroicons/vue/outline'
import { DateFormatted, AuthorCard, Button } from '__/components'
import { supabase } from '__/supabase'
import { definitions } from '__/types/supabase'
import { convertMarkdownToHTML, stripHTMLTagsFromString } from '__/helpers'

export default defineComponent({
  name: 'ProjectContent',
  components: {
    TagIcon,
    FolderIcon,
    DateFormatted,
    AuthorCard,
    Button,
  },
  props: {
    projectId: { type: String, required: true },
  },
  setup: async (props) => {
    // Define needed instances.
    const toast = useToast()
    // Define needed variables.
    const project: any = ref<definitions['projects_author_tasks_list_count']>()
    // Define async function for getting one project by ID.
    try {
      // Send request to Supabase.
      const { data, error } = await supabase
        .from<definitions['projects_author_tasks_list_count']>('projects_author_tasks_list_count')
        .select('*')
        .eq('id', props.projectId)
        .single()
      // Throw error, if something went wrong.
      if (error) throw error
      // Update project object, if get successful response.
      project.value = data
    } catch (error: any) {
      // Show error message in toast.
      toast.error(error.error_description || error.message)
    }
    // Return instances and variables.
    return { project, convertMarkdownToHTML, stripHTMLTagsFromString }
  },
})
</script>