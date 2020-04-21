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
  deleteModularDataByClientId
} = require('../../models/boqQueries');
const { isUserExist, addClientQuery } = require('../../models/registrationQueries');
const { s3Upload } = require('../../utils/s3Upload');
const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { execSql,mySqlTxn } = require('../../models/sqlGetResult');
const _ = require('underscore');
const boqPdfMaker = require('./boqPdfMaker');
const pdfMerger = require('easy-pdf-merge');
const { resMsg } = require('../../../config/constants/constant');
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

  async test(clientId){
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(getClientBoqFurnitureData(clientId))
      }
    }
  }

  async getBOQDataByClientId(request){
    const {adminId, clientId} = request;
    const onsiteData = await execSql(getClientOnSiteData(clientId));
    const furnitureData = await execSql(getClientBoqFurnitureData(clientId));
    const modularData = await execSql(getClientBoqModularData(clientId));
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: {
          onsite: onsiteData,
          furniture: furnitureData,
          modular: modularData
        }
      }
    }
  }

  async generateBOQ(reqData) {
    const {
      adminId, clientId
    } = reqData;
    console.log('3rd',clientId);
    const boqOnsiteData = await execSql(getClientOnSiteData(clientId));
    let boqFurnitureData = await execSql(getClientBoqFurnitureData(clientId));
    const boqModularData = await execSql(getClientBoqModularData(clientId));
    let onSitePdfUrl = await boqPdfMaker.makeOnSitePdf(boqOnsiteData,adminId);
    boqFurnitureData = boqFurnitureData.concat(boqModularData);
    let furniturePdfUrl = await boqPdfMaker.makeFurniturePdf(boqFurnitureData,adminId);
    const finalFile = path.join('./template', `/BOQ/boqCombined_${adminId}_${Date.now()}.pdf`);
    const firstpage = path.join('./template','BOQ','boqPage1.pdf');
    const secondpage = path.join('./template','BOQ','boqPage2.pdf');
    await new Promise((resolve, reject) => {
      pdfMerger([firstpage,secondpage,onSitePdfUrl,furniturePdfUrl],finalFile,function(err) {
        if(err) {
          console.log('Merging error',err);
         return reject(err)
        }
        console.log(resolve);
        console.log('Successfully merged!');
        boqPdfMaker.delete(onSitePdfUrl);
        boqPdfMaker.delete(furniturePdfUrl);

        return resolve('OK')
      });
    });

    console.log('2nd');
    // console.log('temp ', tempFilePath);
    const s3docLink = await s3Upload(finalFile, `BOQ/${finalFile.split('/')[2]}`);
    boqPdfMaker.delete(finalFile);
/*    // reqData.docUrl = s3docLink;
    // console.log('s3doclink', s3docLink);
    // reqData.docUrl = tempFilePath;
    // fs.unlinkSync(tempFilePath);
    if (dbres.code) {
      return {
        httpStatus: 404,
        body: {success: false, msg: resMsg.DESIGN_QUOTATION_ERROR, data: {}}
      };
    }*/


    return {
      httpStatus: 200,
      body: {
        success: true,

        data: { pdfUrl:s3docLink }
      }
    };
  }

  async saveBOQData(reqData) {
    // Check if user exist with emailId, mobile number or both.
   /* const listExistedUsers = JSON.stringify(await (execSql(isUserExist(reqData)))).toLocaleLowerCase();

    if (listExistedUsers.includes(reqData.mobile)
      && listExistedUsers.includes(reqData.email)) {
      return {
        httpStatus: 400,
        body: { success: false, msg: resMsg.EMAIL_MOBILE_EXIST, data: {} }
      };
    }*/
    if(reqData.boqOnsiteData.length!==0) {
      await execSql(deleteOnSiteDataByClientId(reqData.clientId));
      reqData.boqOnsiteData.forEach(record => {
        const onSiteDBRes = execSql(saveOnsiteData(record, reqData.clientId));
        console.log('Onsite data save response -- ', onSiteDBRes);
      });
    }else if(reqData.boqOnsiteData.length===0){
      await execSql(deleteOnSiteDataByClientId(reqData.clientId));
    }
    if(reqData.boqFurnitureData.length!==0) {
      await execSql(deleteFurnitureDataByClientId(reqData.clientId));
      reqData.boqFurnitureData.forEach(record => {
        const onSiteDBRes = execSql(saveFurnitureData(record, reqData.clientId));
        console.log('Onsite data save response -- ', onSiteDBRes);
      });
    }else if(reqData.boqFurnitureData.length===0){
      await execSql(deleteFurnitureDataByClientId(reqData.clientId));
    }
    if(reqData.boqModularData.length!==0){
      await execSql(deleteModularDataByClientId(reqData.clientId));
      reqData.boqModularData.forEach(record=>{
        const onSiteDBRes = execSql(saveModularData(record,reqData.clientId));
        console.log('Onsite data save response -- ',onSiteDBRes);
      });
    }else if(reqData.boqModularData.length===0){
      await execSql(deleteModularDataByClientId(reqData.clientId));
    }


     return {
       httpStatus: 200, body: { success: true, msg: resMsg.OK }
     };
   }
}
module.exports = new BoqCon();
