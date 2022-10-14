const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../src/services');
const productsModel = require('../../../src/models/products.model');
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
})