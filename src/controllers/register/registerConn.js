const _ = require('lodash');
const { isUserExist, addClientQuery, registerClientQuery, insertPassword } = require('../../models/registrationQueries');
const { getClientByIdOrMobileOrEmail } = require('../../models/basicQueries');
const { execSql, mySqlTxn } = require('../../models/sqlGetResult');
const { generateToken } = require('../../middlewares/jwt');
const { resMsg } = require('../../../config/constants/constant');

const nodemailer = require('nodemailer');
var generator = require('generate-password');

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

    var password = generator.generate({
      length: 10,
      numbers: true
    });

     //smtp
     let transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
         user: '32219240128afd',
         pass: '670867791820c4'
      }
    });
    
    const message = {
      from: 'marksdezyn@gmail.com', // Sender address
      to: reqData.email,         // List of recipients
      subject: 'Get Registration Password', // Subject line
      text: 'here is your password: '+password // Plain text body
    };
    transport.sendMail(message, function(err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log(info);
      }
    });
    const dbres1 = await execSql(insertPassword(reqData,password));
    if (dbres1.code) {
      return {
        httpStatus: 500,
        body: { success: false, msg: resMsg.SIGNUP_ERROR, data: {} }
      };
    }
    
    return {
      httpStatus: 200, body: { success: true, msg: resMsg.REGISTER_SUCCESS }
    };
  }

}
module.exports = new RegisterConn();
