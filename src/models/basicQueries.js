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
    let query = 'select id,email,concat(title,\' \', first_name,\' \', last_name) name,mobile,type,status from admin u where visible=1';
    if (email) query += ` and email = '${email}'`;
    if (password) query += ` and password = '${password}'`;
    if (mobile) query += ` and mobile = '${mobile}'`;
    if (id) query += ` and u.id = '${id}'`;
    return query;
  }

  getUserRoles(userId) {
    return `SELECT roles from user_roles where admin_id = ${userId}`;
  }

  updateLoginTime(id) {
    return `Insert into login_details set admin_id= ${id}, current_login = now() on duplicate key update last_login = current_login, current_login = now() ;`;
  }

  allUnassignedClientQuery() {
    return "select c.id,concat(c.title,' ',c.first_name,' ',c.last_name) AS name, c.email,c.mobile,ad.city,c.meeting_datetime,c.req_form_shared from client c join address_details ad on ad.client_id = c.id;";
  }

  assignToClient(reqData) {
    const finalQuerySet = [];
    finalQuerySet.push(`INSERT INTO client_assigned (client_id,admin_id,assigned_by) value (${reqData.clientId},${reqData.adminId},${reqData.updatedBy}) on duplicate key update admin_id = ${reqData.adminId}, assigned_by = ${reqData.updatedBy} `);
    finalQuerySet.push(`update client set status = status+1 where id = ${reqData.clientId} and status<3;`);
    console.log('final->', finalQuerySet);
    return finalQuerySet;
  }

  getClientProfile(clientId) {
    return `select DATE_format(c.meeting_datetime,'%d %b %y %h:%i %p') AS meetingDateTime,c.id,concat(c.title,' ',c.first_name,' ',c.last_name) AS name, c.email,c.mobile,ad.city,p.id AS projectId,p.scope_of_work,p.package,DATE_format(dq.created,'%d %b %Y') dos,ad.address,m.min_of_meeting,rf.id as reqFormId,dq.id AS designQuotId from client c left join client_assigned ca on c.id = ca.client_id join projects p on p.client_id = c.id left join meetings m on m.project_id = p.id join address_details ad on ad.client_id = c.id left join req_form rf on rf.client_id = c.id left join design_quotation dq on dq.client_id = c.id where c.id = ${clientId}`;
  }
}

module.exports = new Queries();
