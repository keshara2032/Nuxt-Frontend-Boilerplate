import Vue from 'vue'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_bootstrapvue_77d73202 from 'nuxt_plugin_bootstrapvue_77d73202' // Source: ./bootstrap-vue.js (mode: 'all')
import nuxt_plugin_workbox_3ed24c28 from 'nuxt_plugin_workbox_3ed24c28' // Source: ./workbox.js (mode: 'client')
import nuxt_plugin_nuxticons_edee5b10 from 'nuxt_plugin_nuxticons_edee5b10' // Source: ./nuxt-icons.js (mode: 'all')
import nuxt_plugin_plugin_94c23118 from 'nuxt_plugin_plugin_94c23118' // Source: ./vuetify/plugin.js (mode: 'all')
import nuxt_plugin_nuxtleaflet_1119adf5 from 'nuxt_plugin_nuxtleaflet_1119adf5' // Source: ./nuxt-leaflet.js (mode: 'client')
import nuxt_plugin_axios_67b958d0 from 'nuxt_plugin_axios_67b958d0' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_notifier_3e43155b from 'nuxt_plugin_notifier_3e43155b' // Source: ../plugins/notifier.js (mode: 'all')
import nuxt_plugin_leaflet_2c5edc72 from 'nuxt_plugin_leaflet_2c5edc72' // Source: ../plugins/leaflet (mode: 'client')
import nuxt_plugin_plugin_56a2ebe8 from 'nuxt_plugin_plugin_56a2ebe8' // Source: ./auth/plugin.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp (ssrContext) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  const registerModule = store.registerModule
  store.registerModule = (path, rawModule, options) => registerModule.call(store, path, rawModule, Object.assign({ preserveState: process.client }, options))

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"PeraRide","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"This is the front end web application for Bicycle Sharing Project."},{"name":"viewport","content":"width=device-width, initial-scale=1, shrink-to-fit=no"},{"hid":"mobile-web-app-capable","name":"mobile-web-app-capable","content":"yes"},{"hid":"apple-mobile-web-app-title","name":"apple-mobile-web-app-title","content":"pera-rides"},{"hid":"author","name":"author","content":"Nadun Welikanda"},{"hid":"theme-color","name":"theme-color","content":"#fff"},{"hid":"og:type","name":"og:type","property":"og:type","content":"website"},{"hid":"og:title","name":"og:title","property":"og:title","content":"pera-rides"},{"hid":"og:site_name","name":"og:site_name","property":"og:site_name","content":"pera-rides"},{"hid":"og:description","name":"og:description","property":"og:description","content":"This is the front end web application for Bicycle Sharing Project."}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Roboto:100,300,400,500,700,900&display=swap"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002F@mdi\u002Ffont@latest\u002Fcss\u002Fmaterialdesignicons.min.css"},{"rel":"manifest","href":"\u002F_nuxt\u002Fmanifest.c3744304.json"},{"rel":"shortcut icon","href":"\u002F_nuxt\u002Ficons\u002Ficon_64.5a69bd.png"},{"rel":"apple-touch-icon","href":"\u002F_nuxt\u002Ficons\u002Ficon_512.5a69bd.png","sizes":"512x512"}],"style":[],"script":[],"htmlAttrs":{"lang":"en"}},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  const inject = function (key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Plugin execution

  if (typeof nuxt_plugin_bootstrapvue_77d73202 === 'function') {
    await nuxt_plugin_bootstrapvue_77d73202(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_3ed24c28 === 'function') {
    await nuxt_plugin_workbox_3ed24c28(app.context, inject)
  }

  if (typeof nuxt_plugin_nuxticons_edee5b10 === 'function') {
    await nuxt_plugin_nuxticons_edee5b10(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_94c23118 === 'function') {
    await nuxt_plugin_plugin_94c23118(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_nuxtleaflet_1119adf5 === 'function') {
    await nuxt_plugin_nuxtleaflet_1119adf5(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_67b958d0 === 'function') {
    await nuxt_plugin_axios_67b958d0(app.context, inject)
  }

  if (typeof nuxt_plugin_notifier_3e43155b === 'function') {
    await nuxt_plugin_notifier_3e43155b(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_leaflet_2c5edc72 === 'function') {
    await nuxt_plugin_leaflet_2c5edc72(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_56a2ebe8 === 'function') {
    await nuxt_plugin_plugin_56a2ebe8(app.context, inject)
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, () => {
        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from, next) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
