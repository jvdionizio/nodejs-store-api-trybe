const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsService = require('../../../services/productsServices');
const productsModel = require('../../../models/productsModels');
const products = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
];

const insert = { id: 3, name: 'Carrinho da Xuxa' };

describe('Product Services - Será verificado', () => {
  beforeEach(() => {
    sinon.restore();
  });
  it('lista todos os produtos.', async () => {
    sinon.stub(connection, 'execute').resolves([products]);
    const getAllProducts = await productsService.getAllProducts();
    expect(getAllProducts).to.be.deep.equal(products);
  });
  it('Lista um produto específico com sucesso.', async () => {
    const id = 1;
    sinon.stub(connection, 'execute').resolves([products]);
    const getProductById = await productsService.getProductById(id);
    expect(getProductById).to.be.deep.equal(products[0]);
  });
  it('Não é possível listar um produto que não existe', async () => {
    const id = 0;
    const error = { message: 'Product not found' };
    sinon.stub(productsModel, 'getProductById').resolves(error);
    const getProductById = await productsService.getProductById(id);
    expect(getProductById).to.be.deep.equal(error);
  });

  it('Cadastra um produto com sucesso', async () => {
    sinon.stub(productsModel, 'addProduct').resolves(insert);
    const addProduct = await productsService.addProduct(insert.name);
    expect(addProduct).equal(insert);
  });
});
