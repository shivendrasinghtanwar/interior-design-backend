const adminCon = require('../../controllers/admin/adminController');
const errors = require('../../utils/errors');
const {
  resMsg
} = require('../../../config/constants/constant');


class AdminModule {
  async getToBeAssignedClients(req, res, next){
    try{
      const adminId = req._decoded.id;
      const response = await adminCon.getToBeAssignedClients(adminId);
      return res.status(response.httpStatus).json(response.body);
    }catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async getAssignedNotMetClients(req, res, next){
    try{
      const adminId = req._decoded.id;
      const response = await adminCon.getAssignedNotMetClients(adminId);
      return res.status(response.httpStatus).json(response.body);
    }catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async getDelayedProposals(req, res, next){
    try{
      const adminId = req._decoded.id;
      const response = await adminCon.getDelayedProposals(adminId);
      return res.status(response.httpStatus).json(response.body);
    }catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async getDelayedTasks(req, res, next){
    try{
      const adminId = req._decoded.id;
      const response = await adminCon.getDelayedTasks(adminId);
      return res.status(response.httpStatus).json(response.body);
    }catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
  async getPaymentDues(req, res, next){
    try{
      const adminId = req._decoded.id;
      const response = await adminCon.getPaymentDues(adminId);
      return res.status(response.httpStatus).json(response.body);
    }catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
  async getNewSignUps(req, res, next){
    try{
      const adminId = req._decoded.id;
      const response = await adminCon.getNewSignUps(adminId);
      return res.status(response.httpStatus).json(response.body);
    }catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
  async assignToDesigner(req, res, next){
    try{
      const updatedBy = req._decoded.id;
      const clientId = req.body.clientId;
      const adminId = req.body.adminId;
      const response = await adminCon.assignToDesigner({updatedBy,clientId,adminId});
      return res.status(response.httpStatus).json(response.body);
    }catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async assignToTl(req, res, next){
    try{
      const updatedBy = req._decoded.id;
      const clientId = req.body.clientId;
      const adminId = req.body.adminId;
      const response = await adminCon.assignToTl({updatedBy,clientId,adminId});
      return res.status(response.httpStatus).json(response.body);
    }catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
}

module.exports = new AdminModule();
