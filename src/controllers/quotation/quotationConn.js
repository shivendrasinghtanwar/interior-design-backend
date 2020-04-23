const { execSql, mySqlTxn } = require('../../models/sqlGetResult');
const { resMsg } = require('../../../config/constants/constant');
const pdfFiller = require('pdffiller');

class QuotationConn {

  async generateDNBLPDF(reqData) {
    var sourcePDF = "/home/nishtha/Work/MarksDezynProject/marks-dzyn-backend/template/DNBL/LENDBOX-NACH.pdf";
    var destinationPDF =  "/template/DNBL/test.pdf";
    var data = {
          "Bank_AC_No":123456789
      };
    
    await new Promise((resolve, reject) => {
      pdfFiller.fillFormWithFlatten(sourcePDF, destinationPDF, data, true, function(err) {
        if(err) {
          console.log('Form Filling error',err);
         return reject(err)
        }
        console.log(resolve);
        console.log('Successfully filled!');

        return resolve('OK')
      });
    });
    return {
      httpStatus: 200,
      body: {
        success: true,
        msg: "GENERATED"
      }
    };
  }

  async saveDesignQuotation(reqData) {
    const {
      design, view3D, adhocCharges, clientId
    } = reqData;
    reqData.docUrl="";
    //save data(if exists then delete and insert again)
    const response = await mySqlTxn(insertDesignQuotation(reqData));
      if(response.code){
        return {
          httpStatus: 404,
          body: { success: false, msg: resMsg.DESIGN_QUOTATION_ERROR, data: {} }
        };
      }
      return {
        httpStatus: 200,
        body: {
          success: true,
          msg: "Data Successfully Saved"
        }
      };
  }

  async getDesignQuotation(reqData){
    const result=await execSql(getDesignQuotationData(reqData.clientId));
    let rooms=[];
    let adhocCharges=0;
    let view3D=0;
    result.forEach(element => {
      if(element.item_type=="DESIGN"){
        rooms.push({item_type:element.item_type,item_sub_type:element.item_sub_type,number:element.number});
      } 
      else if (element.item_type=="ADHOC_CHARGES"){
        adhocCharges=element.number
      }
      else if (element.item_type=="3D_VIEW"){
        view3D=element.number
      }

    });
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: {
          design:rooms, adhocCharges:adhocCharges,view3D:view3D
        }
      }
    };
  }
}
module.exports = new QuotationConn();
