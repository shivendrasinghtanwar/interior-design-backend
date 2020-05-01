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

const  ClientStatus  = require('../../utils/enums/ClientStatus');
const { assignClientToAdmin, updateUserStatus, getClientTaskMasterData,insertClientTask } = require('../../models/basicQueries');
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

  async test(clientId) {
    const rooms = [];

    const pop = await execSql(getRoomFurnitureData(clientId));

    const pip = pop.reduce((r, a) => {
      console.log('r-->', r);
      console.log('a--->', a);
      r[a.id] = [...r[a.id] || [], a];
      delete r.room_type;
      return r;
    }, {});
    // console.log('pipipipip----', pip);
    Object.entries(pip).forEach(([key,value])=>{
      console.log('KEY----',key);
      console.log('Value---',value);
      let roomName = value[0].room_name;
      let roomType = value[0].room_type;
      const furniture = [];
      value.forEach(record=>{
        furniture.push({
          furniture_id:record.furniture_id,
          quantity:record.quantity,
          total:record.total
        })
      });
      rooms.push({
        roomId:key,
        roomName: roomName,
        roomType: roomType,
        furniture: furniture
      })
    });

    return {
      httpStatus: 200,
      body: {
        success: true,
        data: rooms
      }
    }
  }

  async getBOQDataByClientId(request){
    const {adminId, clientId} = request;
    const onsiteData = await execSql(getClientOnSiteData(clientId));
    const roomFurnitureData = await execSql(getRoomFurnitureData(clientId));
    const roomModularData = await execSql(getRoomModularData(clientId));

    let rooms = this.fillFurnitureInRoom(roomFurnitureData);
    rooms = this.fillModularInRoom(roomModularData,rooms);

    return {
      httpStatus: 200,
      body: {
        success: true,
        data: {
          onsite: onsiteData,
          rooms: rooms
        }
      }
    }
  }

  async generateBOQ(reqData) {
    const {
      adminId, clientId
    } = reqData;
    const boqOnsiteData = await execSql(getClientOnSiteData(clientId));
    const roomFurnitureData = await execSql(getRoomFurnitureData(clientId));
    const roomModularData = await execSql(getRoomModularData(clientId));

    let rooms = this.fillFurnitureInRoom(roomFurnitureData);
    rooms = this.fillModularInRoom(roomModularData,rooms);

    let onSitePdfUrl = await boqPdfMaker.makeOnSitePdf(boqOnsiteData,adminId);

    let furniturePdfUrl = await boqPdfMaker.makeFurniturePdf(rooms,adminId);
    const finalFile = path.join('./template', `/BOQ/boqCombined_${adminId}_${Date.now()}.pdf`);
    const firstpage = path.join('./template','BOQ','boqPage1.pdf');
    const secondpage = path.join('./template','BOQ','boqPage2.pdf');

    await new Promise((resolve, reject) => {
      pdfMerger([firstpage,secondpage,onSitePdfUrl,furniturePdfUrl],finalFile,function(err) {
        if(err) {
         return reject(err)
        }
        boqPdfMaker.delete(onSitePdfUrl);
        boqPdfMaker.delete(furniturePdfUrl);

        return resolve('OK')
      });
    });


    // console.log('temp ', tempFilePath);
    const s3docLink = await s3Upload(finalFile, `BOQ/${finalFile.split('/')[2]}`);
    boqPdfMaker.delete(finalFile);

    const dbres2 = await execSql(updateUserStatus(clientId,ClientStatus.PROPOSAL_SENT));
    if (dbres2.code) {
      console.log(dbres2);
      return {
        httpStatus: 500,
        body: { success: false, msg: resMsg.CLIENT_STATUS_UPDATE_ERROR, data: {} }
      };
    }
    await this.calculateAndAssignTasks(clientId, rooms.length);


    return {
      httpStatus: 200,
      body: {
        success: true,

        data: { pdfUrl:s3docLink }
      }
    };
  }

  async saveBOQData(reqData) {
    const {adminId, clientId, boqOnsiteData, rooms} = reqData;

    const transactionQueries = [];
    await execSql(deleteOnSiteDataByClientId(reqData.clientId));
    if(reqData.boqOnsiteData.length!==0) {
      reqData.boqOnsiteData.forEach(record => {
        transactionQueries.push(saveOnsiteData(record, reqData.clientId));
      });
    }

    transactionQueries.push(deleteFurnitureDataByClientId(clientId));
    transactionQueries.push(deleteAllRoomsByClientId(clientId));

    rooms.forEach((room,roomNo) => {
      // Insert new room in req_form_details
      transactionQueries.push(insertNewRoom(room.type,room.name,clientId));
      const roomId = getLastAddedRoomId(clientId);
      room.furniture.forEach(record => {
        transactionQueries.push(saveFurnitureData(record, clientId, roomId));
      });
      room.modular.forEach(record => {
        transactionQueries.push(saveModularData(record, clientId, roomId))
      });

    });

    const dbRes = mySqlTxn(transactionQueries);
    if(dbRes.code) return {
      httpStatus: 500,
      body: { success: false, msg: resMsg.CLIENT_MET_ERROR, data: {} }
    };

     return {
       httpStatus: 200, body: { success: true, msg: resMsg.OK }
     };
   }
  fillFurnitureInRoom(roomFurnitureData){
    const rooms= [];
    const tempFurnitureData = roomFurnitureData.reduce((r, a) => {
      r[a.id] = [...r[a.id] || [], a];
      return r;
    }, {});
    Object.entries(tempFurnitureData).forEach(([key,value])=>{
      // console.log('KEY----',key);
      // console.log('Value---',value);
      let roomName = value[0].room_name;
      let roomType = value[0].room_type;
      const furniture = [];
      if(value.length!==0 ){
        value.forEach(record=>{
          if(record.furniture_id!==null){
            furniture.push({
              id:record.furniture_id,
              item_code:record.item_code,
              item_type:record.item_type,
              item_name:record.item_name,
              item_description:record.item_description,
              unit:record.unit,
              rate:record.rate,
              breadth:record.breadth,
              length:record.length,
              height:record.height,
              main_rate:record.main_rate,
              quantity:record.quantity,
              total:record.total,
              url:record.url
            })
          }
        });
      }

      rooms.push({
        roomId:key,
        name: roomName,
        type: roomType,
        furniture: furniture
      })
    });
    return rooms
  }
  fillModularInRoom(roomModularData,rooms){
    const tempModularData = roomModularData.reduce((r, a) => {
      r[a.id] = [...r[a.id] || [], a];
      return r;
    }, {});
    Object.entries(tempModularData).forEach(([key,value])=>{
      // console.log('KEY----',key);
      // console.log('Value---',value);
      let roomName = value[0].room_name;
      let roomType = value[0].room_type;
      const modular = [];
      if(value.length!==0 ){
        value.forEach(record=>{
          if(record.modular_id!==null){
            modular.push({
              id:record.modular_id,
              item_code:record.item_code,
              item_type:record.item_type,
              item_name:record.item_name,
              item_description:record.item_description,
              unit:record.unit,
              rate:record.rate,
              breadth:record.breadth,
              length:record.length,
              height:record.height,
              main_rate:record.main_rate,
              quantity:record.quantity,
              total:record.total,
              url:record.url
            })
          }
        });
      }

      const thisRoom = rooms.find(obj => {
        return obj.roomId === key
      });

      thisRoom.modular = modular;
    });
    return rooms
  }
  async calculateAndAssignTasks(clientId, nosRooms){
    const transactionQueries = [];
    const taskMasterData = await execSql(getClientTaskMasterData());
    if (taskMasterData.code) {
      console.log(taskMasterData);
      return {
        httpStatus: 500,
        body: { success: false, msg: resMsg.DESIGN_QUOTATION_ERROR, data: {} }
      };
    }
    taskMasterData.forEach(record => {
      let tat = 0;
      if(nosRooms<=3){
        tat = record.time_limit_small
      }else{
        tat = record.time_limit_large
      }
      const startDate = this.toMySQLDate(this.addDays(new Date(), tat));
      transactionQueries.push(insertClientTask(clientId,record,startDate,startDate))
    });

    const dbres = await mySqlTxn(transactionQueries);
    if (dbres.code) {
      console.log(dbres);
      return {
        httpStatus: 500,
        body: { success: false, msg: resMsg.DESIGN_QUOTATION_ERROR, data: {} }
      };
    }
  }

  toMySQLDate(date){
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }
  addDays(date,days){
    return new Date(date.setTime( date.getTime() + days * 86400000 ));
  }
}
module.exports = new BoqCon();
