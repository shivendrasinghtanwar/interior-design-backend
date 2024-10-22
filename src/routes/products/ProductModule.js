const productsController = require('../../controllers/products/ProductsController');
const errors = require('../../utils/errors');
const {
  resMsg
} = require('../../../config/constants/constant');

class ProductModule {
  async getAll(req, res, next) {
    try {
      const {
        productId,
        category,
        productCode,
        sortBy,
        sortDirection,
        priceStart,
        priceEnd
      } = req.query;
      const response = await productsController.getAll({productId, category, productCode, sortBy, sortDirection,priceStart,priceEnd});
      console.log('Total records fetched-->',response.body.data.length);
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async getAllItemsList(req, res, next){
    try {
      const response = await productsController.getAllItemsList();
      console.log('ItemList fetched-->',response);
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async getAllFilters(req, res, next){
    try {
      const { categoryId } = req.query;
      const response = await productsController.getAllFilters(categoryId);
      console.log('ItemList fetched-->',response);
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }

  async addCategoryId(req, res, next){
    try {
      const category = req.body.category;
      const id = req.body.id;
      const response = await productsController.addCategoryId({category,id});
      console.log('ItemList fetched-->',response);
      return res.status(response.httpStatus).json(response.body);
    } catch (err) {
      console.log(err);
      return next(new errors.OperationalError(`${resMsg.WENT_WRONG}`));
    }
  }
}

module.exports = new ProductModule();
