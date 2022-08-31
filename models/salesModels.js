const connection = require('./connection');

const getAllSales = async () => {
  const query = `
    SELECT
      sales.id as saleId,
      sales.date,
      products.id as productId,
      sales_products.quantity
    FROM StoreManager.sales_products
    INNER JOIN StoreManager.sales
      ON StoreManager.sales_products.sale_id = StoreManager.sales.id
    INNER JOIN StoreManager.products
    ON StoreManager.sales_products.product_id = StoreManager.products.id`;
  const [allSales] = await connection.execute(query);
  return allSales;
};

const getSaleById = async (id) => {
  const query = `
    SELECT
      sales.date,
      products.id as productId,
      sales_products.quantity
    FROM StoreManager.sales_products
    INNER JOIN StoreManager.sales
      ON StoreManager.sales_products.sale_id = StoreManager.sales.id
    INNER JOIN StoreManager.products
    ON StoreManager.sales_products.product_id = StoreManager.products.id
    WHERE StoreManager.sales.id = ?`;
  const [sale] = await connection.execute(query, [id]);
  return sale;
};

module.exports = {
  getAllSales,
  getSaleById,
};
