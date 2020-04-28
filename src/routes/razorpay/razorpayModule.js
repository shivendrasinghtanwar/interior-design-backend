// const razorpayConn = require('../../controllers/razorpayCon/webhook');
const rpayController = require('../../controllers/razorpay/rpayCon');
const errors = require('../../utils/errors');

class RazorpayModule {
  // regular pay order
  async payment(req, res, next) {
    try {
      console.log('in payment');
      const data = req.body;
      console.log({ data });
      const response = await rpayController.paymentCont(data);
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(err.message));
    }
  }

  // Webhook response Endpoint
  async rpWebhook(req, res, next) {
    try {
      const reqData = req.body;
      const response = await razorpayConn.webhook(reqData);
      return res.send(response);
    } catch (err) {
      console.log(err);
      return next(new errors.WebhookError(err.message));
    }
  }

  async detailsUpdate(req, res, next) {
    try {
      const { orderId } = req.query;
      const updateResponse = await rpayController.detailsUpdate(orderId);
      return res.send(updateResponse);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(err.message));
    }
  }
}

module.exports = new RazorpayModule();
