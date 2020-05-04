const productsController = require('../../controllers/products/ProductsController');
const errors = require('../../utils/errors');
const {
  resMsg
} = require('../../../config/constants/constant');

class ProductModule {
  async getAll(req, res, next) {
    try {
      const { productId, category, productCode, sortBy, sortDirection } = req.query;
      const response = await productsController.getAll({productId, category, productCode, sortBy, sortDirection});
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
}

module.exports = new ProductModule();
