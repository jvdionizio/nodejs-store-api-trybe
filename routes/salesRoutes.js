const { Router } = require('express');
const sales = require('../controllers/salesControllers');
const validate = require('../middlewares/productsValidation');

const salesRoute = Router();

salesRoute.get('/', sales.getAllSales);
salesRoute.get('/:id', sales.getSaleById);
salesRoute.delete('/:id', sales.deleteSale);
salesRoute.post('/', validate.validateProductId, validate.validateProductQuantity, sales.addSale);

module.exports = salesRoute;
