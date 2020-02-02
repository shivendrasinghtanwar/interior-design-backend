const axios = require('axios');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { gupshup, awsSes } = require('../../config/config');
const smsTemplate = require('./Templates/sms/smsTemplate');

class MessageSender {
  async sendSms(data) {
    gupshup.params.send_to = data.mobile;
    gupshup.params.msg = smsTemplate[data.type](data);
    const queryString = Object.keys(gupshup.params).map(key => `${key}=${gupshup.params[key]}`).join('&');
    const gupshupResp = await axios.get(gupshup.url + queryString);
    if (gupshupResp.data.split('|')[0].trim() !== 'success') return false;
    return true;
  }

  sendMail(data) {
    const transport = nodemailer.createTransport(smtpTransport(awsSes));
    return new Promise((resolve, reject) => {
      transport.sendMail(data, (error, info) => {
        if (error) {
          reject(error);
        } else {
          const response = info.response.split(' ');
          if (response[0] === '250' && response[1] === 'Ok') {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  }
}

module.exports = new MessageSender();
