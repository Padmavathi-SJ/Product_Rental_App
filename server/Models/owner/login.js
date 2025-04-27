import db from '../../Config/db.js';

// Find owner by email
export const findOwnerByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM owner WHERE email = ?', [email], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Insert new owner
export const insertOwner = (data) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO owner SET ?', data, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
