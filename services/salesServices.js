const salesModels = require('../models/salesModels');

const getAllSales = async () => {
  const result = await salesModels.getAllSales();
  return result;
};

const getSaleById = async (id) => {
  const result = await salesModels.getSaleById(id);
  return result;
};

const deleteSale = async (id) => {
  const result = await salesModels.deleteSale(id);

  return result;
};

module.exports = {
  getAllSales,
  getSaleById,
  deleteSale,
};
