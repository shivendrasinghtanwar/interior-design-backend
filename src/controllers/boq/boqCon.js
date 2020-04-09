const { allOnSiteRecords } = require('../../models/boqQueries');
const { execSql } = require('../../models/sqlGetResult');
class BoqCon {
  async fetchAllOnSiteRecords(reqData) {
    const allRecords = await execSql(allOnSiteRecords());
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: { allRecords }
      }
    };
  }
}
module.exports = new BoqCon();
