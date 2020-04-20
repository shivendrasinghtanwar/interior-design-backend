class CommonQueries {
  allDesigners(){
    return `SELECT
    admin.id as id,
    email,
    password,
    title,
    first_name,
    last_name,
    mobile,
    type,
    status,
    admin.visible,
    activated,
    registered_by,
    roles,
    assigned_by
    FROM admin
    inner join user_roles
    on user_roles.admin_id = admin.id
    where roles='ROLE_DESIGNER';`;
  }
  getDesignerById(adminId){
    return `SELECT
    admin.id as id,
    email,
    password,
    title,
    first_name,
    last_name,
    mobile,
    type,
    status,
    admin.visible,
    activated,
    registered_by,
    roles,
    assigned_by
    FROM admin
    inner join user_roles
    on user_roles.admin_id = admin.id
    where roles='ROLE_DESIGNER' and admin.id=${adminId};`;
  }
  allTeamLeaders(){
    return `SELECT
    admin.id as id,
    email,
    password,
    title,
    first_name,
    last_name,
    mobile,
    type,
    status,
    admin.visible,
    activated,
    registered_by,
    roles,
    assigned_by
    FROM admin
    inner join user_roles
    on user_roles.admin_id = admin.id
    where roles='ROLE_TL';`;
  }
  getTeamLeaderById(adminId){
    return `SELECT
    admin.id as id,
    email,
    password,
    title,
    first_name,
    last_name,
    mobile,
    type,
    status,
    admin.visible,
    activated,
    registered_by,
    roles,
    assigned_by
    FROM admin
    inner join user_roles
    on user_roles.admin_id = admin.id
    where roles='ROLE_TL' and admin.id=${adminId};`;
  }
  allManagers(){
    return `SELECT
    admin.id as id,
    email,
    password,
    title,
    first_name,
    last_name,
    mobile,
    type,
    status,
    admin.visible,
    activated,
    registered_by,
    roles,
    assigned_by
    FROM admin
    inner join user_roles
    on user_roles.admin_id = admin.id
    where roles='ROLE_MANAGERS';`;
  }

  allPreSales(){
    return `SELECT
    admin.id as id,
    email,
    password,
    title,
    first_name,
    last_name,
    mobile,
    type,
    status,
    admin.visible,
    activated,
    registered_by,
    roles,
    assigned_by
    FROM admin
    inner join user_roles
    on user_roles.admin_id = admin.id
    where roles='ROLE_PRESALES';`;
  }
}

module.exports = new CommonQueries();
