class Queries {
  isUserExist(data) {
    return `SELECT email, mobile FROM client WHERE mobile = "${data.mobile}" OR email = "${data.email}"`;
  }

  addClientQuery(data) {
    const add = data.address ? `'${data.address}'` : null;
    const finalQuery = [];
    finalQuery.push(`INSERT INTO client (email, password, title, first_name, last_name, mobile, status, req_form_shared, meeting_datetime, registered_by) VALUES 
    ('${data.email}', '${data.password}', '${data.title}', '${data.firstName}', '${data.lastName}', '${data.mobile}', ${data.status},${data.shareReqForm},'${data.meetingDatetime}',${data.registeredBy})`);
    finalQuery.push(`INSERT INTO address_details (client_id, city, address) VALUES ((select id from client where mobile = '${data.mobile}'), '${data.city}',${add})`);
    finalQuery.push(`INSERT INTO visit_charges (client_id, amount) VALUES ((select id from client where mobile = '${data.mobile}'), ${data.visitCharges})`);
    finalQuery.push(`INSERT INTO projects (client_id, scope_of_work, package) VALUES ((select id from client where mobile = '${data.mobile}'),'${data.scopeOfWork}', '${data.package}')`);
    return finalQuery;
  }

  registerClientQuery(data) {
    const add = data.address ? `'${data.address}'` : null;
    const finalQuery = [];
    finalQuery.push(`INSERT INTO client (email, password, title, first_name, last_name, mobile, status, req_form_shared, registered_by, type) VALUES 
    ('${data.email}','${data.password}','${data.title}','${data.firstName}','${data.lastName}','${data.mobile}', ${data.status},${data.shareReqForm},${data.registeredBy},'${data.type}')`);
    finalQuery.push(`INSERT INTO address_details (client_id, city, address) VALUES ((select id from client where mobile = '${data.mobile}'), '${data.city}',${add})`);
    return finalQuery;
  }

  insertPassword(data,password) {
    return `update marksdzyn.client set password ='${password}' where email='${data.email}'`
  }

  checkEmail(data){
    return `SELECT email from client where email='${data.email}' `
  }
  checkPassword(data){
    return `SELECT * from client where email='${data.email}' and password ='${data.password}'`
  }
}

module.exports = new Queries();
