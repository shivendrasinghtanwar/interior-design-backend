
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

/*
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
 row += '</tr>';*/

class BoqPdfMaker {


  //On-Site
  async makeOnSitePdf(onsiteData, adminId) {
    const url = path.join('./template', '/BOQ/onsite.html');
    let onsiteHtml = fs.readFileSync(url, 'utf8');

    let tableBody = this.makeOnSiteTable(onsiteData);
    onsiteHtml = onsiteHtml.replace('{tableBody}', tableBody);
    onsiteHtml = onsiteHtml.replace('{currency}', `INR`);

    const tempOnSitePdfUrl = url.replace('.html', `On_Site_${Date.now()}_${adminId}.pdf`);

    await new Promise((resolve, reject) => {
      pdf.create(onsiteHtml, {
        format: 'A4',
        orientation: 'portrait',
        // height: '16in', // allowed units: mm, cm, in, px
        // width: '9in',
        type: 'pdf',
        border: {
          "top": "0in",            // default is 0, units: mm, cm, in, px
          "right": "0.2cm",
          "bottom": "0.1in",
          "left": "0.2cm"
        },
        header: {
          "height": "20mm",
        }
      }).toFile(tempOnSitePdfUrl, async (e, file) => {
        if (e) return reject(e);
        console.log(file);
        return resolve(file);
      });
    });

    return tempOnSitePdfUrl;
  }
  makeOnSiteTable(onsiteData) {
    let tableBody = '';
    const groupedData = _.groupBy(onsiteData,'item_type');

    let categoryIndex = 65;
    Object.entries(groupedData).forEach(([key,values])=>{

      tableBody += this.getCategoryTitleRowOnSite(categoryIndex, key);

      values.forEach((record,index) => {
        let row = '<tr>';

        let column = '';
        column += `<td> ${index+1} </td>`;
        column += `<td> ${record.item_description} </td>`;
        column += `<td> ${record.unit} </td>`;
        column += '<td align="right"> 0 </td>';
        column += `<td align="right"> ${record.rate} </td>`;
        column += '<td align="right"> 0 </td>';
        column += '<td>  </td>';

        row += column;
        row += '</tr>';
        tableBody += row;
      });

      tableBody += this.getCategoryTotalRowOnSite(categoryIndex, key);

      tableBody += this.getEmptyRowOnSite();

      categoryIndex++;
    });
    return tableBody;
  }


  //Furniture
  async makeFurniturePdf(furnitureData, adminId) {
    const url = path.join('./template', '/BOQ/furniture.html');
    let furnitureHtml = fs.readFileSync(url, 'utf8');

    let tableBody = this.makeFurnitureTable(furnitureData);
    furnitureHtml = furnitureHtml.replace('{tableBody}', tableBody);
    furnitureHtml = furnitureHtml.replace('{currency}', `INR`);

    const tempPdfUrl = url.replace('.html', `_${Date.now()}_${adminId}.pdf`);

    await new Promise((resolve, reject) => {
      pdf.create(furnitureHtml, {
        format: 'A4',
        orientation: 'portrait',
        type: 'pdf',
        border: '5mm',
        header: {
          height: '10mm',
        },
        zoomFactor: 0
      }).toFile(tempPdfUrl, async (e, file) => {
        if (e) return reject(e);
        console.log(file);
        return resolve(file);
      });
    });

    return tempPdfUrl;
  }
  makeFurnitureTable(furnitureData) {
    let tableBody = '';
    const groupedData = _.groupBy(furnitureData,'item_type');
    // console.log('groupedData--------------',groupedData);
    let categoryIndex = 65;
    Object.entries(groupedData).forEach(([key,values])=>{

      tableBody += this.getCategoryTitleRowFurniture(categoryIndex, key);

      values.forEach((record,index) => {
        let row = '<tr>';

        let column = '';
        column += `<td> ${index+1} </td>`;
        column += `<td> ${record.item_code} </td>`;
        column += `<td> ${this.getItemDescriptionFurniture(record)} </td>`;
        column += `<td> ${record.unit} </td>`;
        column += '<td align="right"> 0 </td>';
        column += `<td align="right"> ${record.rate} </td>`;
        column += '<td align="right"> 0 </td>';
        column += '<td>  </td>';

        row += column;
        row += '</tr>';
        tableBody += row;
      });

      tableBody += this.getCategoryTotalRowFurniture(categoryIndex, key);

      tableBody += this.getEmptyRowFurniture();

      categoryIndex++;
    });
    return tableBody;
  }

