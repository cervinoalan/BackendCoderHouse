const productModel = require("../models/products.model");

class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct = async (product) => {
    try {
      const productSaved = await productModel.create(product);
      return productSaved;
    } catch (error) {
      return res.status(500).json({
        msg: "error",
        payload: "Error al Agregar Producto",
      });
    }
  };

  getProducts = async (page = 1, limit = 10, query = {}) => {
    try{
      const products = await productModel.paginate(query,{page, limit: limit})
      return products;
    } catch (error) {
      return res.status(500).json({
        msg: "error",
        payload: "Error al Mostrar Producto",
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
        payload: "Error al Buscar Producto",
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
        payload: "Error al Actualizar Producto",
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
        payload: "Error al Eliminar Producto",
      });
    }
  };
}

module.exports = ProductManager;
