const { check, body, validationResult } = require('express-validator');
// const isValidDate = require("date-fns/isValid");
// const parseISO = require("date-fns/parseISO");

const validators = {
  checkEmail: [
    check('email')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isEmail()
      .withMessage('E-mail id is required or invalid')
  ],
  checkRemarks: [
    check('remarks')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isEmail()
      .withMessage('Scope of Work is required')
  ],
  checkPassword: [
    check('password')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage('password is required')
  ],
  checkClientId: [
    check('clientId')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage('Client Id is required')
  ],
  checkAdminId: [
    check('adminId')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage('Admin Id is required')
  ],
  checkTitle: [
    check('title')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage('title is required')
  ],
  checkFirstName: [
    check('firstName')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage('First name is required')
  ],
  checkLastName: [
    check('lastName')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage('Last name is required')
  ],
  checkMobile: [
    check('mobile')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .matches('^[6-9]\\d{9}$')
      .withMessage('mobile is required or invalid')
  ]

};

function validationErrorHandler(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errArray = errors.array();
    console.log('Request Validation Error:', { meta: errArray });
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
}

module.exports = {
  validators,
  validationErrorHandler
};
