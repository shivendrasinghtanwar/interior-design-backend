class TeamLeadQueries {
  allToBeAssignedClients(adminId) {
    return `select
    *
    from client
    inner join client_assigned
    on client_assigned.client_id = client.id
    where status=2 and admin_id=${adminId}`;
  }
}

module.exports = new TeamLeadQueries();
