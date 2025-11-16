const __ENDPOINT__ = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },

  POST: {
    INDEX: '/posts',
  },

  CUSTOMER: {
    LIST: '/customers',
    DETAIL: '/customer',
  },

  PACKAGE: {
    LIST: '/packages',
    DETAIL: '/package',
  },
} as const

export default __ENDPOINT__
