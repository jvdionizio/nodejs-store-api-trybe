const productsService = require('../services/productsServices');

const getAllProducts = async (_req, res) => {
  const products = await productsService.getAllProducts();

  if (!products) return res.status(404).send({ message: 'Product not found' });

  res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const productById = await productsService.getProductById(id);

  if (!productById) { return res.status(404).send({ message: 'Product not found' }); }

  res.status(200).json(productById);
};

const addProduct = async (req, res) => {
  const { name } = req.body;

  const product = await productsService.addProduct(name);

  if (!product) return res.status(404).send({ message: 'Product not found' });

  res.status(201).json(product);
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
};
