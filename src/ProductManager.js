const fs = require('fs');
class ProductManager {
  
  constructor(path) {
    this.path = path;
    this.products = [];
    this.nextId = 1;
    
    try{
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
      this.nextId = this.getNextId();
    }
    catch (err){
      if(err.code === 'ENOENT'){
        this.saveTofile();
      }
      else{
        console.error(err);
      }
    }      
  }
  
  getNextId() {
    if (this.products.length === 0) {
      return this.nextId;
    }

    const lastProduct = this.products[this.products.length-1];
    return lastProduct.id + 1;
  }

  
  addProduct(New_product) {
    New_product.id = this.nextId;
    this.nextId++;
    const existingProduct = this.products.find(pro => pro.code === New_product.code)
    const existingProduct2 = this.products.find(pro => pro.title === New_product.title)
    if (existingProduct, existingProduct2) {
      console.log('Error: Product with code already exists')
      return;
    }

    this.products.push(New_product);
    this.saveToFile();
  
  }

  getProduct(){
    return this.products;
  }



     getProductById(id) {
      const product = this.products.find(products => products.id === id);
      if (product) {
        return console.log(product);
      } else {
        console.log("Error: NOT FOUND");
      }
    }
  
    updateProduct(id, updatedProduct) {
      const index = this.products.findIndex(products => products.id === id);
      if (index !== -1) {
        this.products[index] = { ...updatedProduct, id };
        this.saveToFile();
        return true;
      } else {
        return false;
      }
    }

    deleteProduct(id) {
      const index = this.products.findIndex(products => products.id === id);
      if (index !== -1) {
        this.products.splice(index, 1);
        this.saveToFile();
        return true;
      } else {
        return false;
      }
    }
  
    saveToFile() {
      fs.writeFileSync(this.path, JSON.stringify(this.products), 'utf-8');
    }
  }


// aqui identifico las llamadas para las creacion, busquedas, actualizacion y delete del maestro de articulo.

  const productManager = new ProductManager('productos.json');

  // Agregar un producto
  productManager.addProduct({
    title: 'Ak-47 Legion',
    description: 'Fusil de larga distancia con mucha capacidad de baj',
    price: 28.99,
    thumbnail: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV092lnYmGmOHLP7LWnn9u5MRjjeyPo9qgjlfnqUtvMGHzIICWew45aV-B_1bqw7u5gse16JTKwXBnvigg5WGdwUL3VYtbUA/360fx360f',
    code: '25011',
    stock: 10,
    id:productManager.getNextId
  });
  
  // Obtener todos los productos
  const allProducts = productManager.getProduct();
  console.log(allProducts);
  
  // Obtener un producto por id
  const productById = productManager.getProductById();
  console.log(productById);
  
  // Actualizar un producto
  const updatedProduct = {
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    code: "",
    stock:250
  };
  productManager.updateProduct('', updatedProduct);
  
  // Eliminar un producto
 productManager.deleteProduct();

 module.exports = ProductManager;

