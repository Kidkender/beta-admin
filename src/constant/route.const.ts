const __ROUTE__ = {
  UNDEFINED_ROUTE: '/404',

  DASHBOARD: '/',

  POSTS: {
    INDEX: '/posts',
    CREATE: '/posts/create',
    DETAIL: '/posts/:id',
  },

  SLIDER: {
    INDEX: '/slider',
    CREATE: '/slider/create',
    DETAIL: '/slider/:id',
  },

  MEDIA: {
    INDEX: '/media',
    CREATE: '/media/create',
    DETAIL: '/media/:id',
  },

  CONTACT: {
    INDEX: '/contact',
    CREATE: '/contact/create',
    DETAIL: '/contact/:id',
  },

  COMPANY_INFO: {
    INDEX: '/company-info',
    CREATE: '/company-info/create',
    DETAIL: '/company-info/:id',
  },

  AUTH: {
    INDEX: '/auth',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },
} as const

export default __ROUTE__
