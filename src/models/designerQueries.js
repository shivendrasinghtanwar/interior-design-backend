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
}

module.exports = new Queries();
