const camelize = require('camelize');
const connection = require('../db/connection');

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT
    sp.sale_id , s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON s.id = sp.sale_id
    ORDER BY sp.sale_id, sp.product_id;`,
  );
  return camelize(result);
};

const getSaleById = async (id) => {
  const [result] = await connection.execute(
    `SELECT
    s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON s.id = sp.sale_id
    WHERE sp.sale_id = ?
    ORDER BY sp.sale_id, sp.product_id;`,
    [id],
  );
  return camelize(result);
};

// const insertNewSale = async (productId, quantity) => {
//   console.log('MODEL');
//   const [{ insertId }] = await connection.execute(
//     'INSERT INTO StoreManager.sales_products (product_id, quantity) VALUE (2, 4)',
//   );
//   console.log(insertId);
//   return insertId;
// };

module.exports = { getAllSales, getSaleById };