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
    const existingProductByCode = this.products.find(pro => pro.code === New_product.code)
    const existingProductByTitle = this.products.find(pro => pro.title === New_product.title)
    if (existingProductByCode, existingProductByTitle) {
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
    const product = this.products.find(product => product.id === id);
    if (product) {
      console.log(this.product);
      return product;
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

const productManager = new ProductManager('productos.json');
module.exports = ProductManager;

