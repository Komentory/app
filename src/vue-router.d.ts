import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean // must be declared by every route
  }
}
