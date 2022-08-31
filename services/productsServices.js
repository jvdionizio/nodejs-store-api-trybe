const productsModel = require('../models/productsModels');

const getAllProducts = async () => {
  const result = await productsModel.getAllProducts();
  return result;
};

const getProductById = async (id) => {
  const result = await productsModel.getProductById(id);
  return result;
};

const addProduct = async (name) => {
  const product = productsModel.addProduct(name);
  return product;
};

// const updateProduct = async (id, name) => {
//   const product = productsModel.updateProduct(id, name );
//   return product;
// };

const deleteProduct = async (id) => {
  const result = await productsModel.deleteProduct(id);

  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  // updateProduct,
  deleteProduct,
};
