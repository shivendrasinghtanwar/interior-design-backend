const { assignToClient, getClientProfile, updateClientProfile, getClientTasks } = require('../../models/basicQueries');
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

  async updateClientProfile(reqData) {

    const clientOldData= await execSql(getClientProfile(reqData.clientId));
    console.log(">>>>>>>>>>",clientOldData[0])
    const profile = await mySqlTxn(updateClientProfile(reqData,clientOldData[0]));
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

  async getTasks(clientId){
    const tasks = await execSql(getClientTasks(clientId));
    if (!tasks) {
      return {
        httpStatus: 404,
        body: { success: false, msg: resMsg.INVALID_CLIENT_ID, data: {} }
      };
    }
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: tasks
      }
    };
  }
}
module.exports = new ClientCon();
