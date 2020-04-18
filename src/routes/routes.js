const express = require('express');
const loginModule = require('./login/login');
const { validators, validationErrorHandler } = require('../middlewares/validator');
const quotationModule = require('./quotation/quotationModule');
const clientModule = require('./client/clientModule');
const preSalesModule = require('./preSales/preSalesModule');
const designerModule = require('./designer/designerModule');
const registerModule = require('./register/registerModule');
const reqFormModule = require('./reqForm/reqFormModule');
const boqModule = require('./boq/boqModule');
const { errorHandler } = require('./../middlewares/errors');
const { verifyToken } = require('./../middlewares/jwt');

const router = express.Router();

router.get('/fetch-master-data', validators.checkEmail, validators.checkPassword, validationErrorHandler, loginModule.loginByPasswordReqFilter);
router.get('/login', validators.checkEmail, validators.checkPassword, validationErrorHandler, loginModule.loginByPasswordReqFilter);
router.post('/generate-design-quotation', verifyToken, validators.checkClientId, validationErrorHandler, quotationModule.designQuotation);

router.get('/pre-sales/fetch-all-unassigned-client', verifyToken, preSalesModule.fetchAllUnassignedClient);
router.get('/pre-sales/assigned-client', verifyToken, preSalesModule.fetchAssignedClient);

router.get('/designer/assigned-client', verifyToken, designerModule.fetchAssignedClient);
router.get('/designer/client-met', verifyToken, designerModule.fetchClientMet);
router.post('/designer/update-client-met', verifyToken, designerModule.updateClientMet);

router.get('/client-profile', verifyToken, clientModule.getProfile);

router.get('/check-client-req-form', verifyToken, reqFormModule.checkReqForm);
router.post('/fill-client-req-form', verifyToken, reqFormModule.fillReqFormClientSide);

router.post('/assign-to-client', verifyToken, validators.checkClientId, validators.checkAdminId, validationErrorHandler, clientModule.assignToClient);

router.post('/add-client', verifyToken, validators.checkEmail, validators.checkTitle, validators.checkFirstName, validators.checkLastName, validators.checkMobile, validators.checkCity, validators.checkMeetingTime, validators.checkPackage, validationErrorHandler, registerModule.registerClient);

router.post('/register-admin', verifyToken, validators.checkEmail, validators.checkPassword, validators.checkTitle, validators.checkFirstName,
  validators.checkLastName, validators.checkMobile, validationErrorHandler,
  registerModule.registerAdmin);

router.get('/on-site-records', verifyToken, boqModule.getOnSiteRecords);
router.get('/on-site-categories', verifyToken, boqModule.getOnSiteDistinctItemTypes);

router.get('/boq-furniture-records', verifyToken, boqModule.getBOQFurnitureRecords);
router.get('/boq-furniture-categories', verifyToken, boqModule.getBOQFurnitureCategories);

router.get('/boq-modular-records', verifyToken, boqModule.getBOQModularRecords);
router.get('/boq-modular-categories', verifyToken, boqModule.getBOQModularCategories);

router.get('/boq-search-furniture', verifyToken, boqModule.getBOQFurnitureSearch);
router.get('/boq-search-modular', verifyToken, boqModule.getBOQModularSearch);

router.post('/boq-save-data',verifyToken, boqModule.saveData);
router.get('/boq-generate-pdf', verifyToken , boqModule.generateBOQ);
router.get('/boq-generate-test', verifyToken , boqModule.generateBOQTest);

router.use(errorHandler);

module.exports = router;
