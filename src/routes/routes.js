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
const adminModule = require('./admin/adminModule');
const commonModule = require('./common/CommonModule');
const tlModule = require('./teamLead/teamLeadModule');
const { errorHandler } = require('./../middlewares/errors');
const { verifyToken } = require('./../middlewares/jwt');

const router = express.Router();

router.get('/fetch-master-data', validators.checkEmail, validators.checkPassword, validationErrorHandler, loginModule.loginByPasswordReqFilter);
router.get('/login', validators.checkEmail, validators.checkPassword, validationErrorHandler, loginModule.loginByPasswordReqFilter);
router.post('/save-design-quotation', verifyToken, validators.checkClientId, validationErrorHandler, quotationModule.saveDesignQuotation);
router.get('/get-design-quotation', verifyToken, validators.checkClientId, validationErrorHandler, quotationModule.getDesignQuotation);
router.get('/dnbl-pdf', verifyToken, validators.checkClientId, validationErrorHandler, quotationModule.generateDNBLPDF);

router.get('/pre-sales/fetch-all-unassigned-client', verifyToken, preSalesModule.fetchAllUnassignedClient);
router.get('/pre-sales/assigned-client', verifyToken, preSalesModule.fetchAssignedClient);

router.get('/designer/assigned-client', verifyToken, designerModule.fetchAssignedClient);
router.get('/designer/client-met', verifyToken, designerModule.fetchClientMet);
router.post('/designer/update-client-met', verifyToken, designerModule.updateClientMet);

router.get('/client-profile', verifyToken, clientModule.getProfile);
router.post('/update-client-profile', verifyToken, clientModule.updateClientProfile);

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
router.get('/boq-get-data',verifyToken, boqModule.getData);
router.post('/boq-save-data',verifyToken, boqModule.saveData);
router.get('/boq-generate-pdf', verifyToken , boqModule.generateBOQ);
router.get('/boq-generate-test' , boqModule.generateBOQTest);

//REGISTER AND GET DESIGNER & TL
router.get('/designer-all',commonModule.getAllDesigners);
router.get('/team-leader-all',commonModule.getAllTeamLeaders);
router.post('/register-teamLead', commonModule.registerTl);
router.post('/register-designer', commonModule.registerDesigner);
router.post('/register-presales', commonModule.registerPresales);

router.post('/admin-assignTo-designer',verifyToken, adminModule.assignToDesigner);
router.post('/admin-assignTo-tl',verifyToken, adminModule.assignToTl);

//ADMIN APIs
router.get('/admin-to-be-assigned',verifyToken, adminModule.getToBeAssignedClients);
router.get('/admin-assigned-not-met',verifyToken, adminModule.getAssignedNotMetClients);
router.get('/admin-delayed-proposals',verifyToken, adminModule.getDelayedProposals);
router.get('/admin-delayed-tasks',verifyToken, adminModule.getDelayedTasks);
router.get('/admin-payment-dues',verifyToken, adminModule.getPaymentDues);
router.get('/admin-new-sign-ups',verifyToken, adminModule.getNewSignUps);


router.get('/teamLead-designer-all',verifyToken,tlModule.getAllDesigners);

//TL APIs
router.get('/teamLead-to-be-assigned',verifyToken, tlModule.getToBeAssignedClients);
router.get('/teamLead-assigned-not-met',verifyToken, tlModule.getAssignedNotMetClients);
router.get('/teamLead-delayed-proposals',verifyToken, tlModule.getDelayedProposals);
router.get('/teamLead-delayed-tasks',verifyToken, tlModule.getDelayedTasks);
router.get('/teamLead-payment-dues',verifyToken, tlModule.getPaymentDues);
router.get('/teamLead-new-sign-ups',verifyToken, tlModule.getNewSignUps);

router.use(errorHandler);

module.exports = router;
