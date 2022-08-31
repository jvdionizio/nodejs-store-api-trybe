const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModels');

describe('Products Models:', () => {
  const products = [
    { id: 1, name: 'Martelo de Thor' },
    { id: 2, name: 'Traje de encolhimento' },
  ];

  describe('Returns all products in the database', () => {
    beforeEach(() => {
      sinon.restore();
    });

    it('Returns an array', async () => {
      sinon.stub(connection, 'execute').resolves([products]);
      const getAllProducts = await productsModel.getAllProducts();
      expect(getAllProducts).to.be.an('array');
    });

    it('Returns all products in the database', async () => {
      sinon.stub(connection, 'execute').resolves([products]);
      const getAllProducts = await productsModel.getAllProducts();
      expect(getAllProducts).to.be.deep.equal(products);
    });
  });

  describe('Returns a product found by id in the database', () => {
    beforeEach(() => {
      sinon.restore();
    });

    it('Returns a object', async () => {
      sinon.stub(connection, 'execute').resolves([products]);
      const getProductById = await productsModel.getProductById();
      expect(getProductById).to.be.a('object');
    });

    it('Returns a specific product found by id in the database', async () => {
      sinon.stub(connection, 'execute').resolves([products]);
      const getProductById = await productsModel.getProductById();
      expect(getProductById).to.be.deep.equal(products[0]);
    });
  });
});
