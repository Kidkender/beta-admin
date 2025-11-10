import __ENV__ from '@constant/env.const.ts'

const CONFIG_APP = {
  I18N: {
    DEFAULT_LOCALE: 'vi',
    SUPPORTED_LOCALES: ['en', 'vi'],
    COOKIE_NAME: 'NEXT_LOCALE',
  },

  TOKEN: {
    ACCESS_TOKEN: __ENV__.IS_PRODUCTION ? 'kj12hkeqfaas' : 'access_token',
    REFRESH_TOKEN: __ENV__.IS_PRODUCTION ? '4io3ja1xfdsa' : 'refresh_token',
  },
} as const

export default CONFIG_APP
