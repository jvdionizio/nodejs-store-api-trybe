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

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
};
