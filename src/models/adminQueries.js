class AdminQueries {
  allToBeAssignedClients(adminId) {
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
  allAssignedNotMetClients(adminId) {
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
    where client.status=2 or client.status=3`;
  }
  allMetClients(adminId) {
    return `select
    *
    from client
    where status=4`;
  }
  fetchDesignQuotationByClientId(clientId) {
    return `select
    *
    from design_quotation
    where client_id=${clientId}`
  }

}

module.exports = new AdminQueries();
