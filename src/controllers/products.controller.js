const productsService = require('../services');
// const errorMap = require('../utils/errorMap');

const listAllProducts = async (_req, res) => {
  const { type, message } = await productsService.findAll();
  if (type) return res.status(404).json(message);
  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);
  if (type) return res.status(404).json({ message });
  res.status(200).json(message);
};

const insertNewProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.insertNewProduct(name);
  if (type) return res.status(404).json(message);
  res.status(201).json(message);
};

module.exports = { listAllProducts, findById, insertNewProduct };