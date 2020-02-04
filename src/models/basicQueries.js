class Queries {
  getUserById(userId) {
    return `select * from user where id = ${userId};`;
  }

  getUserByMobileOrEmail(reqData) {
    const { email, password, mobile } = reqData;
    let query = 'select * from user u LEFT JOIN user_roles ur on ur.user_id = u.id  where 1=1 ';
    if (email) query += ` and email = '${email}'`;
    if (password) query += ` and password = '${password}'`;
    if (mobile) query += ` and mobile = '${mobile}'`;
    return query;
  }

  isUserExist(data) {
    return `SELECT email, mobile FROM user WHERE mobile = "${data.mobile}" OR email = "${data.email}"`;
  }

  getAdminDetailsById(userId) {
    return `select * from user u left join client_assigned ca on ca.admin_id = u.id left join `;
  }
}

module.exports = new Queries();
