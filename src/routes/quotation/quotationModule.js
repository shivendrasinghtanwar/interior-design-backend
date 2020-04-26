const quotationConn = require('../../controllers/quotation/quotationConn');
const errors = require('../../utils/errors');
const { fileType, errorMsg } = require('../../../config/constants/reportUploader');
const singletonRunner = require('../../utils/singletonRunner');
const SingletonRunnerResponse = require('../../utils/singletonRunnerResponse');

const { log } = console;

class QuotationModule {

  async generateDNBLPDF(req, res, next) {
    try {
      const adminId = req._decoded.id;
      const { clientId } = req.query;
      const reqData = { clientId, adminId };
      const response = await quotationConn.generateDNBLPDF(reqData);
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      log(err);
      return next(new errors.OperationalError(`Unable to generate PDF - ${err.code}`));
    }
  }

  async saveDesignQuotation(req, res, next) {
    try {
      const adminId = req._decoded.id;
      const {
        design, view3D, adhocCharges, clientId
      } = req.body;
      const reqData = {
        design, view3D, adhocCharges, clientId, adminId
      };
      const response = await quotationConn.saveDesignQuotation(reqData);
      console.log('resp ', response);
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      log(err);
      return next(new errors.OperationalError(`Unable to save data. - ${err.code}`));
    }
  }

  async getDesignQuotation(req, res, next) {
    try {
      const adminId = req._decoded.id;
      const { clientId } = req.query;
      console.log("clientId",clientId)
      const reqData = { clientId, adminId };
      const response = await quotationConn.getDesignQuotation(reqData);
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
}

module.exports = new QuotationModule();
