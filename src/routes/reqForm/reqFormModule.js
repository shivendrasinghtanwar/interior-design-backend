const errors = require('../../utils/errors');
const reqFormCon = require('../../controllers/reqForm/reqFormCon');
const {
  resMsg
} = require('../../../config/constants/constant');

class ReqFormModule {
  async checkReqForm(req, res, next) {
    try {
      const reqData = {};
      reqData.clientId = req._decoded.id;
      const response = await reqFormCon.checkReqForm(reqData);
      console.log(response);
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async fillReqFormClientSide(req, res, next) {
    try {
      let reqData = {};
      const {
        propertyType, propertyAge, areaSize, bedRoom, bathRoom, livingRoom, kitchen
      } = req.body;
      reqData.clientId = req._decoded.id;
      reqData = {
        ...reqData, propertyType, propertyAge, areaSize, bedRoom, bathRoom, livingRoom, kitchen
      };
      const response = await reqFormCon.fillReqFormClientSide(reqData);
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
}

module.exports = new ReqFormModule();
