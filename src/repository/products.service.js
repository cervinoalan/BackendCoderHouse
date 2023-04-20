// MONGO
const ProductManager = require("../dao/mongoManager/ProductManager");

// MEMORY
// const ProductManagerFS = require("../dao/fileSystemManagar/ProductManagerFS");

class ProductService {
  getProducts = (page, limit, sort, query) =>
    ProductManager.getProducts(page, limit, sort, query);
  addProduct = (data) => ProductManager.addProduct(data);
  getProductById = (productId) => ProductManager.getProductById(productId);
  updateProduct = (productId, newProduct) =>
    ProductManager.updateProduct(productId, newProduct);
  deleteProduct = (productId) => ProductManager.deleteProduct(productId);
}

module.exports = new ProductService();
