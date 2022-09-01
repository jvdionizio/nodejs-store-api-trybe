const salesService = require('../services/salesServices');

const getAllSales = async (_req, res) => {
  const sales = await salesService.getAllSales();

  if (!sales) return res.status(404).send({ message: 'Sale not found' });

  return res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const saleById = await salesService.getSaleById(id);

  if (!saleById || saleById.length === 0) {
    return res.status(404).send({ message: 'Sale not found' });
  }

  return res.status(200).json(saleById);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const saleById = await salesService.getSaleById(id);

  if (saleById.length === 0) return res.status(404).send({ message: 'Sale not found' });

  await salesService.deleteSale(id);

  return res.status(204).end();
};

module.exports = {
  getAllSales,
  getSaleById,
  deleteSale,
};
