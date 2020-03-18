import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _04be1164 = () => interopDefault(import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */))
const _908e8102 = () => interopDefault(import('../pages/admin/user.vue' /* webpackChunkName: "pages/admin/user" */))
const _6c212b97 = () => interopDefault(import('../pages/api/user/index.vue' /* webpackChunkName: "pages/api/user/index" */))
const _35c8ceae = () => interopDefault(import('../pages/api/user/login.vue' /* webpackChunkName: "pages/api/user/login" */))
const _9d06b924 = () => interopDefault(import('../pages/api/user/register.vue' /* webpackChunkName: "pages/api/user/register" */))
const _ecdf5de4 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _04be1164,
    name: "admin"
  }, {
    path: "/admin/user",
    component: _908e8102,
    name: "admin-user"
  }, {
    path: "/api/user",
    component: _6c212b97,
    name: "api-user"
  }, {
    path: "/api/user/login",
    component: _35c8ceae,
    name: "api-user-login"
  }, {
    path: "/api/user/register",
    component: _9d06b924,
    name: "api-user-register"
  }, {
    path: "/",
    component: _ecdf5de4,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
