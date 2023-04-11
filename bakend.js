class ProductManager {
  
  static nextId = 0;
  constructor() {
    this.products = [];
    
  }
  
  getProduct() {
    console.log(this.products);
  }

  
  addProduct(title, description, price, thumbnail, code, stock, id) {
    ProductManager.nextId = ProductManager.nextId + 1;
    
    
    const New_product = {
      id: ProductManager.nextId,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock
    }
    
    
    const existingProduct = this.products.find(pro => pro.code === New_product.code)
    if (existingProduct) {
      console.log('Error: Product with code already exists')
      return;
    }
    this.products.push(New_product);
  }
  
     getProductById(id) {
      const productId = Number(id);
      const product = this.products.find(pro => pro.id === productId);
      if (product) {
        return console.log("Producto en el Arrays");
      } else {
        console.log("Error: NOT FOUND");
      }
    }
  
  
}
  
  const product = new ProductManager();
  product.getProduct();
  product.addProduct('Ak-47 Asimov','Excelente fusil de largo alcance',19.99,'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV092lnYmGmOHLP7LWnn9u5MRjjeyPo9qgjlfnqUtvMGHzIICWew45aV-B_1bqw7u5gse16JTKwXBnvigg5WGdwUL3VYtbUA/360fx360f','25005','100');
  product.addProduct('Ak-47 Anubis','Excelente fusil de largo alcance',11.99,'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhnwMzJegJB49C5mpnbxsjmNr_ummJW4NFOhujT8om7igLs8xc9ZG_yIdSTJwE4NwnT_ge5xuu6h5a8tZzNnSFnvnQn5nzbzAv330_AxVvPyA/360fx360f','25006','10');
  product.getProduct();
  product.getProductById(2);