const __ENDPOINT__ = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },

  USER: {
    INDEX: '/user',
    ME: '/user/me',
  },

  POST: {
    INDEX: '/posts',
  },

  CONTACT: {
    INDEX: '/contact',
  },

  COMPANY_INFO: {
    INDEX: '/company-info',
  },

  MEDIA: {
    INDEX: '/media',
    UPLOAD: '/media/upload',
    UPLOAD_MULTI: '/media/upload-multiple',
  },

  SLIDER: {
    INDEX: '/slider',
  },
} as const

export default __ENDPOINT__
