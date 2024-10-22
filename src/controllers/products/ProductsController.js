const {
  allFurnitureRecords,
  allModularRecords,
  allFurnitureItems,
  allModularItems,
  updateCategoryIdFurniture
} = require('../../models/boqQueries');
const {getAllFiltersByCategory} = require('../../models/categoryQueries');
const _ = require('lodash');
const { execSql,mySqlTxn } = require('../../models/sqlGetResult');
const { resMsg } = require('../../../config/constants/constant');
class ProductsController {
  async getAll(request){
    const {productId, category, productCode, sortBy, sortDirection,priceStart, priceEnd} = request;

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

    let filteredAllRecords = [];
    console.log(priceEnd!=='0');
    if(priceStart==='0' && priceEnd==='0'){
      filteredAllRecords = allRecords;
    }
    else {
      console.log('Hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',priceStart==='0',priceEnd);
      let reqMax = 0;
      let reqMin = 0;
      if(priceEnd==='0'){
        reqMax = Math.max.apply(Math, furnitureDBRes.map(function(o) { return o.rate; }))*1000;
      }else {
        reqMax = priceEnd * 1000;
      }
      reqMin = priceStart*1000;
      filteredAllRecords = allRecords.filter(function(record) {
        return record.rate > reqMin && record.rate <= reqMax;
      });
    }

    let response = filteredAllRecords;
    if(sortBy && sortBy==='price'){
      query.sortBy = 'rate';
      if(sortDirection) query.sortDirection = sortDirection;
      response = _.orderBy(filteredAllRecords, ['rate'], [query.sortDirection]);
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
    const query = {};
    const furnitureItems = await execSql(allFurnitureItems(query));
    const modularItems = await execSql(allModularItems(query));

    return {
      httpStatus: 200,
      body: {
        success: true,
        data: [
          {
            label: 'Furniture',
            items: furnitureItems
          },
          {
            label: 'Modular',
            items: modularItems
          }
        ]
      }
    };
  }

  async getAllFilters(categoryId){
    const allFilters = await execSql(getAllFiltersByCategory(categoryId));

    console.log('All Filters------------>>',allFilters);
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: allFilters
      }
    };
  }


  async addCategoryId(request){
    const {category, id } = request;
    // console.log('ssssssssssssssssssssssssssssssss',category)
    const data = await execSql(updateCategoryIdFurniture(id,category));

    return {
      httpStatus: 200,
      body: {
        success: true,
        data: data
      }
    };
  }
}

module.exports = new ProductsController();
