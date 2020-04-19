const boqCon = require('../../controllers/boq/boqCon');
const errors = require('../../utils/errors');
const {
  resMsg
} = require('../../../config/constants/constant');
const boqPdfMaker = require('../../controllers/boq/boqPdfMaker');
class BOQModule {
  async getOnSiteRecords(req, res, next) {
    try {
      const adminId = req._decoded.id;
      console.log('params----------------------', req.query);
      const { category } = req.query;
      const response = await boqCon.fetchAllOnSiteRecords({ adminId, category });
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async getOnSiteDistinctItemTypes(req, res, next) {
    try {
      const adminId = req._decoded.id;
      const response = await boqCon.getOnSiteDistinctItemTypes({ adminId });
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async getBOQFurnitureRecords(req, res, next) {
    try {
      const adminId = req._decoded.id;
      const { category } = req.query;
      const response = await boqCon.getBOQFurnitureRecords({ adminId, category });
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async getBOQFurnitureCategories(req, res, next) {
    try {
      const adminId = req._decoded.id;
      const response = await boqCon.getBOQFurnitureCategories({ adminId });
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async getBOQModularRecords(req, res, next) {
    try {
      const adminId = req._decoded.id;
      const { category } = req.query;
      const response = await boqCon.getBOQModularRecords({ adminId, category });
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async getBOQModularCategories(req, res, next) {
    try {
      const adminId = req._decoded.id;
      const response = await boqCon.getBOQModularCategories({ adminId });
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
  async getBOQFurnitureSearch(req, res, next) {
    try {
      const adminId = req._decoded.id;
      const { type }= req.query;
      const { term }= req.query;
      const response = await boqCon.getBOQFurnitureSearch({ adminId, type, term});
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async getBOQModularSearch(req, res, next) {
    try {
      const adminId = req._decoded.id;
      const { type }= req.query;
      const { term }= req.query;
      const response = await boqCon.getBOQModularSearch({ adminId, type, term});
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async generateBOQ(req, res, next){
    try {
      const adminId = req._decoded.id;
      const { clientId } = req.query;
      const response = await boqCon.generateBOQ({ adminId, clientId});
      console.log('4th',response);
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
 async saveData(req, res, next){
    try{
      const adminId = req._decoded.id;
      const clientId = req.body.clientId;
      const boqOnsiteData = req.body.onsite;
      const boqFurnitureData = req.body.furniture;
      const boqModularData = req.body.modular;
      const response = await boqCon.saveBOQData({adminId, clientId, boqOnsiteData, boqFurnitureData, boqModularData});
      return res.status(response.httpStatus).json(response.body);
    }catch (e) {
      console.log(e);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
 }
 async getData(req, res, next){
   try{
     const adminId = req._decoded.id;
     const { clientId } = req.query;
     const clientId = req.body.clientId;
     const boqOnsiteData = req.body.onsite;
     const boqFurnitureData = req.body.furniture;
     const boqModularData = req.body.modular;
     const response = await boqCon.saveBOQData({adminId, clientId, boqOnsiteData, boqFurnitureData, boqModularData});
     return res.status(response.httpStatus).json(response.body);
   }catch (e) {
     console.log(e);
     return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
   }
 }
  async generateBOQTest(req, res, next){
    try {
      const adminId = req._decoded.id;
      const { clientId } = req.query;
      const response = await boqCon.test(clientId);
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

}


module.exports = new BOQModule();
