const ProductManager = require("../dao/mongoManager/ProductManager");

const pm = new ProductManager();

class ProductService {

  getProducts = (page, limit, sort, query) => pm.getProducts(page, limit, sort, query);
  addProduct = (data) => pm.addProduct(data);
  getProductById = (productId) => pm.getProductById(productId)
  updateProduct = (productId, newProduct) => pm.updateProduct(productId, newProduct);
  deleteProduct = (productId) => pm.deleteProduct(productId);
}

module.exports = new ProductService();
