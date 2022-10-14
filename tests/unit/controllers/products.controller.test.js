const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsController = require('../../../src/controllers/products.controller')
const productsService = require('../../../src/services/products.service')
const { allProductsResponse } = require('../../../__tests__/_dataMock')


describe("Teste de unidade de ProductsController", function () {
  afterEach(sinon.restore);

  it("Listando todos os produtos", async function () {
    const res = {};
    const req = {};
    const productsList = [allProductsResponse];

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'findAll')
      .resolves({ type: null, message: productsList });

    await productsController.listAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsList);
  })

  it('Buscando pelo seu id', async function () {
    const res = {};
    const req = { params: { id: 1 }};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, "findById")
      .resolves({ type: null, message: allProductsResponse[0] });

    await productsController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsResponse[0]);
  })
});