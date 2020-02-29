class Queries {
  allUnassignedClientQuery(data) {
    return `select c.id,concat(c.title,' ',c.first_name,' ',c.last_name) AS name, c.email,c.mobile,ad.city,DATE_format(c.meeting_datetime,'%d %b %y %h:%i %p') AS meetingDateTime,c.req_form_shared from client c join address_details ad on ad.client_id = c.id where c.status = 1 and c.registered_by = "${data.adminId}" ;`;
  }

  fetchAssignedClientQuery(data) {
    return `select c.id,concat(c.title,' ',c.first_name,' ',c.last_name) AS name, c.email,c.mobile,ad.city,DATE_format(c.meeting_datetime,'%d %b %y %h:%i %p') AS meetingDateTime,DATE_format(c.meeting_datetime,'%m%Y') AS meetingMonth, concat(a.title,' ',a.first_name,' ',a.last_name)  AS tlName from client c join address_details ad on ad.client_id = c.id join client_assigned ca on c.id = ca.client_id join admin_hierarchy ah on ah.designer_id = ca.admin_id join admin a on a.id = ah.tl_id where c.status > 1 and date_format(c.meeting_datetime,'%m%Y') >= date_format(date_add(now(), interval -6 month),'%m%Y') and c.registered_by=${data.adminId}  ;`;
  }
}

module.exports = new Queries();
