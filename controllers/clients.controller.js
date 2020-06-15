const ClientModel = require("../models/client.model");
const responses = require("../utils/responses");

module.exports = {
  async getAll() {
    try {
      const clients = await ClientModel.getAll();
      return responses.OK(clients);
    } catch (error) {
      console.log(error);
      return responses.SERVER_ERROR;
    }
  },
  async create({
    client_id,
    client_email,
    client_name,
    client_phone,
    client_address,
  }) {
    try {
      let client = arguments[0];
      let clientObj = new ClientModel(client);
      await ClientModel.init();
      let created = await clientObj.create();
      return responses.OK(created);
    } catch (error) {
      if (error.type) {
        return responses.CUSTOM_ERROR(error);
      }
      return responses.SERVER_ERROR;
    }
  },
};
