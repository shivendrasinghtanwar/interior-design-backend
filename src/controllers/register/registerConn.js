const _ = require('lodash');
const { isUserExist, addClientQuery } = require('../../models/registrationQueries');
const { execSql, mySqlTxn } = require('../../models/sqlGetResult');
const { resMsg } = require('../../../config/constants/constant');

class RegisterConn {
  async addClient(reqData) {
    // Check if user exist with emailId, mobile number or both.
    const listExistedUsers = JSON.stringify(await (execSql(isUserExist(reqData))))
      .toLocaleLowerCase();
    if (listExistedUsers.includes(reqData.mobile)
          && listExistedUsers.includes(reqData.email)) {
      return {
        httpStatus: 400,
        body: { success: false, msg: resMsg.EMAIL_MOBILE_EXIST, data: {} }
      };
    }
    if (listExistedUsers.includes(reqData.mobile)) {
      return { httpStatus: 400, body: { success: false, msg: resMsg.MOBILE_EXIST, data: {} } };
    }
    if (listExistedUsers.includes(reqData.email)) {
      return { httpStatus: 400, body: { success: false, msg: resMsg.EMAIL_EXIST, data: {} } };
    }
    reqData.firstName = _.startCase(_.toLower(reqData.firstName));
    reqData.lastName = _.startCase(_.toLower(reqData.lastName));
    const dbres = await mySqlTxn(addClientQuery(reqData));
    if (dbres.code) {
      return {
        httpStatus: 404,
        body: { success: false, msg: resMsg.SIGNUP_ERROR, data: {} }
      };
    }
    return {
      httpStatus: 200, body: { success: true, msg: resMsg.REGISTER_SUCCESS, data: {} }
    };
  }
}
module.exports = new RegisterConn();
