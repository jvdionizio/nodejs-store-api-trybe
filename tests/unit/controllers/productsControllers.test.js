const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../services/productsServices');
const productsControllers = require('../../../controllers//productsControllers');
const products = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
];

const insert = { id: 3, name: 'Carrinho da Xuxa' };

describe('Products Controllers - Será verificado', () => {
  beforeEach(() => {
    sinon.restore();
  });
  it('Lista todos os produtos.', async () => {
    const request = {};
    const response = {};
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();
    sinon.stub(productsService, 'getAllProducts').resolves(products);
    await productsControllers.getAllProducts(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
    expect(response.json.calledWith(products)).to.be.equal(true);
  });
  it('Lista um produto específico com sucesso.', async () => {
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
  it('Não é possível listar um produto que não existe.', async () => {
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

  it('Cadastra um produto com sucesso.', async () => {
    const request = {};
    const response = {};

    request.body = insert.name;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub();

    sinon.stub(productsService, 'addProduct').resolves(insert);

    await productsControllers.addProduct(request, response);

    expect(response.status.calledWith(201)).to.be.equal(true);
    expect(response.json.calledWith(insert)).to.be.equal(true);
  });
});
