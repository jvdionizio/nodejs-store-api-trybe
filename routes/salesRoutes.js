const { Router } = require('express');
const sales = require('../controllers/salesControllers');

const salesRoute = Router();

salesRoute.get('/', sales.getAllSales);
salesRoute.get('/:id', sales.getSaleById);

module.exports = salesRoute;
