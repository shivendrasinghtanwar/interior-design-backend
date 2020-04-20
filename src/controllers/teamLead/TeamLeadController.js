const {
  allToBeAssignedClients
} = require('../../models/teamLeadQueries');
const { execSql,mySqlTxn } = require('../../models/sqlGetResult');


class TeamLeadController {
  async getToBeAssignedClients(adminId) {
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allToBeAssignedClients(adminId))
      }
    };
  }
}

module.exports = new TeamLeadController();
