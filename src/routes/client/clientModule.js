const clientCont = require('../../controllers/client/clientCon');
const errors = require('../../utils/errors');
const {
  resMsg
} = require('../../../config/constants/constant');

class ClientModule {
  async assignToClient(req, res, next) {
    try {
      const reqData = {};
      reqData.clientId = req.body.clientId;
      reqData.adminId = req.body.adminId;
      reqData.updatedBy = req._decoded.id;
      const response = await clientCont.assignToClient(reqData);
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async getProfile(req, res, next) {
    try {
      const { clientId } = req.query;
      const response = await clientCont.getProfile(clientId);
      return res.status(response.httpStatus).json(response.body);
    } catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async updateClientProfile(req, res, next) {
    try {
      const reqData ={};
      reqData.adminId = req._decoded.id;;
      reqData.clientId = req.body.id;
      reqData.title = req.body.title;
      reqData.firstName = req.body.firstName;
      reqData.lastName = req.body.lastName;
      reqData.address = req.body.address;
      reqData.city = req.body.city;
      const response = await clientCont.updateClientProfile(reqData);
      return res.status(response.httpStatus).json(response.body);
    } catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async getTasks(req, res, next){
    try {
      const { clientId } = req.query;
      const response = await clientCont.getTasks(clientId);
      return res.status(response.httpStatus).json(response.body);
    } catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
}

module.exports = new ClientModule();
