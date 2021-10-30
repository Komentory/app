import { createApp } from 'vue'
import Toast, { PluginOptions, POSITION } from 'vue-toastification'

// Import App routes and stores.
import { router } from '__/router'
import { store, key } from '__/store'

// Import plugin styles.
import 'vue-toastification/dist/index.css'

// Import App styles.
import '__/assets/css/style.css'
import '__/assets/css/heroicons.css'
import '__/assets/css/toast.css'
import '__/assets/css/transition.css'

// Import the App component.
import App from '__/App.vue'

// Create a new Vue instance.
const app = createApp(App)

// Set options for plugins.
const toastOptions: PluginOptions = {
  position: POSITION.BOTTOM_CENTER,
  maxToasts: 5,
  newestOnTop: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  hideProgressBar: true,
  closeButton: false,
  filterBeforeCreate: (toast: any, toasts: any) => {
    if (toasts.filter((t: any) => t.type === toast.type).length !== 0) {
      // Returning false discards the toast.
      return false
    }
    return toast
  },
}

// Set middleware before each route.
router.beforeEach((to) => {
  // Checking router meta and user authentication.
  if (to.meta.requiresAuth && !('supabase.auth.token' in localStorage)) {
    // If not, redirect to User Login page.
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

// Install plugins.
app.use(router)
app.use(store, key)
app.use(Toast, toastOptions)

// Mount the App component to the root element.
app.mount('#app-komentory')
