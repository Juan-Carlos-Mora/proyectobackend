class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1;
    }
  
    addProduct(product) {
      if (this.products.some(p => p.code === product.code)) {
        console.log(`Error: product with code ${product.code} already exists`);
        return;
      }
  
      product.id = this.nextId++;
      this.products.push(product);
    }
  
    getProduct() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(p => p.id === id);
      if (product) {
        return product;
      } else {
        console.log("Error: NOT FOUND");
      }
    }
  }
  