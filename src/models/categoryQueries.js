class Queries {
  getAllFiltersByCategory(categoryId){
    return `select *
    from product_category_filters
    where category_id=${categoryId}`;
  }
}

module.exports = new Queries();
