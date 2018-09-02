module.exports = (app) => {
  app.use('/user', require('../routes/login.router'))
}