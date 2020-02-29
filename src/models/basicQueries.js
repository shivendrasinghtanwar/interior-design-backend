class Queries {
  getClientByIdOrMobileOrEmail(reqData) {
    const { email, mobile, id } = reqData;
    let query = 'select * from client where 1=1 ';
    if (email) query += ` and email = '${email}'`;
    if (mobile) query += ` and mobile = '${mobile}'`;
    if (id) query += ` and id = '${id}'`;
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

  updateLoginTime(id) {
    return `Insert into login_details set admin_id= ${id}, current_login = now() on duplicate key update last_login = current_login, current_login = now() ;`;
  }

  allUnassignedClientQuery() {
    return "select c.id,concat(c.title,' ',c.first_name,' ',c.last_name) AS name, c.email,c.mobile,ad.city,c.meeting_datetime,c.req_form_shared from client c join address_details ad on ad.client_id = c.id;";
  }

  assignToClient(reqData) {
    const finalQuerySet = [];
    finalQuerySet.push(`INSERT INTO client_assigned (client_id,admin_id,assigned_by) value (${reqData.clientId},${reqData.adminId},${reqData.updatedBy}) `);
    finalQuerySet.push(`update client set status = status+1 where id = ${reqData.clientId} and status<3;`);
    console.log('final->', finalQuerySet);
    return finalQuerySet;
  }
}

module.exports = new Queries();
