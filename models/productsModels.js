const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );
  return products;
};

const getProductById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id',
    [id],
  );
  return product;
};

const addProduct = async (name) => {
  const SQL = 'INSERT INTO StoreManager.products (name) VALUES (?);';

  const [product] = await connection.execute(SQL, [name]);
  return { id: product.insertId, name };
};

const updateProduct = async (name, id) => {
  const SQL = 'UPDATE StoreManager.products SET name = (?) WHERE id = (?) LIMIT 1';
  await connection.execute(SQL, [name, id]);
  return { id, name };
};

const getProductByNameSearch = async (nameSearch) => {
  const SQL = 'SELECT * FROM StoreManager.products WHERE name LIKE ?;';

  const [productsList] = await connection.execute(SQL, [`%${nameSearch}%`]);

  return productsList;
};

const deleteProduct = async (id) => {
  const SQL = 'DELETE FROM StoreManager.products WHERE id = ?;';

  const result = await connection.execute(SQL, [id]);

  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  getProductByNameSearch,
  deleteProduct,
};