  //Onsite Methods
  getEmptyRowOnSite(){
    let emptyRow = `<tr style="line-height: 1rem;padding-top: 1rem;">`;
    let emptyColumn = '';
    emptyColumn += `<td> </td>`;
    emptyColumn += `<td> </td>`;
    emptyColumn += `<td> </td>`;
    emptyColumn += `<td> </td>`;
    emptyColumn += `<td> </td>`;
    emptyColumn += `<td> </td>`;
    emptyColumn += `<td> </td>`;
    emptyRow += emptyColumn;
    emptyRow += '</tr>';
    return emptyRow;
  }
  getCategoryTitleRowOnSite(categoryIndex, key){
    let categoryRow = `<tr class="categoryRow">`;
    categoryRow += this.getCategoryColumnOnSite(String.fromCharCode(categoryIndex), key);
    categoryRow += '</tr>';
    return categoryRow
  }
  getCategoryTotalRowOnSite(categoryIndex, key){
    let categoryTotalRow = `<tr class="categoryRow">`;
    categoryTotalRow += this.getCategoryTotalColumnOnSite(String.fromCharCode(categoryIndex), key);;
    categoryTotalRow += '</tr>';
    return categoryTotalRow
  }
  getCategoryColumnOnSite(index, key){
    let categoryColumn = '';
    categoryColumn += `<td class="catIndex"> ${index} </td>`;
    categoryColumn += `<td> ${key} </td>`;
    categoryColumn += `<td></td>`;
    categoryColumn += `<td></td>`;
    categoryColumn += `<td></td>`;
    categoryColumn += `<td></td>`;
    categoryColumn += `<td></td>`;
    return categoryColumn;
  }
  getCategoryTotalColumnOnSite(index, key){
    let categoryColumn = '';
    categoryColumn += `<td class="catIndex"> ${index} </td>`;
    categoryColumn += `<td> Total of ${key} </td>`;
    categoryColumn += `<td></td>`;
    categoryColumn += `<td></td>`;
    categoryColumn += `<td></td>`;
    categoryColumn += `<td></td>`;
    categoryColumn += `<td></td>`;
    return categoryColumn;
  }

  //Furniture Methods
  getEmptyRowFurniture(){
    let emptyRow = `<tr style="line-height: 1rem;padding-top: 1rem;">`;
    let emptyColumn = '';
    emptyColumn += `<td> </td>`;
    emptyColumn += `<td> </td>`;
    emptyColumn += `<td> </td>`;
    emptyColumn += `<td> </td>`;
    emptyColumn += `<td> </td>`;
    emptyColumn += `<td> </td>`;
    emptyColumn += `<td> </td>`;
    emptyColumn += `<td> </td>`;
    emptyRow += emptyColumn;
    emptyRow += '</tr>';
    return emptyRow;
  }
  getCategoryTitleRowFurniture(categoryIndex, key){
    let categoryRow = `<tr class="categoryRow">`;
    categoryRow += this.getCategoryColumnFurniture(String.fromCharCode(categoryIndex), key);
    categoryRow += '</tr>';
    return categoryRow
  }
  getCategoryTotalRowFurniture(categoryIndex, key){
    let categoryTotalRow = `<tr class="categoryRow">`;
    categoryTotalRow += this.getCategoryTotalColumnFurniture(String.fromCharCode(categoryIndex), key);;
    categoryTotalRow += '</tr>';
    return categoryTotalRow
  }
  getCategoryColumnFurniture(index, key){
    let categoryColumn = '';
    categoryColumn += `<td></td>`;
    categoryColumn += `<td></td>`;
    categoryColumn += `<td> ${key} </td>`;
    categoryColumn += `<td></td>`;
    categoryColumn += `<td></td>`;
    categoryColumn += `<td></td>`;
    categoryColumn += `<td></td>`;
    categoryColumn += `<td></td>`;
    return categoryColumn;
  }
  getCategoryTotalColumnFurniture(index, key){
    let categoryColumn = '';
    categoryColumn += `<td></td>`;
    categoryColumn += `<td></td>`;
    categoryColumn += `<td> Total of ${key} </td>`;
    categoryColumn += `<td></td>`;
    categoryColumn += `<td></td>`;
    categoryColumn += `<td></td>`;
    categoryColumn += `<td></td>`;
    categoryColumn += `<td></td>`;
    return categoryColumn;
  }
  getItemDescriptionFurniture(record){
    let description = '';
    description += `<p> ${record.item_description} </p>`;
    description += `<p>Length : ${record.length} mm</p>`;
    description += `<p>Breadth/Depth : ${record.breadth} mm</p>`;
    description += `<p>Height : ${record.height} mm</p>`;
    description += `<p>Fabric : Not Included </p>`;
    return description;
  }

}
module.exports = new BoqPdfMaker();
