module.exports = (app) => {
  app.use('/user', require('../routes/login.router'))
  app.use('/sales', require('../routes/sales.router'))
  app.use('/clients', require('../routes/clients.router'))

}
