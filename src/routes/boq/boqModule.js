const boqCon = require('../../controllers/boq/boqCon');
const errors = require('../../utils/errors');
const {
  resMsg
} = require('../../../config/constants/constant');

class BOQModule {
  async getOnSiteRecords(req, res, next) {
    try {
      const adminId = req._decoded.id;
      const response = await boqCon.fetchAllOnSiteRecords({ adminId });
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async getDistinctItemTypes(req, res, next){
    try {
      const adminId = req._decoded.id;
      const response = await boqCon.getAllItemTypes({ adminId });
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
}


module.exports = new BOQModule();
