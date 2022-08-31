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

// const updateProduct = async (id, name) => {
//   const SQL = 'UPDATE StoreManager.products SET name = ? WHERE id = ?;';

//   await connection.execute(SQL, [name, id]);

//   return { id, name };
// };

const deleteProduct = async (id) => {
  const SQL = 'DELETE FROM StoreManager.products WHERE id = ?;';

  const result = await connection.execute(SQL, [id]);

  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  // updateProduct,
  deleteProduct,
};
