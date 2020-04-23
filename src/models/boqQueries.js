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

  insertNewRoom(roomType,roomName,clientId){
    return `
    Insert into req_form_details
    (req_form_id, room_type, room_name, client_id) VALUE
    ('1','${roomType}','${roomName}',${clientId})`;
  }

  deleteAllRoomsByClientId(clientId){
    return `delete from req_form_details
    where client_id=${clientId};`
  }
  getAllRoomsByClientId(clientId){
    return `select * from req_form_details
    where client_id=${clientId}`;
  }
  getLastAddedRoomId(clientId){
    return `
    select id from req_form_details
     order by created desc limit  1`;
  }
  saveOnsiteData(data,clientId){
    return `Insert into client_onsite_data
    (client_id,onsite_id,nos,length,height,width,quantity,total) VALUE
    (${clientId},${data.id},${data.nos},${data.length},${data.height},${data.width},${data.quantity},${data.total});`
  }
  saveFurnitureData(data,clientId,roomId){
    return `Insert into client_furniture_data
    (client_id,furniture_id,room_id,quantity,total) VALUE
    (${clientId},${data.id},(${roomId}),${data.quantity},${data.total});`
  }
  saveModularData(data,clientId){
    console.log('Modular data to save --', data);
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
    unit,rate,breadth,length,height,main_rate,url,room_number
    from client_furniture_data
    inner join boq_furniture_master_data ON client_furniture_data.furniture_id=boq_furniture_master_data.id
    where client_id = ${clientId}`;
  }

  getRoomFurnitureData(clientId){
    return `select
    req_form_details.id,req_form_details.client_id,room_type,room_name,
    furniture_id,quantity,total,
    boq_furniture_master_data.item_code,boq_furniture_master_data.item_type,boq_furniture_master_data.item_name,boq_furniture_master_data.item_description,
    unit,rate,breadth,length,height,main_rate,url
    from req_form_details
    inner join client_furniture_data on
    req_form_details.id = client_furniture_data.room_id
    inner join boq_furniture_master_data on
    boq_furniture_master_data.id = client_furniture_data.furniture_id
    where req_form_details.client_id = ${clientId}`;
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

  deleteOnSiteDataByClientId(clientId){
    return `delete from client_onsite_data
    where client_id=${clientId};`
  }
  deleteFurnitureDataByClientId(clientId){
    return `delete from client_furniture_data
    where client_id=${clientId};`
  }
  deleteModularDataByClientId(clientId){
    return `delete from client_modular_data
    where client_id=${clientId};`
  }

  getClientBOQData(clientId){
    return `select *
    from req_form_details
    left join client_furniture_data
    on req_form_details.id = client_furniture_data.room_id
    where req_form_details.clientId=${clientId}`;
  }
}

module.exports = new Queries();
