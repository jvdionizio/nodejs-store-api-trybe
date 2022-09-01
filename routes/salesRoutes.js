const { Router } = require('express');
const sales = require('../controllers/salesControllers');

const salesRoute = Router();

salesRoute.get('/', sales.getAllSales);
salesRoute.get('/:id', sales.getSaleById);
salesRoute.delete('/:id', sales.deleteSale);

module.exports = salesRoute;
