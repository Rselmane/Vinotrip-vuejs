import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SejoursView from '@/views/SejoursView.vue'
import RouteDesVins from '@/views/RouteDesVins.vue'
import AideView from '@/views/AideView.vue'
import MentionsLegalesView from '@/views/legal/MentionsLegalesView.vue'
import PolitiqueConfidentialiteView from '@/views/legal/PolitiqueConfidentialiteView.vue'
import ConditionsDeVentesView from '@/views/legal/ConditionsDeVentesView.vue'
import LoginView from '../views/LoginView.vue'
import AvisView from '../views/AvisView.vue'
import SejourView from '@/views/SejourView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sejours',
      name: 'sejours',
      component: SejoursView,
    },
    {
      path: '/sejour/:id',
      name: 'Sejour',
      component: SejourView,
    },
    {
      path: '/routedesvins',
      name: 'routedesvins',
      component: RouteDesVins,
    },
    {
      path: '/aide',
      name: 'aide',
      component: AideView,
    },
    {
      path: '/avis',
      name: 'avis',
      component: AvisView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/mentions-legales',
      name: 'mentions-legales',
      component: MentionsLegalesView,
    },
    {
      path: '/politique',
      name: 'politique',
      component: PolitiqueConfidentialiteView,
    },
    {
      path: '/conditions-vente',
      name: 'conditions-vente',
      component: ConditionsDeVentesView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
