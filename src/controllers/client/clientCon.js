const { fetchAllClient, assignToClient } = require('../../models/basicQueries');
const { execSql, mySqlTxn } = require('../../models/sqlGetResult');
const { resMsg } = require('../../../config/constants/constant');

class ClientCon {
  async fetchAllClient() {
    const allClients = await execSql(fetchAllClient());
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: { allClients }
      }
    };
  }

  async assignToClient(reqData) {
    const dbres = await mySqlTxn(assignToClient(reqData));
    if (dbres.code) {
      return {
        httpStatus: 404,
        body: { success: false, msg: resMsg.ASSIGN_ADMIN_ERROR, data: {} }
      };
    }
    return {
      httpStatus: 200,
      body: {
        success: true,
        msg: resMsg.SUCCESSFULLY_ASSIGNED
      }
    };
  }
}
module.exports = new ClientCon();
