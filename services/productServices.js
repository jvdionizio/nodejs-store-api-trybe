const productModels = require('../models/productModels');

const productServices = {
  listAll: async () => {
    const productList = await productModels.listAll();
    return productList;
  },
  find: async (id) => {
    const productById = await productModels.find(id);
    if (!productById) {
      return null;
    }
    return productById;
  },
};

module.exports = productServices;
