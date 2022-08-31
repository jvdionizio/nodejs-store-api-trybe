const productsService = require('../services/productsServices');

//                                                       (Requirement 02)
const getAllProducts = async (_req, res, next) => {
  try {
    const product = await productsService.getAllProducts();

    if (!product) return res.status(404).send({ message: 'Product not found' });

    res.status(200).send(product);
  } catch (e) {
    return next(e);
  }
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const productById = await productsService.getProductById(id);

    if (!productById) { return res.status(404).send({ message: 'Product not found' }); }

    res.status(200).send(productById);
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
