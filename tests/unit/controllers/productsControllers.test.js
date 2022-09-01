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

    describe("Register a product", () => {
      beforeEach(() => {
        sinon.restore();
      });
      const request = {};
      const response = {};
      const newProduct = [
        {
          id: 1,
          name: "Bala da Xuxa",
        },
      ];
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      it("Returns the status code 201", async () => {
        sinon.stub(productsService, "addProduct").resolves(newProduct);
        await productsControllers.addProduct(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
      });

      it("Returns the product created", async () => {
        sinon.stub(productsService, "addProduct").resolves(newProduct);
        await productsControllers.addProduct(request, response);
        expect(response.json.calledWith(newProduct)).to.be.equal(true);
      });
    });
  });
  // describe('Delete a product', () => {
  //   describe('Success case', () => {
  //     beforeEach(() => {
  //       sinon.restore();
  //     });
  //     it('A product can be deleted by its id', async () => {
  //       const request = {};
  //       const response = {};
  //       request.body = {};
  //       request.params = { id: 1 };
  //       response.status = sinon.stub().returns(response);
  //       response.end = sinon.stub().returns();

  //       sinon.stub(productsService, 'deleteProduct').resolves(undefined);

  //       await productsControllers.deleteProduct(request, response);
  //       expect(response.status.calledWith(204)).to.be.equal(true);
  //     });
  //     describe('Failure case', async () => {
  //       beforeEach(() => {
  //         sinon.restore();
  //       });

  //       it('Returns the status 404', async () => {
  //         const request = {};
  //         const response = {};
  //         const error =  null;

  //         request.body = {};
  //         request.params = { id: 0 };
  //         response.status = sinon.stub().returns(response);
  //         response.json = sinon.stub().returns();
  //         sinon.stub(productsService, 'deleteProduct').resolves(error);

  //         await productsControllers.deleteProduct(request, response);
  //         expect(response.status.calledWith(404)).to.be.equal(true);
  //       });

  //       it('Returns the message: 'Product not found'', async () => {
  //         const request = {};
  //         const response = {};
  //         const error = 'null';

  //         request.body = {};
  //         request.params = { id: 0 };
  //         response.status = sinon.stub().returns(response);
  //         response.json = sinon.stub().returns();
  //         sinon.stub(productsService, 'deleteProduct').resolves(error);
  //         await productsControllers.deleteProduct(request, response);
  //         expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
  //       });
  //     });
  //   });
  // });
});
