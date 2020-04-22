class Queries {
  getDesignQuotationByClientId(clientId) {
    return `SELECT * FROM design_quotation where client_id = ${clientId}`;
  }

  insertDesignQuotation(reqData) {
    const finalQuerySet = [];
    const designQuotId = `SELECT id from design_quotation WHERE client_id = ${reqData.clientId}`;
    finalQuerySet.push(`DELETE from design_quotation_details where design_quotation_id=(${designQuotId})`); 
    finalQuerySet.push(`DELETE from design_quotation where client_id=${reqData.clientId}`); 
    
    finalQuerySet.push(`INSERT INTO design_quotation (client_id,admin_id,doc_url) values (${reqData.clientId},${reqData.adminId},'${reqData.docUrl}')`);
    if (reqData.view3D) finalQuerySet.push(`INSERT INTO design_quotation_details (design_quotation_id, item_type, number, amount) VALUES ((${designQuotId}), '3D_VIEW',${reqData.view3D}, 3500 * ${reqData.view3D}); `);
    if (reqData.adhocCharges) finalQuerySet.push(`INSERT INTO design_quotation_details (design_quotation_id, item_type, number, amount) VALUES ((${designQuotId}), 'ADHOC_CHARGES', 1, ${reqData.adhocCharges}); `);
    if (reqData.design && reqData.design.length > 0) {
      reqData.design.map(design => finalQuerySet.push(`INSERT INTO design_quotation_details (design_quotation_id, item_type, item_sub_type, number, amount) VALUES ((${designQuotId}), 'DESIGN', '${design.roomType}', ${design.count}, 5000 * ${design.count}); `));
    }
    console.log('final->', finalQuerySet);
    return finalQuerySet;
  }

  getDesignQuotationData(clientId){
    const designQuotId = `SELECT id from design_quotation WHERE client_id = ${clientId}`;
    
    const finalQuery=`SELECT item_type,item_sub_type,number from design_quotation_details where design_quotation_id=(${designQuotId})`;
    console.log('final->', finalQuery);
    return finalQuery;
  }
}

module.exports = new Queries();
