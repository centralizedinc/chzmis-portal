import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
import SecuredLayout from './layouts/SecuredLayout.vue'
import store from './store'

Vue.use(Router)

function isAuthenticated(to, from, next) {
  const is_authenticated = store.state.accounts.is_authenticated && store.state.accounts.token;
  if (to.matched[0].name === "Landing Page")
    next(is_authenticated ? "/main" : true)
  else if (to.matched[0].name === "Secured Layout")
    next(is_authenticated ? true : "/")
}

export default new Router({
  routes: [{
      path: '/',
      name: 'Landing Page',
      component: MainLayout,
      children: [{
          path: '',
          name: 'Home',
          beforeEnter: isAuthenticated,
          component: () => import('./views/landing/Home.vue')
        },
        {
          path: 'forgetPassword',
          name: 'forget password',
          beforeEnter: isAuthenticated,
          component: () => import('./views/landing/ForgotPassword.vue')
        },
        // {
        //   path: 'signUp',
        //   name: 'Sign Up',
        //   component: () => import('./views/landing/SignUpNew.vue')
        // },
        // {
        //   path: 'signUp2',
        //   name: 'Sign Up',
        //   component: () => import('./views/landing/SignUp2.vue')
        // },
        // {
        //   path: 'signUp3',
        //   name: 'Sign Up',
        //   component: () => import('./views/landing/SignUp3.vue')
        // },
        {
          path: 'newAccount',
          name: 'New Account',
          beforeEnter: isAuthenticated,
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
        },
        // {
        //   path: 'registration',
        //   name: 'Registration',
        //   component: () => import('./views/landing/RegForm.vue')
        // },
        // {
        //   path: 'login',
        //   name: 'Login',
        //   component: () => import('./views/landing/Login.vue')
        // },

      ]
    },
    {
      path: '/main',
      name: 'Secured Layout',
      component: SecuredLayout,
      beforeEnter: isAuthenticated,
      children: [{
          path: '',
          name: 'Main Page',
          component: () => import('./views/main/MainPage.vue')
        },
        {
          path: 'setup/interest',
          name: 'Choose Interest',
          component: () => import('./views/main/ChooseInterest.vue')
        },
        {
          path: 'setup/connection',
          name: 'Create Connections',
          component: () => import('./views/main/CreateConnection.vue')
        },
        {
          path: 'search/connection',
          name: 'Connect with Others',
          component: () => import('./components/SearchConnection.vue')
        },
        {
          path: 'setup/channel',
          name: 'Channel ek ek',
          component: () => import('./views/main/CreateChannel.vue')
        },
        {
          path: 'setup/own-channel',
          name: 'Own Channel',
          component: () => import('./views/main/CreateOwnChannel.vue')
        },
        {
          path: 'setup/profile',
          name: "ProfileSetup",
          component: () => import('./views/main/ProfileSetup.vue')
        },
        {
          path: 'setup/finish',
          name: "Account Setup Finish",
          component: () => import('./views/main/AccountReady.vue')
        },
      ]
    },
    {
      path: '/main',
      name: 'Secured Layout',
      component: SecuredLayout,
      beforeEnter: isAuthenticated,
      children: [{
        path: '',
        name: 'Main Page',
        component: () => import('./views/main/MainPage.vue')
      }, ]
    },
    {
      path: '/register',
      name: 'Secured Layout',
      component: SecuredLayout,
      beforeEnter: isAuthenticated,
      children: [{
          path: '',
          name: 'Registration Page',
          component: () => import('./views/main/RegisterPage.vue')
        },
        {
          path: 'setup/interest',
          name: 'Choose Interest',
          component: () => import('./views/main/ChooseInterest.vue')
        },
        {
          path: 'setup/connection',
          name: 'Create Connections',
          component: () => import('./views/main/CreateConnection.vue')
        },
        {
          path: 'search/connection',
          name: 'Connect with Others',
          component: () => import('./components/SearchConnection.vue')
        },
        {
          path: 'setup/channel',
          name: 'Channel ek ek',
          component: () => import('./views/main/CreateChannel.vue')
        },
        {
        path: 'setup/profile',
        name: "ProfileSetup",
        component: () => import('./views/main/ProfileSetup.vue')
      },
      ]
    },
    {
      path: '/register',
      name: 'Secured Layout',
      component: SecuredLayout,
      beforeEnter: isAuthenticated,
      children: [{
        path: '',
        name: 'Registration Page',
        component: () => import('./views/main/RegisterPage.vue')
      }, 
    ]
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/attachment',
      name: 'Attachment',
      component: () => import('@/components/AttachmentLayout.vue')
    }
  ]
})