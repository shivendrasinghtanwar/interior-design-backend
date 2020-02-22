class Queries {
  checkReqFormQuery(reqData) {
    const { clientId } = reqData;
    return `select * from req_form where client_id = ${clientId} ;`;
  }

  fillReqFormClientSideQueries(reqData) {
    const {
      propertyType, propertyAge, areaSize, bedRoom, bathRoom, livingRoom, kitchen, clientId
    } = reqData;
    const finalQuerySet = [];
    const reqFormId = `SELECT id from req_form WHERE client_id = ${clientId}`;
    const roomId = `SELECT id from req_form_details WHERE req_form_id = (${reqFormId}) and `;
    finalQuerySet.push(`INSERT INTO req_form (client_id,property_type,property_age,area_size,bedroom_count,bathroom_count,living_count,kitchen_count) 
    values (${clientId},'${propertyType}','${propertyAge}',${areaSize},${bedRoom.length},${bathRoom.length},${livingRoom.length},${kitchen.length})`);
    if (bedRoom && bedRoom.length > 0) {
      finalQuerySet.push(...new Queries().genericInsertQueryForReqForm(bedRoom, 'BEDROOM', reqFormId, roomId));
    }
    if (bathRoom && bathRoom.length > 0) {
      finalQuerySet.push(...new Queries().genericInsertQueryForReqForm(bathRoom, 'BATHROOM', reqFormId, roomId));
    }
    if (livingRoom && livingRoom.length > 0) {
      finalQuerySet.push(...new Queries().genericInsertQueryForReqForm(livingRoom, 'LIVINGROOM', reqFormId, roomId));
    }
    if (kitchen && kitchen.length > 0) {
      finalQuerySet.push(...new Queries().genericInsertQueryForReqForm(kitchen, 'KITCHEN', reqFormId, roomId));
    }
    console.log('final->', finalQuerySet);
    return finalQuerySet;
  }

  genericInsertQueryForReqForm(rooms, roomType, reqFormId, roomId) {
    const query = [];
    rooms.map((room) => {
      query.push(`INSERT INTO req_form_details (req_form_id, room_type, room_name) 
        VALUES ((${reqFormId}),'${roomType}', '${room.roomName}'); `);
      room.items && room.items.map((item) => {
        let qr = `INSERT INTO room_details set room_id = (${roomId} room_type='${roomType}' and room_name = '${room.roomName}')`;
        if (item.itemType) qr += ` ,item_type = '${item.itemType}'`;
        if (item.itemCount) qr += ` ,item_count = ${item.itemCount}`;
        if (item.itemName) qr += ` ,item_name = '${item.itemName}'`;
        query.push(qr);
      });
    });
    return query;
  }

  getAdminByMobileOrEmail(reqData) {
    const {
      email, password, mobile, id
    } = reqData;
    let query = 'select * from admin u LEFT JOIN user_roles ur on ur.admin_id = u.id  where 1=1 ';
    if (email) query += ` and email = '${email}'`;
    if (password) query += ` and password = '${password}'`;
    if (mobile) query += ` and mobile = '${mobile}'`;
    if (id) query += ` and u.id = '${id}'`;
    return query;
  }
}

module.exports = new Queries();
