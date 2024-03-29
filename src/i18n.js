import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const localeCodes = (() => {
  const result = []
  const localeFiles = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  localeFiles.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      result.push(matched[1])
    }
  })

  return result
})()

function loadLocaleMessages () {
  const messages = {}
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

export default new VueI18n({
  locale: localeCodes.includes(navigator.language) ? navigator.language : (process.env.VUE_APP_I18N_LOCALE || 'en'),
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
