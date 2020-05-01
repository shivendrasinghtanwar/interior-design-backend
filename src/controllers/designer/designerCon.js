const { fetchClientMetQuery, getOnBoardClientsOfDesigner, updateClientMetTxn, fetchAssignedClientQuery } = require('../../models/designerQueries');
const { execSql, mySqlTxn } = require('../../models/sqlGetResult');
const { resMsg } = require('../../../config/constants/constant');

class DesignerCon {
  async fetchAssignedClient(reqData) {
    const allClients = await execSql(fetchAssignedClientQuery(reqData));
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: { allClients }
      }
    };
  }

  async fetchClientMet(reqData) {
    const allClients = await execSql(fetchClientMetQuery(reqData));
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: { allClients }
      }
    };
  }

  async updateClientMet(reqData) {
    const dbres = await mySqlTxn(updateClientMetTxn(reqData));
    if (dbres.code) {
      return {
        httpStatus: 500,
        body: { success: false, msg: resMsg.CLIENT_MET_ERROR, data: {} }
      };
    }
    return {
      httpStatus: 200,
      body: {
        success: true,
        msg: resMsg.CLIENT_MET_SUCCESS
      }
    };
  }

  async getOnBoardClients(reqData){
    const allClients = await execSql(getOnBoardClientsOfDesigner(reqData.adminId));
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: { allClients }
      }
    };
  }
}
module.exports = new DesignerCon();
