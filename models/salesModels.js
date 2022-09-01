const connection = require('./connection');

const getAllSales = async () => {
  const SQL = `
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
  const [allSales] = await connection.execute(SQL);
  return allSales;
};

const getSaleById = async (id) => {
  const SQL = `
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
  const [sale] = await connection.execute(SQL, [id]);
  return sale;
};

const deleteSale = async (id) => {
  const SQL = 'DELETE FROM StoreManager.sales WHERE id = ?';
  const [{ deletedSale }] = await connection.execute(SQL, [id]);
  return deletedSale;
};

module.exports = {
  getAllSales,
  getSaleById,
  deleteSale,
};
