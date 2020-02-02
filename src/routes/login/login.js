const loginCont = require('../../controllers/login/loginCon');
const errors = require('../../utils/errors');
const {
  resMsg
} = require('../../../config/constants/constant');

class LoginModule {
  async loginByPasswordReqFilter(req, res, next) {
    try {
      const reqData = req.query;
      reqData.userAgent = `${req.headers['user-agent']}/${req.ip}`;
      reqData.url = req._parsedUrl.pathname;
      if (!reqData.password && (!reqData.mobile || !reqData.email)) {
        return res.status(400)
          .json({ success: false, msg: resMsg.INVALID_USER_PASSWORD, data: {} });
      }
      const response = await loginCont.loginByPassword(reqData);
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
}

module.exports = new LoginModule();
