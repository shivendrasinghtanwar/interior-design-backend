const {
  allOnSiteRecords, allOnSiteDistinctItemTypes, allFurnitureRecords, allFurnitureCategories, allModularCategories, allModularRecords, searchFurnitureRecords, searchModularRecords
} = require('../../models/boqQueries');

const { s3Upload } = require('../../utils/s3Upload');
const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { execSql } = require('../../models/sqlGetResult');
const _ = require('underscore');
const boqPdfMaker = require('./boqPdfMaker');
const pdfMerger = require('easy-pdf-merge');
class BoqCon {
  async fetchAllOnSiteRecords(reqData) {
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allOnSiteRecords(reqData.category))
      }
    };
  }

  async getOnSiteDistinctItemTypes(reqData) {
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allOnSiteDistinctItemTypes())
      }
    };
  }

  async getBOQFurnitureRecords(reqData) {
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allFurnitureRecords(reqData.category))
      }
    };
  }

  async getBOQFurnitureCategories(reqData) {
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allFurnitureCategories())
      }
    };
  }

  async getBOQModularRecords(reqData) {
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allModularRecords(reqData.category))
      }
    };
  }

  async getBOQModularCategories(reqData) {
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(allModularCategories())
      }
    };
  }

  async getBOQFurnitureSearch(reqData) {
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(searchFurnitureRecords(reqData.type, reqData.term))
      }
    };
  }

  async getBOQModularSearch(reqData) {
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(searchModularRecords(reqData.type, reqData.term))
      }
    }
  }



  async generateBOQ(reqData) {
    const {
      adminId, boqOnsiteData, boqFurnitureData, modularData
    } = reqData;

    let onSitePdfUrl = await boqPdfMaker.makeOnSitePdf(boqOnsiteData,adminId);
    let furniturePdfUrl = await boqPdfMaker.makeFurniturePdf(boqFurnitureData,adminId);
    const finalFile = path.join('./template', `/BOQ/boqCombined_${adminId}_${Date.now()}.pdf`);
    await new Promise((resolve, reject) => {
      pdfMerger([onSitePdfUrl,furniturePdfUrl],finalFile,function(err) {
        if(err) {
          console.log('Merging error',err);
          return {
            httpStatus: 400,
            body: {
              success: false,
              msg: err,
              data: {}
            }
          };
        }
        console.log('Successfully merged!');

      });
    });


    // console.log('temp ', tempFilePath);
    /*const s3docLink = await s3Upload(tempFilePath, `${user.id}-boq.pdf`);*/
    // reqData.docUrl = s3docLink;
    // console.log('s3doclink', s3docLink);
    // reqData.docUrl = tempFilePath;
    // fs.unlinkSync(tempFilePath);
   /* if (dbres.code) {
      return {
        httpStatus: 404,
        body: {success: false, msg: resMsg.DESIGN_QUOTATION_ERROR, data: {}}
      };
    }*/
    return {
      httpStatus: 200,
      body: {
        success: true,

        data: { 'onSitePdfUrl':finalFile }
      }
    };
  }
}
module.exports = new BoqCon();
