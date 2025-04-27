import db from '../../Config/db.js';

// Get all products
export const getAllProducts = () => {
  const query = 'SELECT * FROM products ORDER BY item_id DESC';
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// Get single product by ID
export const getProductById = (id) => {
  const query = 'SELECT * FROM products WHERE item_id = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

// Update product
export const updateProduct = (id, item_name, date, location) => {
  const query = 'UPDATE products SET item_name = ?, date = ?, location = ? WHERE item_id = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [item_name, date, location, id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// Delete product
export const deleteProduct = (id) => {
  const query = 'DELETE FROM products WHERE item_id = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// Existing insertProduct function
export const insertProduct = (item_name, date, location) => {
  const query = 'INSERT INTO products(item_name, date, location) VALUES (?,?,?)';
  return new Promise((resolve, reject) => {
    db.query(query, [item_name, date, location], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};