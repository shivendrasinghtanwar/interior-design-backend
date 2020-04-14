const boqCon = require('../../controllers/boq/boqCon');
const errors = require('../../utils/errors');
const {
  resMsg
} = require('../../../config/constants/constant');

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
      const { searchType }= req.query; 
      const { searchTerm }= req.query;
      const response = await boqCon.getBOQFurnitureSearch({ adminId, searchType, searchTerm});
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async getBOQModularSearch(req, res, next) {
    try {
      const adminId = req._decoded.id;
      const { searchType }= req.query; 
      const { searchTerm }= req.query;
      const response = await boqCon.getBOQModularSearch({ adminId, searchType, searchTerm});
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
  
}


module.exports = new BOQModule();
