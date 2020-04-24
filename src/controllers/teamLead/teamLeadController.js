const {
  allDesigners,
  allTeamIds,
  allToBeAssignedClients,
  allAssignedNotMetClients,
  allMetClients,
  fetchDesignQuotationByClientId,
  allPaymentDueClients
  
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

  async getAllTeamIds(adminId){
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allTeamIds(adminId))
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

  async getDelayedProposals(adminId) {
    // const metClients = await execSql(allMetClients(adminId));
    // const response = [];
    // for (const record of metClients) {
    //   // console.log('client--',record);
    //   const clientDesignQuotation = await execSql(fetchDesignQuotationByClientId(record.id));
    //   // console.log('clientDesignQuotation---------------------------',clientDesignQuotation.length);
    //   if(clientDesignQuotation.length===0){
    //     response.push(record)
    //   }
    // }
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allMetClients(adminId))
      }
    };
  }
  // async getDelayedTasks(adminId) {
  //   return {
  //     httpStatus: 200,
  //     body: {
  //       success: true,
  //       data: await execSql(allToBeAssignedClients(adminId))
  //     }
  //   };
  // }
  async getPaymentDues(adminId) {
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allPaymentDueClients(adminId))
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

module.exports = new TeamLeadController();
