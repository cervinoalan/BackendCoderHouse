const cartsModel = require("../models/carts.model")

class CartsManager {
    constructor(){
        this.carts = [];
    }

    createCart = async (cart) => {
        try{
            const newCart = await cartsModel.create(cart)
            return newCart
        } catch (error){
            return res.status(500).json({
                msg: "error",
                payload: "Error al Crear el Carrito",
              });
        }
    }

    getCarts = async () => {
        try{
            const carts = await cartsModel.find()
            return carts
        } catch (error){
            return res.status(500).json({
                msg: "error",
                payload: "Error al buscar los Carritos",
              });
        }
    }

    getCartsById = async (id) => {
        try {
            const cart = await cartsModel.findById(id);
            return cart
        } catch (error){
            return res.status(500).json({
                msg: "error",
                payload: "Error al buscar el Carrito",
              });
        }
    }


    addProductToCart = async (cid,product) =>{
        try{
            const cart = await cartsModel.find({cartId:cid})
            const productsIndex = cart.products.findIndex((p) => p.id == product.id);
      if (productsIndex !== -1) {
        cart.products[productsIndex].quantity++;
      } else {
        cart.products.push(product);
      }
        } catch (error){
            return res.status(500).json({
                msg: "error",
                payload: "Error al agregar producto al Carrito",
              });
        }
    }


}

module.exports = CartsManager
