class TeamLeadQueries {
  allDesigners(adminId){
    return `SELECT
    admin_hierarchy.designer_id as id,
    email,password,title,first_name,last_name,
    mobile,type,status,visible,activated,registered_by
    from admin 
    inner join admin_hierarchy on admin.id=admin_hierarchy.designer_id
    where  tl_id=${adminId} and admin_hierarchy.designer_id!=${adminId}; `
  }

  //TeamId includes himself
  allToBeAssignedClients(adminId) {
    const teamIds=`SELECT designer_id from admin_hierarchy where tl_id=${adminId}`;
    return `select
    client.id as id, client.email,
    concat(client.title,' ',client.first_name,' ',client.last_name) as name, client.mobile,
    city,address,
    DATE_format(meeting_datetime,'%d %b %Y %h:%i %p') AS meeting_datetime,
    DATE_format(meeting_datetime,'%m-%Y') AS meetingMonth,
    scope_of_work as scope,package,
    concat(admin.title,' ',admin.first_name,' ',admin.last_name) as registeredBy, admin.id as registeredById
    from client inner join address_details
    on client.id = address_details.client_id
    inner join projects on client.id = projects.client_id
    inner join admin on admin.id = client.registered_by
    where client.status=1`;
  }

  //TeamId includes himself
  allAssignedNotMetClients(adminId) {
    const teamIds=`SELECT designer_id from admin_hierarchy where tl_id=${adminId}`;
    return `select
    client.id as id, client.email,
    concat(client.title,' ',client.first_name,' ',client.last_name) as name, client.mobile,
    city,address,
    DATE_format(meeting_datetime,'%d %b %Y %h:%i %p') AS meeting_datetime,
    DATE_format(meeting_datetime,'%m-%Y') AS meetingMonth,
    scope_of_work as scope,package,
    concat(admin.title,' ',admin.first_name,' ',admin.last_name) as assignedTo, admin.id as assignedToId,
    concat(DATEDIFF(meeting_datetime, client_assigned.created),' ','Days') as tat
    from client inner join address_details
    on client.id = address_details.client_id
    inner join projects on client.id = projects.client_id
    inner join client_assigned on client.id = client_assigned.client_id
    inner join admin on admin.id = client_assigned.admin_id
    where (client.status=2 or client.status=3) and admin_id in (${teamIds})`;
  }

  //Delayed Proposals 
  //TeamId includes himself
  allMetClients(adminId) {
    const teamIds=`SELECT designer_id from admin_hierarchy where tl_id=${adminId}`;
    return `select
    client.id as id, client.email,
    concat(client.title,' ',client.first_name,' ',client.last_name) as name, client.mobile,
    city,address,
    DATE_format(meeting_datetime,'%d %b %Y %h:%i %p') AS meeting_datetime,
    DATE_format(meeting_datetime,'%m-%Y') AS meetingMonth,
    scope_of_work as scope,package,
    concat(admin.title,' ',admin.first_name,' ',admin.last_name) as assignedTo, admin.id as assignedToId,
    concat(datediff(meetings.created,now()),' ','Days')  as tat
    from client
    inner join address_details on client.id = address_details.client_id
    inner join projects on client.id = projects.client_id
    inner join client_assigned on client.id = client_assigned.client_id
    inner join admin on admin.id = client_assigned.admin_id
    inner join meetings on meetings.project_id = projects.id
    where (client.status=4) and admin_id in (${teamIds})`;
  }

//TeamId includes himself
  allPaymentDueClients(adminId){
    const teamIds=`SELECT designer_id from admin_hierarchy where tl_id=${adminId}`;
    return `select
    client.id as id, client.email,
    concat(client.title,' ',client.first_name,' ',client.last_name) as name, client.mobile,
    city,address,
    DATE_format(meeting_datetime,'%d %b %Y %h:%i %p') AS meeting_datetime,
    DATE_format(meeting_datetime,'%m-%Y') AS meetingMonth,
    scope_of_work as scope,package,
    concat(admin.title,' ',admin.first_name,' ',admin.last_name) as assignedTo, admin.id as assignedToId
    from client
    inner join address_details on client.id = address_details.client_id
    inner join projects on client.id = projects.client_id
    inner join client_assigned on client.id = client_assigned.client_id
    inner join admin on admin.id = client_assigned.admin_id
    where (client.status=5 or client.status=6 )and admin_id in (${teamIds})` ;
  }
  fetchDesignQuotationByClientId(clientId) {
    return `select
    *
    from design_quotation
    where client_id=${clientId}`
  }
}
module.exports = new TeamLeadQueries();
