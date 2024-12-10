import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Album from '@/views/Album.vue'
import Admin from '@/views/Admin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/album/:id',
      name: 'album',
      component: Album
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})

export default router 
