module.exports = (app) => {
  app.use('/user', require('../routes/login.router'))
}

module.exports = (app) => {
  app.use('/sales', require('../routes/sales.router'))
}

module.exports = (app) => {
  app.use('/clients', require('../routes/clients.router'))
}