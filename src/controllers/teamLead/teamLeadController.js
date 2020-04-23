const {
  allToBeAssignedClients,
  allAssignedNotMetClients,
  allDesigners
} = require('../../models/teamLeadQueries');
const { execSql,mySqlTxn } = require('../../models/sqlGetResult');


class TeamLeadController {

  async getAllDesigners(adminId){
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allDesigners(adminId))
      }
    };
  }

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
