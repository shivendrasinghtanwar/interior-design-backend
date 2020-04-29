const errors = require('../../utils/errors');
const registerConn = require('../../controllers/register/registerConn');
const {
  resMsg
} = require('../../../config/constants/constant');

class RegisterModule {
  getMandatoryFields(req) {
    const reqData = {};
    reqData.title = req.body.title;
    reqData.firstName = req.body.firstName.toUpperCase().trim();
    reqData.lastName = req.body.lastName.toUpperCase().trim();
    reqData.mobile = req.body.mobile.trim();
    reqData.email = req.body.email.toLowerCase().trim();
    return reqData;
  }

  //Hard Clients
  async addClient(req, res, next) {
    try {
      const reqData = new RegisterModule().getMandatoryFields(req);
      reqData.status = '1';
      reqData.password = '12345678';
      reqData.address = req.body.address || null;
      reqData.city = req.body.city;
      reqData.meetingDatetime = req.body.meetingDatetime;
      reqData.scopeOfWork = req.body.scopeOfWork;
      reqData.package = req.body.package;
      reqData.shareReqForm = req.body.shareReqForm;
      reqData.visitCharges = req.body.visitCharges;
      reqData.role = 'USER';
      reqData.registeredBy = req._decoded.id;
      const response = await registerConn.addClient(reqData);
      console.log(response);
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  //through website(Soft Clients)
  async registerClient(req, res, next) {
    try {
      const reqData = {};
      reqData.title = "";
      reqData.firstName = req.body.firstName.toUpperCase().trim();
      reqData.lastName = req.body.lastName.toUpperCase().trim();
      reqData.email = req.body.email.toLowerCase().trim();
      reqData.password = "";
      reqData.mobile = req.body.mobile.trim();
      reqData.address = req.body.address || null;
      reqData.city = req.body.city;
      reqData.status = '1';
      reqData.shareReqForm=0;
      reqData.registeredBy=0;
      reqData.role = 'USER';
      reqData.status = '1';
      reqData.type = 'Soft'
      const response = await registerConn.register(reqData);
      console.log(response);
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async registerAdmin(req, res, next) {
    try {
      const reqData = new RegisterModule().getMandatoryFields(req);
      reqData.status = '1';
      reqData.type = 'ADMIN';
      reqData.password = req.body.password;
      reqData.address = req.body.address || null;
      reqData.role = 'ADMIN';
      reqData.registeredBy = req._decoded.id;
      const response = await registerConn.addClient(reqData);
      console.log(response);
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
}

module.exports = new RegisterModule();
