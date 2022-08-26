const { Router } = require('express');

const productControllers = require('../controllers/productControllers');

const productRouters = Router();

productRouters.get('/', productControllers.listAll);
productRouters.get('/:id', productControllers.find);

module.exports = productRouters;
