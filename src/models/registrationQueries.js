class Queries {
  isUserExist(data) {
    return `SELECT email, mobile FROM client WHERE mobile = "${data.mobile}" OR email = "${data.email}"`;
  }

  addClientQuery(data) {
    const add = data.address ? `'${data.address}'` : null;
    const finalQuery = [];
    finalQuery.push(`INSERT INTO client (email, password, title, first_name, last_name, mobile, status, req_form_shared, meeting_datetime, scope_of_work,registered_by) VALUES 
    ('${data.email}', '${data.password}', '${data.title}', '${data.firstName}', '${data.lastName}', '${data.mobile}', ${data.status},${data.shareReqForm},'${data.meetingDatetime}','${data.scopeOfWork}',${data.registeredBy})`);
    finalQuery.push(`INSERT INTO address_details (client_id, city, address) VALUES ((select id from client where mobile = '${data.mobile}'), '${data.city}',${add})`);
    finalQuery.push(`INSERT INTO visit_charges (client_id, amount) VALUES ((select id from client where mobile = '${data.mobile}'), ${data.visitCharges})`);
    return finalQuery;
  }
}

module.exports = new Queries();
