const designerCon = require('../../controllers/designer/designerCon');
const errors = require('../../utils/errors');
const {
  resMsg
} = require('../../../config/constants/constant');

class DesignerModule {
  async fetchAssignedClient(req, res, next) {
    try {
      const adminId = req._decoded.id;
      const response = await designerCon.fetchAssignedClient({ adminId });
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async updateClientMet(req, res, next) {
    try {
      const reqData = {};
      reqData.adminId = req._decoded.id;
      reqData.clientId = req.body.clientId;
      reqData.projectId = req.body.projectId;
      reqData.mom = req.body.mom;
      const response = await designerCon.updateClientMet(reqData);
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
}

module.exports = new DesignerModule();
