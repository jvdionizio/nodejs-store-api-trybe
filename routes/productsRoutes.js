const { Router } = require('express');
const products = require('../controllers/productsControllers');

const productsRoute = Router();

productsRoute.get('/:id', products.getProductById);
productsRoute.get('/', products.getAllProducts);

module.exports = productsRoute;
