const { assignToClient, getClientProfile, updateClientProfile } = require('../../models/basicQueries');
const { execSql, mySqlTxn } = require('../../models/sqlGetResult');
const { resMsg } = require('../../../config/constants/constant');

class ClientCon {
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

  async getProfile(clientId) {
    const [profile] = await execSql(getClientProfile(clientId));
    if (!profile) {
      return {
        httpStatus: 404,
        body: { success: false, msg: resMsg.INVALID_CLIENT_ID, data: {} }
      };
    }
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: profile
      }
    };
  }

  async updateClientProfile(clientId) {
    const [profile] = await mySqlTxn(updateClientProfile(clientId));
    if (!profile) {
      return {
        httpStatus: 404,
        body: { success: false, msg: resMsg.INVALID_CLIENT_ID, data: {} }
      };
    }
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: profile
      }
    };
  }
}
module.exports = new ClientCon();
