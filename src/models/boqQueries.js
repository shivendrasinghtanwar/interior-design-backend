class Queries {
  allOnSiteRecords(category) {
    let queryString = `select
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
    from on_site_master_data`;
    if (category) {
      queryString += ` where item_type='${category}'`;
    }
    console.log('query string--------------', queryString);
    return queryString;
  }

  allOnSiteDistinctItemTypes() {
    return `select distinct item_type as category
    from on_site_master_data
    group by item_type`;
  }

  allFurnitureRecords(category) {
    let queryString = `select
    id,
    item_code,
    item_type,
    item_name,
    item_description,
    unit,
    rate,
    amount,
    piece_quantity,
    breadth,
    length,
    height,
    main_rate,
    fabric_m,
    fabric_rate,
    drawer_count,
    drawer_rate,
    sliding,
    sliding_rate,
    url
    width
    from boq_furniture_master_data`;
    if (category) {
      queryString += ` where item_type='${category}'`;
    }
    console.log('query string--------------', queryString);
    return queryString;
  }

  allFurnitureCategories() {
    return `select distinct item_type as category
    from boq_furniture_master_data
    group by item_type`;
  }

  allModularRecords(category) {
    let queryString = `select
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
    from on_site_master_data`;
    if (category) {
      queryString += ` where item_type='${category}'`;
    }
    console.log('query string--------------', queryString);
    return queryString;
  }

  allModularCategories() {
    return `select distinct item_type as category
    from on_site_master_data
    group by item_type`;
  }

}

module.exports = new Queries();
