const fs = require('fs');
class ProductManager {
  
  constructor(path = 'productos.json') {
    this.path = path;
    this.products = [];
    this.nextId = 1;
    
    try{
      const data =   fs.readFileSync(this.path, 'utf-8');
      try {
        this.products = JSON.parse(data);
      } catch (err) {
        console.error(err);
      }
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
    const existingProducts = new Map(this.products.map(p => [p.code, p]));
      if (existingProducts.has(New_product.code)) {
      console.log('Error: Product with code already exists');
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
      if (!product) {
        console.log("Error: NOT FOUND");
        return;  
        
      } else {
        console.log(product);
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
  
     async saveToFile() {
      try {
        await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf-8');
      } catch (err) {
        console.error(err);
        }
      }
    }


// aqui identifico las llamadas para las creacion, busquedas, actualizacion y delete del maestro de articulo.

  const productManager = new ProductManager('productos.json');
 
  // Agregar un producto
  productManager.addProduct({
    title: 'Ak-47 Anubis',
    description: 'Fusil de larga distancia con mucha capacidad de baja',
    price: 18.944,
    thumbnail: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV092lnYmGmOHLP7LWnn9u5MRjjeyPo9qgjlfnqUtvMGHzIICWew45aV-B_1bqw7u5gse16JTKwXBnvigg5WGdwUL3VYtbUA/360fx360f',
    code: '25009',
    stock: 100,
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




 