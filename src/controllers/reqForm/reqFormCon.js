const { checkReqFormQuery, fillReqFormClientSideQueries } = require('../../models/reqFormQueries');
const { execSql, mySqlTxn } = require('../../models/sqlGetResult');
const { resMsg } = require('../../../config/constants/constant');

class ReqFormCon {
  async checkReqForm(reqData) {
    // Check if req Form is already filled for the given user.
    const checkReqForm = await execSql(checkReqFormQuery(reqData));
    if (checkReqForm && checkReqForm.length > 0) {
      return {
        httpStatus: 400,
        body: { success: false, msg: resMsg.REQ_FORM_FILLED, data: {} }
      };
    }
    return {
      httpStatus: 200, body: { success: true, msg: resMsg.REQ_FORM_VERIFIED, data: reqData.jwt }
    };
  }

  async fillReqFormClientSide(reqData) {
    // Check if req Form is already filled for the given user
    const checkReqForm = await execSql(checkReqFormQuery(reqData));
    if (checkReqForm && checkReqForm.length > 0) {
      return {
        httpStatus: 400,
        body: { success: false, msg: resMsg.REQ_FORM_FILLED, data: {} }
      };
    }
    const fillReqFormResp = await mySqlTxn(fillReqFormClientSideQueries(reqData));
    if (fillReqFormResp.code) {
      return {
        httpStatus: 500,
        body: { success: false, msg: resMsg.REQ_FORM_ERROR, data: {} }
      };
    }
    return {
      httpStatus: 200, body: { success: true, msg: resMsg.REQ_FORM_SUCCESS }
    };
  }
}
module.exports = new ReqFormCon();
