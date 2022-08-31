const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModels');
const products = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
];

const insert = { id: 3, name: 'Carrinho da Xuxa' };

describe('Products Models - Será verificado', () => {
  beforeEach(() => {
    sinon.restore();
  });
  it('lista todos os produtos.', async () => {
    sinon.stub(connection, 'execute').resolves([products]);
    const getAllProducts = await productsModel.getAllProducts();
    expect(getAllProducts).to.be.deep.equal(products);
  });
  it('Lista um produto específico com sucesso.', async () => {
    sinon.stub(connection, 'execute').resolves([products]);
    const getProductById = await productsModel.getProductById();
    expect(getProductById).to.be.deep.equal(products[0]);
  });
});
