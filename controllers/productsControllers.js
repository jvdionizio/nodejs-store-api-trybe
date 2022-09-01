const productsServices = require('../services/productsServices');

const notFoundMessage = { message: 'Product not found' };

const getAllProducts = async (_req, res) => {
  const products = await productsServices.getAllProducts();

  if (!products) return res.status(404).send(notFoundMessage);

  return res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const productById = await productsServices.getProductById(id);

  if (!productById) { return res.status(404).send(notFoundMessage); }

   return res.status(200).json(productById);
};

const addProduct = async (req, res) => {
  const { name } = req.body;

  const product = await productsServices.addProduct(name);

  if (!product) return res.status(404).send(notFoundMessage);

  return res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const update = await productsServices.updateProduct(name, id);

  if (update === null) return res.status(404).json(notFoundMessage);

  return res.status(200).json(update);
};

const getProductByNameSearch = async (req, res) => {
  const { q: nameSearch } = req.query;

  const productsList = await productsServices.getProductByNameSearch(nameSearch);

  return res.status(200).json(productsList);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const productById = await productsServices.getProductById(id);

  if (!productById) return res.status(404).send(notFoundMessage);

   await productsServices.deleteProduct(id);

   return res.status(204).end();
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  getProductByNameSearch,
  deleteProduct,
};
