const __ENDPOINT__ = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },

  POST: {
    INDEX: '/posts',
  },

  CONTACT: {
    INDEX: '/contact',
  },

  MEDIA: {
    INDEX: '/media',
    UPLOAD: '/media/upload',
  },

  SLIDER: {
    INDEX: '/slider',
  },
} as const

export default __ENDPOINT__
