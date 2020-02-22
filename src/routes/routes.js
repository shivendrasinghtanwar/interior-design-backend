const express = require('express');
const loginModule = require('./login/login');
const { validators, validationErrorHandler } = require('../middlewares/validator');
const quotationModule = require('./quotation/quotationModule');
const clientModule = require('./client/clientModule');
const registerModule = require('./register/registerModule');
const reqFormModule = require('./reqForm/reqFormModule');
const { errorHandler } = require('./../middlewares/errors');
const { verifyToken } = require('./../middlewares/jwt');

const router = express.Router();

router.get('/login', validators.checkEmail, validators.checkPassword, validationErrorHandler, loginModule.loginByPasswordReqFilter);
router.post('/generate-design-quotation', verifyToken, validators.checkClientId, validationErrorHandler, quotationModule.designQuotation);
router.get('/fetch-all-client', verifyToken, clientModule.fetchAllClient);
router.get('/check-client-req-form', verifyToken, reqFormModule.checkReqForm);
router.post('/fill-client-req-form', verifyToken, reqFormModule.fillReqFormClientSide);
router.post('/assign-to-client', verifyToken, validators.checkClientId, validators.checkAdminId, validationErrorHandler, clientModule.assignToClient);
router.post('/add-client', verifyToken, validators.checkEmail, validators.checkTitle, validators.checkFirstName, validators.checkLastName, validators.checkMobile, validationErrorHandler, registerModule.registerClient);
router.post('/register-admin', verifyToken, validators.checkEmail, validators.checkPassword, validators.checkTitle, validators.checkFirstName, validators.checkLastName, validators.checkMobile, validationErrorHandler, registerModule.registerAdmin);


router.use(errorHandler);

module.exports = router;
