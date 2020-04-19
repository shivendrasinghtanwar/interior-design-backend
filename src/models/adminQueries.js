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
