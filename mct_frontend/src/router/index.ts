import { createRouter, createWebHistory } from 'vue-router'

// Route views code-splitted for lazy loading
const AuthView = () => import('../views/AuthView.vue')
const DashboardView = () => import('../views/DashboardView.vue')
const InputView = () => import('../views/InputView.vue')
const MCTCalculatorView = () => import('../views/MCTCalculatorView.vue')
const ReportsView = () => import('../views/ReportsView.vue')
const AccountView = () => import('../views/AccountView.vue')

const routes = [
  {
    path: '/login',
    name: 'login',
    component: AuthView,
    meta: { guestOnly: true }
  },
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/input',
    name: 'input',
    component: InputView,
    meta: { requiresAuth: true }
  },
  {
    path: '/mct',
    name: 'mct',
    component: MCTCalculatorView,
    meta: { requiresAuth: true }
  },
  {
    path: '/reports',
    name: 'reports',
    component: ReportsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guard: If not logged in, redirect to login
import { useAuthStore } from '../stores/auth'
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.user) {
    next('/login')
  } else if (to.meta.guestOnly && auth.user) {
    next('/')
  } else {
    next()
  }
})

export default router
