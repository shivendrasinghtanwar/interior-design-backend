const { fetchAllClient } = require('../../models/basicQueries');
const { getData } = require('../../models/sqlGetResult');

class ClientCon {
  async fetchAllClient(reqData) {
    const allClients = await getData(fetchAllClient(reqData));
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: {
          allClients
        }
      }
    };
  }
}
module.exports = new ClientCon();
