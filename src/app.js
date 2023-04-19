const express = require('express');

const fs = require('fs');

const ProductManager = require('./ProductManager');

const app = express();
const productManager = new ProductManager('data/products.json');

app.get('/products', (req, res) => {
  const products = productManager.getProduct();
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = productManager.getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.post('/products', (req, res) => {
  const newProduct = req.body;
  productManager.addProduct(newProduct);
  res.status(201).json(newProduct);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
