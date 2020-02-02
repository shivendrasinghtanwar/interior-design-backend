const format = require('string-template');

const template = {
  smsLogin(obj) {
    return format('Please enter the code {otp} to verify your mobile number and be a step closer to meeting all your financing needs, Thank you, Team Lendbox', obj);
  },
  smsNachReminder(obj) {
    return format('Dear {f_name} {l_name}, your EMI of {month} for Loan ID {loan_id} {amount} will be pulled on {day} {date} of this month by Lendbox, please ensure your account is sufficiently funded. Thanks Team Lendbox', obj);
  }
};

module.exports = template;
