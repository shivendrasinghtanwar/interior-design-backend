class Queries {
  fetchAssignedClientQuery(data) {
    return `select DATE_format(c.meeting_datetime,'%d %b %y %h:%i %p') AS meetingDateTime,c.id,concat(c.title,' ',c.first_name,' ',c.last_name) AS name, c.email,c.mobile,ad.city,p.id AS projectId,p.scope_of_work,p.package from client_assigned ca join client c on c.id = ca.client_id join projects p on p.client_id = c.id join address_details ad on ad.client_id = c.id where c.status=3 and ca.admin_id = ${data.adminId}  ;`;
  }

  fetchClientMetQuery(data) {
    return `select DATE_format(c.meeting_datetime,'%d %b %y %h:%i %p') AS meetingDateTime,c.id,concat(c.title,' ',c.first_name,' ',c.last_name) AS name, c.email,c.mobile,ad.city,p.id AS projectId,p.scope_of_work,p.package,DATE_format(dq.created,'%d %b %Y') dos from client_assigned ca join client c on c.id = ca.client_id join projects p on p.client_id = c.id join address_details ad on ad.client_id = c.id left join design_quotation dq on dq.client_id = c.id where c.status=4 and ca.admin_id =  ${data.adminId}  ;`;
  }

  updateClientMetTxn(data) {
    const finalQuery = [];
    finalQuery.push(`INSERT INTO meetings set project_id = ${data.projectId}, client_met = 1, min_of_meeting = '${data.mom}', updated_by = ${data.adminId}`);
    finalQuery.push(`Update client set status = 4 where status < 4 and id = ${data.clientId}`);
    return finalQuery;
  }

  getOnBoardClientsOfDesigner(designerId){
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
    where (client.status=5 or client.status=6) and admin.id=${designerId}`;
  }
}

module.exports = new Queries();
