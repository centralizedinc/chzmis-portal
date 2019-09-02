import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
import SecuredLayout from './layouts/SecuredLayout.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Landing Page',
      component: MainLayout,
      children: [{
          path: '',
          name: 'Home',
          component: () => import('./views/landing/Home.vue')
        },
        {
          path: 'signUp2',
          name: 'Sign Up',
          component: () => import('./views/landing/SignUp2.vue')
        },
        {
          path: 'signUp3',
          name: 'Sign Up',
          component: () => import('./views/landing/SignUp3.vue')
        },
        {
          path: 'newAccount',
          name: 'New Account',
          component: () => import('./views/landing/CreateNewAccount.vue')
        },
        {
          path: 'confirmRegistration',
          name: 'Confirm Registration',
          component: () => import('./views/landing/ConfirmRegistration.vue')
        },
        {
          path: 'googleSignUp',
          name: 'Google Sign up',
          component: () => import('./views/landing/GoogleSignupSuccess.vue')
        },
        {
          path: 'policy',
          name: 'Google Policy',
          component: () => import('./views/landing/Policy.vue')
        },
        {
          path: 'facebookSignUp',
          name: 'Facebook Sign up',
          component: () => import('./views/landing/FacebookSignupSuccess.vue')
        }, {
          path: 'registration',
          name: 'Registration',
          component: () => import('./views/landing/RegForm.vue')
        },
        {
          path: 'login',
          name: 'Login',
          component: () => import('./views/landing/Login.vue')
        },
        {
          path: 'create/connection',
          name: 'Create Connections',
          component: () => import('./views/landing/CreateConnection.vue')
        },
        {
          path: 'search/connection',
          name: 'Connect with Others',
          component: () => import('./components/SearchConnection.vue')
        },

      ]
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
      path: '/main',
      name: 'Secured Layout',
      component: SecuredLayout,
      children: [{
        path: '',
        name: 'Main Page',
        component: () => import('./views/main/MainPage.vue')
      }]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    },

  ]
})