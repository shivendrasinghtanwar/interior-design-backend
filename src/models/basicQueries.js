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

  fetchAllClient() {
    return "select u.id clientId,u.email,u.title,u.first_name,u.last_name,u.mobile,u.address,u.created registered,u.updated lastUpdated,if(dq.id is not null, 1, 0) designQuotGenerated from user u left join design_quotation dq on dq.client_id = u.id where type='CLIENT';";
  }

  getAdminDetailsById(userId) {
    return `select * from user u left join client_assigned ca on ca.admin_id = u.id left join `;
  }
}

module.exports = new Queries();
