import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import HoldingInputView from '../views/HoldingInputView.vue'
import OwnerInputView from '../views/OwnerInputView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/newlandholding/:id',
      name: 'newlandholding',
      component: HoldingInputView
    },
    {
      path: '/editlandholding/:id',
      name: 'editlandholding',
      component: HoldingInputView,
    },
    {
      path: '/newowner/',
      name: 'newowner',
      component: OwnerInputView
    },
    {
      path: '/editowner/:id',
      name: 'editowner',
      component: OwnerInputView,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/"
    }
  ]
})

export default router
