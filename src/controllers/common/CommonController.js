const {
  allDesigners,allManagers,allPreSales,allTeamLeaders,registerTl,registerDesigner,registerPresales
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

  async registerTl(reqData){
    return {
      httpStatus: 200,
      body: {
        success: true,
        msg: 'TeamLead Successfully Registered!',
        data: await mySqlTxn(registerTl(reqData))
      }
    };
  }
  
  async registerDesigner(reqData){
      return {
        httpStatus: 200,
        body: {
          success: true,
          msg: 'Designer Successfully Registered!',
          data: await mySqlTxn(registerDesigner(reqData))
        }
      };
  }
  async registerPresales(reqData){
    return {
      httpStatus: 200,
      body: {
        success: true,
        msg: 'Presales Successfully Registered!',
        data: await mySqlTxn(registerPresales(reqData))
      }
    };
}
}

module.exports = new CommonController();
