const { productsModel } = require('../models');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const insertNewProduct = async (name) => {
  const newProductId = await productsModel.insertNewProduct(name);
  const newProduct = await productsModel.findById(newProductId);
  return { type: null, message: newProduct };
};

const deleteProduct = async (id) => {
  const findProduct = await productsModel.findById(id);
  if (!findProduct) return { type: 404, message: 'Product not found' };
  await productsModel.deleteProduct(id);
  return { type: null };
};

module.exports = { findAll, findById, insertNewProduct, deleteProduct };