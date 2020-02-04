const axios = require('axios');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const pdf = require('html-pdf');
const { s3Upload } = require('../../utils/s3Upload');
const { insertDesignQuotationQueries, getDesignQuotationByClientId } = require('../../models/quotationQueries');
const { getUserById } = require('../../models/basicQueries');
const { getData, mySqlTxn } = require('../../models/sqlGetResult');
const {
  resMsg
} = require('../../../config/constants/constant');

// const path =
// const __dirname = '../../../template';

class QuotationConn {
  async designQuotaion(reqData) {
    const {
      design, view3D, adhocCharges, clientId
    } = reqData;
    const [designQuot] = await getData(getDesignQuotationByClientId(clientId));
    console.log('designQuot ', designQuot);
    if (designQuot) {
      return {
        httpStatus: 400,
        body: { success: false, msg: resMsg.DESIGN_QUOTATION_ALREADY_GENERATED, data: {} }
      };
    }
    const [user] = await getData(getUserById(clientId));
    console.log('user ', user);
    if (!user) {
      return {
        httpStatus: 400, body: { success: false, msg: resMsg.INVALID_CLIENT_ID, data: {} }
      };
    }

    const url1 = path.join(__dirname, '../../../template', '/Design_Quotation_Template.html');
    // const path = '../../../template';
    console.log(reqData);
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
    const tempFilePath = url1.replace('.html', '.pdf');
    await new Promise((resolve, reject) => {
      pdf.create(htmlData, {
        // format: 'A3',
        orientation: 'portrait',
        height: '16in', // allowed units: mm, cm, in, px
        width: '9in',
        type: 'pdf',
        zoomFactor: '0.5'
      }).toFile(tempFilePath, (e, file) => {
        if (e) return reject(e);
        console.log(file);
        return resolve(file);
      });
    });
    // const s3docLink = await s3Upload(tempFilePath, `${user.id}-design-quotation.pdf`);
    // reqData.docUrl = s3docLink;
    reqData.docUrl = 'https://lendboxdev.s3.amazonaws.com/4-design-quotation.pdf';
    const dbres = await mySqlTxn(insertDesignQuotationQueries(reqData));
    // fs.unlinkSync(tempFilePath);
    if (dbres.code) {
      console.log('#'.repeat(100));
      return {
        httpStatus: 404,
        body: { success: false, msg: resMsg.DESIGN_QUOTATION_ERROR, data: {} }
      };
    }
    console.log('$'.repeat(100));
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: { url: reqData.docUrl }
      }
    };
  }
}
module.exports = new QuotationConn();
