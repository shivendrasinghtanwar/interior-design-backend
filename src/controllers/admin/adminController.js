const {
  allToBeAssignedClients,
  allAssignedNotMetClients
} = require('../../models/adminQueries');
const { execSql,mySqlTxn } = require('../../models/sqlGetResult');

class AdminController {
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
  async getDelayedProposals(adminId) {
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allToBeAssignedClients(adminId))
      }
    };
  }
  async getDelayedTasks(adminId) {
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allToBeAssignedClients(adminId))
      }
    };
  }
  async getPaymentDues(adminId) {
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allToBeAssignedClients(adminId))
      }
    };
  }
  async getNewSignUps(adminId) {
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allToBeAssignedClients(adminId))
      }
    };
  }
}
module.exports = new AdminController();
