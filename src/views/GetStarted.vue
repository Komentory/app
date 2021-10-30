<template>
  <div class="grid grid-cols-1 sm:grid-cols-12 xl:grid-cols-24">
    <div class="sm:col-span-12 xl:col-start-7 mt-24">
      <div class="py-4 px-2 sm:py-6 sm:px-6">
        <h1>Get Started</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quis nisi suscipit eum, placeat harum
          maxime sunt voluptate enim eius amet adipisci accusantium excepturi sed facilis facere totam! Delectus,
          perferendis.
        </p>
        <pre>{{ projects }}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { supabase } from '__/supabase'
import { definitions } from '__/types/supabase'

export default defineComponent({
  name: 'GetStarted',
  setup() {
    const loading = ref(false)
    const projects: any = ref<definitions['projects']>()

    const handleLogin = async () => {
      try {
        loading.value = true
        let { data, error } = await supabase.from<definitions['projects']>('projects').select('*')
        if (error) throw error
        projects.value = data
      } catch (error: any) {
        alert(error.error_description || error.message)
      } finally {
        loading.value = false
      }
    }

    handleLogin()

    return {
      loading,
      projects,
    }
  },
})
</script>