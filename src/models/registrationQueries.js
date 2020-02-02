class Queries {
  isUserExist(data) {
    return `SELECT email, mobile FROM user WHERE mobile = "${data.mobile}" OR email = "${data.email}"`;
  }

  addClientQuery(data) {
    const add = data.address ? `'${data.address}'` : null;
    const finalQuery = [];
    finalQuery.push(`INSERT INTO user (email, password, title, first_name, last_name, mobile, address, type, status) VALUES 
    ('${data.email}', '${data.password}', '${data.title}', '${data.firstName}', '${data.lastName}', '${data.mobile}', ${add}, '${data.type}','${data.status}')`);
    finalQuery.push(`INSERT INTO user_roles (user_id, user_role) VALUES ((select id from user where email = '${data.email}'), '${data.role}')`);
    finalQuery.push(`INSERT INTO notes (user_id, notes, tag, by_user_id) VALUES ((select id from user where email = '${data.email}'), 'Registered', 'REGISTER', ${data.registeredBy})`);
    return finalQuery;
  }
}

module.exports = new Queries();