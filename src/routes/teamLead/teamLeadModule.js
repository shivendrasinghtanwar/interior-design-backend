const tlCon = require('../../controllers/teamLead/TeamLeadController');
const errors = require('../../utils/errors');
const {
  resMsg
} = require('../../../config/constants/constant');

class TeamLeadModule {
  async getToBeAssignedClients(req, res, next) {
    try {
      const adminId = req._decoded.id;
      const response = await tlCon.getToBeAssignedClients(adminId);
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

}

module.exports = new TeamLeadModule();
