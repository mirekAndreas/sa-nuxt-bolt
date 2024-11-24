
// @ts-nocheck
import locale__home_project_locales_cs_json from "../locales/cs.json";
import locale__home_project_locales_en_json from "../locales/en.json";
import locale__home_project_locales_de_json from "../locales/de.json";


export const localeCodes =  [
  "cs",
  "en",
  "de"
]

export const localeMessages = {
  "cs": [{ key: "../locales/cs.json", load: () => Promise.resolve(locale__home_project_locales_cs_json), cache: true }],
  "en": [{ key: "../locales/en.json", load: () => Promise.resolve(locale__home_project_locales_en_json), cache: true }],
  "de": [{ key: "../locales/de.json", load: () => Promise.resolve(locale__home_project_locales_de_json), cache: true }]
}

export const vueI18nConfigs = [
  () => import("../i18n.config.ts?hash=bffaebcb&config=1" /* webpackChunkName: "__i18n_config_ts_bffaebcb" */)
]

export const nuxtI18nOptions = {
  "experimental": {
    "localeDetector": ""
  },
  "bundle": {
    "compositionOnly": true,
    "runtimeOnly": false,
    "fullInstall": true,
    "dropMessageCompiler": false
  },
  "compilation": {
    "jit": true,
    "strictMessage": true,
    "escapeHtml": false
  },
  "customBlocks": {
    "defaultSFCLang": "json",
    "globalSFCScope": false
  },
  "vueI18n": "./i18n.config.ts",
  "locales": [
    {
      "code": "cs",
      "iso": "cs-CZ",
      "name": "Čeština",
      "files": [
        "locales/cs.json"
      ]
    },
    {
      "code": "en",
      "iso": "en-US",
      "name": "English",
      "files": [
        "locales/en.json"
      ]
    },
    {
      "code": "de",
      "iso": "de-DE",
      "name": "Deutsch",
      "files": [
        "locales/de.json"
      ]
    }
  ],
  "defaultLocale": "cs",
  "defaultDirection": "ltr",
  "routesNameSeparator": "___",
  "trailingSlash": false,
  "defaultLocaleRouteNameSuffix": "default",
  "strategy": "prefix_except_default",
  "lazy": false,
  "langDir": "locales/",
  "rootRedirect": null,
  "detectBrowserLanguage": {
    "alwaysRedirect": false,
    "cookieCrossOrigin": false,
    "cookieDomain": null,
    "cookieKey": "i18n_redirected",
    "cookieSecure": false,
    "fallbackLocale": "",
    "redirectOn": "root",
    "useCookie": true
  },
  "differentDomains": false,
  "baseUrl": "",
  "dynamicRouteParams": false,
  "customRoutes": "page",
  "pages": {},
  "skipSettingLocaleOnNavigate": false,
  "types": "composition",
  "debug": false,
  "parallelPlugin": false,
  "i18nModules": []
}

export const nuxtI18nOptionsDefault = {
  "experimental": {
    "localeDetector": ""
  },
  "bundle": {
    "compositionOnly": true,
    "runtimeOnly": false,
    "fullInstall": true,
    "dropMessageCompiler": false
  },
  "compilation": {
    "jit": true,
    "strictMessage": true,
    "escapeHtml": false
  },
  "customBlocks": {
    "defaultSFCLang": "json",
    "globalSFCScope": false
  },
  "vueI18n": "",
  "locales": [],
  "defaultLocale": "",
  "defaultDirection": "ltr",
  "routesNameSeparator": "___",
  "trailingSlash": false,
  "defaultLocaleRouteNameSuffix": "default",
  "strategy": "prefix_except_default",
  "lazy": false,
  "langDir": null,
  "rootRedirect": null,
  "detectBrowserLanguage": {
    "alwaysRedirect": false,
    "cookieCrossOrigin": false,
    "cookieDomain": null,
    "cookieKey": "i18n_redirected",
    "cookieSecure": false,
    "fallbackLocale": "",
    "redirectOn": "root",
    "useCookie": true
  },
  "differentDomains": false,
  "baseUrl": "",
  "dynamicRouteParams": false,
  "customRoutes": "page",
  "pages": {},
  "skipSettingLocaleOnNavigate": false,
  "types": "composition",
  "debug": false,
  "parallelPlugin": false
}

export const nuxtI18nInternalOptions = {
  "__normalizedLocales": [
    {
      "code": "cs",
      "iso": "cs-CZ",
      "name": "Čeština",
      "files": [
        {
          "path": "locales/cs.json"
        }
      ]
    },
    {
      "code": "en",
      "iso": "en-US",
      "name": "English",
      "files": [
        {
          "path": "locales/en.json"
        }
      ]
    },
    {
      "code": "de",
      "iso": "de-DE",
      "name": "Deutsch",
      "files": [
        {
          "path": "locales/de.json"
        }
      ]
    }
  ]
}

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false

