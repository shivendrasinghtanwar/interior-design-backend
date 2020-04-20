const {
  allDesigners,allManagers,allPreSales,allTeamLeaders
} = require('../../models/commonQueries');
const { execSql,mySqlTxn } = require('../../models/sqlGetResult');

class CommonController {
  async getAllDesigners(){
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allDesigners())
      }
    };
  }
  async getAllTeamLeaders(){
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allTeamLeaders())
      }
    };
  }
  async getAllManagers(){
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allManagers())
      }
    };
  }
  async getAllPreSales(){
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allPreSales())
      }
    };
  }
}

module.exports = new CommonController();
