
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'PeraRide',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      // To ensure proper rendering and touch zooming for all devices, add the responsive viewport meta tag to your <head>
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'leaflet/dist/leaflet.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/notifier.js',
    {
      src: '~/plugins/leaflet',
      ssr: false
    }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth',
    'nuxt-leaflet'

  ],
  bootstrapVue: {
    // If you want all bundle of bootstrap components and directives
    componentPlugins: [

      'CardPlugin',
      'TablePlugin',
      'InputGroupPlugin',
      'LayoutPlugin',
      'NavPlugin',
      'PaginationPlugin',
      'NavbarPlugin',
      'ImagePlugin',
      'IconsPlugin',
      'SpinnerPlugin',
      'JumbotronPlugin',
      'FormInputPlugin',
      'FormSelectPlugin',
      'FormGroupPlugin',
      'FormPlugin',
      'FormCheckboxPlugin',
      'FormInputPlugin',
      'FormRadioPlugin',

      'ToastPlugin',
      'TabsPlugin',
      'ModalPlugin',

      'MediaPlugin',

      'ButtonGroupPlugin',
      'ButtonPlugin',
      'ButtonToolbarPlugin',

      'AlertPlugin',
      'BadgePlugin',
      'CarouselPlugin',
      'CollapsePlugin',
      'DropdownPlugin',
      'ListGroupPlugin',
      'PopoverPlugin',
      'BVToastPlugin'

    ],
    directivePlugins: ['VBPopoverPlugin', 'VBTooltipPlugin', 'VBScrollspyPlugin']
    /*,
    // Or if you want specific set of components and directives ::For optimizing purpouse
    directives: ['VBModal', 'VBPopover', 'VBTooltip', 'VBScrollspy']
    */

  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.NODE_ENV === 'production' ? 'https://peraride-api.herokuapp.com' : 'http://localhost:3000'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },

  server: {
    port: process.env.PORT || 8000,
    host: process.env.HOST || 'localhost'
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/auth/logout', method: 'delete' },
          user: { url: '/api/auth/user', method: 'get', propertyName: 'user' }
        },
        // tokenRequired: true,
        tokenType: 'Bearer'
      }
    }
  }
}
