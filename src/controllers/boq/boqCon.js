const {
  allOnSiteRecords, allOnSiteDistinctItemTypes, allFurnitureRecords, allFurnitureCategories, allModularCategories, allModularRecords, searchFurnitureRecords, searchModularRecords
} = require('../../models/boqQueries');

const { s3Upload } = require('../../utils/s3Upload');
const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { execSql } = require('../../models/sqlGetResult');

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

  async generateBOQ(reqData) {
    const {
      design, view3D, adhocCharges, clientId
    } = reqData;

    const url1 = path.join('./template', '/BOQ/index.html');
    const html = fs.readFileSync(url1, 'utf8');
    let designQuotHtml = html;

    let tableBody = await this.makeBOQTableBody(reqData);
    console.log(tableBody)
    designQuotHtml = designQuotHtml.replace('{tableBody}', tableBody);
    designQuotHtml = designQuotHtml.replace('{currency}', `INR`);
    const htmlData = designQuotHtml;
    const tempFilePath = url1.replace('.html', `${Date.now()}.pdf`);
    // const tempFilePath = `${process.cwd()}/Design-Quot-${Date.now()}.pdf`;
    await new Promise((resolve, reject) => {
      pdf.create(htmlData, {
        // format: 'A3',
        orientation: 'portrait',
        height: '16in', // allowed units: mm, cm, in, px
        width: '9in',
        type: 'pdf',
        zoomFactor: '0.5'
      }).toFile(tempFilePath, async (e, file) => {
        if (e) return reject(e);
        console.log(file);
        return resolve(file);
      });
    });
    // console.log('temp ', tempFilePath);
    /*const s3docLink = await s3Upload(tempFilePath, `${user.id}-boq.pdf`);*/
    reqData.docUrl = s3docLink;
    // console.log('s3doclink', s3docLink);
    // reqData.docUrl = tempFilePath;
    // fs.unlinkSync(tempFilePath);
    if (dbres.code) {
      return {
        httpStatus: 404,
        body: {success: false, msg: resMsg.DESIGN_QUOTATION_ERROR, data: {}}
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
  async getBOQFurnitureSearch(reqData) {
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(searchFurnitureRecords(reqData.searchType, reqData. searchTerm))
      }
    };
  }
  async makeBOQTableBody(data) {

      let row = '<tr>';

      let column = '';
      column += '<td> 1 </td>';
      column += '<td> 1 </td>';
      column += '<td> 1 </td>';
      column += '<td> 1 </td>';
      column += '<td> 1 </td>';
      column += '<td> 1 </td>';
      column += '<td> 1 </td>';
      column += '<td> 1 </td>';

      row += column;
      row += '</tr>';
      return row;
    }

  async getBOQModularSearch(reqData) {
    return {
      httpStatus: 200,
      body: {
        success: true,
        data: await execSql(searchModularRecords(reqData.searchType, reqData. searchTerm))
      }
    }
  }
}
module.exports = new BoqCon();
