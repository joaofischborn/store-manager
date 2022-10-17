const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsController = require('../../../src/controllers/products.controller')
const productsService = require('../../../src/services/products.service')
const { allProductsResponse, productCreateResponse } = require('../../../__tests__/_dataMock')


describe("Testes de unidade de ProductsController", function () {
  afterEach(sinon.restore);

  it("Buscando por todos os produtos", async function () {
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
  });

  it('Buscando pelo seu id', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, "findById")
      .resolves({ type: null, message: allProductsResponse[0] });

    await productsController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsResponse[0]);
  });

  it('Inserindo novo produto', async function () {
    const res = {}
    const req = { body: { id: 4, name: 'Produto1' } }

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    sinon
      .stub(productsService, 'insertNewProduct')
      .resolves({ type: null, message: productCreateResponse })
    
    await productsController.insertNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productCreateResponse);
  });

  it('Deletando um produto', async function () {
    const res = {}
    const req = {params: {id: 2}}

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    sinon
      .stub(productsService, "deleteProduct")
      .resolves({ type: null })
    
    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204)
  });

  it('Verifica caso não exista um produto com o id inserido', async function () {
    const res = {}
    const req = { params: { id: 8 } }

    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    sinon
      .stub(productsService, 'findAll')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: "Product not found" });
    
    await productsController.listAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith("Product not found");
  })
});