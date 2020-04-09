class Queries {
  allOnSiteRecords() {
    return `select
    *
    from on_site_master_data;`;
  }

}

module.exports = new Queries();
