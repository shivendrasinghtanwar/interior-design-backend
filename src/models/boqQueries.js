class Queries {
  allOnSiteRecords() {
    return `select
    id,
    item_type,
    item_description,
    unit,
    rate,
    CASE nos WHEN '1' THEN 'true' ELSE 'false' END as nos,
    CASE length WHEN '1' THEN 'true' ELSE 'false' END as length,
    CASE height WHEN '1' THEN 'true' ELSE 'false' END as height,
    CASE width WHEN '1' THEN 'true' ELSE 'false' END as width,
    created,
    updated
    from on_site_master_data;`;
  }

  allDistinctItemTypes() {
    return `select distinct item_type as category
    from on_site_master_data
    group by item_type`;
  }
}

module.exports = new Queries();
