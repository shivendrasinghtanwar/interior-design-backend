const tlCon = require('../../controllers/teamLead/teamLeadController');
const errors = require('../../utils/errors');
const {
  resMsg
} = require('../../../config/constants/constant');

class TeamLeadModule {
  async getToBeAssignedClients(req, res, next){
    try{
      const adminId = req._decoded.id;
      const response = await tlCon.getToBeAssignedClients(adminId);
      return res.status(response.httpStatus).json(response.body);
    }catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async getAssignedNotMetClients(req, res, next){
    try{
      const adminId = req._decoded.id;
      const response = await tlCon.getAssignedNotMetClients(adminId);
      return res.status(response.httpStatus).json(response.body);
    }catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

}

module.exports = new TeamLeadModule();
