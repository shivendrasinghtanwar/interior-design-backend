class AdminQueries {
  allToBeAssignedClients(adminId) {
    return `select
    client.id as id, client.email,
    concat(client.title,' ',client.first_name,' ',client.last_name) as name, client.mobile,
    city,address,
    DATE_format(meeting_datetime,'%d %b %Y %h:%i %p') AS meeting_datetime,
    DATE_format(meeting_datetime,'%m-%Y') AS meetingMonth,
    scope_of_work as scope,package,
    concat(admin.title,' ',admin.first_name,' ',admin.last_name) as registeredBy, admin.id as registeredById,
    visit_charges.amount as visit_charges
    from client inner
    join address_details on client.id = address_details.client_id
    inner join projects on client.id = projects.client_id
    inner join admin on admin.id = client.registered_by
    inner join visit_charges on visit_charges.client_id = client.id
    where client.status=1`;
  }
  allAssignedNotMetClients(adminId) {

    return `select
    client.id as id, client.email,
    concat(client.title,' ',client.first_name,' ',client.last_name) as name, client.mobile,
    city,address,
    DATE_format(meeting_datetime,'%d %b %Y %h:%i %p') AS meeting_datetime,
    DATE_format(meeting_datetime,'%m-%Y') AS meetingMonth,
    scope_of_work as scope,package,
    concat(admin.title,' ',admin.first_name,' ',admin.last_name) as assignedTo, admin.id as assignedToId,
    concat(forTL.title,' ',forTL.first_name,' ',forTL.last_name) as tlName,
    concat(DATEDIFF(meeting_datetime, client_assigned.created),' ','Days') as tat
    from client inner join address_details
    on client.id = address_details.client_id
    inner join projects on client.id = projects.client_id
    inner join client_assigned on client.id = client_assigned.client_id
    inner join admin on admin.id = client_assigned.admin_id
    inner join admin_hierarchy on admin.id= admin_hierarchy.designer_id
    inner join admin as forTL on admin_hierarchy.tl_id=forTL.id
    where client.status=2 or client.status=3`;
  }
  allMetClients(adminId) {
    return `select
    client.id as id, client.email,
    concat(client.title,' ',client.first_name,' ',client.last_name) as name, client.mobile,
    city,address,
    DATE_format(meeting_datetime,'%d %b %Y %h:%i %p') AS meeting_datetime,
    DATE_format(meeting_datetime,'%m-%Y') AS meetingMonth,
    scope_of_work as scope,package,
    concat(admin.title,' ',admin.first_name,' ',admin.last_name) as assignedTo, admin.id as assignedToId,
    concat(forTL.title,' ',forTL.first_name,' ',forTL.last_name) as tlName,
    concat(datediff(meetings.created,now()),' ','Days')  as tat
    from client
    inner join address_details on client.id = address_details.client_id
    inner join projects on client.id = projects.client_id
    inner join client_assigned on client.id = client_assigned.client_id
    inner join admin on admin.id = client_assigned.admin_id
    inner join meetings on meetings.project_id = projects.id
    inner join admin_hierarchy on admin.id= admin_hierarchy.designer_id
    inner join admin as forTL on admin_hierarchy.tl_id=forTL.id

    where client.status=4`;
  }
  allPaymentDueClients(adminId){
    return `select
    client.id as id, client.email,
    concat(client.title,' ',client.first_name,' ',client.last_name) as name, client.mobile,
    city,address,
    DATE_format(meeting_datetime,'%d %b %Y %h:%i %p') AS meeting_datetime,
    DATE_format(meeting_datetime,'%m-%Y') AS meetingMonth,
    scope_of_work as scope,package,
    concat(admin.title,' ',admin.first_name,' ',admin.last_name) as assignedTo, admin.id as assignedToId,
    concat(forTL.title,' ',forTL.first_name,' ',forTL.last_name) as tlName
    from client
    inner join address_details on client.id = address_details.client_id
    inner join projects on client.id = projects.client_id
    inner join client_assigned on client.id = client_assigned.client_id
    inner join admin on admin.id = client_assigned.admin_id
    inner join admin_hierarchy on admin.id= admin_hierarchy.designer_id
    inner join admin as forTL on admin_hierarchy.tl_id=forTL.id
    where client.status=5 or client.status=6`;
  }

  allPresales(adminId){
    return `SELECT 
    DATE_format(meeting_datetime,'%d %b %Y %h:%i %p') AS meeting_datetime,
    client.id as id,
    concat(client.title,' ',client.first_name,' ',client.last_name) as name, 
    client.mobile,
    city,scope_of_work,client.status,
    concat(admin.title,' ',admin.first_name,' ',admin.last_name) as presales
    FROM client 
    inner join address_details on client.id = address_details.client_id
    inner join projects on client.id = projects.client_id
    inner join admin on client.registered_by = admin.id
    where client.registered_by=4;`
  }

  allClients(adminId){
    return `SELECT 
    DATE_format(meeting_datetime,'%d %b %Y %h:%i %p') AS meeting_datetime,client.id as id,
    concat(client.title,' ',client.first_name,' ',client.last_name) as name, client.mobile,
    city,client.status,
    concat(A.title,' ',A.first_name,' ',A.last_name) as registered_by,
    concat(B.title,' ',B.first_name,' ',B.last_name) as Designer,
    concat(C.title,' ',C.first_name,' ',C.last_name) as TL
    FROM client 
    inner join address_details on client.id = address_details.client_id
    inner join projects on client.id = projects.client_id
    inner join admin as A on client.registered_by = A.id
    inner join client_assigned on client.id=client_assigned.client_id
    inner join admin as B on client_assigned.admin_id = B.id
    inner join admin_hierarchy on B.id=admin_hierarchy.designer_id
    inner join admin as C on admin_hierarchy.tl_id = C.id`
  }

  fetchDesignQuotationByClientId(clientId) {
    return `select
    *
    from design_quotation
    where client_id=${clientId}`
  }

}

module.exports = new AdminQueries();
