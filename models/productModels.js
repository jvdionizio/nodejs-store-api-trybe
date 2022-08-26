const db = require('./db');

// RECEBE O BANCO DE DADOS E SUAS QUERIES ESPECÍFICAS

const productModels = {
  listAll: () => db.query('SELECT * FROM StoreManager.products'),
  find: (id) =>
    db.query('SELECT * FROM StoreManager.products WHERE id = ?', [id]),
};

module.exports = productModels;
