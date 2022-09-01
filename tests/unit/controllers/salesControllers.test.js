const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/salesServices');
const salesController = require('../../../controllers/salesControllers');

const sales = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

describe('Sales Controllers:', () => {
  describe('Returns all sales in the database', () => {
    describe('Success case', () => {
      beforeEach(() => {
        sinon.restore();
      });
      it('Returns an array', async () => {
        const request = {};
        const response = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();

        sinon.stub(salesService, 'getAllSales').resolves(sales);
        await salesController.getAllSales(request, response);

        expect(sales).to.be.an('array');
      });
      it('Returns the sale from database', async () => {
        const request = {};
        const response = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();

        sinon.stub(salesService, 'getAllSales').resolves(sales);

        await salesController.getAllSales(request, response);
        expect(response.json.calledWith(sales)).to.be.equal(true);
      });
      it('Returns the status code 200 OK', async () => {
        const request = {};
        const response = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();

        sinon.stub(salesService, 'getAllSales').resolves(sales);
        await salesController.getAllSales(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
      });
    });
  });
  describe('Returns a sale found by id in the database', () => {
    describe('Success case', () => {
      beforeEach(() => {
        sinon.restore();
      });

      it('Returns a specific sale found by id in the database', async () => {
        const request = {};
        const response = {};
        const id = 1;

        request.params = id;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();

        sinon.stub(salesService, 'getSaleById').resolves(sales[0]);
        await salesController.getSaleById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(sales[0])).to.be.equal(true);
      });
    });
    describe('Failure case', () => {
      beforeEach(() => {
        sinon.restore();
      });
      it('Cannot return a sale that does not exist', async () => {
        const request = {};
        const response = {};
        const id = 0;
        const error = { message: 'Sale not found' };
        request.params = id;

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();

        sinon.stub(salesService, 'getSaleById').resolves(error);
        await salesController.getSaleById(request, response);
        expect(
          response.json.calledWith({ message: 'Sale not found' })
        ).to.be.equal(true);
      });
    });
  });
});
