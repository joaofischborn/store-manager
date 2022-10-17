const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models/');
const { allProductsResponse } = require('../../../__tests__/_dataMock')

describe('Testes de unidade de ProductsService', function () {
  afterEach(sinon.restore);

  it('Buscando por todos os produtos', async function () {
    sinon.stub(productsModel, 'findAll').resolves(allProductsResponse);

    const result = await productsService.findAll();

    expect(result.message).to.be.deep.equal(allProductsResponse);
  });

  it('Buscando pelo seu id', async function () {
    sinon.stub(productsModel, 'findById').resolves(allProductsResponse[0]);

    const result = await productsService.findById(1);

    expect(result.message).to.be.deep.equal(allProductsResponse[0]);
  });

  it('Buscando por um id que não existe', async function () {
    sinon.stub(productsModel, 'findById').resolves();

    const result = await productsService.findById(6);

    expect(result.message).to.be.deep.equal('Product not found');
  });

  it('Inserindo um novo produto', async function () {
    sinon.stub(productsModel, 'insertNewProduct').resolves({ insertId: 6 });
    sinon.stub(productsModel, 'findById').resolves({ id: 6, name: 'Produto1' });

    const result = await productsService.insertNewProduct('Produto1')

    expect(result.message).to.be.deep.equal({ id: 6, name: 'Produto1' })
  });

  it('Deletando um produto existente', async function () {
    sinon.stub(productsModel, 'deleteProduct').resolves({ type: null });

    const result = await productsService.deleteProduct(2)
    
    expect(result.type).to.be.equal(null)
  });
})