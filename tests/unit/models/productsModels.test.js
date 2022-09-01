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
  describe('Register a product', () => {
    beforeEach(() => {
      sinon.restore();
    });
    const newProduct = {
      name: 'Bala da Xuxa',
    };

    const { name: productName } = newProduct;

    const productInsertId = [{ insertId: 1 }];

    it('Returns an object', async () => {
      sinon.stub(connection, 'execute').resolves(productInsertId);
      const addProduct = await productsModel.addProduct(productName);
      expect(addProduct).to.be.an('object');
    });

    it('Returns an object that has the keys name and id', async () => {
      sinon.stub(connection, 'execute').resolves(productInsertId);
      const addProduct = await productsModel.addProduct(productName);
      expect(addProduct).to.include.all.keys('id', 'name');
    });

    it('Returns a key id with the same value that object key id', async () => {
      sinon.stub(connection, 'execute').resolves(productInsertId);
      const addProduct = await productsModel.addProduct(productName);
      expect(addProduct.id).to.be.equal(1);
    });
  });
  describe('Delete a product', () => {
    beforeEach(() => {
      sinon.restore();
    });
    const mockId = { id: 1 };

    it('Delete a product from the database by its id', async () => {
      sinon.stub(connection, 'execute').resolves(mockId);
      const deleteProduct = await productsModel.deleteProduct(mockId.id);
      expect(deleteProduct).to.be.equal(mockId);
    });
  });
});
