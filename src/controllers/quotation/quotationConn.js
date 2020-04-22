const axios = require('axios');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const pdf = require('html-pdf');
const { s3Upload } = require('../../utils/s3Upload');
const { getDesignQuotationByClientId,insertDesignQuotation,getDesignQuotationData} = require('../../models/quotationQueries');
const { getClientByIdOrMobileOrEmail } = require('../../models/basicQueries');
const { execSql, mySqlTxn } = require('../../models/sqlGetResult');
const { resMsg } = require('../../../config/constants/constant');

// const path =
// const __dirname = '../../../template';

class QuotationConn {
  doc_url="";

  async generateDesignQuotPDF(reqData) {
    const {
      design, view3D, adhocCharges, clientId
    } = reqData;
    const [designQuot] = await execSql(getDesignQuotationByClientId(clientId));
    if (designQuot) {
      return {
        httpStatus: 400,
        body: { success: false, msg: resMsg.DESIGN_QUOTATION_ALREADY_GENERATED, data: {} }
      };
    }
    const [user] = await execSql(getClientByIdOrMobileOrEmail(reqData));
    if (!user) {
      return {
        httpStatus: 400, body: { success: false, msg: resMsg.INVALID_CLIENT_ID, data: {} }
      };
    }

    const url1 = path.join(__dirname, '../../../template', '/Design_Quotation_Template.html');
    // const path = '../../../template';
    console.log('reqData', reqData);
    const totalRooms = reqData.design.map(x => x.count).reduce((x, y) => x + y, 0) || 0;
    const html = fs.readFileSync(url1, 'utf8');
    const finalCost = ((totalRooms * 5000) || 0) + ((view3D * 3500) || 0) + (adhocCharges || 0);
    let paymentTerms;
    if (finalCost > 90000) paymentTerms = '35%. On Layout Approval and Concept Finalization 35%. On Completion of False Ceiling and Lighting Drawings 30%';
    else if (finalCost <= 90000 && finalCost > 45000) paymentTerms = '50%. On Layout Approval and Concept Finalization 50%';
    else if (finalCost <= 45000 && finalCost > 20000) paymentTerms = '60%. On Layout Approval and Concept Finalization 40%';
    else paymentTerms = '100%';
    let designQuotHtml = html;
    designQuotHtml = designQuotHtml.replace('{clientName}', `${user.title} ${user.first_name} ${user.last_name}`);
    designQuotHtml = designQuotHtml.replace('{date}', moment().format('DD MMM YYYY'));
    designQuotHtml = designQuotHtml.replace('{roomsWithNameAndQuantity}', design.map(x => `${x.count} ${x.roomType}`).join(', '));
    designQuotHtml = designQuotHtml.replace('{designRooms}', totalRooms);
    designQuotHtml = designQuotHtml.replace('{designAmount}', totalRooms * 5000);
    designQuotHtml = designQuotHtml.replace('{viewCount}', view3D || 0);
    designQuotHtml = designQuotHtml.replace('{view3DAmount}', view3D * 3500 || 0);
    designQuotHtml = designQuotHtml.replace('{totalAmount}', finalCost);
    designQuotHtml = designQuotHtml.replace('{adhocAmount}', adhocCharges || 0);
    designQuotHtml = designQuotHtml.replace('{paymentTerms}', paymentTerms);
    const htmlData = designQuotHtml;
    const tempFilePath = url1.replace('.html', `${Date.now()}.pdf`);
    // const tempFilePath = `${process.cwd()}/Design-Quot-${Date.now()}.pdf`;
    await new Promise((resolve, reject) => {
      pdf.create(htmlData, {
        format: 'A4',
        orientation: 'portrait',
        // height: '16in', // allowed units: mm, cm, in, px
        // width: '9in',
        type: 'pdf',
        zoomFactor: '0'
      }).toFile(tempFilePath, async (e, file) => {
        if (e) return reject(e);
        console.log(file);
        return resolve(file);
      });
    });
    console.log('temp ', tempFilePath);
    const s3docLink = await s3Upload(tempFilePath, `${user.id}-design-quotation.pdf`);
    reqData.docUrl = s3docLink;
    console.log('s3doclink', s3docLink);
    // reqData.docUrl = tempFilePath;
    const dbres = await mySqlTxn(insertDesignQuotation(reqData));
    // fs.unlinkSync(tempFilePath);
    if (dbres.code) {
      return {
        httpStatus: 404,
        body: { success: false, msg: resMsg.DESIGN_QUOTATION_ERROR, data: {} }
      };
    }
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: { url: reqData.docUrl }
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
