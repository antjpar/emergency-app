/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
const { configure } = require('quasar/wrappers')

module.exports = configure(function(ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot: ['composition-api', 'i18n'],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: ['app.sass'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'fontawesome-v5', // optional, you are not bound to it
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: 'svg-fontawesome-v5', // Quasar icon set
      lang: 'en-us', // Quasar language pack

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      all: false,

      components: [
        'QLayout',
        'QHeader',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QForm',
        'QInput',
        'QSelect',
        'QTabs',
        'QTab',
        'QTabPanels',
        'QTabPanel',
        'QDialog',
        'QCard',
        'QCardSection',
        'QSelect',
        'QStep',
        'QStepper',
        'QChatMessage',
        'QRadio',
        'QCircularProgress',
        'QChip'
      ],

      directives: ['Ripple'],

      // Quasar plugins
      plugins: [],
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
    supportIE: false,

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ts
    supportTS: {
      tsCheckerConfig: { eslint: true },
    },

    // https://quasar.dev/quasar-cli/cli-documentation/prefetch-feature
    // preFetch: true

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'history', // available values: 'hash', 'history'

      // rtl: false, // https://quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        })

        const vueLoaderRule = cfg.module.rules.find(
          el => el.test.toString() === /\.vue$/.toString(),
        )

        const ruleFirstLoader = vueLoaderRule.use[0]
        const options = ruleFirstLoader.options

        // change options
        options.transpileOptions = {
          transforms: {
            dangerousTaggedTemplateString: true,
          },
        }

        // linting is slow in TS projects, we execute it only for production builds
        if (ctx.prod) {
          cfg.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /node_modules/,
            options: {
              formatter: require('eslint').CLIEngine.getFormatter('stylish'),
            },
          })
        }
      },
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8080,
      open: true, // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: 'Emergency App',
        short_name: 'Emergency App',
        description:
          'Eine App soll potentiellen Patienten einer Notaufnahme ermoeglichen sich bereits daheim anzumelden. Mit Hilfe einer Auswahl an Gruenden sollen Informationen zur Priorisierung der Verletzung/Krankheit mitgeteilt werden, welche Notaufnahme dafuer zustaendig ist und bei Anmeldung, wann man sich in der Notaufnahme einfinden soll. Der Patient soll zusaetzlich die Moeglichkeit erhalten, eine Erst-Anamnese per Telefon oder Videoanruf zu verlangen, um eventuell so auch einen Besuch in der Notaufnahme zu vermeiden.',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'statics/icons/favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'statics/icons/favicon-510x510.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'statics/icons/favicon-510x510.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
      id: 'org.leda.cordova.emergency-app',
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'emergency-app',
      },

      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack(/* cfg */) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },
    },
  }
})
