const { expect, use } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesService = require('../../../services/salesServices');

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

describe('Sales Services:', () => {
  describe('Returns all sales in the database', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('Returns the sales from database', async () => {
      sinon.stub(connection, 'execute').resolves([sales]);
      const getAllSales = await salesService.getAllSales();
      expect(getAllSales).to.be.equal(sales);
    });
  });
  describe('Returns a sale found by id in the database', () => {
    beforeEach(() => {
      sinon.restore();
    });
    it('Returns a specific sale found by id in the database', async () => {
      sinon.stub(connection, 'execute').resolves([sales]);
      const getSaleById = await salesService.getSaleById(sales[0].saleId);
      expect(getSaleById).to.be.equal(sales);
    });
  });
});
