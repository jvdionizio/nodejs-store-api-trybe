const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsService = require('../../../services/productsServices');
const productsModel = require('../../../models/productsModels');
const products = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
];

describe('Products Services:', () => {
  describe('Returns all products in the database', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('Returns the products from database', async () => {
      sinon.stub(connection, 'execute').resolves([products]);
      const getAllProducts = await productsService.getAllProducts();
      expect(getAllProducts).to.be.deep.equal(products);
    });
  });
  describe('Returns a product found by id in the database', () => {
    describe('Success case', () => {
      beforeEach(() => {
        sinon.restore();
      });
      it('Returns a specific product found by id in the database', async () => {
        const id = 1;
        sinon.stub(connection, 'execute').resolves([products]);
        const getProductById = await productsService.getProductById(id);
        expect(getProductById).to.be.deep.equal(products[0]);
      });
    });
    describe('Failure case', () => {
      beforeEach(() => {
        sinon.restore();
      });
      it('Cannot return a product that does not exist', async () => {
        const id = 0;
        const error = { message: 'Product not found' };
        sinon.stub(productsModel, 'getProductById').resolves(error);
        const getProductById = await productsService.getProductById(id);
        expect(getProductById).to.be.deep.equal(error);
      });
    });
  });
  describe('Register a product', () => {
    beforeEach(() => {
      sinon.restore();
    });
    const newProduct = {
      id: 1,
      name: 'Bala da Xuxa',
    };
    const { name: productName } = newProduct;

    it('Returns an object', async () => {
      sinon.stub(productsModel, 'addProduct').returns(newProduct);
      const addProduct = await productsService.addProduct(productName);
      expect(addProduct).to.be.an('object');
    });
  });
  describe('Delete a product', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('Delete a product', async () => {
      const mockId = 1;
      sinon.stub(productsModel, 'deleteProduct').resolves(undefined);
      const deleteProduct = await productsService.deleteProduct(mockId);
      expect(deleteProduct).to.be.undefined;
    });
  });
});
