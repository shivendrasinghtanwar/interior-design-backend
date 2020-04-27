const {
  allToBeAssignedClients,
  allAssignedNotMetClients,
  allMetClients,
  fetchDesignQuotationByClientId,
  allPaymentDueClients,
  allPresales,
  allClients
} = require('../../models/adminQueries');
const {
  allDesigners,allManagers,allPreSales,allTeamLeaders,getDesignerById,getTeamLeaderById
} = require('../../models/commonQueries');
const  ClientStatus  = require('../../utils/enums/ClientStatus');
const { assignClientToAdmin, updateUserStatus } = require('../../models/basicQueries');
const { execSql,mySqlTxn } = require('../../models/sqlGetResult');
const { resMsg } = require('../../../config/constants/constant');
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
    const metClients = await execSql(allMetClients(adminId));
    const response = [];
    for (const record of metClients) {
      // console.log('client--',record);
      const clientDesignQuotation = await execSql(fetchDesignQuotationByClientId(record.id));
      // console.log('clientDesignQuotation---------------------------',clientDesignQuotation.length);
      if(clientDesignQuotation.length===0){
        response.push(record)
      }
    }
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: response
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

  async getAllPresales(adminId) {
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allPresales(adminId))
      }
    };
  }

  async getAllClients(adminId) {
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allClients(adminId))
      }
    };
  }

  async assignToDesigner(request) {

    const getDesiginerDBRes = await execSql(getDesignerById(request.adminId));
    if (getDesiginerDBRes.code) {
      console.log(getDesiginerDBRes);
      return {
        httpStatus: 404,
        body: { success: false, msg: resMsg.ASSIGN_ADMIN_ERROR, data: {} }
      };
    }

    if(getDesiginerDBRes.length===0){
      console.log(getDesiginerDBRes);
      return {
        httpStatus: 404,
        body: { success: false, msg: resMsg.USER_NOT_DESIGNER, data: {} }
      };
    }
    const dbres1 = await execSql(assignClientToAdmin(request));
    if (dbres1.code) {
      console.log(dbres1);
      return {
        httpStatus: 404,
        body: { success: false, msg: resMsg.ASSIGN_ADMIN_ERROR, data: {} }
      };
    }

    const dbres2 = await execSql(updateUserStatus(request.clientId,ClientStatus.ASSIGNED_TO_DESIGNER));
    if (dbres2.code) {
      console.log(dbres2);
      return {
        httpStatus: 404,
        body: { success: false, msg: resMsg.ASSIGN_ADMIN_ERROR, data: {} }
      };
    }
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: 'ok'
      }
    };
  }
  async assignToTl(request) {
    const getTL_DB_Res = await execSql(getTeamLeaderById(request.adminId));
    if (getTL_DB_Res.code) {
      console.log(getTL_DB_Res);
      return {
        httpStatus: 404,
        body: { success: false, msg: resMsg.ASSIGN_ADMIN_ERROR, data: {} }
      };
    }

    if(getTL_DB_Res.length===0){
      console.log(getTL_DB_Res);
      return {
        httpStatus: 404,
        body: { success: false, msg: resMsg.USER_NOT_TL, data: {} }
      };
    }

    const dbres1 = await execSql(assignClientToAdmin(request));
    if (dbres1.code) {
      console.log(dbres1);
      return {
        httpStatus: 404,
        body: { success: false, msg: resMsg.ASSIGN_ADMIN_ERROR, data: {} }
      };
    }

    const dbres2 = await execSql(updateUserStatus(request.clientId,ClientStatus.ASSIGNED_TO_TL));
    if (dbres2.code) {
      console.log(dbres2);
      return {
        httpStatus: 404,
        body: { success: false, msg: resMsg.ASSIGN_ADMIN_ERROR, data: {} }
      };
    }
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: 'ok'
      }
    };
  }
}
module.exports = new AdminController();
