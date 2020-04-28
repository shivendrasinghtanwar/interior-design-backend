const axios = require('axios');
const { razorpay } = require('../../config/config');
const { razorpayPathUrl } = require('../../config/constants/constant');

const auth = {
  rzCred: (productInfo) => {
    const obj = {
      username: razorpay.username,
      password: razorpay.password
    };
    /** if (walletConst.razorpay1Products.indexOf(productInfo) >= 0) {
      obj.username = razorpay1.username;
      obj.password = razorpay1.password;
    } */
    return obj;
  }
};

class RazorpayUtil {
  async createCustomer(data) {
    try {
      const url = razorpay.baseUrl + razorpayPathUrl.createCustomer;
      const customerData = data;
      const response = await axios.post(url, customerData, { auth: auth.rzCred() });
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }

  async createOrders(orderData) {
    try {
      const url = razorpay.baseUrl + razorpayPathUrl.createOrder;
      const response = await axios.post(url, orderData,
        { auth: auth.rzCred(orderData.notes.productInfo) });
      response.data.auth = auth.rzCred(orderData.notes.productInfo);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }

  async orderUpdate(orderId, productInfo) {
    try {
      const url = razorpay.baseUrl + razorpayPathUrl.updateDetails + orderId;
      const response = await axios.get(url, { auth: auth.rzCred(productInfo) });
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }

  async paymentUpdate(orderId, productInfo) {
    try {
      const url = razorpay.baseUrl + razorpayPathUrl.updateDetails + orderId
        + razorpayPathUrl.payments;
      const response = await axios.get(url, { auth: auth.rzCred(productInfo) });
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }

  async recPaymentPull(data) {
    try {
      const url = razorpay.baseUrl + razorpayPathUrl.createRecurringPayment;
      const response = await axios.post(url, data, { auth: auth.rzCred(data.notes.productInfo) });
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }

  async tokenUpdate(customerId, productInfo) {
    try {
      const url = razorpay.baseUrl + razorpayPathUrl.updateToken + customerId
        + razorpayPathUrl.token;
      const response = await axios.get(url, { auth: auth.rzCred(productInfo) });
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
}

module.exports = new RazorpayUtil();
