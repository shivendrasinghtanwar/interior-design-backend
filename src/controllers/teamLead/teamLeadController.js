const {
  allToBeAssignedClients,
  allAssignedNotMetClients
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

  async getAssignedNotMetClients(adminId) {
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allAssignedNotMetClients(adminId))
      }
    };
  }
}

module.exports = new TeamLeadController();
