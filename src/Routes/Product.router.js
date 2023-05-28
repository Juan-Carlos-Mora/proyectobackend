const express = require('express');
const Product = express.Router();
const ProductManager = require('../ProductManager');
const productManager = new ProductManager('productos.json');

  Product.get('/product',(req, res) => {
    const products = productManager.getProduct();
    res.json(products);
  });
  
  Product.get('/product/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = productManager.getProductById(id);
    res.json(product);
  });

  Product.post('/products/create', (req, res) => {
    const newProduct = req.body;
    productManager.addProduct(newProduct);
    res.json(newProduct);
  });
  
  Product.put('/products/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedProduct = req.body;
    const success = productManager.updateProduct(id, updatedProduct);
    if (success) {
      res.json(updatedProduct);
    } else {
      res.status(404).send('Product not found');
    }
  });
  
  Product.delete('/product/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const success = productManager.deleteProduct(id);
    if (success) {
      res.send('Product deleted');
    } else {
      res.status(404).send('Product not found');
    }
  });

module.exports = Product;