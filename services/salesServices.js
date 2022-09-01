const salesModels = require('../models/salesModels');

const getAllSales = async () => {
  const result = await salesModels.getAllSales();
  return result;
};

const getSaleById = async (id) => {
  const result = await salesModels.getSaleById(id);
  return result;
};

const addSale = async (sales) => {
  const createId = await salesModels.addSale();

  const newSalesObj = {
    id: createId,
    itemsSold: sales,
  };

  await Promise.all(
    sales.map(({ productId, quantity }) =>
      salesModels.addSaleProduct(createId, productId, quantity)),
  );
  return newSalesObj;
};

const deleteSale = async (id) => {
  const result = await salesModels.deleteSale(id);

  return result;
};

module.exports = {
  getAllSales,
  getSaleById,
  addSale,
  deleteSale,
};
