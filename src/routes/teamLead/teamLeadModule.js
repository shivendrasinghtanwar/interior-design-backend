const tlCon = require('../../controllers/teamLead/teamLeadController');
const errors = require('../../utils/errors');
const {
  resMsg
} = require('../../../config/constants/constant');

class TeamLeadModule {
  async getAllDesigners(req, res, next){
    const adminId = req._decoded.id;
    try{
      const response = await tlCon.getAllDesigners(adminId);
      return res.status(response.httpStatus).json(response.body);
    }catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

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

  async getDelayedProposals(req, res, next){
    try{
      const adminId = req._decoded.id;
      const response = await tlCon.getDelayedProposals(adminId);
      return res.status(response.httpStatus).json(response.body);
    }catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async getDelayedTasks(req, res, next){
    try{
      const adminId = req._decoded.id;
      const response = await tlCon.getDelayedTasks(adminId);
      return res.status(response.httpStatus).json(response.body);
    }catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
  async getPaymentDues(req, res, next){
    try{
      const adminId = req._decoded.id;
      const response = await tlCon.getPaymentDues(adminId);
      return res.status(response.httpStatus).json(response.body);
    }catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
  async getNewSignUps(req, res, next){
    try{
      const adminId = req._decoded.id;
      const response = await tlCon.getNewSignUps(adminId);
      return res.status(response.httpStatus).json(response.body);
    }catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

}

module.exports = new TeamLeadModule();
