class AdminQueries {
  allToBeAssignedClients(adminId) {
    return `select
    *
    from client
    where status=1`;
  }

  allAssignedNotMetClients(adminId) {
    return `select
    *
    from client
    where status=2 or status=3`;
  }
  allDelayedProposals(adminId) {
    return `select
    *
    from client
    where status=2 or status=3`;
  }
}

module.exports = new AdminQueries();
