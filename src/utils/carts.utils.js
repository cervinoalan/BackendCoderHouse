const ProductManager = require("../dao/mongoManager/ProductManager");


const calculateCartTotal = (products) => {
  const result = products.reduce(
    (acc, curr) => acc + curr.unitValue * curr.quantity,
    0
  );
  return result;
};

const mapProductCart = async (products) => {
  let productCartList = [];
  let productsNotFound = [];
  let cartTotalQuantity = 0;

  for (const idProduct of products) {
    const indexProduct = productCartList.findIndex(
      ({ product }) => product === idProduct
    );

    if (indexProduct === -1) {
      const productDb = await ProductManager.getProductById(idProduct);
      if (productDb) {
        productCartList.push({
          product: idProduct,
          quantity: 1,
          unitValue: productDb[0].price,
        });
        cartTotalQuantity++;
      } else {
        productsNotFound.push(idProduct);
      }
    } else {
      productCartList[indexProduct].quantity++;
      cartTotalQuantity++;
    }
  }

  return { productCartList, productsNotFound, cartTotalQuantity };
};

module.exports = {
  calculateCartTotal,
  mapProductCart,
};
