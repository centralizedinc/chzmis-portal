import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  // plugins: [createPersistedState()]
  plugins: [
    createPersistedState({
      key: 'fda-client-reference',
      paths: ['breadcrumbs', 'case', 'certificate', 'foodCertificate', 'licenses', 'notifications', 'payments', 'places', 'products', '', 'references', 'tasks']
    }),
    //store user session in cookiess
    createPersistedState({
      key: 'fda-client-session',
      paths: ['user_session'],
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, {
          expires: 1,
          secure: false
        }),
        removeItem: key => Cookies.remove(key)
      }
    })
  ]
})