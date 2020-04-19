class AdminQueries {
  allToBeAssignedClients(adminId) {
    return `select
    *
    from client
    where status=1`;
  }
}

module.exports = new AdminQueries();
