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
