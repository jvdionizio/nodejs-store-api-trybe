const { Router } = require('express');
const products = require('../controllers/productsControllers');
const productsValidation = require('../middlewares/productsValidation');

const productsRoute = Router();

productsRoute.get('/:id', products.getProductById);
productsRoute.get('/', products.getAllProducts);
productsRoute.post('/', productsValidation.nameValidation, products.addProduct);

module.exports = productsRoute;
