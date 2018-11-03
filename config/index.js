module.exports = {
  URL_DB () {
    if (process.env.NODE_ENV === 'testing') {
      return 'mongodb://localhost:27017/neptuno_test'
    } else if (process.env.NODE_ENV === 'development') {
      return 'mongodb://localhost:27017/neptuno_dev'
    } else if (process.env.NODE_ENV === 'production') {
      return process.env.DATABASE_URL
    } else {
      console.error('You didn"t specify env variable')
      process.exit(1)
    }
  },
  PORT: process.env.PORT || 3000,
  isDevelop: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTesting: process.env.NODE_ENV === 'testing',
  SECRET: process.env.SECRET || 'secret',
  EXPIRE: process.env.EXPIRE || 86400
}
