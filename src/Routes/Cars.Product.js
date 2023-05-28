const express = require('express');
const Cars = express();
const { v4: uuidv4 } = require('uuid');

function generateUniqueId() {
  return uuidv4();
}

// Array para almacenar los carritos
const carritos = [];

//Ruta raiz GET / visualizar todos los carritos guardados
Cars.get('/car',(req, res) => {
        res.json(carritos);
});

// Ruta raíz POST /
Cars.post('/cart', (req, res) => {
  // Generar un nuevo id para el carrito
  const newId = generateUniqueId();

  // Crear el objeto del carrito con la estructura especificada
  const newCarrito = {
    id: newId,
    products: []
  };

  // Agregar el carrito al array de carritos
  carritos.push(newCarrito);

  res.json(newCarrito);
});

// Ruta GET /:cid
Cars.get('/car/:cid', (req, res) => {
  // Obtener el parámetro cid de la URL
  const cid = req.params.cid;

  // Buscar el carrito por su id
  const carrito = carritos.find(c => c.id === cid);

  if (!carrito) {
    res.status(404).json({ error: 'Carrito no encontrado' });
  } else {
    res.json(carrito.products);
  }
});

// Ruta POST /:cid/product/:pid
Cars.post('/car/:cid/product/:pid', (req, res) => {
  // Obtener los parámetros cid y pid de la URL
  const cid = req.params.cid;
  const pid = req.params.pid;

  // Obtener el carrito por su id
  const carrito = carritos.find(c => c.id === cid);

  if (!carrito) {
    res.status(404).json({ error: 'Carrito no encontrado' });
  } else {
   
   
  
    // Verificar si el producto ya existe en el carrito
  const existingProduct = carrito.products.find(p => p.product === pid);    
  if (existingProduct) {
    // Si el producto ya existe, incrementar la cantidad
    existingProduct.quantity++;
  } else {
    // Si el producto no existe, agregarlo al carrito
    const newProduct = {
      product: pid,
      quantity: 1
    };
    carrito.products.push(newProduct);
  }

  res.json(carrito);
  }
});

module.exports = Cars;