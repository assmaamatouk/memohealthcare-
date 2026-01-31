import { createRouter, createWebHistory } from 'vue-router'

import Farmaci from '@/views/Farmaci.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Welcome from '@/views/Welcome.vue'
import Esami from '@/views/Esami.vue'
import Appuntamenti from '@/views/Appuntamenti.vue'
import Gestione from '@/views/Gestione.vue'
import Profilo from '@/views/Profilo.vue'

const routes = [
  { path: '/', redirect: '/welcome' },
  { path: '/welcome', name: 'Welcome', component: Welcome },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },

  // pagine protette
  { path: '/home', name: 'Home', component: Home },
  { path: '/gestione', name: 'Gestione', component: Gestione },
  { path: '/profilo', name: 'Profilo', component: Profilo },
  { path: '/farmaci', name: 'Farmaci', component: Farmaci },
  { path: '/appuntamenti', name: 'Appuntamenti', component: Appuntamenti },
  { path: '/esami', name: 'Esami', component: Esami },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  const publicPages = ['/welcome', '/login', '/register']
  const loggedUser = sessionStorage.getItem('loggedUser')

  // pagine pubbliche 
  if (publicPages.includes(to.path)) {
    return next()
  }

  // non loggato a login
  if (!loggedUser) {
    return next('/login')
  }

  // loggato , avanti
  next()
})

export default router
