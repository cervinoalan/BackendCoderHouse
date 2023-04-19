const productModel = require("../models/products.model");

class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct = async (product) => {
    const productSaved = await productModel.create(product);
    return productSaved;
  };

  getProducts = async (page = 1, limit = 10, sort = "", query = {}) => {
    const products = await productModel.paginate(query, {
      page,
      limit: limit,
      sort: { price: `${sort}` },
    });
    return products;
  };

  getProductById = async (id) => {
    const product = await productModel.find({ _id: id });
    return product;
  };

  updateProduct = async (id, newProduct) => {
    const productUpdated = await productModel.updateOne(
      { _id: id },
      newProduct
    );
    return productUpdated;
  };

  deleteProduct = async (id) => {
    const productDeleted = await productModel.deleteOne({ _id: id });
    return productDeleted;
  };
}

module.exports = new ProductManager();
