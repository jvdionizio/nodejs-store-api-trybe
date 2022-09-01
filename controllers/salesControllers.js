const salesServices = require('../services/salesServices');
const productsServices = require('../services/productsServices');

const getAllSales = async (_req, res) => {
  const sales = await salesServices.getAllSales();

  if (!sales) return res.status(404).send({ message: 'Sale not found' });

  return res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const saleById = await salesServices.getSaleById(id);

  if (!saleById || saleById.length === 0) {
    return res.status(404).send({ message: 'Sale not found' });
  }

  return res.status(200).json(saleById);
};

const addSale = async (req, res) => {
  const saleList = req.body;

  const products = await productsServices.getAllProducts();

  const isProductId = saleList
    .every(({ productId }) => products.some(({ id }) => id === productId));

  if (!isProductId) return res.status(404).json({ message: 'Product not found' });

  const newSale = await salesServices.addSale(saleList);

  if (newSale === 'not found') return res.status(404).json({ message: 'Product not found' });

  return res.status(201).json(newSale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const saleById = await salesServices.getSaleById(id);

  if (saleById.length === 0) return res.status(404).send({ message: 'Sale not found' });

  await salesServices.deleteSale(id);

  return res.status(204).end();
};

module.exports = {
  getAllSales,
  getSaleById,
  addSale,
  deleteSale,
};
