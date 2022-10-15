const { salesService } = require('../services');

const getAllSales = async (_req, res) => {
  const { message } = await salesService.getAllSales();
  res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(id);
  if (type) return res.status(404).json({ message });
  res.status(200).json(message);
};

// const insertNewSale = async (req, res) => {
//   const bodySale = req.body;
//   const { type, message } = await salesService.insertNewSale(bodySale);
//   if (type) return res.status(404).json(message);
//   res.status(200).json(message);
// };

module.exports = { getAllSales, getSaleById };