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
  const SQL = `
    INSERT INTO StoreManager.products (name) VALUES (?);
  `;

  const [products] = await connection.execute(SQL, [name]);
  return { id: products.insertId, name };
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
};
