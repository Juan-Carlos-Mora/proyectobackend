const express = require('express');
const port = 8000;
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const ProductManager = require('./ProductManager.js');

const productManager = new ProductManager('../productos.json');


app.get('/products', (req, res) => {
  const products = productManager.getProduct();
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = productManager.getProductById(id);
  res.json(product);
});

app.post('/products', (req, res) => {
  const newProduct = req.body;
  productManager.addProduct(newProduct);
  res.json(newProduct);
});

app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedProduct = req.body;
  const success = productManager.updateProduct(id, updatedProduct);
  if (success) {
    res.json(updatedProduct);
  } else {
    res.status(404).send('Product not found');
  }
});

app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const success = productManager.deleteProduct(id);
  if (success) {
    res.send('Product deleted');
  } else {
    res.status(404).send('Product not found');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
