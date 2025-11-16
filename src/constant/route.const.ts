const __ROUTE__ = {
  UNDEFINED_ROUTE: '/404',

  DASHBOARD: '/',

  POSTS: {
    INDEX: '/posts',
    CREATE: '/posts/create',
    DETAIL: '/posts/:id',
  },

  TRADING: {
    INDEX: '/trading',
    REPORTS: '/trading/reports',
    TRANSACTIONS: '/trading/transactions',
  },

  CUSTOMER: {
    INDEX: '/customer',
    CREATE: '/customer/create',
    DETAIL: '/customer/:id',
  },

  USER: {
    INDEX: '/user',
    CREATE: '/user/create',
    DETAIL: '/user/:id',
  },

  PACKAGE: {
    INDEX: '/package',
    CREATE: '/package/create',
    DETAIL: '/package/:id',
  },

  SETTINGS: '/settings',

  AUTH: {
    INDEX: '/auth',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },
} as const

export default __ROUTE__
