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
      adminId, boqOnsiteData, furnitureData, modularData
    } = reqData;

    const url1 = path.join('./template', '/BOQ/index.html');
    const html = fs.readFileSync(url1, 'utf8');
    let designQuotHtml = html;

    let tableBody = await this.makeOnSiteTable(boqOnsiteData);
    designQuotHtml = designQuotHtml.replace('{tableBody}', tableBody);
    designQuotHtml = designQuotHtml.replace('{currency}', `INR`);
    const htmlData = designQuotHtml;
    const tempFilePath = url1.replace('.html', `${Date.now()}.pdf`);
    // const tempFilePath = `${process.cwd()}/Design-Quot-${Date.now()}.pdf`;
    await new Promise((resolve, reject) => {
      pdf.create(htmlData, {
        // format: 'A3',
        orientation: 'landscape',
        height: '16in', // allowed units: mm, cm, in, px
        width: '9in',
        type: 'pdf',
        zoomFactor: '0'
      }).toFile(tempFilePath, async (e, file) => {
        if (e) return reject(e);
        console.log(file);
        return resolve(file);
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

        data: { url: reqData.docUrl }
      }
    };
  }
   async makeOnSiteTable(onsiteData) {
    let tableBody = '';
    const groupedData = _.groupBy(onsiteData,'item_type');

    console.log(groupedData);
    Object.entries(groupedData).forEach(([key,values])=>{
      console.log('Key-->',key);
      // console.log('values-->',value);

      let categoryRow = `<tr class="categoryRow">`;

      let categoryColumn = '';
      categoryColumn += '<td> A </td>';
      categoryColumn += `<td> ${key} </td>`;
      categoryColumn += `<td></td>`;
      categoryColumn += `<td></td>`;
      categoryColumn += `<td></td>`;
      categoryColumn += `<td></td>`;
      categoryColumn += `<td></td>`;
      categoryColumn += `<td></td>`;
      categoryRow += categoryColumn;
      categoryRow += '</tr>';
      tableBody += categoryRow;


      values.forEach(record => {
        let row = '<tr>';

         let column = '';
         column += '<td> 1 </td>';
         column += `<td> ${record.item_description} </td>`;
         column += `<td> ${record.unit} </td>`;
         column += '<td> 0 </td>';
         column += `<td> ${record.rate} </td>`;
         column += '<td> 0 </td>';
         column += '<td>  </td>';

         row += column;
         row += '</tr>';
         tableBody += row;
      });

    });
    // console.log(groupedData);
    let row = '<tr>';

   /* let column = '';
    column += '<td> 1 </td>';
    column += '<td> 1 </td>';
    column += '<td> 1 </td>';
    column += '<td> 1 </td>';
    column += '<td> 1 </td>';
    column += '<td> 1 </td>';
    column += '<td> 1 </td>';
    column += '<td> 1 </td>';

    row += column;
    row += '</tr>';*/
   // console.log('Final table body',tableBody);
    return tableBody;
  }
}
module.exports = new BoqCon();
