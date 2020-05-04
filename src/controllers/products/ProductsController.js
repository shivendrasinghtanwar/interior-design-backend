const {
  allOnSiteRecords,
  allOnSiteDistinctItemTypes,
  allFurnitureRecords,
  allFurnitureCategories,
  allModularCategories,
  allModularRecords,
  searchFurnitureRecords,
  searchModularRecords,
  saveOnsiteData,
  saveFurnitureData,
  saveModularData,
  getClientOnSiteData,
  getClientBoqFurnitureData,
  getClientBoqModularData,
  deleteOnSiteDataByClientId,
  deleteFurnitureDataByClientId,
  deleteModularDataByClientId,
  deleteAllRoomsByClientId,
  insertNewRoom,
  getLastAddedRoomId,
  getAllRoomsByClientId,
  getClientBoqFurnitureDataByRoomId,
  getClientBOQData,
  getRoomModularData,
  getRoomFurnitureData
} = require('../../models/boqQueries');
const _ = require('lodash');
const { execSql,mySqlTxn } = require('../../models/sqlGetResult');
const { resMsg } = require('../../../config/constants/constant');
class ProductsController {
  async getAll(request){
    const {productId, category, productCode, sortBy, sortDirection} = request;

    const query = {};
    if(productId) query.productId = productId;
    else if(category) query.category = category;
    else if(productCode) query.productCode = productCode;

    const modularDBRes = await execSql(allModularRecords(query));
    if(modularDBRes.code) return {
      httpStatus: 500,
      body: { success: false, msg: resMsg.ERORR, data: {} }
    };

    const furnitureDBRes = await execSql(allFurnitureRecords(query));
    if(furnitureDBRes.code) return {
      httpStatus: 500,
      body: { success: false, msg: resMsg.ERORR, data: {} }
    };

    const allRecords = furnitureDBRes.concat(modularDBRes);
    let response = allRecords;
    if(sortBy && sortBy==='price'){
      query.sortBy = 'rate';
      if(sortDirection) query.sortDirection = sortDirection;
      response = _.orderBy(allRecords, ['rate'], [query.sortDirection]);
    }


    return {
      httpStatus: 200,
      body: {
        success: true,
        data: response
      }
    };
  }

  async getAllItemsList(){
    
  }
}

module.exports = new ProductsController();
