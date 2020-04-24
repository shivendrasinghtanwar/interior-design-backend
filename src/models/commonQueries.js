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

  registerTl(reqData){
    const finalQuerySet = [];
    const teamLeadId = `select id from admin where email=('${reqData.email}')`;

    finalQuerySet.push(`
    INSERT INTO admin 
    (email, password,title,first_name,last_name,mobile,type,status,visible) 
    VALUES (('${reqData.email}'), ('${reqData.password}'), ('${reqData.title}'), ('${reqData.first_name}'), ('${reqData.last_name}'), ${reqData.mobile}, 'ADMIN', '1', '1')`); 

    finalQuerySet.push(`INSERT into user_roles (admin_id,roles,visible) values ((${teamLeadId}),'ROLE_TL',1)`);  
    finalQuerySet.push(`INSERT into admin_hierarchy (manager_id,tl_id,designer_id) values (1,(${teamLeadId}),(${teamLeadId}))`);

    console.log('final->', finalQuerySet);
    return finalQuerySet;
  }

  registerDesigner(reqData){
    const finalQuerySet = [];
    const designerId = `select id from admin where email=('${reqData.email}')`;
    const teamLeadId = `select id from admin where id=('${reqData.teamLeadId}')`;

    finalQuerySet.push(`
    INSERT INTO admin 
    (email, password,title,first_name,last_name,mobile,type,status,visible) 
    VALUES (('${reqData.email}'), ('${reqData.password}'), ('${reqData.title}'), ('${reqData.first_name}'), ('${reqData.last_name}'), ${reqData.mobile}, 'ADMIN', '1', '1')`); 

    finalQuerySet.push(`INSERT into user_roles (admin_id,roles,visible) values ((${designerId}),'ROLE_DESIGNER',1)`);  
    finalQuerySet.push(`INSERT into admin_hierarchy (manager_id,tl_id,designer_id) values (1,(${designerId}),(${teamLeadId}))`);

    console.log('final->', finalQuerySet);
    return finalQuerySet;
  }

  registerPresales(reqData){
    const finalQuerySet = [];
    const presalesId = `select id from admin where email=('${reqData.email}')`;

    finalQuerySet.push(`
    INSERT INTO admin 
    (email, password,title,first_name,last_name,mobile,type,status,visible) 
    VALUES (('${reqData.email}'), ('${reqData.password}'), ('${reqData.title}'), ('${reqData.first_name}'), ('${reqData.last_name}'), ${reqData.mobile}, 'ADMIN', '1', '1')`); 

    finalQuerySet.push(`INSERT into user_roles (admin_id,roles,visible) values ((${presalesId}),'ROLE_PRESALES',1)`);  

    console.log('final->', finalQuerySet);
    return finalQuerySet;
  }
}

module.exports = new CommonQueries();
