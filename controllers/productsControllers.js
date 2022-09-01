const productsServices = require('../services/productsServices');

const getAllProducts = async (_req, res) => {
  const products = await productsServices.getAllProducts();

  if (!products) return res.status(404).send({ message: 'Product not found' });

  return res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const productById = await productsServices.getProductById(id);

  if (!productById) { return res.status(404).send({ message: 'Product not found' }); }

   return res.status(200).json(productById);
};

const addProduct = async (req, res) => {
  const { name } = req.body;

  const product = await productsServices.addProduct(name);

  if (!product) return res.status(404).send({ message: 'Product not found' });

  return res.status(201).json(product);
};

// Update product

// const updateProduct = async (req, res) => {
//   const { id } = req.params;
//   const { name } = req.body;

//   const checkProduct = await productsService.getProductById(id);

//   if (!checkProduct) res.status(404).json({ message: 'Product not found' });

//   const productAltered = await productsService.updateProduct(name, id);

//   // console.log(productAltered)
//   return res.status(201).json(productAltered);
// };

const getProductByNameSearch = async (req, res) => {
  const { q: nameSearch } = req.query;

  const productsList = await productsServices.getProductByNameSearch(nameSearch);

  return res.status(200).json(productsList);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const productById = await productsServices.getProductById(id);

  if (!productById) return res.status(404).send({ message: 'Product not found' });

   await productsServices.deleteProduct(id);

   return res.status(204).end();
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  // updateProduct,
  getProductByNameSearch,
  deleteProduct,
};
