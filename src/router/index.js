import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'main',
    component: () => import('../views/Main.vue'),
    children:[
      {
        path:'shelf',
        alias:'',
        name:'shelf',
        component: () => import('../views/Shelf.vue'),
      },
      {
        path:'bookstore',
        redirect: {path: 'bookstore/selection'},
        name:'bookstore',
        component: () => import('../views/Bookstore.vue'),
        
        children:[
          {
            path:'selection',
            
            name:'selection',
            component: () => import('../views/Selection.vue'),
            
          },
          {
            path:'gratis',
            name:'gratis',
            component: () => import('../views/Gratis.vue'),
          },
          {
            path:'man',
            name:'man',
            component: () => import('../views/Man.vue'),
          },
          {
            path:'she',
            name:'she',
            component: () => import('../views/She.vue'),
          },
          {
            path:'publishing',
            name:'publishing',
            component: () => import('../views/Publishing.vue'),
          },
          {
            path:'listen',
            name:'listen',
            component: () => import('../views/Listen.vue'),
          },
        ]
      },
      {
        path:'sort',
        name:'sort',
        component: () => import('../views/Sort.vue'),
      },
      {
        path:'my',
        name:'my',
        component: () => import('../views/My.vue'),
      },
    ]
  },
  {
    path:'/readBook',
    name:'readBook',
    component: () => import('../views/readBook.vue'),
  },
  {
    path:'/ranking',
    name:'ranking',
    component: () => import('../views/Ranking.vue'),
  },
  {
    path:'/bookDetail',
    name:'bookDetail',
    component: () => import('../views/bookDetail.vue'),
  },
  {
    path:'/login',
    name:'login',
    component: () => import('../views/login.vue'),
  },
  {
    path:'/register',
    name:'register',
    component: () => import('../views/register.vue'),
  },
  {
    path:'/searchBook',
    name:'searchBook',
    component: () => import('../views/searchBook.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router
