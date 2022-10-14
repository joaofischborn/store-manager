const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const connection = require('../../../src/db/connection');

const { allProductsResponse } = require('../../../__tests__/_dataMock')

describe('Testes de unidade de ProductsModel', function () {
  afterEach(sinon.restore);

  it('Buscando por todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsResponse]);

    const result = await productsModel.findAll();

    expect(result).to.be.deep.equal(allProductsResponse);
  });

  it('Buscando pelo seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[allProductsResponse[1]]]);

    const result = await productsModel.findById(2);

    expect(result).to.be.deep.equal({ id: 2, name: 'Traje de encolhimento' });
  });

});