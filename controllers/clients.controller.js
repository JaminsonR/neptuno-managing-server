const ClientModel = require('../models/client.model')
const responses = require('../utils/responses')

module.exports = {
  async getAll () {
    try {
      const clients = await ClientModel.getAll()
      return responses.OK(clients)
    } catch (error) {
      console.log(error)
      return responses.SERVER_ERROR
    }
  },
  async create ({ client_id, client_name, client_phone, client_address }) {
    let client = { client_id, client_name, client_phone, client_address }
    let clientObj = new ClientModel(client)
    let created = await clientObj.create()
    return responses.OK(created)
  }
}
