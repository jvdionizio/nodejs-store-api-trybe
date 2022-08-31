const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../services/productsServices');
const productsControllers = require('../../../controllers/productsControllers');

describe('Products Controllers:', () => {
  describe('Returns all products in the database', () => {
    describe('Success case', () => {
      beforeEach(() => {
        sinon.restore();
      });

      const products = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
      ];
      it('Returns an array', async () => {
        const request = {};
        const response = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();

        sinon.stub(productsService, 'getAllProducts').resolves(products);

        await productsControllers.getAllProducts(request, response);

        expect(products).to.be.an('array');
      });

      it('Returns the products from database', async () => {
        const request = {};
        const response = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();

        sinon.stub(productsService, 'getAllProducts').resolves(products);

        await productsControllers.getAllProducts(request, response);

        expect(response.json.calledWith(products)).to.be.equal(true);
      });

      it('Returns the status code 200 OK', async () => {
        const request = {};
        const response = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();

        sinon.stub(productsService, 'getAllProducts').resolves(products);

        await productsControllers.getAllProducts(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
      });
    });
    
    // describe('Failure case', () => {
    //   beforeEach(() => {
    //     sinon.restore();
    //   });

    //   it('Será validado que é retornado status 404', async () => {

    //     const products = [[]];

    //     const request = {};
    //     const response = {};

    //     response.status = sinon.stub().returns(response);
    //     response.json = sinon.stub();

    //     sinon.stub(productsService, 'getAllProducts').resolves(products);
    //     await productsControllers.getAllProducts(request, response);
    //     expect(response.status.calledWith(404)).to.be.equal(true);
    //   });
    // });
  });
  describe('Returns a product found by id in the database', () => {
    describe('Success case', () => {
      beforeEach(() => {
        sinon.restore();
      });
      const products = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
      ];
      it('Returns a specific product found by id in the database', async () => {
        const request = {};
        const response = {};

        const id = 1;

        request.params = id;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();

        sinon.stub(productsService, 'getProductById').resolves(products[0]);

        await productsControllers.getProductById(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(products[0])).to.be.equal(true);
      });
      describe('Failure case', () => {
        beforeEach(() => {
          sinon.restore();
        });
        it('Cannot return a product that does not exist', async () => {
          const request = {};
          const response = {};

          const id = 0;
          const error = { message: 'Product not found' };

          request.params = id;
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub();

          sinon.stub(productsService, 'getProductById').resolves(error);

          await productsControllers.getProductById(request, response);

          expect(
            response.json.calledWith({ message: 'Product not found' })
          ).to.be.equal(true);
        });
      });
    });
  });
});
