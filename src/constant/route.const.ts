const __ROUTE__ = {
  UNDEFINED_ROUTE: '/404',

  DASHBOARD: '/',
  CONTENT: {
    INDEX: '/content',
    NEW: '/content/new',
    DETAIL: '/content/:id',
  },

  CUSTOMER: {
    INDEX: '/customer',
    NEW: '/customer/new',
    DETAIL: '/customer/:id',
  },

  USER: {
    INDEX: '/user',
    NEW: '/user/new',
    DETAIL: '/user/:id',
  },

  PACKAGE: {
    INDEX: '/package',
    NEW: '/package/new',
    DETAIL: '/package/:id',
  },

  TRADING: {
    INDEX: '/trading',
    REPORTS: '/trading/reports',
    TRANSACTIONS: '/trading/transactions',
  },

  SETTINGS: '/settings',

  AUTH: {
    INDEX: '/auth',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },
} as const

export default __ROUTE__
