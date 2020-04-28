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

  updateClientProfile(reqData) {
    let query;
    let note = 'Client Updated:';
    query = `update client c
         left join client_assigned ca on c.id = ca.client_id
         join projects p on p.client_id = c.id
         left join meetings m on m.project_id = p.id
         join address_details ad on ad.client_id = c.id
         left join req_form rf on rf.client_id = c.id
         left join design_quotation dq on dq.client_id = c.id set c.updated=now()`;
    if (reqData.oldTitle !== reqData.newTitle) {
      query += `,c.title='${reqData.newTitle}'`;
      note += ` :title update from ${reqData.oldTitle} to ${reqData.newTitle}`;
    }
    if (reqData.oldFirstName !== reqData.newFirstName) {
      query += `,c.first_name='${reqData.newFirstName}'`;
      note += ` :first name update from ${reqData.oldFirstName} to ${reqData.newFirstName}`;
    }
    if (reqData.oldLastName !== reqData.newLastName) {
      query += `,c.last_name='${reqData.newLastName}'`;
      note += ` :last name update from ${reqData.oldLastName} to ${reqData.newLastName}`;
    }
    if (reqData.oldAddress !== reqData.newAddress) {
      query += ` ,ad.address='${reqData.newAddress}'`;
      note += ` :last name update from ${reqData.oldLastName} to ${reqData.newLastName}`;
    }
    if (reqData.oldCity !== reqData.newCity) {
      query += ` ,ad.city='${reqData.newCity}'`;
      note += ` :city update from ${reqData.oldCity} to ${reqData.newCity}`;
    }
    if (reqData.oldCity !== reqData.newCity) {
      query += ` ,ad.city='${reqData.newCity}'`;
      note += ` :city update from ${reqData.oldCity} to ${reqData.newCity}`;
    }
    query += `where c.id = ${reqData.clientId}`;
    return [query, `insert into notes (client_id, notes, tag, admin_id) values (${reqData.clientId}, ${note}, 'CLIENT_UPDATED', ${reqData.adminId});`];
  }

  assignClientToAdmin(request){
    return `INSERT INTO client_assigned
    (client_id,admin_id,assigned_by) value
    (${request.clientId},${request.adminId},${request.updatedBy})
    on duplicate key
    update admin_id = ${request.adminId}, assigned_by = ${request.updatedBy} ;`;
  }

  updateUserStatus(clientId,statusId){
    return `update client
    set status = ${statusId}
    where id = ${clientId} ;`;
  }

  getClientTasks(clientId){
    return `select
    tmd.task_name,
    ctd.id,ctd.client_id,ctd.start_date,ctd.end_date,
    CASE ctd.status WHEN '1' THEN 'true' ELSE 'false' END as status,
    ctd.delay,ctd.task_id,ctd.admin_id
    from client_tasks_data ctd
    left join client_task_master_data tmd on
    tmd.id = ctd.task_id
    where client_id = ${clientId}`;
  }
  getClientTaskMasterData(){
    return `select * from client_task_master_data;`
  }

  insertClientTask(clientId,task,startDate,endDate){
    return `insert into
    client_tasks_data
    (client_id, start_date, end_date, status, delay, task_id) value
    (${clientId},'${startDate}','${endDate}', 0, 0, ${task.id})`
  }
}

module.exports = new Queries();
