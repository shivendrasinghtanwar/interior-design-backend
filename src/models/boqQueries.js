class Queries {
  allOnSiteRecords(category) {
    let queryString = `select
    id,
    item_type,
    item_description,
    unit,
    rate,
    CASE nos WHEN '1' THEN 'true' ELSE 'false' END as nos,
    CASE length WHEN '1' THEN 'true' ELSE 'false' END as length,
    CASE height WHEN '1' THEN 'true' ELSE 'false' END as height,
    CASE width WHEN '1' THEN 'true' ELSE 'false' END as width,
    created,
    updated
    from on_site_master_data`;
    if (category) {
      queryString += ` where item_type='${category}'`;
    }
    console.log('query string--------------', queryString);
    return queryString;
  }

  allOnSiteDistinctItemTypes() {
    return `select distinct item_type as category
    from on_site_master_data
    group by item_type`;
  }

  allFurnitureRecords(category) {
    let queryString = `select
    id,
    item_code,
    item_type,
    item_name,
    item_description,
    unit,
    rate,
    amount,
    piece_quantity,
    breadth,
    length,
    height,
    main_rate,
    fabric_m,
    fabric_rate,
    drawer_count,
    drawer_rate,
    sliding,
    sliding_rate,
    url
    from boq_furniture_master_data`;
    if (category) {
      queryString += ` where item_type='${category}'`;
    }
    console.log('query string--------------', queryString);
    return queryString;
  }

  allFurnitureCategories() {
    return `select distinct item_type as category
    from boq_furniture_master_data
    group by item_type`;
  }

  allModularRecords(category) {
    let queryString = `select
    id,
    item_code,
    item_type,
    item_name,
    item_description,
    unit,
    rate,
    amount,
    piece_quantity,
    breadth,
    length,
    height,
    main_rate,
    fabric_m,
    fabric_rate,
    drawer_count,
    drawer_rate,
    sliding,
    sliding_rate,
    url
    width
    from boq_modular_master_data`;
    if (category) {
      queryString += ` where item_type='${category}'`;
    }
    console.log('query string--------------', queryString);
    return queryString;
  }

  allModularCategories() {
    return `select distinct item_type as category
    from boq_modular_master_data
    group by item_type`;
  }

  searchFurnitureRecords(searchType,searchTerm) {
    let queryString = `select
    id,
    item_code,
    item_type,
    item_name,
    item_description,
    unit,
    rate,
    amount,
    piece_quantity,
    breadth,
    length,
    height,
    main_rate,
    fabric_m,
    fabric_rate,
    drawer_count,
    drawer_rate,
    sliding,
    sliding_rate,
    url
    width
    from boq_furniture_master_data`;
    let regex=".*"+searchTerm+'*';

    if(searchType =='item_code'){
      queryString += ` where item_code REGEXP '${regex}'`;
      console.log(queryString)
    } else if(searchType == 'item_description'){
      queryString += ` where item_description REGEXP '${regex}'`;
    }
    return queryString
  }

  searchModularRecords(searchType,searchTerm) {
    let queryString = `select
    id,
    item_code,
    item_type,
    item_name,
    item_description,
    unit,
    rate,
    amount,
    piece_quantity,
    breadth,
    length,
    height,
    main_rate,
    fabric_m,
    fabric_rate,
    drawer_count,
    drawer_rate,
    sliding,
    sliding_rate,
    url
    width
    from boq_modular_master_data`;
    let regex=".*"+searchTerm+'*';

    if(searchType =='item_code'){
      queryString += ` where item_code REGEXP '${regex}'`;
      console.log(queryString)
    } else if(searchType == 'item_description'){
      queryString += ` where item_description REGEXP '${regex}'`;
    }
    return queryString
  }

  saveOnsiteData(data,clientId){
    return `Insert into client_onsite_data
    (client_id,onsite_id,nos,length,height,width,quantity,total) VALUE
    (${clientId},${data.id},${data.nos},${data.length},${data.height},${data.width},${data.quantity},${data.total});`
  }
  saveFurnitureData(data,clientId){
    return `Insert into client_furniture_data
    (client_id,furniture_id,quantity,total) VALUE
    (${clientId},${data.id},${data.quantity},${data.total});`
  }
  saveModularData(data,clientId){
    return `Insert into client_modular_data
    (client_id,modular_id,quantity,total) VALUE
    (${clientId},${data.id},${data.quantity},${data.total});`
  }

  getClientOnSiteData(clientId){
    return `select
    on_site_master_data.id as id,
    client_onsite_data.nos,
    client_onsite_data.length,
    client_onsite_data.height,
    client_onsite_data.width,
    client_onsite_data.quantity,
    client_onsite_data.total,
    item_type,
    item_description,
    unit,rate
    from client_onsite_data
    inner join on_site_master_data ON client_onsite_data.onsite_id=on_site_master_data.id
    where client_id = ${clientId}`;
  }

  getClientBoqFurnitureData(clientId){
    return `select
    boq_furniture_master_data.id as id,
    client_furniture_data.quantity,
    client_furniture_data.total,
    item_type,
    item_code,
    item_name,
    item_description,
    unit,rate,breadth,length,height,main_rate,url
    from client_furniture_data
    inner join boq_furniture_master_data ON client_furniture_data.furniture_id=boq_furniture_master_data.id
    where client_id = ${clientId}`;
  }

  getClientBoqModularData(clientId){
    return `select
    boq_modular_master_data.id as id,
    client_modular_data.quantity,
    client_modular_data.total,
    item_type,
    item_code,
    item_name,
    item_description,
    unit,rate,breadth,length,height,main_rate,url
    from client_modular_data
    inner join boq_modular_master_data ON client_modular_data.modular_id=boq_modular_master_data.id
    where client_id = ${clientId}`;
  }
}

module.exports = new Queries();
