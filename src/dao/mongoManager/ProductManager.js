const productModel = require("../models/products.model");

class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct = async (product) => {
    try {
      const productSaved = await productModel.create(product);
      return productSaved;
    } catch (e) {
      console.log(e);
    }
  };

  getProducts = async (limit) => {
    try {
      const products = await productModel.find().limit(limit);
      return products;
    } catch (error) {
      return res.status(500).json({
        msg: "error",
        playload: "Error al Mostrar Producto",
      });
    }
  };

  getProductById = async (id) => {
    try {
      const product = await productModel.find({ _id: id });
      return product;
    } catch (error) {
      return res.status(500).json({
        msg: "error",
        playload: "Error al Buscar Producto",
      });
    }
  };

  updateProduct = async (id, newProduct) => {
    try {
      const productUpdated = await productModel.updateOne(
        { _id: id },
        newProduct
      );
      return productUpdated;
    } catch (error) {
      return res.status(500).json({
        msg: "error",
        playload: "Error al Actualizar Producto",
      });
    }
  };

  deleteProduct = async (id) => {
    try {
      const productDeleted = await productModel.deleteOne({ _id: id });
      return productDeleted;
    } catch (error) {
      return res.status(500).json({
        msg: "error",
        playload: "Error al Eliminar Producto",
      });
    }
  };
}

module.exports = ProductManager;
