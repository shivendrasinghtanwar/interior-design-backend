const { allOnSiteRecords,allDistinctItemTypes } = require('../../models/boqQueries');
const { execSql } = require('../../models/sqlGetResult');
class BoqCon {
  async fetchAllOnSiteRecords(reqData){

    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allOnSiteRecords())
      }
    };
  }

  async getAllItemTypes(reqData) {
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allDistinctItemTypes())
      }
    };
  }
}
module.exports = new BoqCon();
