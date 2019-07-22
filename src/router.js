import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
import SecuredLayout from './layouts/SecuredLayout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing Page',
      component: MainLayout,
      children: [{
        path: '',
        name: 'Home',
        component: () => import('./views/landing/Home.vue')
      },{
        path: 'signUp',
        name: 'Sign Up',
        component: () => import('./views/landing/SignUp.vue')
      },{
        path: 'googleSignUp',
        name: 'Google Sign up',
        component: () => import('./views/landing/GoogleSignupSuccess.vue')
      },{
        path: 'registration',
        name: 'Registration',
        component: () => import('./views/landing/RegForm.vue')
      }]
    },
    {
      path: '/app',
      name: 'Secured Layout',
      component: SecuredLayout,
      children: [{
        path: '',
        name: 'Main Page',
        component: () => import('./views/app/MainPage.vue')
      }]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
