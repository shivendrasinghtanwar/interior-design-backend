const _ = require('lodash');
const { isUserExist, addClientQuery, registerClientQuery } = require('../../models/registrationQueries');
const { getClientByIdOrMobileOrEmail } = require('../../models/basicQueries');
const { execSql, mySqlTxn } = require('../../models/sqlGetResult');
const { generateToken } = require('../../middlewares/jwt');
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
        httpStatus: 500,
        body: { success: false, msg: resMsg.SIGNUP_ERROR, data: {} }
      };
    }
    if (reqData.shareReqForm) {
      const [client] = await execSql(getClientByIdOrMobileOrEmail(reqData));
      const tokenData = {
        id: client.id,
        status: client.status,
        type: 'CLIENT'
      };
      reqData.jwt = await generateToken(tokenData, '5000min');
    }
    return {
      httpStatus: 200, body: { success: true, msg: resMsg.REGISTER_SUCCESS, data: reqData.jwt }
    };
  }

  async register(reqData) {
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

    const dbres = await mySqlTxn(registerClientQuery(reqData));
    if (dbres.code) {
      return {
        httpStatus: 500,
        body: { success: false, msg: resMsg.SIGNUP_ERROR, data: {} }
      };
    }
    // reqData.jwt = await generateToken(tokenData, '5000min');
    
    return {
      httpStatus: 200, body: { success: true, msg: resMsg.REGISTER_SUCCESS, data: reqData.jwt }
    };
  }

}
module.exports = new RegisterConn();
