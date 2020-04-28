const razorpay = require('../../utils/razorpay');
const { execSql } = require('../../models/sqlGetResult');
const {
  saveOrderData, updateTokenApi,
  updateOrderApi, updatePaymentApi, fetchCustomerId, getOrderInfo
} = require('../../models/razorpayQueries');
const {
  rErrorMsg, rSuccessMsg
} = require('../../../config/constants/constant');

class RazorpayController {
  // regular payment order API
  async paymentCont(data) {
    // Order obj to be passed
    const initOrder = {
      amount: (data.amount * 100),
      currency: 'INR',
      // Maybe first time regis. so no loanId
      receipt: data.receipt || `rcptid-${data.clientId}-${Date.now()}`,
      notes: { productInfo: data.productInfo },
      payment_capture: '1',
    };
    // creaing order
    const resp = await razorpay.createOrders(initOrder);
    console.log('resp from pg->', resp);
    // final response obj
    const finalObj = {
      orderId: resp.id,
      clientId: data.clientId,
      amount: resp.amount / 100,
      receipt: resp.receipt,
      status: resp.status,
      attempts: resp.attempts,
      amount_paid: resp.amount_paid,
      notes: JSON.stringify(resp.notes)
    };
    // saving in sql
    await execSql(saveOrderData(finalObj));
    // data to be passed in checkout
    const payOrder = {
      amount: resp.amount,
      orderId: resp.id,
      notes: initOrder.notes,
      key: resp.auth.username
    };
    if (!payOrder.orderId) {
      return {
        httpStatus: 400,
        body: { success: false, msg: rErrorMsg.ORDER_ID_MISSING, data: {} }
      };
    }
    return {
      httpStatus: 200,
      body: {
        success: true,
        msg: rSuccessMsg.ORDER_SUCCESS,
        data: payOrder
      }
    };
  }

  async detailsUpdate(orderId) {
    const [orderInfo] = await execSql(getOrderInfo(orderId));
    const orderUpdate = await razorpay.orderUpdate(orderId, orderInfo.productInfo);
    // const [data] = orderUpdate;
    orderUpdate.orderId = orderUpdate.id;
    delete orderUpdate.id;
    console.log(('*').repeat(5), 'order response: ', orderUpdate,);
    const paymentUpdate = await razorpay.paymentUpdate(orderId, orderInfo.productInfo);
    console.log(('*').repeat(5), 'payment response: ', paymentUpdate.items[0]);
    const [payData] = paymentUpdate.items;
    const payObj = {
      paymentId: payData.id,
      tokenId: payData.token_id,
      amountRefunded: payData.amount_refunded / 100,
      refundStatus: payData.refund_status,
      captured: payData.captured,
      description: payData.description,
      errorDescription: payData.error_description,
      fee: payData.fee / 100,
      tax: payData.tax / 100,
      status: payData.status,
      method: payData.method,
      amount: payData.amount / 100,
      orderId: payData.order_id,
      bank: payData.bank,
      wallet: payData.wallet,
      vpa: payData.vpa,
      email: payData.email,
      contact: payData.contact,
      notes: JSON.stringify(payData.notes)
    };
    Promise.all([execSql(updateOrderApi(orderUpdate)),
      execSql(updatePaymentApi(payObj))]);
    if (payData.method === 'emandate') {
      const [{ customerId }] = await execSql(fetchCustomerId(orderId));
      console.log(customerId);
      const tokenData = await razorpay.tokenUpdate(customerId, orderInfo.productInfo);
      console.log(('*').repeat(5), '[INITIAL DATA]', tokenData);

      tokenData.items.forEach(
        (item) => {
          if (item.id === payData.token_id) {
            const token = item;
            const tokenObj = {
              id: token.id,
              token: token.token,
              bank: token.bank,
              wallet: token.wallet,
              method: token.method,
              recurring: token.recurring,
              status: token.recurring_details.status,
              failureReason: token.recurring_details.failure_reason,
              authType: token.auth_type,
              mrn: token.mrn
            };
            console.log(('*').repeat(5), '[TOKEN ITEM TO SAVE]', item);

            execSql(updateTokenApi(tokenObj));

            return tokenObj;
          }
          return null;
        }
      );
    }
    if (orderUpdate.error) {
      return {
        httpStatus: 400,
        body: { success: false, msg: rErrorMsg.BAD_REQUEST, data: {} }
      };
    }
    return {
      httpStatus: 200,
      body: { success: true, msg: rSuccessMsg.UPDATE_SUCCESS, data: {} }
    };
  }
}

module.exports = new RazorpayController();
