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
}

module.exports = new CommonModule();
