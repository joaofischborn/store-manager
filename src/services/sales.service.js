const { salesModel } = require('../models');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return { type: null, message: sales };
};

const getSaleById = async (id) => {
  const saleById = await salesModel.getSaleById(id);
  if (saleById.length > 0) return { type: null, message: saleById };
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

// const insertNewSale = async (productId, quantity) => {
//   console.log('SERVICE');
//   const newSale = await salesModel.insertNewSale(productId, quantity);
//   return { type: null, message: newSale };
// };

module.exports = { getAllSales, getSaleById };