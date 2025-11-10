const CLIENT_URL = import.meta.env.VITE_CLIENT_URL ?? 'https://minh-beta.com'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? CLIENT_URL
const ENVAIROMENT = import.meta.env.NODE_ENV ?? 'development'

const IS_DEVELOPMENT = ENVAIROMENT === 'development'
const IS_UAT = ENVAIROMENT === 'test'
const IS_PRODUCTION = ENVAIROMENT === 'production'

const __ENV__ = {
  IS_UAT,
  IS_DEVELOPMENT,
  IS_PRODUCTION,

  // CONFIG
  CONFIG: {
    ENV: ENVAIROMENT,
    VERSION: import.meta.env.VITE_APP_VERSION,
    TIMEZONE: import.meta.env.VITE_APP_TIME_ZONE ?? 'Asia/Ho_Chi_Minh',
  },

  // ENDPOINT
  URL: {
    CLIENT: CLIENT_URL,
    DOCS: import.meta.env.VITE_DOCS_URL,
    BACKEND: BACKEND_URL,
    API: `${BACKEND_URL}/${import.meta.env.VITE_PREFIX_BACKEND_URL}`,
  },

  // INFO
  APP: {
    RESOURCE: import.meta.env.VITE_APP_RESOURCE ?? '',
    TYPE: import.meta.env.VITE_APP_TYPE ?? '',
    NAME: import.meta.env.VITE_APP_NAME ?? 'Beta Group',
    SHORT_NAME: import.meta.env.VITE_APP_SHORT_NAME ?? 'Beta Group',
    PREFIX: import.meta.env.VITE_APP_PREFIX ?? '@betagorup',
    TITLE: import.meta.env.VITE_APP_TITLE ?? 'Beta Group',
    SLOGAN: import.meta.env.VITE_APP_SLOGAN ?? 'Beta Group',
    KEYWORDS: import.meta.env.VITE_APP_KEYWORDS ?? 'Beta Group',
    DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION ?? 'Beta Group',
    SUB_DESCRIPTION: import.meta.env.VITE_SUB_DESCRIPTION ?? 'Beta Group',
  },

  // THIRD PARTY
  THIRD_PARTY: {
    VERIFICATION_GOOGLE: import.meta.env.VITE_VERIFICATION_GOOGLE ?? '',
  },
} as const

export default __ENV__
