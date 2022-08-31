const { Router } = require('express');
const products = require('../controllers/productsControllers');
const productsValidation = require('../middlewares/productsValidation');

const productsRoute = Router();

productsRoute.get('/:id', products.getProductById);
productsRoute.get('/', products.getAllProducts);
productsRoute.post('/', productsValidation.nameValidation, products.addProduct);
productsRoute.get('/:id', products.getProductById);
// productsRoute.put('/:id', productsValidation.nameValidation, products.updateProduct);
productsRoute.delete('/:id', products.deleteProduct);

module.exports = productsRoute;
