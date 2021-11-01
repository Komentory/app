import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// Create a routes array.
const routes: Array<RouteRecordRaw> = [
  // Index route:
  {
    path: '/',
    name: 'index',
    meta: { requiresAuth: true }, // only authenticate user can enter to account
    component: () => import('__/views/Index.vue'),
  },
  // Account routes:
  {
    path: '/account',
    name: 'account',
    meta: { requiresAuth: true },
    component: () => import('__/views/Account.vue'),
  },
  // Register routes:
  {
    path: '/register',
    name: 'register',
    meta: { requiresAuth: false },
    component: () => import('__/views/UserRegister.vue'),
  },
  // Login/Logout routes:
  {
    path: '/login',
    name: 'login',
    meta: { requiresAuth: false },
    component: () => import('__/views/UserLogin.vue'),
  },
  {
    path: '/login/success',
    name: 'login-success',
    meta: { requiresAuth: false },
    component: () => import('__/views/UserLoginSuccess.vue'),
  },
  {
    path: '/logout',
    name: 'logout',
    meta: { requiresAuth: false },
    component: () => import('__/views/UserLogout.vue'),
  },
  // Password reset routes:
  {
    path: '/reset-password',
    name: 'reset-password',
    meta: { requiresAuth: false },
    component: () => import('__/views/UserResetPassword.vue'),
  },
  // Information routes:
  {
    path: '/get-started',
    name: 'get-started',
    meta: { requiresAuth: true },
    component: () => import('__/views/GetStarted.vue'),
  },
  // Project routes:
  {
    path: '/projects',
    name: 'projects',
    meta: { requiresAuth: true },
    component: () => import('__/views/Projects.vue'),
  },
  {
    path: '/project/:id',
    name: 'project-details',
    props: true,
    meta: { requiresAuth: true },
    component: () => import('__/views/Project.vue'),
  },
  // Task routes:
  {
    path: '/task/:id',
    name: 'task-details',
    props: true,
    meta: { requiresAuth: true },
    component: () => import('__/views/Task.vue'),
  },
  {
    path: '/task/:id/answers',
    name: 'task-answers',
    props: true,
    meta: { requiresAuth: true },
    component: () => import('__/views/Answers.vue'),
  },
  // Answer routes:
  {
    path: '/answer/:id',
    name: 'answer-details',
    props: true,
    meta: { requiresAuth: true },
    component: () => import('__/views/Answer.vue'),
  },
  // User routes:
  {
    path: '/user/:id',
    name: 'user-details',
    props: true,
    meta: { requiresAuth: true },
    component: () => import('__/views/User.vue'),
  },
  // Not found route:
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    meta: { requiresAuth: false },
    component: () => import('__/views/errors/NotFound.vue'),
  },
]

// Create the router instance.
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
