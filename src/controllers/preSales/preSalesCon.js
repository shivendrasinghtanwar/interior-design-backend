const { allUnassignedClientQuery, fetchAssignedClientQuery } = require('../../models/preSalesQueries');
const { execSql } = require('../../models/sqlGetResult');
const { resMsg } = require('../../../config/constants/constant');

class PreSalesCon {
  async fetchAllUnassignedClient(reqData) {
    const allClients = await execSql(allUnassignedClientQuery(reqData));
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: { allClients }
      }
    };
  }

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
}
module.exports = new PreSalesCon();
