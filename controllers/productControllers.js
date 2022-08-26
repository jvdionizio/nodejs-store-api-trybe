const productServices = require('../services/productServices');

const HTTP_STATUS_NOT_FOUND = 404;

const productControllers = {
  listAll: async (req, res) => {
    const [productList] = await productServices.listAll();
    return res.json(productList);
  },
  find: async (req, res) => {
    const { id } = req.params;
    const [[result]] = await productServices.find(id);
    if (!result) {
      return res.status(HTTP_STATUS_NOT_FOUND).json({ message: 'Product not Found' });
    }
    return res.json(result);
  },
};

module.exports = productControllers;
