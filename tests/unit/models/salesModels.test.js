const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModels');

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

describe('Sales Model:', () => {
  beforeEach(() => {
    sinon.restore();
  });
  describe('Returns all sales in the database', async () => {
    it('Returns all sales in the database', async () => {
      sinon.stub(connection, 'execute').resolves([sales]);
      const getAllSales = await salesModel.getAllSales();
      expect(getAllSales).to.be.deep.equal(sales);
    });
  });

  describe('Returns a sale found by id in the database', async () => {
    it('Returns a specific sale found by id in the database', async () => {
      sinon.stub(connection, 'execute').resolves([sales]);
      const getSaleById = await salesModel.getSaleById(sales[0].saleId);
      expect(getSaleById).to.be.deep.equal(sales);
    });
  });
});
