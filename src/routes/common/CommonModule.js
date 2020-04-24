const commonCon = require('../../controllers/common/CommonController');
const errors = require('../../utils/errors');
const {
  resMsg
} = require('../../../config/constants/constant');


class CommonModule {
  async getAllDesigners(req, res, next){
    try{
      const response = await commonCon.getAllDesigners();
      return res.status(response.httpStatus).json(response.body);
    }catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
  async getAllTeamLeaders(req, res, next){
    try{
      const response = await commonCon.getAllTeamLeaders();
      return res.status(response.httpStatus).json(response.body);
    }catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async registerTl(req, res, next){
    try{
      const reqData = {};
      reqData.email = req.body.email;
      reqData.password = req.body.password;
      reqData.title = req.body.title;
      reqData.first_name = req.body.first_name;
      reqData.last_name = req.body.last_name;
      reqData.mobile = req.body.mobile;

      const response = await commonCon.registerTl(reqData);
      return res.status(response.httpStatus).json(response.body);
    }catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async registerDesigner(req, res, next){
    try{
      const reqData = {};
      reqData.email = req.body.email;
      reqData.password = req.body.password;
      reqData.title = req.body.title;
      reqData.first_name = req.body.first_name;
      reqData.last_name = req.body.last_name;
      reqData.mobile = req.body.mobile;
      reqData.teamLeadId = req.body.teamLeadId;

      const response = await commonCon.registerDesigner(reqData);
      return res.status(response.httpStatus).json(response.body);
    }catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
  async registerPresales(req, res, next){
    try{
      const reqData = {};
      reqData.email = req.body.email;
      reqData.password = req.body.password;
      reqData.title = req.body.title;
      reqData.first_name = req.body.first_name;
      reqData.last_name = req.body.last_name;
      reqData.mobile = req.body.mobile;

      const response = await commonCon.registerPresales(reqData);
      return res.status(response.httpStatus).json(response.body);
    }catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
  
}

module.exports = new CommonModule();
