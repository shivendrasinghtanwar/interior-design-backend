const preSalesCon = require('../../controllers/preSales/preSalesCon');
const errors = require('../../utils/errors');
const {
  resMsg
} = require('../../../config/constants/constant');

class PreSalesModule {
  async fetchAllUnassignedClient(req, res, next) {
    try {
      const adminId = req._decoded.id;
      const response = await preSalesCon.fetchAllUnassignedClient({ adminId });
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async fetchAssignedClient(req, res, next) {
    try {
      const adminId = req._decoded.id;
      const response = await preSalesCon.fetchAssignedClient({ adminId });
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
}

module.exports = new PreSalesModule();
