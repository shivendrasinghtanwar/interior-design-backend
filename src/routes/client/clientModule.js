const clientCont = require('../../controllers/client/clientCon');
const errors = require('../../utils/errors');
const {
  resMsg
} = require('../../../config/constants/constant');

class ClientModule {
  async fetchAllClient(req, res, next) {
    try {
      const response = await clientCont.fetchAllClient();
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
}

module.exports = new ClientModule();
